import React, { useState, useEffect } from "react";
import calendar from "./calendor.json";
import Task from "./Task";

const getStartAndEndOfWeek = (date) => {
  const currentDate = new Date(date);
  const day = currentDate.getDay();
  const startDate = new Date(currentDate);
  const endDate = new Date(currentDate);

  startDate.setDate(currentDate.getDate() - day);

  endDate.setDate(currentDate.getDate() + (6 - day));

  return { startDate, endDate };
};

const formatDate = (date) => {
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-GB", options).format(new Date(date));
};

const convertTo24HourFormat = (time) => {
  const [hourMinute, period] = time.split(" ");
  let [hour, minute] = hourMinute.split(":").map(Number);

  if (period === "PM" && hour !== 12) {
    hour += 12;
  }
  if (period === "AM" && hour === 12) {
    hour = 0;
  }

  return new Date(1970, 0, 1, hour, minute);
};

const Week = ({ operation }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [days, setDays] = useState([]);

  useEffect(() => {
    const { startDate, endDate } = getStartAndEndOfWeek(currentWeek);
    const newDays = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      newDays.push({
        date: formatDate(day),
        day: day.toLocaleString("en-US", { weekday: "long" }),
      });
    }
    setDays(newDays);
  }, [currentWeek]);

  const times = [
    "12:00 AM",
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  useEffect(() => {
    if (operation < 0) {
      const prevWeek = new Date(currentWeek);
      prevWeek.setDate(currentWeek.getDate() - 7);
      setCurrentWeek(prevWeek);
    } else if (operation > 0) {
      const nextWeek = new Date(currentWeek);
      nextWeek.setDate(currentWeek.getDate() + 7);
      setCurrentWeek(nextWeek);
    }
  }, [operation]);

  return (
    <div className="p-4">
      <div className="flex border-t border-gray-300 scrollbar-none">
        <div className="w-[15%] border-r border-gray-300 p-4 text-lg font-semibold">
          Time
        </div>
        {days.map((day, index) => (
          <div
            key={index}
            className="w-[12.14%] border-r border-gray-300 p-4 text-lg font-semibold text-center"
          >
            <div>{day.date}</div>
          </div>
        ))}
      </div>

      <ul
        className="overflow-auto h-[400px] scrollbar-none p-0"
        style={{
          overflowY: "scroll",
          scrollbarWidth: "none",
        }}
      >
        {times.map((time, index) => (
          <li key={index} className="flex border-t border-gray-300">
            <div className="w-[15%] border-r border-gray-300 flex justify-center items-end text-lg text-[blue] h-24">
              {time}
            </div>
            {days.map((_, dayIndex) => {
              return (
                <div
                  key={dayIndex}
                  className="w-[12.14%] border-r border-gray-300 h-24"
                >
                  {calendar
                    .filter((data) => {
                      const [startTime, endTime] = data.time.split(" - ");
                      const startDate = convertTo24HourFormat(startTime);
                      const endDate = convertTo24HourFormat(endTime);

                      const currentTime = convertTo24HourFormat(time);

                      return (
                        currentTime >= startDate &&
                        currentTime <= endDate &&
                        data.date === _.date
                      );
                    })
                    .map((data) => (
                      <Task key={data.id} taskData={data} />
                    ))}
                </div>
              );
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Week;
