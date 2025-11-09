import React, { useState, useEffect } from "react";

import hotel1 from "../images/prishtina4.jpg";
import hotel2 from "../images/prishtina5.jpg";
import hotel3 from "../images/prishtina6.jpg";
import hotel4 from "../images/prishtina7.webp";
import hotel5 from "../images/prishtina8.jpg";
import hotel6 from "../images/brezovica5.jpg";
import hotel7 from "../images/brezovica6.webp";
import hotel8 from "../images/brezovica7.jpg";
import hotel9 from "../images/brezovica8.jpg";
import hotel10 from "../images/brezovica9.avif";
import hotel11 from "../images/sarande4.jpg";
import hotel12 from "../images/sarande5.jpg";
import hotel13 from "../images/sarande6.webp";
import hotel14 from "../images/sarande7.jpg";
import hotel15 from "../images/himare3.jpg";
import hotel16 from "../images/himare4.jpg";
import hotel17 from "../images/himare5.jpg";
import hotel18 from "../images/himare6.jpg";
import hotel19 from "../images/himare7.webp";

const hotels = [
{
  name: "Four Points by Sheraton Prishtina",
  location: "Prishtina",
  rating: 4.8,
  image: hotel1,
},
{
  name: "Swiss Diamond Hotel Prishtina",
  location: "Prishtina",
  rating: 4.9,
  image: hotel2,
},
{
  name: "Hotel Sirius",
  location: "Prishtina",
  rating: 4.7,
  image: hotel3,
},
{
  name: "Hotel Garden",
  location: "Prishtina",
  rating: 4.6,
  image: hotel4,
},
{
  name: "Hotel Nartel",
  location: "Prishtina",
  rating: 4.5,
  image: hotel5,
},
{
  name: "Brezovicë Hotel",
  location: "Brezovicë",
  rating: 4.6,
  image: hotel6,
},
{
  name: "Hotel Molika",
  location: "Brezovicë",
  rating: 4.7,
  image: hotel7,
},
{
  name: "Snow White Chalet",
  location: "Brezovicë",
  rating: 4.5,
  image: hotel8,
},
{
  name: "Mont Chalet",
  location: "Brezovicë",
  rating: 4.8,
  image: hotel9,
},
{
  name: "Hotel Sharri",
  location: "Brezovicë",
  rating: 4.9,
  image: hotel10,
},
{
  name: "Hotel Butrinti",
  location: "Sarandë",
  rating: 4.8,
  image: hotel11,
},
{
  name: "Bougainville Bay Hotel",
  location: "Sarandë",
  rating: 4.6,
  image: hotel12,
},
{
  name: "Saranda Palace Hotel",
  location: "Sarandë",
  rating: 4.9,
  image: hotel13,
},
{
  name: "Hotel Emblem ",
  location: "Sarandë",
  rating: 4.5,
  image: hotel14,
},
{
  name: "Prado Luxury Hotel",
  location: "Himarë",
  rating: 4.9,
  image: hotel15,
},
{
  name: "Hotel Rea Boutique",
  location: "Himarë",
  rating: 4.8,
  image: hotel16,
},
{
  name: "Panorama Hotel",
  location: "Himarë",
  rating: 4.7,
  image: hotel17,
},
{
  name: "Sea View Hotel Himara",
  location: "Himarë",
  rating: 4.6,
  image: hotel18,
},
{
  name: "Dimitri Hotel",
  location: "Himarë",
  rating: 4.8,
  image: hotel19,
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
