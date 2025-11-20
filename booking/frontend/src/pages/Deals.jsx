import { useState } from "react";
import { Heart, BedDouble, Users, HandCoins } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // ✅ fixed
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


import hotel11 from "../images/hotel11.jpg"; import hotel11_1 from "../images/hotel11_1.jpg"; import hotel11_2 from "../images/hotel11_2.webp"; import hotel11_3 from "../images/hotel11_3.jpg";
import hotel73 from "../images/hotel73.jpeg"; import hotel73_1 from "../images/hotel73_1.jpeg"; import hotel73_2 from "../images/hotel73_2.jpeg";
import hotel23 from "../images/hotel23.jpg"; import hotel23_1 from "../images/hotel23_1.jpg"; import hotel23_2 from "../images/hotel23_2.jpg"; import hotel23_3 from "../images/hotel23_3.jpg";
import villa4 from "../images/villa4.avif"; import villa4_1 from "../images/villa4_1.avif"; import villa4_2 from "../images/villa4_2.avif"; import villa4_3 from "../images/villa4_3.avif"; import villa4_4 from "../images/villa4_4.avif";
import villa34 from "../images/villa34.avif"; import villa34_1 from "../images/villa34_1.avif"; import villa34_2 from "../images/villa34_2.avif"; import villa34_3 from "../images/villa34_3.avif";
import villa76 from "../images/villa76.avif"; import villa76_1 from "../images/villa76_1.avif"; import villa76_2 from "../images/villa76_2.avif";
import hotel83 from "../images/hotel83.jpg"; import hotel83_1 from "../images/hotel83_1.jpg"; import hotel83_2 from "../images/hotel83_2.jpg";
import hotel70 from "../images/hotel70.avif"; import hotel70_1 from "../images/hotel70_1.jpg"; import hotel70_2 from "../images/hotel70_2.avif";
import hotel33 from "../images/hotel33.avif"; import hotel33_1 from "../images/hotel33_1.avif"; import hotel33_2 from "../images/hotel33_2.avif"; import hotel33_3 from "../images/hotel33_3.webp";
import hotel100 from "../images/hotel100.jpg"; import hotel100_1 from "../images/hotel100_1.jpg"; import hotel100_2 from "../images/hotel100_2.jpg"; import hotel100_3 from "../images/hotel100_3.jpg";
import apartment46 from "../images/apartment46.avif"; import apartment46_1 from "../images/apartment46_1.avif"; import apartment46_2 from "../images/apartment46_2.avif"; import apartment46_3 from "../images/apartment46_3.avif";
import hotel99 from "../images/hotel99.jpg"; import hotel99_1 from "../images/hotel99_1.jpg"; import hotel99_2 from "../images/hotel99_2.jpg";
import hotel79 from "../images/hotel79.avif"; import hotel79_1 from "../images/hotel79_1.jpeg";
import hotel58 from "../images/hotel58.avif"; import hotel58_1 from "../images/hotel58_1.jpeg"; import hotel58_2 from "../images/hotel58_2.avif"; import hotel58_3 from "../images/hotel58_3.jpeg";
import apartment5 from "../images/apartment5.jpeg"; import apartment5_1 from "../images/apartment5_1.jpeg"; import apartment5_2 from "../images/apartment5_2.jpeg"; import apartment5_3 from "../images/apartment5_3.jpeg";
import villa20 from "../images/villa20.avif"; import villa20_1 from "../images/villa20_1.avif"; import villa20_2 from "../images/villa20_2.avif"; import villa20_3 from "../images/villa20_3.avif"; import villa20_4 from "../images/villa20_4.avif";
import hotel84 from "../images/hotel84.jpg"; import hotel84_1 from "../images/hotel84_1.jpg"; import hotel84_2 from "../images/hotel84_2.jpg";
import hotel47 from "../images/hotel47.avif"; import hotel47_1 from "../images/hotel47_1.jpeg"; import hotel47_2 from "../images/hotel47_2.avif";

