import React, { useState, useRef, useEffect } from "react";
import { CalendarDays, User, BedDouble, ChevronDown } from "lucide-react";

// Custom dropdown component
function CustomDropdown({ options, selected, setSelected, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-transparent text-white outline-none font-medium"
      >
        {selected || placeholder}
        <ChevronDown className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-1 w-max min-w-full bg-white/10 backdrop-blur-md rounded-xl text-white shadow-lg z-[1000] max-h-52 overflow-y-auto">
          {options.map((option, i) => (
            <li
              key={i}
              onClick={() => { setSelected(option); setIsOpen(false); }}
              className="px-3 py-2 cursor-pointer hover:bg-white/20 hover:shadow-md transition-all duration-200 rounded-md"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// SearchBar component
function SearchBar() {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState("");
  const [rooms, setRooms] = useState("");

  const destinations = ["Paris", "London", "New York"];
  const guestOptions = ["1 Guest", "2 Guests", "3 Guests", "4+ Guests"];
  const roomOptions = ["1 Room", "2 Rooms", "3 Rooms"];

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl flex items-center shadow-lg w-full max-w-5xl mx-auto transform hover:scale-105 transition-transform duration-300">

      {/* Destination */}
      <div className="flex items-center px-5 py-4 flex-1 border-r border-white/30 hover:bg-white/20 transition-colors duration-300 cursor-pointer">
        <BedDouble className="w-6 h-6 text-white mr-3" />
        <CustomDropdown
          options={destinations}
          selected={destination}
          setSelected={setDestination}
          placeholder="Where are you going?"
        />
      </div>

      {/* Date Picker */}
      <div className="flex items-center px-5 py-4 flex-1 border-r border-white/30 hover:bg-white/20 transition-colors duration-300 cursor-pointer">
        <CalendarDays className="w-6 h-6 text-white mr-3" />
        <div className="flex gap-2 w-full">
          <input
            type="date"
            className="w-full outline-none text-white bg-transparent font-medium"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={today}
          />
          <span className="text-white">—</span>
          <input
            type="date"
            className="w-full outline-none text-white bg-transparent font-medium"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
          />
        </div>
      </div>

      {/* Guests */}
      <div className="flex items-center px-5 py-4 border-r border-white/30 hover:bg-white/20 transition-colors duration-300 cursor-pointer">
        <User className="w-6 h-6 text-white mr-3" />
        <CustomDropdown
          options={guestOptions}
          selected={guests}
          setSelected={setGuests}
          placeholder="Guests"
        />
      </div>

      {/* Rooms */}
      <div className="flex items-center px-5 py-4 border-r border-white/30 hover:bg-white/20 transition-colors duration-300 cursor-pointer">
        <BedDouble className="w-6 h-6 text-white mr-3" />
        <CustomDropdown
          options={roomOptions}
          selected={rooms}
          setSelected={setRooms}
          placeholder="Rooms"
        />
      </div>

      {/* Search Button */}
      <button className="
        px-8 py-4 
        rounded-2xl 
        bg-white/20 text-white 
        font-bold 
        shadow-lg 
        backdrop-blur-md
        hover:bg-white/40 
        hover:shadow-2xl 
        hover:scale-105 
        transition-all duration-300
      ">
        Search
      </button>

    </div>
  );
}

export default SearchBar;
