import { useState } from "react";
import { Heart, Users, BedDouble, MapPin, Star } from "lucide-react";
import { hotels } from "../data/HotelsData";

function Favorites({ favorites, setFavorites }) {
  const [expandedIds, setExpandedIds] = useState([]);

  const favoriteHotels = hotels.filter((h) => favorites.includes(h.id));

  const toggleFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav !== id));
  };

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  if (favoriteHotels.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
          <Heart className="w-10 h-10 text-slate-200" />
        </div>
        <p className="text-center text-slate-400 font-medium text-lg italic">
          Your favorites list is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-700 to-gray-400 drop-shadow-lg tracking-wide uppercase">
          Your Favorites
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favoriteHotels.map((hotel) => {
            const isExpanded = expandedIds.includes(hotel.id);
            return (
              <div
                key={hotel.id}
                className="group relative flex flex-col mx-auto w-full max-w-[320px] rounded-[2.5rem] bg-white border border-gray-100 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image Section */}
                <div className="relative h-64 w-full p-2 overflow-hidden">
                  <div className="relative h-full w-full overflow-hidden rounded-[2rem] transform-gpu">
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <span className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                      <Star size={12} className="fill-white text-white" /> {hotel.rating}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(hotel.id);
                      }}
                      className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2.5 rounded-full hover:bg-white/40 transition-all shadow-lg"
                    >
                      <Heart className="w-4 h-4 text-pink-600 fill-pink-500" />
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="px-6 pb-8 pt-4 flex flex-col gap-4">
                  <div>
                    <h2 className="font-bold text-xl text-slate-900 leading-tight">
                      {hotel.name}
                    </h2>
                    <p className="text-[14px] text-gray-500 flex items-center gap-1.5 mt-2 font-medium">
                      <MapPin size={14} className="text-slate-500" /> {hotel.location}
                    </p>
                  </div>

                  {/* Info Badges */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                      <BedDouble size={14} className="text-slate-500" />
                      <span className="text-[11px] font-bold text-slate-700 uppercase">{hotel.rooms} Room</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                      <Users size={14} className="text-slate-500" />
                      <span className="text-[11px] font-bold text-slate-700 uppercase">{hotel.capacity} Guests</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 pt-2 border-t border-slate-50">
                    <span className="text-2xl font-black text-slate-900">${hotel.price}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">/ night</span>
                  </div>

                  {/* Expanded Text Section */}
                  {isExpanded && (
                    <div className="mt-2 space-y-4 animate-fadeIn">
                      <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                        <p className="text-[13px] leading-relaxed text-slate-700 font-medium italic">
                          "{hotel.description}"
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {hotel.amenities?.map((a, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1.5 bg-white border border-slate-200 text-[10px] font-black text-slate-600 rounded-lg uppercase tracking-tight shadow-sm"
                          >
                            • {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Show More / Less Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(hotel.id);
                    }}
                    className={`mt-2 w-full py-4 rounded-2xl font-black text-[12px] uppercase tracking-[0.15em] transition-all duration-300 shadow-sm ${isExpanded
                      ? "bg-slate-900 text-white shadow-slate-200"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-900 hover:text-white hover:shadow-xl"
                      }`}
                  >
                    {isExpanded ? "Show Less" : "Show More"}
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