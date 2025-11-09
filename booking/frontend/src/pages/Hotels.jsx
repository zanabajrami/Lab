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
    description: "Hotel modern me spa, pishinë të brendshme dhe restorant luksoz me pamje panoramike të qytetit.",
    rooms: 1,
    capacity: 2,
    price: 130,
  },
  {
    name: "Swiss Diamond Hotel Prishtina",
    location: "Prishtina",
    rating: 4.9,
    image: hotel2,
    description: "Një hotel 5-yje me spa, hamam, restorante ndërkombëtare dhe dhoma elegante në qendër të qytetit.",
    rooms: 2,
    capacity: 4,
    price: 160,
  },
  {
    name: "Hotel Sirius",
    location: "Prishtina",
    rating: 4.7,
    image: hotel3,
    description: "Ofron ambiente moderne, bar rooftop me pamje të mahnitshme dhe kuzhinë bashkëkohore.",
    rooms: 1,
    capacity: 2,
    price: 110,
  },
  {
    name: "Hotel Garden",
    location: "Prishtina",
    rating: 4.6,
    image: hotel4,
    description: "Hotel i qetë me kopshte të bukura, ambient relaksues dhe restorant tradicional kosovar.",
    rooms: 1,
    capacity: 2,
    price: 90,
  },
  {
    name: "Hotel Nartel",
    location: "Prishtina",
    rating: 4.5,
    image: hotel5,
    description: "Ideal për udhëtarë biznesi, me sallë takimesh moderne dhe parkim falas.",
    rooms: 1,
    capacity: 2,
    price: 85,
  },
  {
    name: "Brezovicë Hotel",
    location: "Brezovicë",
    rating: 4.6,
    image: hotel6,
    description: "Hotel malor pranë pistave të skijimit me sauna, spa dhe dhoma me pamje fantastike.",
    rooms: 1,
    capacity: 2,
    price: 120,
  },
  {
    name: "Hotel Molika",
    location: "Brezovicë",
    rating: 4.7,
    image: hotel7,
    description: "Hotel komod me stil alpin, shumë afër teleferikut, i përshtatshëm për çifte dhe familje.",
    rooms: 1,
    capacity: 3,
    price: 115,
  },
  {
    name: "Snow White Chalet",
    location: "Brezovicë",
    rating: 4.5,
    image: hotel9,
    description: "Chalet prej druri në zemër të maleve, perfekt për pushime dimërore private.",
    rooms: 2,
    capacity: 4,
    price: 160,
  },
  {
    name: "Mont Chalet",
    location: "Brezovicë",
    rating: 4.8,
    image: hotel10,
    description: "Luks alpin me pishinë të brendshme, sauna dhe pamje të mahnitshme të Sharrit.",
    rooms: 2,
    capacity: 4,
    price: 150,
  },
  {
    name: "Hotel Sharri",
    location: "Brezovicë",
    rating: 4.9,
    image: hotel8,
    description: "Një resort ekskluziv në natyrë me spa, restorante gourmet dhe suita luksoze.",
    rooms: 1,
    capacity:2 ,
    price: 175,
  },
  {
    name: "Hotel Butrinti",
    location: "Sarandë",
    rating: 4.8,
    image: hotel11,
    description: "Hotel i njohur buzë detit me pamje fantastike, pishinë dhe restorant mesdhetar.",
    rooms: 1,
    capacity: 2,
    price: 140,
  },
  {
    name: "Bougainville Bay Hotel",
    location: "Sarandë",
    rating: 4.6,
    image: hotel12,
    description: "Kompleks luksoz me plazh privat, 5 pishina dhe dhoma me dizajn artistik.",
    rooms: 1,
    capacity: 3,
    price: 155,
  },
  {
    name: "Saranda Palace Hotel",
    location: "Sarandë",
    rating: 4.9,
    image: hotel13,
    description: "Hotel i qetë me plazh privat, bar panoramik dhe dhoma me ballkon detar.",
    rooms: 1,
    capacity: 2,
    price: 135,
  },
  {
    name: "Hotel Emblem",
    location: "Sarandë",
    rating: 4.5,
    image: hotel14,
    description: "Ambiente elegante, afër qendrës dhe portit të Sarandës, me shërbim cilësor.",
    rooms: 1,
    capacity: 2,
    price: 100,
  },
  {
    name: "Prado Luxury Hotel",
    location: "Himarë",
    rating: 4.9,
    image: hotel15,
    description: "Hotel modern buzë detit me restorant gourmet dhe dhoma me pamje të Jonit.",
    rooms: 1,
    capacity: 2,
    price: 150,
  },
  {
    name: "Hotel Rea Boutique",
    location: "Himarë",
    rating: 4.8,
    image: hotel16,
    description: "Një butik i ngrohtë me arkitekturë elegante, për çifte që duan privatësi dhe qetësi.",
    rooms: 1,
    capacity: 2,
    price: 120,
  },
  {
    name: "Panorama Hotel",
    location: "Himarë",
    rating: 4.7,
    image: hotel17,
    description: "Me pamje panoramike të detit, pishinë të hapur dhe atmosferë relaksuese.",
    rooms: 1,
    capacity: 2,
    price: 110,
  },
  {
    name: "Sea View Hotel Himara",
    location: "Himarë",
    rating: 4.6,
    image: hotel18,
    description: "Hotel i ri me dizajn modern dhe ballkone me pamje të mrekullueshme.",
    rooms: 1,
    capacity: 2,
    price: 100,
  },
  {
    name: "Dimitri Hotel",
    location: "Himarë",
    rating: 4.8,
    image: hotel19,
    description: "Hotel familjar me mikpritje tradicionale dhe mëngjes vendas shumë të shijshëm.",
    rooms: 1,
    capacity: 2,
    price: 95,
  },
];

