import React, { useState, useEffect } from "react";
import Task from "./Task";
import calender from "./calendor.json";

const getDaysOfWeek = () => {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
};

const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const getFirstDayOfMonth = (month, year) => {
  return new Date(year, month - 1, 1).getDay();
};

const formatMonthYear = (month, year) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${
    monthNames[month] === undefined
      ? monthNames[new Date().getMonth()]
      : monthNames[month]
  } ${year ?? new Date().getFullYear()}`;
};

const Month = ({ operation, month, year }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [daysInMonth, setDaysInMonth] = useState(0);
  const [firstDay, setFirstDay] = useState(0);

  useEffect(() => {
    const days = getDaysInMonth(currentMonth + 1, currentYear);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth + 1, currentYear);
    setDaysInMonth(days);
    setFirstDay(firstDayOfMonth);
    setCurrentMonth(month);
  }, [currentMonth, currentYear]);

  const days = getDaysOfWeek();

  const dates = Array(firstDay)
    .fill("")
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))
    .concat(Array(42 - (firstDay + daysInMonth)).fill(""));

  useEffect(() => {
    if (operation > 0) {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else if (operation < 0) {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  }, [operation]);

  return (
    <div className="p-4">
      <div className="font-bold text-center text-xl mb-4">
        {console.log(formatMonthYear(currentMonth, year))}
        {formatMonthYear(currentMonth, year)}
      </div>

      <div className="grid grid-cols-7 font-semibold text-center mb-2">
        {days.map((day, index) => (
          <div key={index} className="p-2 border-b text-[blue]">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 overflow-hidden h-[450px] overflow-y-auto">
        {dates.map((date, index) => (
          <div
            key={index}
            className={`border flex flex-col items-start justify-start h-[8rem] p-1 ${
              date ? "cursor-pointer" : ""
            }`}
          >
            {date && (
              <span className="text-lg">
                {date}
                {calender.filter((data) => data.date.slice(0, 3) == date)
                  .length > 0 && <Task />}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Month;
