import React, { useState } from "react";
import { CalendarDays, User, BedDouble, ChevronDown, MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CustomDropdown({ options, selected, setSelected, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-transparent text-white outline-none font-medium py-1"
      >
        <span className="truncate">{selected || placeholder}</span>
        <ChevronDown className={`ml-2 w-4 h-4 transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close dropdown when clicking outside */}
          <div className="fixed inset-0 z-[90]" onClick={() => setIsOpen(false)} />
          <ul className="absolute left-0 mt-2 w-full bg-slate-800/95 backdrop-blur-xl rounded-2xl text-white shadow-2xl z-[100] max-h-60 overflow-y-auto border border-white/20 p-2">
            {options.map((option, i) => (
              <li
                key={i}
                onClick={() => handleSelect(option)}
                className="px-4 py-3 cursor-pointer hover:bg-white/10 transition-colors rounded-xl text-sm"
              >
                {option}
              </li>
            ))}
          </ul>
        </>
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
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const destinations = ["Prishtina", "Tirana", "Brezovica", "Dhermi", "Ksamil", "Peja", "Saranda", "Prizren", "Himara"];

  const increment = (setter, value, max = 15) => setter(value < max ? value + 1 : value);
  const decrement = (setter, value, min = 1) => setter(value > min ? value - 1 : value);

  const handleSearch = () => {
    if (!destination) { setError("Please select a destination"); return; }
    if (new Date(endDate) < new Date(startDate)) { setError("Check-out date is invalid"); return; }
    setError("");

    const query = new URLSearchParams({ destination, guests, rooms, startDate, endDate }).toString();
    navigate(`/hotels?${query}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-2 shadow-2xl">
        <div className="grid grid-cols-1 md:flex md:flex-row items-stretch gap-1">
          
          {/* Destination Section */}
          <div className="flex items-center gap-3 px-4 py-4 md:flex-[1.5] border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/5 transition-colors rounded-2xl md:rounded-none">
            <MapPin className="w-5 h-5 text-indigo-300 shrink-0" />
            <CustomDropdown
              options={destinations}
              selected={destination}
              setSelected={setDestination}
              placeholder="Where are you going?"
            />
          </div>

          {/* Dates Section */}
          <div className="flex items-center gap-3 px-4 py-4 md:flex-[2] border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/5 transition-colors">
            <CalendarDays className="w-5 h-5 text-indigo-300 shrink-0" />
            <div className="flex items-center gap-2 w-full justify-between md:justify-start">
              <input
                type="date"
                className="bg-transparent text-white text-sm outline-none w-full cursor-pointer invert-calendar"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={today}
              />
              <span className="text-white/40 text-xs uppercase font-bold px-1">To</span>
              <input
                type="date"
                className="bg-transparent text-white text-sm outline-none w-full cursor-pointer invert-calendar"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
              />
            </div>
          </div>

          {/* Guests & Rooms (Side-by-side on mobile) */}
          <div className="grid grid-cols-2 md:flex md:flex-row md:flex-[1.5]">
            {/* Guests */}
            <div className="flex items-center gap-2 px-4 py-4 border-r border-white/10 hover:bg-white/5 transition-colors">
              <User className="w-5 h-5 text-indigo-300 shrink-0" />
              <div className="flex items-center justify-between w-full">
                <button onClick={() => decrement(setGuests, guests)} className="w-6 h-6 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20">-</button>
                <span className="text-white text-sm font-medium mx-2">{guests}</span>
                <button onClick={() => increment(setGuests, guests)} className="w-6 h-6 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20">+</button>
              </div>
            </div>

            {/* Rooms */}
            <div className="flex items-center gap-2 px-4 py-4 hover:bg-white/5 transition-colors md:border-r border-white/10">
              <BedDouble className="w-5 h-5 text-indigo-300 shrink-0" />
              <div className="flex items-center justify-between w-full">
                <button onClick={() => decrement(setRooms, rooms)} className="w-6 h-6 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20">-</button>
                <span className="text-white text-sm font-medium mx-2">{rooms}</span>
                <button onClick={() => increment(setRooms, rooms)} className="w-6 h-6 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20">+</button>
              </div>
            </div>
          </div>

          {/* Search Button Section */}
          <div className="p-1 md:p-0 md:ml-2 shrink-0">
            <button
              onClick={handleSearch}
              className="w-full md:h-full px-8 py-4 md:py-0 bg-indigo-200 hover:bg-indigo-500 text-slate-800 font-bold rounded-2xl md:rounded-[1.5rem] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <p className="text-red-400 text-sm mt-3 text-center font-medium bg-red-400/10 py-2 rounded-xl border border-red-400/20">
          {error}
        </p>
      )}

      {/* Style to ensure the native date icon is visible on dark background */}
      <style dangerouslySetInnerHTML={{ __html: `
        .invert-calendar::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }
      `}} />
    </div>
  );
}

export default SearchBar;