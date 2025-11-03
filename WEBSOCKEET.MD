from fastapi import FastAPI,WebSocket,WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import json
app=FastAPI()
 
app.add_middleware(CORSMiddleware,allow_origins=["*"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])
 
class ConnectionsManagers:
def init(self):
self.active_connections: list[WebSocket]=[]
 
async def connect(self,websocket:WebSocket):
await websocket.accept()
self.active_connections.append(websocket)
def disconnect(self,websocket:WebSocket):
self.active_connections.remove(websocket)
 
async def boardcast(self,message:str):
for connection in self.active_connections:
await connection.send_text(json.dumps(message))
 
manager = ConnectionsManagers()
 
@app.websocket('/ws')
async def websocket_endpoint(websocket:WebSocket):
await manager.connect(websocket)
try:
while True:
data = await websocket.receive_text()
message = json.loads(data)
 
await manager.boardcast(message)
 
except:
manager.disconnect(websocket)
 
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Simple Chat</title>
<style>
body {
font-family: Arial, sans-serif;
max-width: 600px;
margin: auto;
padding: 20px;
}
 
h2 {
text-align: center;
}
 
#chat {
border: 1px solid #ccc;
height: 400px;
padding: 10px;
overflow-y: scroll;
margin-bottom: 10px;
background-color: #f9f9f9;
}
 
#chat .message {
margin: 5px 0;
padding: 5px 10px;
border-radius: 10px;
max-width: 70%;
word-wrap: break-word;
}
 
#chat .self {
background-color: #dcf8c6;
align-self: flex-end;
text-align: right;
}
 
#chat .other {
background-color: #fff;
align-self: flex-start;
text-align: left;
}
 
#message, #username {
padding: 5px;
margin-bottom: 5px;
}
 
#message {
width: 80%;
}
 
#send {
padding: 5px 10px;
}
</style>
</head>
<body>
<h2>💬 Simple Chat</h2>
 
<input type="text" id="username" placeholder="Enter your name" />
<div id="chat"></div>
<input type="text" id="message" placeholder="Type a message..." />
<button id="send">Send</button>
 
<script>
const chat = document.getElementById("chat");
const messageInput = document.getElementById("message");
const usernameInput = document.getElementById("username");
const sendBtn = document.getElementById("send");
 
// Connect to WebSocket server
const ws = new WebSocket("ws://localhost:8000/ws");
 
ws.onopen = () => {
console.log("Connected to server");
};
 
ws.onmessage = (event) => {
const msg = JSON.parse(event.data);
const msgDiv = document.createElement("div");
msgDiv.classList.add("message");
 
// Determine if message is from self or other
if (msg.user === usernameInput.value.trim()) {
msgDiv.classList.add("self");
} else {
msgDiv.classList.add("other");
}
 
// Display message with username
msgDiv.textContent =
${msg.user}: ${msg.text}
;
chat.appendChild(msgDiv);
chat.scrollTop = chat.scrollHeight; // auto scroll
};
 
// Send message
const sendMessage = () => {
const message = messageInput.value.trim();
const username = usernameInput.value.trim() || "Anonymous";
 
if (!message) return;
 
ws.send(JSON.stringify({ user: username, text: message }));
messageInput.value = "";
};
 
sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keydown", (e) => {
if (e.key === "Enter") sendMessage();
});
</script>
</body>
</html>
