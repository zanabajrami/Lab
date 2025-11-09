import React, { useState, useEffect } from "react";

import hotel1 from "../images/hotel1.jpg";
import hotel2 from "../images/hotel2.jpg";
import hotel3 from "../images/hotel3.jpg";
import hotel4 from "../images/hotel4.jpg";

const hotels = [
  {
    name: "Hotel Grand Prishtina",
    location: "Prishtina",
    rating: 4.8,
    image: hotel1,
  },
  {
    name: "Brezovicë Resort",
    location: "Brezovicë",
    rating: 4.6,
    image: hotel2,
  },
  {
    name: "Sarandë Beach Hotel",
    location: "Sarandë",
    rating: 4.7,
    image: hotel3,
  },
  {
    name: "Himara Boutique Hotel",
    location: "Himarë",
    rating: 4.9,
    image: hotel4,
  },
];

export default function HotelsPage() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowTopButton(true);
      else setShowTopButton(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Hotelet më të Mira
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Zbulo hotelet më të bukura dhe luksoze për pushimet e tua.
        </p>
      </div>

      {/* Hotels Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {hotel.name}
              </h3>
              <p className="text-gray-500 mb-2">{hotel.location}</p>
              <p className="text-yellow-500 font-medium">
                {"★".repeat(Math.round(hotel.rating))}{" "}
                <span className="text-gray-400 text-sm">({hotel.rating})</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-opacity duration-300 z-50 ${
          showTopButton ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        ▲
      </button>
    </div>
  );
}
