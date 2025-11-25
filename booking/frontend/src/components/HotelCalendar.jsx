import React, { useState, useEffect} from "react";

const HotelCalendar = ({
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  minDate = new Date(),
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  unavailableDates = []
}) => {
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
    if (maxDate && day > maxDate) return true; // max 1 vit nga sot
    if (unavailableDates?.some(d => d.toDateString() === day.toDateString())) return true;
    return false;
  };

  const handleDayClick = (day) => {
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(day);
      setCheckOutDate(null);
    } else if (day > checkInDate) {
      setCheckOutDate(day);
    } else {
      setCheckInDate(day);
      setCheckOutDate(null);
    }
  };

  const isSelected = (day) => {
    if (!day) return false;
    if (checkInDate && day.toDateString() === checkInDate.toDateString()) return true;
    if (checkOutDate && day.toDateString() === checkOutDate.toDateString()) return true;
    return false;
  };

  const isInRange = (day) => {
    if (!day || !checkInDate || !checkOutDate) return false;
    return day > checkInDate && day < checkOutDate;
  };
  useEffect(() => {
    document.body.style.overflow = "hidden"; // disable scroll when modal is mounted
    return () => {
      document.body.style.overflow = "auto"; // re-enable on unmount
    };
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-2 ">
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
          const selected = isSelected(day);
          const inRange = isInRange(day);

          return (
            <button
              key={index}
              onClick={() => !disabled && handleDayClick(day)}
              className={`
                w-10 h-10 flex items-center justify-center rounded-full transition
                ${disabled ? "text-gray-300 cursor-not-allowed" : ""}
                ${selected ? "bg-blue-600 text-white" : ""}
                ${inRange ? "bg-blue-200" : ""}
                hover:!bg-blue-100
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
