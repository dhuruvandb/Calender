import React, { useState, useEffect, useRef } from "react";
import jobData from "./calendor.json";
const JobCard = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectTask, setSelectTask] = useState(null);

  const popupRef = useRef(null);

  const togglePopup = () => {
    setPopupVisible((prevState) => !prevState);
  };
  const closePopup = () => {
    setSelectTask(null);
    setPopupVisible(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="ms-6 relative popup-container h-full">
      <div className="relative h-full">
        <button
          className="w-full"
          style={{ height: "83.3333%" }}
          onClick={togglePopup}
        >
          <div
            className="w-55 ps-3 py-1 pe-2 border shadow-md bg-white rounded-lg relative cursor-pointer text-start"
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              fontSize: "10px",
              lineHeight: "20px",
            }}
          >
            <div className="z-10 absolute left-0 top-0 h-full w-[10px] bg-blue-500"></div>
            <div className="absolute -top-2 -right-1 h-5 w-5 rounded-full bg-[#FFA500] flex items-center justify-center text-black text-[10px] font-semibold">
              3
            </div>
            <div className="relative z-10 font-semibold mb-0">
              Software Engineer
            </div>
            <div className="relative z-10 text-gray-600 mb-0">
              Interviewer: Vinodhini
            </div>
            <div className="relative z-10 text-gray-600 mb-0">
              Time: 08:00 PM - 08:50 PM
            </div>
          </div>
        </button>

        {isPopupVisible && (
          <div
            ref={popupRef}
            className="absolute top-1/2 -translate-y-1/2 left-full ml-2 min-w-[300px] max-w-auto z-50 opacity-100 visible transition-opacity duration-300"
            style={{
              transition: "opacity 0.3s, visibility 0.3s",
            }}
          >
            {jobData.map((job, index) => (
              <div
                key={index}
                className="w-55 ps-3 py-3 pe-2 border shadow-md bg-white rounded-lg relative cursor-pointer mb-2"
                onClick={() => setSelectTask(jobData[index])}
              >
                <div className="absolute left-0 top-0 h-full w-[10px] bg-blue-500"></div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-semibold text-black mb-0">
                    {job.jobTitle}
                  </h4>
                  <div className="flex items-center">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      cursor="pointer"
                      color="black"
                      height="18"
                      width="18"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "black" }}
                    >
                      <path d="M9.24264 18.9967H21V20.9967H3V16.754L12.8995 6.85453L17.1421 11.0972L9.24264 18.9967ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path>
                    </svg>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      cursor="pointer"
                      color="red"
                      height="18"
                      width="18"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "red" }}
                    >
                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4h-3.5z"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600 mb-0 truncate">
                    {job.round}
                  </p>
                  <span className="text-xs text-gray-600 mb-0 mx-2">|</span>
                  <p className="text-xs text-gray-600 mb-0 truncate">
                    Interviewer: {job.interviewer}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-600 mb-0">Date: {job.date}</p>
                  <span className="text-xs text-gray-600 mb-0 mx-2">|</span>
                  <p className="text-xs text-gray-600 mb-0">Time: {job.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectTask && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div
              className="bg-white w-[80%] max-w-xl rounded-lg shadow-lg relative p-2"
              style={{ opacity: 1 }}
            >
              <button
                aria-label="Close Modal"
                className="absolute -top-4 -right-4 text-2xl text-white hover:text-black bg-blue-500 rounded-full p-1 shadow-md"
                onClick={closePopup}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              </button>

              <div className="flex border-[1.5px] border-grey-500 m-2">
                <div className="w-1/2 p-4 border-r border-gray-300">
                  <p className="text-sm mb-2">
                    <strong>Interview With:</strong> {selectTask.interviewer}
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Position:</strong> {selectTask.jobTitle}
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Created By:</strong> Vinodhini
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Interview Date:</strong> {selectTask.date}
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Interview Time:</strong> {selectTask.time}
                  </p>
                  <p className="text-sm mb-4">
                    <strong>Interview Via:</strong> {selectTask.via}
                  </p>

                  <div className="border-[1.5px] border-blue-500 p-3 mb-3 rounded-md flex items-center justify-between">
                    <span className="text-sm text-blue-500">
                      {selectTask.resume}
                    </span>
                    <div className="flex gap-3"></div>
                  </div>

                  <div className="border-[1.5px] border-blue-500 p-3 rounded-md flex items-center justify-between">
                    <span className="text-sm text-blue-500">
                      {selectTask.adhaarCard}
                    </span>
                    <div className="flex gap-3"></div>
                  </div>
                </div>

                <div className="w-1/2 p-4 flex flex-col items-center justify-center">
                  <div className="border border-grey-500 rounded-md p-3 mb-6">
                    <img
                      src="data:image/png;base64,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"
                      alt="google meet"
                      style={{ width: "80px" }}
                    />
                  </div>
                  <a
                    href="http://www.hhh.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition no-underline"
                  >
                    Join
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