export default function HotelsPage() {
  const [showTopButton, setShowTopButton] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-4xl font-bold text-gray-800 mb-4">
          Hotels
        </h1>
      </div>

      {/* Hotels Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="relative rounded-3xl overflow-hidden bg-white/60 backdrop-blur-xl border border-gray-300 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            {/* Image */}
            <div className="relative h-48 w-full">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 bg-black/50 text-white text-xs font-semibold px-3 py-1 rounded-full">
                ⭐ {hotel.rating}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 text-gray-700">
              <h2 className="font-semibold text-xl">{hotel.name}</h2>
              <p className="text-sm text-gray-600">{hotel.location}</p>
              <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                {hotel.description}
              </p>

              {/* Info Row */}
              <div className="flex justify-between text-sm text-gray-600 mt-3">
                <span>🛏️ {hotel.rooms} dhoma</span>
                <span>👥 {hotel.capacity} persona</span>
              </div>

              <p className="text-indigo-600 font-bold mt-2">
                💶 {hotel.price}€ / nata
              </p>

              {/* View Hotel (tekst klikues) */}
              <p
                onClick={() => setSelectedHotel(hotel)}
                className="mt-3 text-indigo-600 font-semibold cursor-pointer hover:underline"
              >
                View Hotel →
              </p>

              <button className="mt-3 w-full py-2 rounded-2xl bg-gray-400/40 border border-gray-400 text-gray-800 font-semibold shadow-lg hover:bg-indigo-600 hover:text-white transition-colors">
                Book
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedHotel(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>
            <img
              src={selectedHotel.image}
              alt={selectedHotel.name}
              className="w-full h-56 object-cover rounded-2xl mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedHotel.name}
            </h2>
            <p className="text-gray-600 mb-1">{selectedHotel.location}</p>
            <p className="text-yellow-500 mb-2">
              {"★".repeat(Math.round(selectedHotel.rating))}{" "}
              <span className="text-gray-500 text-sm">
                ({selectedHotel.rating})
              </span>
            </p>
            <p className="text-gray-700 mb-3">{selectedHotel.description}</p>
            <p className="text-gray-800 font-medium">
              {selectedHotel.rooms} dhoma — {selectedHotel.capacity} persona
            </p>
            <p className="text-indigo-600 font-semibold mt-2">
              💶 {selectedHotel.price}€ / nata
            </p>
          </div>
        </div>
      )}

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
