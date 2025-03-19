import React, { useState, useEffect } from "react";

const Calendar = () => {
  const timeFrames = [
    { frame: "Day", active: false },
    { frame: "Week", active: false },
    { frame: "Month", active: true },
    { frame: "Year", active: false },
  ];

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const events = [
    {
      id: 1,
      summary: "Frontend Interview",
      start: "2025-03-20T10:00:00",
      end: "2025-03-20T11:00:00",
      job: "React Developer",
      interviewer: "Sarah Johnson",
      candidate: "John Smith",
    },
    {
      id: 2,
      summary: "Backend Interview",
      start: "2025-03-22T14:00:00",
      end: "2025-03-22T15:00:00",
      job: "Node.js Developer",
      interviewer: "Michael Brown",
      candidate: "Emily Davis",
    },
    {
      id: 3,
      summary: "HR Round",
      start: "2025-03-23T11:00:00",
      end: "2025-03-23T12:00:00",
      job: "UI/UX Designer",
      interviewer: "Alex Wilson",
      candidate: "James Rodriguez",
    },
  ];

  const [activeTimeFrame, setActiveTimeFrame] = useState("Month");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [offset, setOffset] = useState(0);
  const [calendarDays, setCalendarDays] = useState([]);
  const [hourlySlots, setHourlySlots] = useState([]);
  const [dateIndicator, setDateIndicator] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    generateCalendarView();
  }, [activeTimeFrame, offset]);

  const generateCalendarView = () => {
    if (activeTimeFrame === "Month") {
      generateMonthView();
    } else if (activeTimeFrame === "Week") {
      generateWeekView();
    } else if (activeTimeFrame === "Day") {
      generateDayView();
    } else if (activeTimeFrame === "Year") {
      generateYearView();
    }
  };

  const generateMonthView = () => {
    let days = [];

    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + offset);

    const indicator = currentDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    setDateIndicator(indicator);

    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    let firstDayOfWeek = firstDay.getDay();
    if (firstDayOfWeek === 0) firstDayOfWeek = 7;

    const prevMonthLastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    for (let i = firstDayOfWeek - 1; i > 0; i--) {
      days.push({
        date: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          prevMonthLastDay - i + 1
        ),
        isCurrentMonth: false,
        events: [],
      });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const day = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      days.push({
        date: day,
        isCurrentMonth: true,
        events: getEventsForDate(day),
      });
    }

    const daysNeeded = 42 - days.length;
    for (let i = 1; i <= daysNeeded; i++) {
      days.push({
        date: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          i
        ),
        isCurrentMonth: false,
        events: [],
      });
    }

    setCalendarDays(days);
    setHourlySlots([]);
  };

  const generateWeekView = () => {
    let days = [];
    let hourSlots = [];

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + offset * 7);

    const day = currentDate.getDay() || 7;
    const diff = currentDate.getDate() - day + 1;
    const monday = new Date(currentDate);
    monday.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      days.push({
        date: date,
        isCurrentMonth: date.getMonth() === new Date().getMonth(),
        events: getEventsForDate(date),
      });
    }

    for (let hour = 0; hour < 24; hour++) {
      console.log({ days });
      hourSlots.push({
        hour: hour,
        events: days.map((day) => {
          const date = new Date(monday);
          return getEventsForHour(
            day.date === undefined
              ? [
                  {
                    date: date,
                    isCurrentMonth: date.getMonth() === new Date().getMonth(),
                    events: getEventsForDate(date),
                  },
                ]
              : day.date,
            hour
          );
        }),
      });
    }

    const startDate = days[0].date.toLocaleDateString("default", {
      month: "short",
      day: "numeric",
    });
    const endDate = days[6].date.toLocaleDateString("default", {
      month: "short",
      day: "numeric",
    });
    const year = days[0].date.getFullYear();
    const indicator = `${startDate} - ${endDate}, ${year}`;

    setDateIndicator(indicator);
    setCalendarDays(days);
    setHourlySlots(hourSlots);
  };

  const generateDayView = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + offset);

    const indicator = currentDate.toLocaleDateString("default", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    setDateIndicator(indicator);

    const hourSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      hourSlots.push({
        hour: hour,
        events: getEventsForHour(currentDate, hour),
      });
    }

    setCalendarDays([
      { date: currentDate, events: getEventsForDate(currentDate) },
    ]);
    setHourlySlots(hourSlots);
  };

  const generateYearView = () => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() + offset);

    const indicator = currentDate.getFullYear().toString();
    setDateIndicator(indicator);

    const yearMonths = [];
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(currentDate.getFullYear(), i, 1);
      const lastDay = new Date(currentDate.getFullYear(), i + 1, 0).getDate();

      let eventCount = 0;
      for (let day = 1; day <= lastDay; day++) {
        const date = new Date(currentDate.getFullYear(), i, day);
        eventCount += getEventsForDate(date).length;
      }

      yearMonths.push({
        month: i,
        name: months[i],
        eventCount: eventCount,
      });
    }

    setCalendarDays(yearMonths);
    setHourlySlots([]);
  };

  const getEventsForDate = (date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const getEventsForHour = (date, hour) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start);
      const eventHour = eventDate.getHours();
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear() &&
        eventHour === hour
      );
    });
  };

  const handleTimeFrameChange = (frame) => {
    setActiveTimeFrame(frame);
    setOffset(0);
  };

  const navigatePrevious = () => setOffset(offset - 1);
  const navigateNext = () => setOffset(offset + 1);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={navigatePrevious}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h2 className="text-xl font-semibold">{dateIndicator}</h2>
          <button
            onClick={navigateNext}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div className="flex space-x-2">
          {timeFrames.map((item) => (
            <button
              key={item.frame}
              onClick={() => handleTimeFrameChange(item.frame)}
              className={`px-4 py-2 rounded-lg ${
                activeTimeFrame === item.frame
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {item.frame}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {activeTimeFrame === "Month" && (
          <>
            <div className="grid grid-cols-7 gap-px border-b">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="py-2 text-center text-sm font-medium text-gray-500 bg-gray-50"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {calendarDays.map((day, idx) => (
                <div
                  key={idx}
                  className={`min-h-32 p-2 ${
                    day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400"
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      {day.date.getDate()}
                    </span>
                    {day.date.getDate() === new Date().getDate() &&
                      day.date.getMonth() === new Date().getMonth() &&
                      day.date.getFullYear() === new Date().getFullYear() && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs">
                          Today
                        </span>
                      )}
                  </div>
                  <div className="mt-2 space-y-1">
                    {day.events.map((event) => (
                      <div
                        key={event.id}
                        onClick={() => handleEventClick(event)}
                        className="cursor-pointer rounded-md bg-blue-100 p-1 text-xs leading-tight overflow-hidden"
                      >
                        <div className="font-semibold">
                          {formatTime(event.start)} - {formatTime(event.end)}
                        </div>
                        <div className="truncate">{event.summary}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTimeFrame === "Week" && (
          <>
            <div className="grid grid-cols-8 gap-px border-b">
              <div className="py-2 text-center text-sm font-medium text-gray-500 bg-gray-50">
                Time
              </div>
              {calendarDays.map((day) => (
                <div
                  key={day.date.toISOString()}
                  className="py-2 text-center text-sm font-medium text-gray-500 bg-gray-50"
                >
                  {day.date.toLocaleDateString("default", {
                    weekday: "short",
                    day: "numeric",
                  })}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-8 gap-px bg-gray-200">
              <div className="bg-gray-50">
                {hourlySlots.map((slot) => (
                  <div
                    key={slot.hour}
                    className="h-16 p-2 text-sm text-gray-500 text-right"
                  >
                    {slot.hour}:00
                  </div>
                ))}
              </div>
              {calendarDays.map((day, dayIndex) => (
                <div key={day.date.toISOString()} className="bg-white">
                  {hourlySlots.map((slot, slotIndex) => (
                    <div
                      key={slotIndex}
                      className="h-16 p-2 border-b border-gray-200"
                    >
                      {(slot.events[dayIndex] || []).map((event) => (
                        <div
                          key={event.id}
                          onClick={() => handleEventClick(event)}
                          className="cursor-pointer rounded-md bg-blue-100 p-1 text-xs leading-tight overflow-hidden"
                        >
                          <div className="font-semibold">
                            {formatTime(event.start)} - {formatTime(event.end)}
                          </div>
                          <div className="truncate">{event.summary}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}

        {activeTimeFrame === "Day" && (
          <>
            <div className="grid grid-cols-2 gap-px border-b">
              <div className="py-2 text-center text-sm font-medium text-gray-50 bg-gray-50">
                Time
              </div>
              <div className="py-2 text-center text-sm font-medium text-gray-50 bg-gray-50">
                Events
              </div>
            </div>

            <div className="grid grid-cols-12 gap-px bg-white-200">
              <div className="col-span-1 bg-gray-50 border-r border-gray-300">
                {hourlySlots.map((slot) => (
                  <div
                    key={slot.hour}
                    className="h-16 p-2 text-sm text-gray-500 text-right border-b border-gray-300"
                  >
                    {slot.hour}:00
                  </div>
                ))}
              </div>

              <div className="col-span-11">
                {hourlySlots.map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className="h-16 p-2 border-b border-gray-300"
                  >
                    {slot.events.map((event) => (
                      <div
                        key={event.id}
                        onClick={() => handleEventClick(event)}
                        className="cursor-pointer rounded-md bg-blue-100 p-1 text-xs leading-tight overflow-hidden"
                      >
                        <div className="font-semibold">
                          {formatTime(event.start)} - {formatTime(event.end)}
                        </div>
                        <div className="truncate">{event.summary}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTimeFrame === "Year" && (
          <>
            <div className="grid grid-cols-4 gap-4 p-4">
              {calendarDays.map((month) => (
                <div
                  key={month.month}
                  className="p-4 bg-white rounded-lg shadow-sm"
                >
                  <h3 className="text-lg font-semibold mb-2">{month.name}</h3>
                  <div className="text-sm text-gray-600">
                    {month.eventCount} event(s)
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {isDialogOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">
              {selectedEvent.summary}
            </h2>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Job:</span> {selectedEvent.job}
              </div>
              <div>
                <span className="font-medium">Interviewer:</span>{" "}
                {selectedEvent.interviewer}
              </div>
              <div>
                <span className="font-medium">Candidate:</span>{" "}
                {selectedEvent.candidate}
              </div>
              <div>
                <span className="font-medium">Time:</span>{" "}
                {formatTime(selectedEvent.start)} -{" "}
                {formatTime(selectedEvent.end)}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
