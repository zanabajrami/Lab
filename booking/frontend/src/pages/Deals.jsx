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
import apartment65 from "../images/apartment65.avif"; import apartment65_1 from "../images/apartment65_1.avif"; import apartment65_2 from "../images/apartment65_2.jpeg"; import apartment65_3 from "../images/apartment65_3.avif";
import villa51 from "../images/villa51.avif"; import villa51_1 from "../images/villa51_1.avif"; import villa51_2 from "../images/villa51_2.avif";
import hotel6 from "../images/hotel6.jpg"; import hotel6_1 from "../images/hotel6_1.jpg"; import hotel6_2 from "../images/hotel6_2.jpg"; import hotel6_3 from "../images/hotel6_3.jpg";
import apartment95 from "../images/apartment95.avif"; import apartment95_1 from "../images/apartment95_1.jpeg"; import apartment95_2 from "../images/apartment95_2.jpeg";
import hotel54 from "../images/hotel54.avif"; import hotel54_1 from "../images/hotel54_1.avif"; import hotel54_2 from "../images/hotel54_2.jpeg";
import villa2 from "../images/villa2.avif"; import villa2_1 from "../images/villa2_1.avif"; import villa2_2 from "../images/villa2_2.avif"; import villa2_3 from "../images/villa2_3.avif"; import villa2_4 from "../images/villa2_4.avif";
import hotel46 from "../images/hotel46.jpeg"; import hotel46_1 from "../images/hotel46_1.avif"; import hotel46_2 from "../images/hotel46_2.avif";
import hotel25 from "../images/hotel25.jpg"; import hotel25_1 from "../images/hotel25_1.jpg"; import hotel25_2 from "../images/hotel25_2.jpg"; import hotel25_3 from "../images/hotel25_3.jpg";
import villa91 from "../images/villa91.avif"; import villa91_1 from "../images/villa91_1.avif";
import hotel63 from "../images/hotel63.avif"; import hotel63_1 from "../images/hotel63_1.avif"; import hotel63_2 from "../images/hotel63_2.avif";
import hotel39 from "../images/hotel39.jpg"; import hotel39_1 from "../images/hotel39_1.jpg"; import hotel39_2 from "../images/hotel39_2.jpg"; import hotel39_3 from "../images/hotel39_3.jpg";
import apartment66 from "../images/apartment66.avif"; import apartment66_1 from "../images/apartment66_1.avif"; import apartment66_2 from "../images/apartment66_2.webp"; import apartment66_3 from "../images/apartment66_3.avif";
import hotel74 from "../images/hotel74.avif"; import hotel74_1 from "../images/hotel74_1.avif";
import villa21 from "../images/villa21.jpg"; import villa21_1 from "../images/villa21_1.jpg"; import villa21_2 from "../images/villa21_2.jpg"; import villa21_3 from "../images/villa21_3.jpg";

