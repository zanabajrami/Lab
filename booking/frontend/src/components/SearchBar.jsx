import React, { useState, useRef, useEffect } from "react";
import { CalendarDays, User, BedDouble, ChevronDown } from "lucide-react";
import "../components/Datepicker.css";

function CustomDropdown({ options, selected, setSelected, placeholder, allowInput }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(selected || "");
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setInputValue(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={ref}>
      {allowInput ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSelected(e.target.value);
          }}
          onClick={() => setIsOpen(!isOpen)}
          placeholder={placeholder}
          className="w-full bg-transparent text-white outline-none font-medium cursor-pointer"
        />
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center bg-transparent text-white outline-none font-medium"
        >
          {selected || placeholder}
          <ChevronDown className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
      )}

      {isOpen && (
        <ul className="absolute left-0 mt-1 w-max min-w-full bg-white/10 backdrop-blur-md rounded-xl text-white shadow-lg z-[1000] max-h-52 overflow-y-auto border border-white/20">
          {options.map((option, i) => (
            <li
              key={i}
              onClick={() => handleSelect(option)}
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

function SearchBar() {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [error, setError] = useState(""); // për mesazhin e gabimit

  const destinations = ["Prishtina", "Tirana", "Brezovica", "Dhërmi", "Ksamil", "Pejë", "Sarandë", "Prizren", "Himarë", "Korçë"];

  const increment = (setter, value, max = 10) => setter(value < max ? value + 1 : value);
  const decrement = (setter, value, min = 1) => setter(value > min ? value - 1 : value);

  const handleSearch = () => {
    if (!destination) {
      setError("Please select a destination.");
      return;
    }
    if (!startDate || !endDate) {
      setError("Please select check-in and check-out dates.");
      return;
    }
    if (guests < 1) {
      setError("Please add at least 1 guest.");
      return;
    }
    if (rooms < 1) {
      setError("Please add at least 1 room.");
      return;
    }

    setError(""); // gjithçka është plotësuar
    console.log({ destination, startDate, endDate, guests, rooms });
    // këtu mund të bësh redirect ose API call
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl flex flex-wrap md:flex-nowrap items-center shadow-lg w-full max-w-6xl mx-auto transform hover:scale-105 transition-transform duration-300">

      {/* Destination */}
      <div className="flex items-center px-8 py-7 flex-1 border-r border-white/30 hover:bg-white/20 transition-colors duration-300 cursor-pointer rounded-2xl shadow-lg">
        <BedDouble className="w-6 h-6 text-white mr-4" />
        <CustomDropdown
          options={destinations}
          selected={destination}
          setSelected={setDestination}
          placeholder="Where are you going?"
          allowInput={false}
        />
      </div>

      {/* Date Picker */}
      <div className="flex items-center px-5 py-7 flex-1 border-r border-white/30 rounded-2xl hover:bg-white/20 transition-colors duration-300 cursor-pointer">
        <CalendarDays className="w-6 h-6 text-white mr-3" />
        <div className="flex gap-2 w-full">
          <input
            type="date"
            className="w-full outline-none text-white bg-transparent font-medium appearance-none focus:ring-2 focus:ring-white/40 rounded-2xl"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={today}
          />
          <span className="text-white">—</span>
          <input
            type="date"
            className="w-full outline-none text-white bg-transparent font-medium appearance-none focus:ring-2 focus:ring-white/40 rounded-2xl"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
          />
        </div>
      </div>

      {/* Guests */}
      <div className="flex items-center px-5 py-6 border-r border-white/30 rounded-2xl hover:bg-white/20 transition-colors duration-300 cursor-pointer">
        <User className="w-6 h-6 text-white mr-3" />
        <div className="flex items-center gap-2">
          <button onClick={() => decrement(setGuests, guests)} className="px-2 py-1 bg-white/20 rounded-full">-</button>
          <span className="text-white">{guests} Guests</span>
          <button onClick={() => increment(setGuests, guests)} className="px-2 py-1 bg-white/20 rounded-full">+</button>
        </div>
      </div>

      {/* Rooms */}
      <div className="flex items-center px-5 py-6 hover:bg-white/20 transition-colors duration-300 cursor-pointer rounded-2xl">
        <BedDouble className="w-6 h-6 text-white mr-3" />
        <div className="flex items-center gap-2">
          <button onClick={() => decrement(setRooms, rooms)} className="px-2 py-1 bg-white/20 rounded-full">-</button>
          <span className="text-white">{rooms} Rooms</span>
          <button onClick={() => increment(setRooms, rooms)} className="px-2 py-1 bg-white/20 rounded-full">+</button>
        </div>
      </div>

      {/* Search Button */}
      <div className="relative w-35">
        <button
          onClick={handleSearch}
          className="w-full px-8 py-7 rounded-2xl bg-white/20 text-white font-bold text-lg shadow-lg backdrop-blur-md hover:bg-white/40 hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          Search
        </button>
        {error && (
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-red-400 text-xs whitespace-nowrap">
            {error}
          </span>
        )}
      </div>

    </div>
  );
}

export default SearchBar;
