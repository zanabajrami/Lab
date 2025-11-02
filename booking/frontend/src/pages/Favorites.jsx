import React from "react";
import { Heart } from "lucide-react";
import tiranaImage from "../images/tirana.jpg";
import prishtinaImage from "../images/prishtina.jpg";
import brezovicaImage from "../images/brezovica.jpg";
import dhermiImage from "../images/dhermi.jpg";
import brezovica2Image from "../images/brezovica2.webp";
import pejaImage from "../images/peja.webp";
import prishtina2Image from "../images/prishtina2.webp";
import dhermi2Image from "../images/dhermi2.webp";
import tirana2Image from "../images/tirana2.webp";

const dealsData = [
  { id: 1, hotelName: "Venus Hotel", location: "Prishtina, Kosovo", price: "$120 / night", image: prishtinaImage, discount: "20% Off" },
  { id: 2, hotelName: "Brezovica Hotel", location: "Brezovica, Kosovo", price: "$170 / night", image: brezovicaImage, discount: "15% Off" },
  { id: 3, hotelName: "Villa 16", location: "Dhermi, Albania", price: "$350 / night", image: dhermiImage, discount: "15% Off" },
  { id: 4, hotelName: "Marriott Hotel", location: "Tirana, Albania", price: "$211 / night", image: tiranaImage, discount: "20% Off" },
  { id: 5, hotelName: "GO Villas", location: "Brezovica, Kosovo", price: "$200 / night", image: brezovica2Image, discount: "15% Off" },
  { id: 6, hotelName: "Liss Villas", location: "Peje, Kosovo", price: "$70 / night", image: pejaImage, discount: "10% Off" },
  { id: 7, hotelName: "Prishtina City Apartaments", location: "Prishtina, Kosovo", price: "$55 / night", image: prishtina2Image, discount: "30% Off" },
  { id: 8, hotelName: "Hotel Platnium", location: "Dhermi, Albania", price: "$94 / night", image: dhermi2Image, discount: "15% Off" },
  { id: 9, hotelName: "Luxe Apartments", location: "Tirana, Albania", price: "$100 / night", image: tirana2Image, discount: "10% Off" },
];

function Favorites({ favorites, setFavorites }) {
  const favoriteHotels = dealsData.filter((deal) => favorites.includes(deal.id));

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fav) => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  if (favoriteHotels.length === 0) {
    return <p className="text-center mt-10 text-gray-600">You have no favorites yet!</p>;
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold mb-8 text-center 
        bg-clip-text text-transparent 
        bg-gradient-to-r from-gray-700 via-gray-700 to-gray-400 
        drop-shadow-lg tracking-wide uppercase">
          Your Favorites
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {favoriteHotels.map((deal) => (
            <div
              key={deal.id}
              className="relative backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl overflow-hidden 
              transition-transform transform hover:scale-105 hover:shadow-[0_0_25px_rgba(100,50,200,0.5)] duration-300"
            >
              <div className="relative">
                <img src={deal.image} alt={deal.hotelName} className="w-full h-48 object-cover opacity-90" />
                {deal.discount && (
                  <span className="absolute top-3 left-3 
                  bg-black/30 text-white text-xs font-semibold px-3 py-1 rounded-full 
                  border border-white/20 shadow-md">
                    {deal.discount}
                  </span>
                )}
                <button
                  onClick={() => toggleFavorite(deal.id)}
                  className="absolute top-3 right-3 bg-white/30 backdrop-blur-md p-2 rounded-full hover:scale-110 transition"
                >
                  <Heart
                    className={`w-5 h-5 ${favorites.includes(deal.id) ? "text-pink-600 fill-pink-500" : "text-gray-700"
                      }`}
                  />
                </button>
              </div>

              <div className="p-5 text-gray-700">
                <h2 className="font-semibold text-xl">{deal.hotelName}</h2>
                <p className="flex items-center text-gray-600 text-sm mt-1">
                  <svg className="w-4 h-4 mr-1 text-indigo-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2C6.13 2 3 5.13 3 9c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7z" />
                  </svg>
                  {deal.location}
                </p>
                <p className="text-gray-900 font-bold mt-2">{deal.price}</p>
                <button
                  className="mt-4 w-full py-2 rounded-2xl 
                  bg-gradient-to-r from-indigo-900 via-indigo-700 to-indigo-900 
                  text-gray-300 font-semibold 
                  shadow-lg shadow-gray-800/50 
                  hover:bg-gradient-to-r hover:from-indigo-600 hover:via-indigo-400 hover:to-indigo-600 
                  hover:text-indigo-800 hover:shadow-xl hover:shadow-gray-600/50 
                  transition-all duration-300 transform hover:-translate-y-1 active:scale-95 border border-black/20"
                >
                  Explore More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
