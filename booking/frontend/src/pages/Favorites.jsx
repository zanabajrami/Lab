import { useState, useEffect } from "react";
import { Heart, Users, BedDouble, MapPin, Star } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";

function Favorites({ favorites, setFavorites }) {
  const [expandedIds, setExpandedIds] = useState([]);
  const [showTopButton, setShowTopButton] = useState(false);
  const [hotels, setHotels] = useState([]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const favoriteHotels = hotels
    .map(hotel => {
      let images = Array.isArray(hotel.images)
        ? hotel.images
        : JSON.parse(hotel.images || "[]");

      images = images
        .filter(Boolean)
        .map(img => {
          if (img.startsWith("http")) return img;
          if (img.startsWith("/")) return `http://localhost:8000${img}`;
          return `http://localhost:8000/images/${img}`;
        });

      return { ...hotel, images };
    })
    .filter(h => favorites.includes(h.id));

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/hotels");
        const data = await res.json();
        setHotels(data);
      } catch (err) {
        console.error("Error fetching hotels:", err);
      }
    };
    fetchHotels();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav !== id));
  };

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id)
        ? prev.filter((e) => e !== id)
        : [...prev, id]
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <div className="min-h-screen py-12 px-6">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-300 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Scroll To Top Button */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-opacity duration-300 z-50
                    ${showTopButton ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          ▲
        </button>
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-400 tracking-wide uppercase">
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
                {/* IMAGE */}
                <div className="relative h-64 w-full p-2 overflow-hidden">
                  <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
                    <img
                      src={hotel.images.length > 0 ? hotel.images[0] : "http://localhost:8000/images/placeholder.jpg"}
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <span className="absolute top-4 left-4 bg-black/40 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                      <Star size={12} className="fill-white" />
                      {hotel.rating}
                    </span>

                    <button
                      onClick={() => toggleFavorite(hotel.id)}
                      className="absolute top-4 right-4 bg-white/30 p-2.5 rounded-full hover:bg-white/50 transition shadow"
                    >
                      <Heart className="w-4 h-4 text-pink-600 fill-pink-500" />
                    </button>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="px-6 pb-8 pt-4 flex flex-col gap-4">
                  <div>
                    <h2 className="font-bold text-xl text-slate-900">
                      {hotel.name}
                    </h2>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-2">
                      <MapPin size={14} /> {hotel.location}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border">
                      <BedDouble size={14} />
                      <span className="text-[11px] font-bold uppercase">
                        {hotel.rooms} Room
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border">
                      <Users size={14} />
                      <span className="text-[11px] font-bold uppercase">
                        {hotel.capacity} Guests
                      </span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1 pt-2 border-t">
                    <span className="text-2xl font-black">
                      ${hotel.price}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase">
                      / night
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="mt-2 space-y-4">
                      <p className="text-sm text-slate-700 italic">
                        "{hotel.description}"
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {hotel.amenities?.map((a, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-[10px] bg-slate-100 rounded uppercase font-bold"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => toggleExpand(hotel.id)}
                    className={`mt-2 w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition
                      ${isExpanded
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 hover:bg-slate-900 hover:text-white"
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