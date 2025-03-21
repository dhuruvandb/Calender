import React, { useState, useEffect } from "react";
import Task from "./Task";
import calendar from "./calendor.json";


const formatDate = (date) => {
  const options = {
    day: "numeric", 
    month: "short", 
    year: "numeric", 
  };

  return new Intl.DateTimeFormat("en-GB", options).format(new Date(date));
};

const Day = ({ operation }) => {
  const [currentDay, setCurrentDay] = useState(new Date()); 
  const [formattedDay, setFormattedDay] = useState(formatDate(currentDay));

  useEffect(() => {
    setFormattedDay(formatDate(currentDay)); 
  }, [currentDay]);

  const times = [
    "12:00 AM",
    "01:00 AM",
    "02:00 AM",
    "03:00 AM",
    "04:00 AM",
    "05:00 AM",
    "06:00 AM",
    "07:00 AM",
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  useEffect(() => {
    if (operation > 0) {
      const nextDay = new Date(currentDay);
      nextDay.setDate(currentDay.getDate() + 1); 
      setCurrentDay(nextDay);
      console.log(operation);
    } else if (operation < 0) {
      const prevDay = new Date(currentDay);
      prevDay.setDate(currentDay.getDate() - 1); 
      setCurrentDay(prevDay);
    }
  }, [operation]);

  return (
    <div className="p-4">
      <div className="text-lg font-semibold relative w-[400px] flex justify-center items-center mb-4">
        <div className="flex items-center">
          <span className="font-bold text-2xl text-gray-800">
            {formattedDay}
          </span>
        </div>
      </div>

      <ul className="overflow-hidden h-[600px] overflow-y-auto p-0">
        {times.map((time, index) => (
          <li key={index} className="flex border-t border-gray-300">
            <div className="w-[20%] border-r border-gray-300 flex justify-center items-center text-lg text-[blue] h-24">
              {time}
            </div>

            <div className="w-[80%] h-full flex items-center border-r relative p-2">
              {calendar.filter(
                (data) =>
                  data.time.slice(0, 8) === time && data.date === formattedDay
              ).length > 0 && <Task />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Day;
