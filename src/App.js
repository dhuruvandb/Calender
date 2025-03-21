import React, { useState } from "react";
import Day from "./Day";
import Week from "./Week";
import Month from "./Month";
import YearCalendar from "./Year";
import ScheduleForm from "./ScheduleForm";

const HeaderComponent = () => {
  const [activeTab, setActiveTab] = useState("Day");
  const [operation, setOperation] = useState(0);
  const [month, setMonth] = useState(null);
  const [yr, setYr] = useState(null);
  const [toggle, setToggle] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex justify-between items-center w-full px-5">
        <div className="flex items-center space-x-3">
          <div
            className="group cursor-pointer border border-blue-300 rounded-lg p-2 shadow-sm bg-white transition-all"
            tabIndex="0"
            onClick={() =>
              setOperation((prevOperation) =>
                prevOperation === 0 ? -1 : prevOperation - 1
              )
            }
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 320 512"
              className="text-gray-500 transition-colors group-hover:text-black"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path>
            </svg>
          </div>

          <div
            className="group cursor-pointer border border-blue-300 rounded-lg p-2 shadow-sm bg-white transition-all"
            tabIndex="0"
            onClick={() =>
              setOperation((prevOperation) =>
                prevOperation === 0 ? 1 : prevOperation + 1
              )
            }
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 320 512"
              className="text-gray-500 transition-colors group-hover:text-black"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path>
            </svg>
          </div>

          <div
            className="w-12 h-10 flex items-center justify-center bg-white shadow-lg rounded-lg ms-4 text-blue-500 cursor-pointer font-bold"
            onClick={() => window.location.reload()}
          >
            today
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div
            className="ml-2 flex items-center justify-center text-blue-500 cursor-pointer text-xl"
            onClick={() => setToggle(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Schedule
          </div>
          <div
            className="flex items-center relative cursor-pointer"
            onClick={() => handleTabClick("Day")}
          >
            <p
              className={`transition-colors text-gray-700 ${
                activeTab === "Day" ? "text-blue-500 font-bold" : ""
              }`}
            >
              Day
            </p>
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => handleTabClick("Week")}
          >
            <p
              className={`transition-colors text-gray-700 ${
                activeTab === "Week" ? "text-blue-500 font-bold" : ""
              }`}
            >
              Week
            </p>
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => handleTabClick("Month")}
          >
            <p
              className={`transition-colors text-gray-700 ${
                activeTab === "Month" ? "text-blue-500 font-bold" : ""
              }`}
            >
              Month
            </p>
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => handleTabClick("Year")}
          >
            <p
              className={`transition-colors text-gray-700 ${
                activeTab === "Year"
                  ? "text-blue-500 font-bold"
                  : "text-gray-700"
              }`}
            >
              Year
            </p>
            <div
              className={`absolute left-0 bottom-0 h-[2px] bg-blue-500 ${
                activeTab === "Year" ? "text-blue-500 font-bold" : ""
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* Render the ScheduleForm Modal if toggle is true */}
      {toggle && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <button
              onClick={() => setToggle(false)}
              className="absolute top-2 right-2 text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ScheduleForm toggle={setToggle} />
          </div>
        </div>
      )}

      <>
        {activeTab === "Day" && <Day operation={operation} />}
        {activeTab === "Week" && <Week operation={operation} />}
        {activeTab === "Month" && (
          <Month operation={operation} month={month} year={yr} />
        )}
        {activeTab === "Year" && (
          <YearCalendar
            operation={operation}
            month={setMonth}
            activeTab={setActiveTab}
            year={setYr}
          />
        )}
      </>
    </>
  );
};

export default HeaderComponent;
