import React, { useState } from "react";
import { CalendarDays, User, BedDouble, ChevronDown, MapPin } from "lucide-react";
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
        className="w-full flex justify-between items-center bg-transparent text-white outline-none font-medium"
      >
        {selected || placeholder}
        <ChevronDown className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-1 w-full bg-white/10 backdrop-blur-md rounded-xl text-white shadow-lg z-[1000] max-h-52 overflow-y-auto border border-white/20">
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
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const destinations = ["Prishtina", "Tirana", "Brezovicë", "Dhërmi", "Ksamil", "Pejë", "Sarandë", "Prizren", "Himarë"];

  const increment = (setter, value, max = 15) => setter(value < max ? value + 1 : value);
  const decrement = (setter, value, min = 1) => setter(value > min ? value - 1 : value);

  const handleSearch = () => {
    if (!destination) { setError("Please select a destination."); return; }
    if (!startDate || !endDate) { setError("Please select check-in and check-out dates."); return; }
    if (new Date(endDate) < new Date(startDate)) { setError("Please select a valid check-out date."); return; }
    if (guests < 1) { setError("Add at least 1 guest."); return; }
    if (rooms < 1) { setError("Add at least 1 room."); return; }

    setError("");

    // Dërgo URL me query params në HotelsPage
    const query = new URLSearchParams({
      destination,
      guests,
      rooms,
      startDate,
      endDate,
    }).toString();

    navigate(`/hotels?${query}`);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl flex flex-col md:flex-row items-center md:items-stretch shadow-lg w-full max-w-6xl mx-auto p-2 md:p-0 gap-2 md:gap-0 transform hover:scale-105 transition-transform duration-300">

      {/* Destination */}
      <div className="flex items-center px-3 md:px-8 py-3 flex-1 w-full md:w-auto border-b md:border-b-0 md:border-r border-white/30 hover:bg-white/20 transition-colors duration-300 cursor-pointer rounded-2xl shadow-lg mb-2 md:mb-0">
        <MapPin className="w-5 md:w-6 h-5 md:h-6 text-white mr-2 md:mr-4" />
        <CustomDropdown
          options={destinations}
          selected={destination}
          setSelected={setDestination}
          placeholder="Where are you going?"
        />
      </div>

      {/* Date Picker */}
      <div className="flex items-center px-3 md:px-5 py-3 flex-1 w-full md:w-auto border-b md:border-b-0 md:border-r border-white/30 rounded-2xl hover:bg-white/20 transition-colors duration-300 cursor-pointer mb-2 md:mb-0">
        <CalendarDays className="w-5 md:w-6 h-5 md:h-6 text-white mr-2 md:mr-3" />
        <div className="flex gap-1 md:gap-2 w-full flex-wrap md:flex-nowrap">
          <input
            type="date"
            className="w-full md:w-auto outline-none text-white bg-transparent font-medium appearance-none focus:ring-2 focus:ring-white/40 rounded-2xl text-sm md:text-base"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={today}
          />
          <span className="text-white hidden md:inline">—</span>
          <input
            type="date"
            className="w-full md:w-auto outline-none text-white bg-transparent font-medium appearance-none focus:ring-2 focus:ring-white/40 rounded-2xl text-sm md:text-base"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
          />
        </div>
      </div>

      {/* Guests */}
      <div className="flex items-center px-3 md:px-5 py-3 border-b md:border-b-0 md:border-r border-white/30 rounded-2xl hover:bg-white/20 transition-colors duration-300 cursor-pointer justify-between w-full md:w-auto mb-2 md:mb-0">
        <User className="w-5 md:w-6 h-5 md:h-6 text-white mr-2 md:mr-3" />
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={() => decrement(setGuests, guests)}
            className="px-2 py-1 bg-white/20 rounded-full text-sm md:text-base"
          >
            -
          </button>
          <span className="text-white text-sm md:text-base">
            {guests} {guests === 1 ? "Guest" : "Guests"}
          </span>
          <button
            onClick={() => increment(setGuests, guests, 15)} // MAX 15
            className="px-2 py-1 bg-white/20 rounded-full text-sm md:text-base"
          >
            +
          </button>
        </div>
      </div>

      {/* Rooms */}
      <div className="flex items-center px-3 md:px-5 py-3 hover:bg-white/20 transition-colors duration-300 cursor-pointer rounded-2xl justify-between w-full md:w-auto mb-2 md:mb-0">
        <BedDouble className="w-5 md:w-6 h-5 md:h-6 text-white mr-2 md:mr-3" />
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={() => decrement(setRooms, rooms)}
            className="px-2 py-1 bg-white/20 rounded-full text-sm md:text-base"
          >
            -
          </button>
          <span className="text-white text-sm md:text-base">
            {rooms} {rooms === 1 ? "Room" : "Rooms"}
          </span>
          <button
            onClick={() => increment(setRooms, rooms, 6)} // MAX 6
            className="px-2 py-1 bg-white/20 rounded-full text-sm md:text-base"
          >
            +
          </button>
        </div>
      </div>

      {/* Search Button */}
      <div className="w-full md:w-auto flex justify-center md:justify-end mt-2 md:mt-0 px-0">
        <button
          onClick={handleSearch}
          className="min-w-[140px] md:min-w-[160px] px-6 py-4 md:px-8 md:py-7 rounded-2xl bg-white/20 text-white font-bold text-base md:text-lg shadow-lg backdrop-blur-md hover:bg-white/40 hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          Search
        </button>
        {error && <p className="text-red-500 ml-2">{error}</p>}
      </div>

    </div>
  );
}

export default SearchBar;
