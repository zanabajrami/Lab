import { useState } from "react";
import { Heart } from "lucide-react";
import { hotels } from "./Hotels";

function Favorites({ favorites, setFavorites }) {
  const [expandedIds, setExpandedIds] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const updated = prev.includes(id)
        ? prev.filter(fav => fav !== id)
        : [...prev, id];
      return [...new Set(updated)]; // siguron ID unike
    });
  };

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const favoriteHotels = hotels.filter((h) => favorites.includes(h.id));

  if (favoriteHotels.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-600">
        You have no favorites yet!
      </p>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800 uppercase">
          Your Favorites
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {favoriteHotels.map((hotel) => {
            const isExpanded = expandedIds.includes(hotel.id);
            return (
              <div
                key={hotel.id}
                onClick={() => toggleExpand(hotel.id)}
                className="relative rounded-3xl overflow-hidden cursor-pointer bg-white/60 backdrop-blur-xl border border-gray-300 shadow-lg hover:shadow-xl transition transform hover:scale-105"
              >
                <div className="relative h-48 w-full">
                  <img
                    src={hotel.images[0]}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(hotel.id);
                    }}
                    className="absolute top-3 right-3 bg-white/30 p-2 rounded-full hover:scale-110 transition"
                  >
                    <Heart
                      className={`w-5 h-5 ${favorites.includes(hotel.id)
                          ? "text-pink-600 fill-pink-500"
                          : "text-gray-700"
                        }`}
                    />
                  </button>
                </div>

                <div className="p-5 text-gray-700">
                  <h2 className="font-semibold text-xl">{hotel.name}</h2>
                  <p className="text-sm text-gray-600">{hotel.location}</p>
                  <p className="text-gray-600 font-bold mt-2">
                    {hotel.price}€ / night
                  </p>

                  {isExpanded && (
                    <div className="mt-3 text-gray-800 text-sm">
                      <p>{hotel.description}</p>
                      <ul className="mt-2 list-disc list-inside text-gray-800">
                        {hotel.amenities.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
