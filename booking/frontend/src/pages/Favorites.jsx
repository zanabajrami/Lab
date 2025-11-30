import { useState } from "react";
import { Heart, Users, BedDouble, HandCoins } from "lucide-react";
import { hotels } from "../data/HotelsData";
import HotelCalendar from "../components/HotelCalendar";

function Favorites({ favorites, setFavorites }) {
  const [expandedIds, setExpandedIds] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const handleConfirmDates = () => {
    if (!checkInDate) return alert("Please choose a check-in date.");
    if (!checkOutDate) return alert("Please choose a check-out date.");

    alert(`You selected: ${checkInDate.toDateString()} → ${checkOutDate.toDateString()}`);

    // Reset calendar selections
    setCheckInDate(null);
    setCheckOutDate(null);
    setShowCalendar(false);
  };

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
    <div className="min-h-screen py-10 ">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800 uppercase">
          Your Favorites
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {favoriteHotels.map((hotel) => {
            const isExpanded = expandedIds.includes(hotel.id);
            return (
              <div
                key={hotel.id}
                onClick={() => toggleExpand(hotel.id)}
                className="relative rounded-3xl overflow-hidden bg-white/60 backdrop-blur-xl border border-gray-300 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div className="relative h-48 w-full">
                  <img
                    src={hotel.images[0]}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-black/50 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    ⭐ {hotel.rating || "N/A"}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(hotel.id);
                    }}
                    className="absolute top-3 right-3 bg-white/30 p-2 rounded-full hover:scale-110 transition"
                  >
                    <Heart
                      className={`w-5 h-5 ${favorites.includes(hotel.id) ? "text-pink-600 fill-pink-500" : "text-gray-700"
                        }`}
                    />
                  </button>
                </div>

                <div className="p-5 text-gray-700">
                  <h2 className="font-semibold text-xl">{hotel.name}</h2>
                  <p className="text-sm text-gray-600">{hotel.location}</p>

                  <div className="flex justify-between text-sm text-gray-600 mt-3">
                    <span className="flex items-center gap-1">
                      <BedDouble className="w-4 h-4" />
                      {hotel.rooms === 1 ? "1 room" : `${hotel.rooms} rooms`}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {hotel.capacity} {hotel.capacity === 1 ? "guest" : "guests"}
                    </span>
                  </div>

                  <p className="text-gray-600 font-bold mt-2 flex items-center gap-1">
                    <HandCoins className="w-4 h-4" /> {hotel.price}€ / {hotel.nights ? `${hotel.nights} nights` : "night"}
                  </p>

                  {isExpanded && (
                    <div className="mt-3 text-gray-800 text-sm transition-all duration-300">
                      <p className="mb-2">{hotel.description}</p>
                      {hotel.amenities.length > 0 && (
                        <p className="text-gray-700">
                          {hotel.amenities.map((a, i) => (
                            <span
                              key={i}
                              className="bg-indigo-100 text-indigo-700 px-3 py-1 text-sm rounded-full inline-block mr-2 mb-1 last:mr-0"
                            >
                              {a}
                            </span>
                          ))}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Butoni More / Less */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // mos me trigger card click
                      toggleExpand(hotel.id);
                    }}
                    className="mt-3 w-full py-2 rounded-2xl bg-gray-400/40 border border-gray-400 
    text-gray-900 font-semibold shadow-lg hover:bg-indigo-900 hover:text-indigo-300 
    hover:transition-colors"
                  >
                    {isExpanded ? "Less" : "More"}
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
