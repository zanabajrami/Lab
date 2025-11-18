import { useState } from "react";
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
  { id: 1, hotelName: "Venus Hotel", location: "Prishtina, Kosovo", price: "$120 / night", image: prishtinaImage, discount: "20% Off", description: "Comfortable hotel in city center, free Wi-Fi, breakfast included." },
  { id: 2, hotelName: "Brezovica Hotel", location: "Brezovica, Kosovo", price: "$170 / night", image: brezovicaImage, discount: "15% Off", description: "Mountain view hotel, ski access, spa & wellness." },
  { id: 3, hotelName: "Villa 16", location: "Dhermi, Albania", price: "$350 / night", image: dhermiImage, discount: "15% Off", description: "Luxury villa with private pool, beach access, full kitchen." },
  { id: 4, hotelName: "Marriott Hotel", location: "Tirana, Albania", price: "$211 / night", image: tiranaImage, discount: "20% Off", description: "Modern hotel with city center location and rooftop bar." },
  { id: 5, hotelName: "GO Villas", location: "Brezovica, Kosovo", price: "$200 / night", image: brezovica2Image, discount: "15% Off", description: "Cozy villas perfect for families and groups." },
  { id: 6, hotelName: "Liss Villas", location: "Peje, Kosovo", price: "$70 / night", image: pejaImage, discount: "10% Off", description: "Budget friendly villas with mountain view." },
  { id: 7, hotelName: "Prishtina City Apartaments", location: "Prishtina, Kosovo", price: "$55 / night", image: prishtina2Image, discount: "30% Off", description: "City apartments close to main attractions." },
  { id: 8, hotelName: "Hotel Platnium", location: "Dhermi, Albania", price: "$94 / night", image: dhermi2Image, discount: "15% Off", description: "Comfortable hotel near the beach with pool." },
  { id: 9, hotelName: "Luxe Apartments", location: "Tirana, Albania", price: "$100 / night", image: tirana2Image, discount: "10% Off", description: "Modern apartments in central Tirana." },
];

function Favorites({ favorites, setFavorites }) {
  const favoriteHotels = dealsData.filter((deal) => favorites.includes(deal.id));
  const [expandedIds, setExpandedIds] = useState([]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fav) => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const toggleExpand = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((e) => e !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
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
          {favoriteHotels.map((deal) => {
            const isExpanded = expandedIds.includes(deal.id);

            return (
              <div
                key={deal.id}
                onClick={() => toggleExpand(deal.id)}
                className="relative rounded-3xl overflow-hidden cursor-pointer
                  bg-white/20 backdrop-blur-xl border border-gray-500
                  shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="relative h-48 w-full">
                  <img src={deal.image} alt={deal.hotelName} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/10"></div>

                  {deal.discount && (
                    <span className="absolute top-3 left-3 bg-black/30 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {deal.discount}
                    </span>
                  )}

                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(deal.id); }}
                    className="absolute top-3 right-3 bg-white/30 p-2 rounded-full hover:scale-110 transition"
                  >
                    <Heart
                      className={`w-5 h-5 ${favorites.includes(deal.id) ? "text-pink-600 fill-pink-500" : "text-gray-700"}`}
                    />
                  </button>
                </div>

                <div className="p-5 text-gray-700">
                  <h2 className="font-semibold text-xl">{deal.hotelName}</h2>
                  <p className="text-sm text-gray-600 mt-1">{deal.location}</p>
                  <p className="text-gray-900 font-bold mt-2">{deal.price}</p>

                  {isExpanded && (
                    <div className="mt-3 text-gray-800 text-sm overflow-hidden">
                      <p>{deal.description}</p>
                      <ul className="mt-2 list-disc list-inside text-gray-800">
                        <li>Free Wi-Fi</li>
                        <li>Breakfast Included</li>
                        <li>Pool & Spa</li>
                        <li>Parking Available</li>
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="mt-4 w-full py-2 rounded-2xl bg-gray-400/40 border border-gray-400 text-gray-900 font-semibold shadow-lg hover:bg-indigo-900 hover:text-indigo-300 transition-colors"
                  >
                    Book
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
