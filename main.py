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
