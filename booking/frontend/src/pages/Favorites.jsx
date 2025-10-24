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
  { id: 1, hotelName: "Venus Hotel", location: "Prishtina, Kosovo", price: "$120 / night", image: prishtinaImage },
  { id: 2, hotelName: "Brezovica Hotel", location: "Brezovica, Kosovo", price: "$170 / night", image: brezovicaImage },
  { id: 3, hotelName: "Villa 16", location: "Dhermi, Albania", price: "$350 / night", image: dhermiImage },
  { id: 4, hotelName: "Marriott Hotel", location: "Tirana, Albania", price: "$211 / night", image: tiranaImage },
  { id: 5, hotelName: "GO Villas", location: "Brezovica, Kosovo", price: "$200 / night", image: brezovica2Image },
  { id: 6, hotelName: "Liss Villas", location: "Peje, Kosovo", price: "$70 / night", image: pejaImage },
  { id: 7, hotelName: "Prishtina City Apartaments", location: "Prishtina, Kosovo", price: "$55 / night", image: prishtina2Image },
  { id: 8, hotelName: "Hotel Platnium", location: "Dhermi, Albania", price: "$94 / night", image: dhermi2Image },
  { id: 9, hotelName: "Luxe Apartments", location: "Tirana, Albania", price: "$100 / night", image: tirana2Image },
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
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favoriteHotels.map((deal) => (
          <div key={deal.id} className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
            <img src={deal.image} alt={deal.hotelName} className="w-full h-48 object-cover" />

            <button
              onClick={() => toggleFavorite(deal.id)}
              className="absolute top-3 right-3 bg-white p-1 rounded-full hover:scale-110 transition"
            >
              <Heart
                className={`w-5 h-5 ${favorites.includes(deal.id)
                    ? "text-red-800 fill-red-700"
                    : "text-gray-500"
                  }`}
              />
            </button>

            <div className="p-4">
              <h2 className="font-semibold text-lg">{deal.hotelName}</h2>
             <p className="flex items-center text-gray-500 text-sm mt-1">
                  <svg className="w-4 h-4 mr-1 text-red-800" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2C6.13 2 3 5.13 3 9c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7z" />
                  </svg>
                  {deal.location}
                </p>
              <p className="text-gray-900 font-bold mt-2">{deal.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
