import React, { useState } from "react";
import { CalendarDays, User, BedDouble } from "lucide-react";

function SearchBar() {
  // Vendosim sot si data minimale
  const today = new Date().toISOString().split("T")[0]; // format YYYY-MM-DD

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  return (
    <div className="bg-white rounded-xl border-2 border-cyan-700 flex items-center shadow-md w-full max-w-5xl mx-auto overflow-hidden">
      
      {/* Destination */}
      <div className="flex items-center px-4 py-3 flex-1 border-r border-gray-200">
        <BedDouble className="w-5 h-5 text-gray-500 mr-3" />
        <select className="w-full outline-none text-gray-800">
          <option value="">Where are you going?</option>
          <option value="paris">Paris</option>
          <option value="london">London</option>
          <option value="newyork">New York</option>
        </select>
      </div>

      {/* Date Picker */}
      <div className="flex items-center px-4 py-3 flex-1 border-r border-gray-200">
        <CalendarDays className="w-5 h-5 text-gray-500 mr-3" />
        <div className="flex gap-2 w-full">
          <input
            type="date"
            className="w-full outline-none text-gray-700"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={today}
          />
          <span>—</span>
          <input
            type="date"
            className="w-full outline-none text-gray-700"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate} // data e fundit nuk mund të jetë para startDate
          />
        </div>
      </div>

      {/* Guests and rooms */}
      <div className="flex items-center px-4 py-3 flex-1 border-r border-gray-200">
        <User className="w-5 h-5 text-gray-500 mr-3" />
        <select className="w-full outline-none text-gray-700">
          <option value="">2 adults · 0 children · 1 room</option>
          <option value="1adult">1 adult · 0 children · 1 room</option>
          <option value="2adults">2 adults · 0 children · 1 room</option>
          <option value="3adults">3 adults · 1 child · 2 rooms</option>
        </select>
      </div>

      {/* Search Button */}
      <button className="
  px-6 py-3 
  rounded-lg 
  bg-gray-900 text-white 
  font-semibold 
  shadow-md 
  hover:bg-cyan-900 
  transition-colors duration-300
  focus:outline-none focus:ring-2 focus:ring-cyan-400
">
  Search
</button>

    </div>
  );
}

export default SearchBar;