export const dealsData = [
  { id: 47, name: "Hotel Butrinti", location: "Sarandë", rating: 4.8, images: [hotel11, hotel11_1, hotel11_2, hotel11_3], description: "Hotel i njohur buzë detit me pamje fantastike, pishinë dhe restorant mesdhetar.", rooms: 1, capacity: 2, price: 140, amenities: ["Beach Access", "Outdoor Pool", "Wi-Fi", "Breakfast", "Restaurant", "Parking"] },
  { id: 69, name: "Sun George Hotel", location: "Himarë", rating: 4.3, images: [hotel73, hotel73_1, hotel73_2], description: "Hotel modern dhe i rehatshëm, ideal për një qëndrim relaksues për dy persona.", rooms: 1, capacity: 2, price: 65, amenities: ["Wifi", "Free parking on premises", "TV", "Air conditioning"] },
  { id: 72, name: "Hotel MANAMI", location: "Prishtina", rating: 4.7, images: [hotel23, hotel23_1, hotel23_2, hotel23_3], description: "Hotel butik elegant në qendër të Prishtinës me dizajn modern, restorant gourmet dhe ambiente relaksuese.", rooms: 1, capacity: 2, price: 117, amenities: ["Wi-Fi", "Breakfast", "Restaurant", "Parking", "Air Conditioning", "24h Reception"] },
  { id: 82, name: "Villa Bora", location: "Brezovicë", rating: 4.6, images: [villa4, villa4_1, villa4_2, villa4_3, villa4_4], description: "Hapësira të ngrohta me dekor modern, ideal për relaks dhe aktivitete të ndryshme.", rooms: 3, capacity: 7, price: 172, amenities: ["Mountain View", "Wi-Fi", "Parking", "Fully Equipped Kitchen", "Fireplace", "Private Garden"] },
  { id: 90, name: "Escape Villa", location: "Tirana", rating: 4.6, images: [villa34, villa34_1, villa34_2, villa34_3], description: "Vilë moderne dhe e rehatshme me hapësirë private të jashtme, ideale për një qëndrim relaksues.", rooms: 1, capacity: 3, price: 97, amenities: ["Kitchen", "Wifi", "Free parking on premises", "TV", "Air conditioning", "Private patio or balcony", "Private backyard", "Exterior security cameras on property"] },
  { id: 112, name: "Villa Fisi", location: "Pejë", rating: 4.3, images: [villa76, villa76_1, villa76_2], description: "Villa moderne dhe e rehatshme, ideale për pushime familjare ose qëndrime relaksuese në Pejë.", rooms: 2, capacity: 6, price: 130, amenities: ["Kitchen", "Wifi", "Free parking on premises", "TV", "Air conditioning", "Hair dryer"] },
  { id: 113, name: "Black Diamond Hotel", location: "Dhërmi", rating: 4.4, images: [hotel83, hotel83_1, hotel83_2], description: "Hotel modern me pishinë jashtme, spa, dhoma jo-duhan, transport nga/drejt aeroportit, parkim falas, restorant, dhoma familjare, qendër fitness dhe mëngjes të shkëlqyer.", rooms: 1, capacity: 2, price: 65, amenities: ["Outdoor swimming pool", "Spa", "Non-smoking rooms", "Airport shuttle", "Free parking", "Restaurant", "Family rooms", "Fitness center", "Excellent Breakfast"] },
  { id: 135, name: "Artis Blue Hotel", location: "Himarë", rating: 4.5, images: [hotel70, hotel70_1, hotel70_2], description: "Hotel modern dhe luksoz me jacuzzi, ideal për një qëndrim relaksues për familje ose miq.", rooms: 1, capacity: 3, price: 143, amenities: ["Wifi", "Dedicated workspace", "Free parking on premises", "Hot tub", "TV", "Air conditioning"] },
  { id: 87, name: "Mari Deluxe Hotel", location: "Sarandë", rating: 4.0, images: [hotel33, hotel33_1, hotel33_2, hotel33_3], description: "Dhomë moderne dhe e rehatshme, afër plazhit dhe atraksioneve kryesore të Sarandës.", rooms: 1, capacity: 2, price: 38, amenities: ["Beach access", "Wi-Fi", "TV", "Air Conditioning", "Exterior security cameras on property"] },
  { id: 162, name: "Union Premium Apartments", location: "Prishtina", rating: 4.2, images: [apartment46, apartment46_1, apartment46_2, apartment46_3], description: "Apartament modern dhe komod me lehtësira bazë për një qëndrim të këndshëm.", rooms: 2, capacity: 4, price: 65, amenities: [] },
  { id: 305, name: "Colosseum Hotel", location: "Ksamil", rating: 4.0, images: [hotel100, hotel100_1, hotel100_2, hotel100_3], description: "Komod dhe i përshtatshëm për një qëndrim të rehatshëm.", rooms: 1, capacity: 2, price: 420, amenities: ["Non-smoking rooms", "Free parking", "Free Wifi"] },
  { id: 299, name: "Avenue Hotel", location: "Ksamil", rating: 4.0, images: [hotel99, hotel99_1, hotel99_2], description: "Komod dhe i përshtatshëm për një qëndrim të rehatshëm në qendër të qytetit.", rooms: 1, capacity: 2, price: 57, amenities: ["Outdoor swimming pool", "Non-smoking rooms", "Free parking", "Free Wifi", "Restaurant", "Room service", "Facilities for disabled guests", "Family rooms"] },
  { id: 301, name: "Premium Hotel", location: "Sarandë", rating: 3.4, images: [hotel79, hotel79_1], description: "Hotel modern dhe i rehatshëm, ideal për një qëndrim relaksues për familje ose miq.", rooms: 1, capacity: 3, price: 46, amenities: ["Wifi", "Free street parking", "TV", "Elevator"] },
  { id: 303, name: "Amansar Deluxe Hotel", location: "Tirana", rating: 4.4, images: [hotel58, hotel58_1, hotel58_2, hotel58_3], description: "Hotel i rehatshëm dhe modern, ideal për një qëndrim të shkurtër ose të gjatë.", rooms: 1, capacity: 3, price: 70, amenities: ["Wifi", "Dedicated workspace", "Free parking on premises", "TV", "Washer", "Air conditioning"] },
  { id: 235, name: "GO Villas", location: "Brezovicë", rating: 4.7, images: [villa20, villa20_1, villa20_2, villa20_3, villa20_4], description: "Villë moderne me ambiente të bollshme dhe pajisje të plota për një pushim të rehatshëm.", rooms: 2, capacity: 6, price: 263, amenities: ["Free Parking", "TV", "Washer"] },
  { id: 168, name: "Piro Apartment", location: "Sarandë", rating: 3.3, images: [apartment5, apartment5_1, apartment5_2, apartment5_3], description: "Apartament i thjeshtë dhe i rehatshëm me akses në të gjitha shërbimet bazë.", rooms: 1, capacity: 2, price: 47, amenities: ["Wifi", "Dedicated workspace", "Free parking on premises", "TV", "Washer", "Air Conditioning"] },
  { id: 145, name: "Hotel Ionian", location: "Dhërmi", rating: 4.2, images: [hotel84, hotel84_1, hotel84_2], description: "Hotel modern me dhoma jo-duhan, Wifi falas, restorant, dhoma familjare, qasje në plazh dhe bar.", rooms: 1, capacity: 2, price: 45, amenities: ["Non-smoking rooms", "Free Wifi", "Restaurant", "Family rooms", "Beachfront", "Bar"] },
  { id: 121, name: "Imperator Hotel", location: "Tirana", rating: 4.3, images: [hotel47, hotel47_1, hotel47_2], description: "Hotel modern dhe i rehatshëm, ideal për një qëndrim të shkurtër ose të gjatë.", rooms: 1, capacity: 2, price: 76, amenities: ["Wifi", "Free residential garage on premises", "TV", "Elevator", "Air conditioning", "Bathtub"] },

];

