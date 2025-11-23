import React, { useState } from "react";

const HotelCalendar = ({ selectedDate, setSelectedDate, minDate, unavailableDates }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const days = [];

  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  const isDisabled = (day) => {
    if (!day) return true;
    if (minDate && day < minDate) return true;
    if (unavailableDates?.some(d => d.toDateString() === day.toDateString())) return true;
    return false;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
          className="px-2 py-1 rounded hover:bg-gray-200"
        >
          &lt;
        </button>
        <span className="font-semibold">
          {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
          className="px-2 py-1 rounded hover:bg-gray-200"
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
          <div key={d} className="font-semibold">{d}</div>
        ))}

        {days.map((day, index) => {
          const disabled = isDisabled(day);
          const selected = day && selectedDate && day.toDateString() === selectedDate.toDateString();

          return (
            <button
              key={index}
              onClick={() => !disabled && setSelectedDate(day)}
              className={`
                w-10 h-10 flex items-center justify-center rounded-full
                ${disabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-blue-200"}
                ${selected ? "bg-blue-600 text-white" : ""}
              `}
            >
              {day ? day.getDate() : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HotelCalendar;