export const dealsData = [
  { id: 47, name: "Hotel Butrinti", location: "Sarandë", rating: 4.8, images: [hotel11, hotel11_1, hotel11_2, hotel11_3], description: "Hotel i njohur buzë detit me pamje fantastike, pishinë dhe restorant mesdhetar.", rooms: 1, capacity: 2, price: 140, originalPrice: 180, discountPrice: 140, amenities: ["Beach Access", "Outdoor Pool", "Wi-Fi", "Breakfast", "Restaurant", "Parking"] },
  { id: 69, name: "Sun George Hotel", location: "Himarë", rating: 4.3, images: [hotel73, hotel73_1, hotel73_2], description: "Hotel modern dhe i rehatshëm, ideal për një qëndrim relaksues për dy persona.", rooms: 1, capacity: 2, price: 65, originalPrice: 100, discountPrice: 65, amenities: ["Wifi", "Free parking on premises", "TV", "Air conditioning"] },
  { id: 72, name: "Hotel MANAMI", location: "Prishtina", rating: 4.7, images: [hotel23, hotel23_1, hotel23_2, hotel23_3], description: "Hotel butik elegant në qendër të Prishtinës me dizajn modern, restorant gourmet dhe ambiente relaksuese.", rooms: 1, capacity: 2, price: 117, originalPrice: 150, discountPrice: 117, amenities: ["Wi-Fi", "Breakfast", "Restaurant", "Parking", "Air Conditioning", "24h Reception"] },
  { id: 82, name: "Villa Bora", location: "Brezovicë", rating: 4.6, images: [villa4, villa4_1, villa4_2, villa4_3, villa4_4], description: "Hapësira të ngrohta me dekor modern, ideal për relaks dhe aktivitete të ndryshme.", rooms: 3, capacity: 7, price: 172, originalPrice: 200, discountPrice: 172, amenities: ["Mountain View", "Wi-Fi", "Parking", "Fully Equipped Kitchen", "Fireplace", "Private Garden"] },
  { id: 90, name: "Escape Villa", location: "Tirana", rating: 4.6, images: [villa34, villa34_1, villa34_2, villa34_3], description: "Vilë moderne dhe e rehatshme me hapësirë private të jashtme, ideale për një qëndrim relaksues.", rooms: 1, capacity: 3, price: 97, originalPrice: 130, discountPrice: 97, amenities: ["Kitchen", "Wifi", "Free parking on premises", "TV", "Air conditioning", "Private patio or balcony", "Private backyard", "Exterior security cameras on property"] },
  { id: 112, name: "Villa Fisi", location: "Pejë", rating: 4.3, images: [villa76, villa76_1, villa76_2], description: "Villa moderne dhe e rehatshme, ideale për pushime familjare ose qëndrime relaksuese në Pejë.", rooms: 2, capacity: 6, price: 130, originalPrice: 160, discountPrice: 130, amenities: ["Kitchen", "Wifi", "Free parking on premises", "TV", "Air conditioning", "Hair dryer"] },
  { id: 113, name: "Black Diamond Hotel", location: "Dhërmi", rating: 4.4, images: [hotel83, hotel83_1, hotel83_2], description: "Hotel modern me pishinë jashtme, spa, dhoma jo-duhan, transport nga/drejt aeroportit, parkim falas, restorant, dhoma familjare, qendër fitness dhe mëngjes të shkëlqyer.", rooms: 1, capacity: 2, price: 65, originalPrice: 100, discountPrice: 65, amenities: ["Outdoor swimming pool", "Spa", "Non-smoking rooms", "Airport shuttle", "Free parking", "Restaurant", "Family rooms", "Fitness center", "Excellent Breakfast"] },
  { id: 135, name: "Artis Blue Hotel", location: "Himarë", rating: 4.5, images: [hotel70, hotel70_1, hotel70_2], description: "Hotel modern dhe luksoz me jacuzzi, ideal për një qëndrim relaksues për familje ose miq.", rooms: 1, capacity: 3, price: 143, originalPrice: 180, discountPrice: 143, amenities: ["Wifi", "Dedicated workspace", "Free parking on premises", "Hot tub", "TV", "Air conditioning"] },
  { id: 87, name: "Mari Deluxe Hotel", location: "Sarandë", rating: 4.0, images: [hotel33, hotel33_1, hotel33_2, hotel33_3], description: "Dhomë moderne dhe e rehatshme, afër plazhit dhe atraksioneve kryesore të Sarandës.", rooms: 1, capacity: 2, price: 38, originalPrice: 60, discountPrice: 38, amenities: ["Beach access", "Wi-Fi", "TV", "Air Conditioning", "Exterior security cameras on property"] },
  { id: 162, name: "Union Premium Apartments", location: "Prishtina", rating: 4.2, images: [apartment46, apartment46_1, apartment46_2, apartment46_3], description: "Apartament modern dhe komod me lehtësira bazë për një qëndrim të këndshëm.", rooms: 2, capacity: 4, price: 65, originalPrice: 85, discountPrice: 65, amenities: [] },
  { id: 305, name: "Colosseum Hotel", location: "Ksamil", rating: 4.0, images: [hotel100, hotel100_1, hotel100_2, hotel100_3], description: "Komod dhe i përshtatshëm për një qëndrim të rehatshëm.", rooms: 1, capacity: 2, price: 420, originalPrice: 500, discountPrice: 420, amenities: ["Non-smoking rooms", "Free parking", "Free Wifi"] },
  { id: 299, name: "Avenue Hotel", location: "Ksamil", rating: 4.0, images: [hotel99, hotel99_1, hotel99_2], description: "Komod dhe i përshtatshëm për një qëndrim të rehatshëm në qendër të qytetit.", rooms: 1, capacity: 2, price: 57, originalPrice: 80, discountPrice: 57, amenities: ["Outdoor swimming pool", "Non-smoking rooms", "Free parking", "Free Wifi", "Restaurant", "Room service", "Facilities for disabled guests", "Family rooms"] },
  { id: 301, name: "Premium Hotel", location: "Sarandë", rating: 3.4, images: [hotel79, hotel79_1], description: "Hotel modern dhe i rehatshëm, ideal për një qëndrim relaksues për familje ose miq.", rooms: 1, capacity: 3, price: 46, originalPrice: 70, discountPrice: 46, amenities: ["Wifi", "Free street parking", "TV", "Elevator"] },
  { id: 303, name: "Amansar Deluxe Hotel", location: "Tirana", rating: 4.4, images: [hotel58, hotel58_1, hotel58_2, hotel58_3], description: "Hotel i rehatshëm dhe modern, ideal për një qëndrim të shkurtër ose të gjatë.", rooms: 1, capacity: 3, price: 70, originalPrice: 100, discountPrice: 70, amenities: ["Wifi", "Dedicated workspace", "Free parking on premises", "TV", "Washer", "Air conditioning"] },
  { id: 235, name: "GO Villas", location: "Brezovicë", rating: 4.7, images: [villa20, villa20_1, villa20_2, villa20_3, villa20_4], description: "Villë moderne me ambiente të bollshme dhe pajisje të plota për një pushim të rehatshëm.", rooms: 2, capacity: 6, price: 263, originalPrice: 320, discountPrice: 263, amenities: ["Free Parking", "TV", "Washer"] },
  { id: 168, name: "Piro Apartment", location: "Sarandë", rating: 3.3, images: [apartment5, apartment5_1, apartment5_2, apartment5_3], description: "Apartament i thjeshtë dhe i rehatshëm me akses në të gjitha shërbimet bazë.", rooms: 1, capacity: 2, price: 47, originalPrice: 60, discountPrice: 47, amenities: ["Wifi", "Dedicated workspace", "Free parking on premises", "TV", "Washer", "Air Conditioning"] },
  { id: 145, name: "Hotel Ionian", location: "Dhërmi", rating: 4.2, images: [hotel84, hotel84_1, hotel84_2], description: "Hotel modern me dhoma jo-duhan, Wifi falas, restorant, dhoma familjare, qasje në plazh dhe bar.", rooms: 1, capacity: 2, price: 45, originalPrice: 70, discountPrice: 45, amenities: ["Non-smoking rooms", "Free Wifi", "Restaurant", "Family rooms", "Beachfront", "Bar"] },
  { id: 121, name: "Imperator Hotel", location: "Tirana", rating: 4.3, images: [hotel47, hotel47_1, hotel47_2], description: "Hotel modern dhe i rehatshëm, ideal për një qëndrim të shkurtër ose të gjatë.", rooms: 1, capacity: 2, price: 76, originalPrice: 100, discountPrice: 76, amenities: ["Wifi", "Free residential garage on premises", "TV", "Elevator", "Air conditioning", "Bathtub"] },
  { id: 306, name: "Red & White Palace Apartment", location: "Tirana", rating: 4.2, images: [apartment65, apartment65_1, apartment65_2, apartment65_3], description: "Apartament modern dhe i këndshëm për një qëndrim relaksues.", rooms: 1, capacity: 4, price: 53, originalPrice: 61, discountPrice: 53, amenities: ["Kitchen", "Wifi", "Dedicated workspace", "TV", "Elevator", "Free washer – In unit"] },
  { id: 212, name: "The Poet's Villa 2", location: "Himarë", rating: 4.7, images: [villa51, villa51_1, villa51_2], description: "Vilë moderne dhe e rehatshme me pishinë, ideale për një qëndrim relaksues për familje ose miq.", rooms: 1, capacity: 3, price: 140, originalPrice: 161, discountPrice: 140, amenities: ["Wifi", "Free parking on premises", "Pool", "TV", "Washer", "Air conditioning", "Hair dryer"] },
  { id: 4, name: "Brezovica Hotel", location: "Brezovicë", rating: 4.6, images: [hotel6, hotel6_1, hotel6_2, hotel6_3], description: "Hotel malor pranë pistave të skijimit me sauna, spa dhe dhoma me pamje fantastike.", rooms: 1, capacity: 2, price: 120, originalPrice: 138, discountPrice: 120, amenities: ["Ski Access", "Spa", "Sauna", "Restaurant", "Parking", "Wi-Fi"] },
  { id: 48, name: "Cinco Apartments", location: "Pejë", rating: 4.3, images: [apartment95, apartment95_1, apartment95_2], description: "Apartament modern dhe i rehatshëm për 5 persona, me kuzhinë të pajisur dhe facilitete për një qëndrim të komod.", rooms: 2, capacity: 5, price: 94, originalPrice: 108, discountPrice: 94, amenities: ["Kitchen", "Wifi", "Free parking on premises", "TV", "Washer"] },
  { id: 24, name: "The Wilson Hotel", location: "Tirana", rating: 4.3, images: [hotel54, hotel54_1, hotel54_2], description: "Hotel i rehatshëm dhe modern, ideal për një qëndrim të shkurtër ose të gjatë.", rooms: 1, capacity: 2, price: 70, originalPrice: 81, discountPrice: 70, amenities: ["Wifi", "Dedicated workspace", "TV", "Air conditioning"] },
  { id: 92, name: "Villa Brezovica", location: "Brezovicë", rating: 4.8, images: [villa2, villa2_1, villa2_2, villa2_3, villa2_4], description: "Oaz modern me dritare panoramike që ofron pamje mahnitëse të maleve dhe hapësira të bollshme për argëtim.", rooms: 4, capacity: 8, price: 317, originalPrice: 365, discountPrice: 317, amenities: ["Private Pool", "Mountain View", "Wi-Fi", "Parking", "Fully Equipped Kitchen", "Fireplace"] },
  { id: 93, name: "Pandora Hotel", location: "Tirana", rating: 4.2, images: [hotel46, hotel46_1, hotel46_2], description: "Hotel modern me pamje të qytetit dhe oborrit, ideal për një qëndrim të rehatshëm.", rooms: 1, capacity: 2, price: 42, originalPrice: 48, discountPrice: 42, amenities: ["City skyline view", "Courtyard view", "Wifi", "Free driveway parking on premises – 5 spaces", "Private hot tub", "TV", "Elevator"] },
  { id: 94, name: "Hotel Prishtina", location: "Prishtina", rating: 4.5, images: [hotel25, hotel25_1, hotel25_2, hotel25_3], description: "Hotel komod në qendër të Prishtinës me dhoma të rehatshme, mëngjes të pasur dhe staf mikpritës.", rooms: 1, capacity: 2, price: 115, originalPrice: 132, discountPrice: 115, amenities: ["Wi-Fi", "Pool", "Breakfast", "Parking", "Restaurant", "Air Conditioning"] },
  { id: 95, name: "Villa Lura", location: "near Prizren", rating: 4.3, images: [villa91, villa91_1], description: "Vilë e rehatshme dhe e përshtatshme për grup të vogël, me ambiente të mirëmbajtura dhe hapësira komode për pushime relaksuese.", rooms: 3, capacity: 6, price: 170, originalPrice: 196, discountPrice: 170, amenities: ["Ski-in/Ski-out", "Kitchen", "Wifi", "Free parking on premises", "TV", "Washer"] },
  { id: 96, name: "Escape Hotel Himare", location: "Himarë", rating: 4.1, images: [hotel63, hotel63_1, hotel63_2], description: "Hotel modern dhe relaksues, i pajisur me pishinë dhe jacuzzi privat për një qëndrim komod.", rooms: 1, capacity: 2, price: 186, originalPrice: 215, discountPrice: 186, amenities: ["Wifi", "Dedicated workspace", "Free parking on premises", "Pool", "Private hot tub - open 24 hours", "TV"] },
  { id: 97, name: "ALYACHT Premium Hotel", location: "Sarandë", rating: 4.5, images: [hotel39, hotel39_1, hotel39_2, hotel39_3], description: "Hotel luksoz dhe i rehatshëm pranë plazhit.", rooms: 1, capacity: 2, price: 87, originalPrice: 101, discountPrice: 87, amenities: ["Non-smoking Rooms", "Free Parking", "Room Service", "Free Wi-Fi", "Beachfront", "Bar", "Private Beach Area", "Excellent Breakfast"] },
  { id: 165, name: "Luxury Apartments", location: "Tirana", rating: 4.5, images: [apartment66, apartment66_1, apartment66_2, apartment66_3], description: "Apartament luksoz dhe i rehatshëm për një qëndrim të këndshëm.", rooms: 1, capacity: 3, price: 56, originalPrice: 65, discountPrice: 56, amenities: ["Kitchen", "Wifi", "Free parking on premises", "Washer"] },
  { id: 166, name: "Grand Hotel", location: "Himarë", rating: 4.4, images: [hotel74, hotel74_1], description: "Hotel modern dhe i sigurt, ideal për një qëndrim relaksues për dy persona.", rooms: 1, capacity: 2, price: 38, originalPrice: 45, discountPrice: 38, amenities: ["Wifi", "Dedicated workspace", "Free parking on premises", "TV", "Air conditioning", "Exterior security cameras on property"] },
  { id: 167, name: "Ionian Premium Villas", location: "Sarandë", rating: 4.8, images: [villa21, villa21_1, villa21_2, villa21_3], description: "Vila premium me pishinë të jashtme, ambiente familjare dhe pamje relaksuese.", rooms: 3, capacity: 7, price: 230, originalPrice: 260, discountPrice: 230, amenities: ["Free on-site parking", "Outdoor swimming pool", "Free Wifi", "Private bathroom", "Family rooms", "View", "Air conditioning", "Non-smoking rooms", "Flat-screen TV"] },
  { id: 168, name: "Piro Apartment", location: "Sarandë", rating: 3.3, images: [apartment5, apartment5_1, apartment5_2, apartment5_3], description: "Apartament i thjeshtë dhe i rehatshëm me akses në të gjitha shërbimet bazë.", rooms: 1, capacity: 2, price: 47, originalPrice: 55, discountPrice: 47, amenities: ["Wifi", "Dedicated workspace", "Free parking on premises", "TV", "Washer", "Air Conditioning"] }
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

                {/* Discount */}
                {deal.originalPrice && deal.discountPrice && (
                  <span className="absolute top-3 left-3 bg-black/40 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {Math.round(((deal.originalPrice - deal.discountPrice) / deal.originalPrice) * 100)}% OFF
                  </span>
                )}

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

                {/* Price with Discount display */}
                <p className="text-gray-600 font-bold mt-2 flex items-center gap-2">
                  <HandCoins className="w-4 h-4" />
                  <span className="line-through text-gray-400">{deal.originalPrice}€</span>
                  <span className="text-red-700">{deal.discountPrice}€</span> / night
                </p>

                {/* View link */}
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedHotel(deal);
                  }}
                  className="mt-3 text-indigo-900 font-semibold cursor-pointer hover:underline"
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