function Deals({ favorites, setFavorites }) {
  const [selectedHotel, setSelectedHotel] = useState(null);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const updated = prev.includes(id)
        ? prev.filter(fav => fav !== id)
        : [...prev, id];
      return [...new Set(updated)]; // siguron ID unike
    });
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-700 to-gray-400 drop-shadow-lg tracking-wide uppercase">
          Our Deals
        </h1>

        {/* Deals Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dealsData.map((deal) => (
            <div
              key={deal.id}
              className="relative rounded-3xl overflow-hidden bg-white/60 backdrop-blur-xl border border-gray-300 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
              {/* Image */}
              <div className="relative h-48 w-full">
                <img
                  src={deal.images[0]}
                  alt={deal.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Rating */}
                <span className="absolute top-3 left-3 bg-black/50 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  ⭐ {deal.rating}
                </span>
                {/* Favorite */}
                 <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(deal.id);
                }}
                className="absolute top-3 right-3 bg-white/30 p-2 rounded-full hover:scale-110 transition"
              >
                <Heart
                  className={`w-5 h-5 ${favorites.includes(deal.id) ? "text-pink-600 fill-pink-500" : "text-gray-700"}`}
                />
              </button>
              </div>

              {/* Content */}
              <div className="p-5 text-gray-700">
                <h2 className="font-semibold text-xl">{deal.name}</h2>
                <p className="text-sm text-gray-600">{deal.location}</p>

                {/* Rooms & Capacity */}
                <div className="flex justify-between text-sm text-gray-600 mt-3">
                  <span className="flex items-center gap-1">
                    <BedDouble className="w-4 h-4" />
                    {deal.rooms === 1 ? "1 room" : `${deal.rooms} rooms`}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {deal.capacity} {deal.capacity === 1 ? "guest" : "guests"}
                  </span>
                </div>

                {/* Price */}
                <p className="text-gray-600 font-bold mt-2 flex items-center gap-1">
                  <HandCoins className="w-4 h-4" /> {deal.price}€ / night
                </p>

                {/* View link */}
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedHotel(deal);
                  }}
                  className="mt-3 text-indigo-700 font-semibold cursor-pointer hover:underline"
                >
                  {deal.name.toLowerCase().includes("villa") ||
                    deal.name.toLowerCase().includes("chalet")
                    ? "View Villa →"
                    : deal.name.toLowerCase().includes("apartment")
                      ? "View Apartment →"
                      : "View Hotel →"}
                </p>

                {/* Book button */}
                <button className="mt-3 w-full py-2 rounded-2xl bg-gray-400/40 border border-gray-400 text-gray-900 font-semibold shadow-lg hover:bg-indigo-900 hover:text-indigo-300 transition-colors">
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedHotel && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] p-6 relative shadow-2xl overflow-y-auto animate-fadeIn">
              <button
                onClick={() => setSelectedHotel(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
              >
                ✕
              </button>

              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
              >
                {selectedHotel.images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={`${selectedHotel.name} ${idx + 1}`}
                      className="w-full h-56 object-cover rounded-2xl"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedHotel.name}</h2>
              <p className="text-gray-600 mb-1">{selectedHotel.location}</p>
              <p className="text-yellow-500 mb-2">
                {"★".repeat(Math.round(selectedHotel.rating))}{" "}
                <span className="text-gray-500 text-sm">({selectedHotel.rating})</span>
              </p>
              <p className="text-gray-700 mb-3">{selectedHotel.description}</p>
              {selectedHotel.amenities && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedHotel.amenities.map((a, i) => (
                    <span key={i} className="bg-indigo-100 text-indigo-700 px-3 py-1 text-sm rounded-full">
                      {a}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-gray-800 font-medium flex items-center gap-2">
                <BedDouble className="w-4 h-4" /> {selectedHotel.rooms}{" "}
                {selectedHotel.rooms === 1 ? "room" : "rooms"} —
                <Users className="w-4 h-4" /> {selectedHotel.capacity}{" "}
                {selectedHotel.capacity === 1 ? "guest" : "guests"}
              </p>
              <p className="text-gray-900 font-semibold mt-2 flex items-center gap-2">
                <HandCoins className="w-4 h-4" /> {selectedHotel.price}€ / night
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Deals;