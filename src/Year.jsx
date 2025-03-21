import React, { useState, useEffect } from "react";

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

const YearCalendar = ({ operation, month, activeTab, year }) => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMonth(null);
  };

  const handleMonthClick = (monthIndex) => {
    month(monthIndex);
    activeTab("Month");
    year(selectedYear);
  };

  useEffect(() => {
    if (operation > 0) {
      setSelectedYear(selectedYear + 1);
    } else if (operation < 0) {
      setSelectedYear(selectedYear - 1);
    }
  }, [operation]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{selectedYear}</h1>

      <div className="grid grid-cols-3 gap-6">
        {months.map((month, monthIndex) => (
          <div
            key={monthIndex}
            className="border rounded-lg p-4 hover:bg-blue-100 cursor-pointer"
            onClick={() => handleMonthClick(monthIndex)}
          >
            <h2 className="text-2xl text-center font-semibold">{month}</h2>
          </div>
        ))}
      </div>

      {isModalOpen && selectedMonth === null && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Select a Month</h2>

            <div className="grid grid-cols-3 gap-6">
              {months.map((month, monthIndex) => (
                <div
                  key={monthIndex}
                  className="border rounded-lg p-4 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleMonthClick(month)}
                >
                  <h2 className="text-2xl text-center font-semibold">
                    {month}
                  </h2>
                </div>
              ))}
            </div>

            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YearCalendar;
