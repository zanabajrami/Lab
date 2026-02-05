import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { Heart, BedDouble, Users, HandCoins, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BASE_URL = "http://localhost:8000";

export const dealsData = [
  { id: 47, name: "Hotel Butrinti", location: "Sarandë", rating: 4.8, images: [`${BASE_URL}/images/hotel11.jpg`, `${BASE_URL}/images/hotel11_1.jpg`, `${BASE_URL}/images/hotel11_2.webp`, `${BASE_URL}/images/hotel11_3.jpg`], description: "Hotel i njohur buzë detit me pamje fantastike, pishinë dhe restorant mesdhetar.", rooms: 1, capacity: 2, price: 140, originalPrice: 180, discountPrice: 140, amenities: ["Beach Access", "Outdoor Pool", "Wi-Fi", "Breakfast", "Restaurant", "Parking"] },
  { id: 69, name: "Sun George Hotel", location: "Himarë", rating: 4.3, images: [`${BASE_URL}/images/hotel73.jpeg`, `${BASE_URL}/images/hotel73_1.jpeg`, `${BASE_URL}/images/hotel73_2.jpeg`], description: "Hotel modern dhe i rehatshëm, ideal për një qëndrim relaksues për dy persona.", rooms: 1, capacity: 2, price: 65, originalPrice: 100, discountPrice: 65, amenities: ["Wifi", "Free parking on premises", "TV", "Air conditioning"] },
  { id: 72, name: "Hotel MANAMI", location: "Prishtina", rating: 4.7, images: [`${BASE_URL}/images/hotel23.jpg`, `${BASE_URL}/images/hotel23_1.jpg`, `${BASE_URL}/images/hotel23_2.jpg`, `${BASE_URL}/images/hotel23_3.jpg`], description: "Hotel butik elegant në qendër të Prishtinës me dizajn modern, restorant gourmet dhe ambiente relaksuese.", rooms: 1, capacity: 2, price: 117, originalPrice: 150, discountPrice: 117, amenities: ["Wi-Fi", "Breakfast", "Restaurant", "Parking", "Air Conditioning", "24h Reception"] },
  { id: 82, name: "Villa Bora", location: "Brezovicë", rating: 4.6, images: [`${BASE_URL}/images/villa4.avif`, `${BASE_URL}/images/villa4_1.avif`, `${BASE_URL}/images/villa4_2.avif`, `${BASE_URL}/images/villa4_3.avif`, `${BASE_URL}/images/villa4_4.avif`], description: "Hapësira të ngrohta me dekor modern, ideal për relaks dhe aktivitete të ndryshme.", rooms: 3, capacity: 7, price: 172, originalPrice: 200, discountPrice: 172, amenities: ["Mountain View", "Wi-Fi", "Parking", "Fully Equipped Kitchen", "Fireplace", "Private Garden"] },
  { id: 90, name: "Escape Villa", location: "Tirana", rating: 4.6, images: [`${BASE_URL}/images/villa34.avif`, `${BASE_URL}/images/villa34_1.avif`, `${BASE_URL}/images/villa34_2.avif`, `${BASE_URL}/images/villa34_3.avif`], description: "Vilë moderne dhe e rehatshme me hapësirë private të jashtme, ideale për një qëndrim relaksues.", rooms: 1, capacity: 3, price: 97, originalPrice: 130, discountPrice: 97, amenities: ["Kitchen", "Wifi", "Free parking on premises", "TV", "Air conditioning", "Private patio or balcony", "Private backyard", "Exterior security cameras on property"] },
  { id: 112, name: "Villa Fisi", location: "Pejë", rating: 4.3, images: [`${BASE_URL}/images/villa76.avif`, `${BASE_URL}/images/villa76_1.avif`, `${BASE_URL}/images/villa76_2.avif`], description: "Villa moderne dhe e rehatshme, ideale për pushime familjare ose qëndrime relaksuese në Pejë.", rooms: 2, capacity: 6, price: 130, originalPrice: 160, discountPrice: 130, amenities: ["Kitchen", "Wifi", "Free parking on premises", "TV", "Air conditioning", "Hair dryer"] },
  { id: 113, name: "Black Diamond Hotel", location: "Dhërmi", rating: 4.4, images: [`${BASE_URL}/images/hotel83.jpg`, `${BASE_URL}/images/hotel83_1.jpg`, `${BASE_URL}/images/hotel83_2.jpg`], description: "Hotel modern me pishinë jashtme, spa, dhoma jo-duhan, transport nga/drejt aeroportit, parkim falas, restorant, dhoma familjare, qendër fitness dhe mëngjes të shkëlqyer.", rooms: 1, capacity: 2, price: 65, originalPrice: 100, discountPrice: 65, amenities: ["Outdoor swimming pool", "Spa", "Non-smoking rooms", "Airport shuttle", "Free parking", "Restaurant", "Family rooms", "Fitness center", "Excellent Breakfast"] },
  { id: 135, name: "Artis Blue Hotel", location: "Himarë", rating: 4.5, images: [`${BASE_URL}/images/hotel70.avif`, `${BASE_URL}/images/hotel70_1.jpg`, `${BASE_URL}/images/hotel70_2.avif`], description: "Hotel modern dhe luksoz me jacuzzi, ideal për një qëndrim relaksues për familje ose miq.", rooms: 1, capacity: 3, price: 143, originalPrice: 180, discountPrice: 143, amenities: ["Wifi", "Dedicated workspace", "Free parking on premises", "Hot tub", "TV", "Air conditioning"] },
  { id: 87, name: "Mari Deluxe Hotel", location: "Sarandë", rating: 4.0, images: [`${BASE_URL}/images/hotel33.avif`, `${BASE_URL}/images/hotel33_1.avif`, `${BASE_URL}/images/hotel33_2.avif`, `${BASE_URL}/images/hotel33_3.webp`], description: "Dhomë moderne dhe e rehatshme, afër plazhit dhe atraksioneve kryesore të Sarandës.", rooms: 1, capacity: 2, price: 38, originalPrice: 60, discountPrice: 38, amenities: ["Beach access", "Wi-Fi", "TV", "Air Conditioning", "Exterior security cameras on property"] },
  { id: 162, name: "Union Premium Apartments", location: "Prishtina", rating: 4.2, images: [`${BASE_URL}/images/apartment46.avif`, `${BASE_URL}/images/apartment46_1.avif`, `${BASE_URL}/images/apartment46_2.avif`, `${BASE_URL}/images/apartment46_3.avif`], description: "Apartament modern dhe komod me lehtësira bazë për një qëndrim të këndshëm.", rooms: 2, capacity: 4, price: 65, originalPrice: 85, discountPrice: 65, amenities: [] },
  { id: 305, name: "Colosseum Hotel", location: "Ksamil", rating: 4.0, images: [`${BASE_URL}/images/hotel100.jpg`, `${BASE_URL}/images/hotel100_1.jpg`, `${BASE_URL}/images/hotel100_2.jpg`, `${BASE_URL}/images/hotel100_3.jpg`], description: "Komod dhe i përshtatshëm për një qëndrim të rehatshëm.", rooms: 1, capacity: 2, price: 420, originalPrice: 500, discountPrice: 420, amenities: ["Non-smoking rooms", "Free parking", "Free Wifi"] },
  { id: 299, name: "Avenue Hotel", location: "Ksamil", rating: 4.0, images: [`${BASE_URL}/images/hotel99.jpg`, `${BASE_URL}/images/hotel99_1.jpg`, `${BASE_URL}/images/hotel99_2.jpg`], description: "Komod dhe i përshtatshëm për një qëndrim të rehatshëm në qendër të qytetit.", rooms: 1, capacity: 2, price: 57, originalPrice: 80, discountPrice: 57, amenities: ["Outdoor swimming pool", "Non-smoking rooms", "Free parking", "Free Wifi", "Restaurant", "Room service", "Facilities for disabled guests", "Family rooms"] },
  { id: 301, name: "Premium Hotel", location: "Sarandë", rating: 3.4, images: [`${BASE_URL}/images/hotel79.avif`, `${BASE_URL}/images/hotel79_1.jpeg`], description: "Hotel modern dhe i rehatshëm, ideal për një qëndrim relaksues për familje ose miq.", rooms: 1, capacity: 3, price: 46, originalPrice: 70, discountPrice: 46, amenities: ["Wifi", "Free street parking", "TV", "Elevator"] },
  { id: 303, name: "Amansar Deluxe Hotel", location: "Tirana", rating: 4.4, images: [`${BASE_URL}/images/hotel58.avif`, `${BASE_URL}/images/hotel58_1.jpeg`, `${BASE_URL}/images/hotel58_2.avif`, `${BASE_URL}/images/hotel58_3.jpeg`], description: "Hotel i rehatshëm dhe modern, ideal për një qëndrim të shkurtër ose të gjatë.", rooms: 1, capacity: 3, price: 70, originalPrice: 100, discountPrice: 70, amenities: ["Wifi", "Dedicated workspace", "Free parking on premises", "TV", "Washer", "Air conditioning"] },
  { id: 235, name: "GO Villas", location: "Brezovicë", rating: 4.7, images: [`${BASE_URL}/images/villa20.avif`, `${BASE_URL}/images/villa20_1.avif`, `${BASE_URL}/images/villa20_2.avif`, `${BASE_URL}/images/villa20_3.avif`, `${BASE_URL}/images/villa20_4.avif`], description: "Villë moderne me ambiente të bollshme dhe pajisje të plota për një pushim të rehatshëm.", rooms: 2, capacity: 6, price: 263, originalPrice: 320, discountPrice: 263, amenities: ["Free Parking", "TV", "Washer"] },
  { id: 168, name: "Piro Apartment", location: "Sarandë", rating: 3.3, images: [`${BASE_URL}/images/apartment5.jpeg`, `${BASE_URL}/images/apartment5_1.jpeg`, `${BASE_URL}/images/apartment5_2.jpeg`, `${BASE_URL}/images/apartment5_3.jpeg`], description: "Apartament i thjeshtë dhe i rehatshëm me akses në të gjitha shërbimet bazë.", rooms: 1, capacity: 2, price: 47, originalPrice: 55, discountPrice: 47, amenities: ["Wifi", "Dedicated workspace", "Free parking on premises", "TV", "Washer", "Air Conditioning"] },
  { id: 145, name: "Hotel Ionian", location: "Dhërmi", rating: 4.2, images: [`${BASE_URL}/images/hotel84.jpg`, `${BASE_URL}/images/hotel84_1.jpg`, `${BASE_URL}/images/hotel84_2.jpg`], description: "Hotel modern me dhoma jo-duhan, Wifi falas, restorant, dhoma familjare, qasje në plazh dhe bar.", rooms: 1, capacity: 2, price: 45, originalPrice: 70, discountPrice: 45, amenities: ["Non-smoking rooms", "Free Wifi", "Restaurant", "Family rooms", "Beachfront", "Bar"] },
  { id: 121, name: "Imperator Hotel", location: "Tirana", rating: 4.3, images: [`${BASE_URL}/images/hotel47.avif`, `${BASE_URL}/images/hotel47_1.jpeg`, `${BASE_URL}/images/hotel47_2.avif`], description: "Hotel modern dhe i rehatshëm, ideal për një qëndrim të shkurtër ose të gjatë.", rooms: 1, capacity: 2, price: 76, originalPrice: 100, discountPrice: 76, amenities: ["Wifi", "Free residential garage on premises", "TV", "Elevator", "Air conditioning", "Bathtub"] },
  { id: 306, name: "Red & White Palace Apartment", location: "Tirana", rating: 4.2, images: [`${BASE_URL}/images/apartment65.avif`, `${BASE_URL}/images/apartment65_1.avif`, `${BASE_URL}/images/apartment65_2.jpeg`, `${BASE_URL}/images/apartment65_3.avif`], description: "Apartament modern dhe i këndshëm për një qëndrim relaksues.", rooms: 1, capacity: 4, price: 53, originalPrice: 61, discountPrice: 53, amenities: ["Kitchen", "Wifi", "Dedicated workspace", "TV", "Elevator", "Free washer – In unit"] },
  { id: 212, name: "The Poet's Villa 2", location: "Himarë", rating: 4.7, images: [`${BASE_URL}/images/villa51.avif`, `${BASE_URL}/images/villa51_1.avif`, `${BASE_URL}/images/villa51_2.avif`], description: "Vilë moderne dhe e rehatshme me pishinë, ideale për një qëndrim relaksues për familje ose miq.", rooms: 1, capacity: 3, price: 140, originalPrice: 161, discountPrice: 140, amenities: ["Wifi", "Free parking on premises", "Pool", "TV", "Washer", "Air conditioning", "Hair dryer"] },
  { id: 4, name: "Brezovica Hotel", location: "Brezovicë", rating: 4.6, images: [`${BASE_URL}/images/hotel6.jpg`, `${BASE_URL}/images/hotel6_1.jpg`, `${BASE_URL}/images/hotel6_2.jpg`, `${BASE_URL}/images/hotel6_3.jpg`], description: "Hotel malor pranë pistave të skijimit me sauna, spa dhe dhoma me pamje fantastike.", rooms: 1, capacity: 2, price: 120, originalPrice: 138, discountPrice: 120, amenities: ["Ski Access", "Spa", "Sauna", "Restaurant", "Parking", "Wi-Fi"] },
  { id: 48, name: "Cinco Apartments", location: "Pejë", rating: 4.3, images: [`${BASE_URL}/images/apartment95.avif`, `${BASE_URL}/images/apartment95_1.jpeg`, `${BASE_URL}/images/apartment95_2.jpeg`], description: "Apartament modern dhe i rehatshëm për 5 persona, me kuzhinë të pajisur dhe facilitete për një qëndrim të komod.", rooms: 2, capacity: 5, price: 94, originalPrice: 108, discountPrice: 94, amenities: ["Kitchen", "Wifi", "Free parking on premises", "TV", "Washer"] },
  { id: 24, name: "The Wilson Hotel", location: "Tirana", rating: 4.3, images: [`${BASE_URL}/images/hotel54.avif`, `${BASE_URL}/images/hotel54_1.avif`, `${BASE_URL}/images/hotel54_2.jpeg`], description: "Hotel i rehatshëm dhe modern, ideal për një qëndrim të shkurtër ose të gjatë.", rooms: 1, capacity: 2, price: 70, originalPrice: 81, discountPrice: 70, amenities: ["Wifi", "Dedicated workspace", "TV", "Air conditioning"] },
  { id: 92, name: "Villa Brezovica", location: "Brezovicë", rating: 4.8, images: [`${BASE_URL}/images/villa2.avif`, `${BASE_URL}/images/villa2_1.avif`, `${BASE_URL}/images/villa2_2.avif`, `${BASE_URL}/images/villa2_3.avif`, `${BASE_URL}/images/villa2_4.avif`], description: "Oaz modern me dritare panoramike që ofron pamje mahnitëse të maleve dhe hapësira të bollshme për argëtim.", rooms: 4, capacity: 8, price: 317, originalPrice: 365, discountPrice: 317, amenities: ["Private Pool", "Mountain View", "Wi-Fi", "Parking", "Fully Equipped Kitchen", "Fireplace"] },
  { id: 93, name: "Pandora Hotel", location: "Tirana", rating: 4.2, images: [`${BASE_URL}/images/hotel46.jpeg`, `${BASE_URL}/images/hotel46_1.avif`, `${BASE_URL}/images/hotel46_2.avif`], description: "Hotel modern me pamje të qytetit dhe oborrit, ideal për një qëndrim të rehatshëm.", rooms: 1, capacity: 2, price: 42, originalPrice: 48, discountPrice: 42, amenities: ["City skyline view", "Courtyard view", "Wifi", "Free driveway parking on premises – 5 spaces", "Private hot tub", "TV", "Elevator"] },
  { id: 94, name: "Hotel Prishtina", location: "Prishtina", rating: 4.5, images: [`${BASE_URL}/images/hotel25.jpg`, `${BASE_URL}/images/hotel25_1.jpg`, `${BASE_URL}/images/hotel25_2.jpg`, `${BASE_URL}/images/hotel25_3.jpg`], description: "Hotel komod në qendër të Prishtinës me dhoma moderne, restorant dhe lehtësira për biznes dhe pushime.", rooms: 1, capacity: 2, price: 70, originalPrice: 90, discountPrice: 70, amenities: ["Wi-Fi", "Restaurant", "Parking", "Conference Room", "24h Reception"] },
  { id: 95, name: "Villa Lura", location: "near Prizren", rating: 4.3, images: [`${BASE_URL}/images/villa91.avif`, `${BASE_URL}/images/villa91_1.avif`], description: "Vilë e rehatshme dhe e përshtatshme për grup të vogël, me ambiente të mirëmbajtura dhe hapësira komode për pushime relaksuese.", rooms: 3, capacity: 6, price: 170, originalPrice: 196, discountPrice: 170, amenities: ["Ski-in/Ski-out", "Kitchen", "Wifi", "Free parking on premises", "TV", "Washer"] },
  { id: 96, name: "Escape Hotel Himare", location: "Himarë", rating: 4.1, images: [`${BASE_URL}/images/hotel63.avif`, `${BASE_URL}/images/hotel63_1.avif`, `${BASE_URL}/images/hotel63_2.avif`], description: "Hotel modern dhe relaksues, i pajisur me pishinë dhe jacuzzi privat për një qëndrim komod.", rooms: 1, capacity: 2, price: 186, originalPrice: 215, discountPrice: 186, amenities: ["Wifi", "Dedicated workspace", "Free parking on premises", "Pool", "Private hot tub - open 24 hours", "TV"] },
  { id: 97, name: "ALYACHT Premium Hotel", location: "Sarandë", rating: 4.5, images: [`${BASE_URL}/images/hotel39.jpg`, `${BASE_URL}/images/hotel39_1.jpg`, `${BASE_URL}/images/hotel39_2.jpg`, `${BASE_URL}/images/hotel39_3.jpg`], description: "Hotel luksoz dhe i rehatshëm pranë plazhit.", rooms: 1, capacity: 2, price: 87, originalPrice: 101, discountPrice: 87, amenities: ["Non-smoking Rooms", "Free Parking", "Room Service", "Free Wi-Fi", "Beachfront", "Bar", "Private Beach Area", "Excellent Breakfast"] },
  { id: 165, name: "Luxury Apartments", location: "Tirana", rating: 4.5, images: [`${BASE_URL}/images/apartment66.avif`, `${BASE_URL}/images/apartment66_1.avif`, `${BASE_URL}/images/apartment66_2.webp`, `${BASE_URL}/images/apartment66_3.avif`], description: "Apartament luksoz dhe i rehatshëm për një qëndrim të këndshëm.", rooms: 1, capacity: 3, price: 56, originalPrice: 65, discountPrice: 56, amenities: ["Kitchen", "Wifi", "Free parking on premises", "Washer"] },
  { id: 166, name: "Grand Hotel", location: "Himarë", rating: 4.4, images: [`${BASE_URL}/images/hotel74.avif`, `${BASE_URL}/images/hotel74_1.avif`], description: "Hotel modern dhe i sigurt, ideal për një qëndrim relaksues për dy persona.", rooms: 1, capacity: 2, price: 38, originalPrice: 45, discountPrice: 38, amenities: ["Wifi", "Dedicated workspace", "Free parking on premises", "TV", "Air conditioning", "Exterior security cameras on property"] },
  { id: 167, name: "Ionian Premium Villas", location: "Sarandë", rating: 4.8, images: [`${BASE_URL}/images/villa21.jpg`, `${BASE_URL}/images/villa21_1.jpg`, `${BASE_URL}/images/villa21_2.jpg`, `${BASE_URL}/images/villa21_3.jpg`], description: "Vila premium me pishinë të jashtme, ambiente familjare dhe pamje relaksuese.", rooms: 3, capacity: 7, price: 230, originalPrice: 260, discountPrice: 230, amenities: ["Free on-site parking", "Outdoor swimming pool", "Free Wifi", "Private bathroom", "Family rooms", "View", "Air conditioning", "Non-smoking rooms", "Flat-screen TV"] },
  { id: 168, name: "Piro Apartment", location: "Sarandë", rating: 3.3, images: [`${BASE_URL}/images/apartment5.jpeg`, `${BASE_URL}/images/apartment5_1.jpeg`, `${BASE_URL}/images/apartment5_2.jpeg`, `${BASE_URL}/images/apartment5_3.jpeg`], description: "Apartament i thjeshtë dhe i rehatshëm me akses në të gjitha shërbimet bazë.", rooms: 1, capacity: 2, price: 47, originalPrice: 55, discountPrice: 47, amenities: ["Wifi", "Dedicated workspace", "Free parking on premises", "TV", "Washer", "Air Conditioning"] }
];

function Deals({ favorites, setFavorites }) {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showTopButton, setShowTopButton] = useState(false);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const updated = prev.includes(id)
        ? prev.filter(fav => fav !== id)
        : [...prev, id];
      return [...new Set(updated)]; // siguron ID unike
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300); // shfaqet kur scroll > 300px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen py-10">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-200 origin-left z-[100]" style={{ scaleX }} />

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
                  className="mt-3 text-slate-900 font-semibold cursor-pointer hover:underline"
                >
                  {deal.name.toLowerCase().includes("villa") ||
                    deal.name.toLowerCase().includes("chalet")
                    ? "View Villa →"
                    : deal.name.toLowerCase().includes("apartment")
                      ? "View Apartment →"
                      : "View Hotel →"}
                </p>

                {/* Button */}
                <Link
                  to="/hotels"
                  className="mt-1 w-full py-3.5 rounded-2xl bg-slate-100 text-slate-800 font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-slate-900 hover:text-slate-100 hover:shadow-[0_10px_20px_rgba(51,65,85,0.3)] hover:-translate-y-0.5 active:scale-95 shadow-md flex items-center justify-center gap-2"
                >
                  Browse
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedHotel && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Ultra-smooth Backdrop */}
            <div
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-md transition-opacity animate-fadeIn"
              onClick={() => setSelectedHotel(null)}
            />

            {/* The "Floating" Card */}
            <div className="relative w-full max-w-[440px] bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden animate-slideUp flex flex-col max-h-[85vh]">

              {/* Floating Close Button */}
              <button
                onClick={() => setSelectedHotel(null)}
                className="absolute z-20 top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/20 backdrop-blur-xl border border-white/30 text-white rounded-full hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-xl"
              >
                ✕
              </button>

              {/* Image Container with Gradient Overlay */}
              <div className="relative h-60 min-h-[240px] overflow-hidden">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true, dynamicBullets: true }}
                  modules={[Navigation, Pagination]}
                  className="h-full w-full"
                >
                  {selectedHotel.images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={img}
                        alt={selectedHotel.name}
                        className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Content Area */}
              <div className="p-7 overflow-y-auto custom-scrollbar">
                {/* Header: Title and Rating */}
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-extrabold text-slate-900 leading-tight tracking-tight">
                      {selectedHotel.name}
                    </h2>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-medium">{selectedHotel.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-2xl shadow-sm">
                    <span className="text-slate-700">★</span>
                    <span className="text-sm font-bold text-slate-700">{selectedHotel.rating}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[15px] leading-relaxed text-slate-600 mb-6 font-normal italic">
                  "{selectedHotel.description}"
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-slate-50/80 rounded-2xl border border-slate-100">
                    <div className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm">
                      <BedDouble className="w-4 h-4 text-slate-600" />
                    </div>
                    <span className="text-sm font-bold text-slate-800">{selectedHotel.rooms} Rooms</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50/80 rounded-2xl border border-slate-100">
                    <div className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm">
                      <Users className="w-4 h-4 text-slate-600" />
                    </div>
                    <span className="text-sm font-bold text-slate-800">{selectedHotel.capacity} Guests</span>
                  </div>
                </div>

                {/* Amenities Pill Box */}
                {selectedHotel.amenities && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedHotel.amenities.map((a, i) => (
                      <span key={i} className="px-3 py-1.5 text-[11px] font-bold text-slate-600 bg-slate-50/50 border border-indigo-100 rounded-full tracking-wide">
                        {a.toUpperCase()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Sticky Footer */}
              <div className="p-6 bg-slate-50/50 backdrop-blur-sm border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Price</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900">{selectedHotel.price}€</span>
                    <span className="text-sm font-semibold text-slate-500">/ night</span>
                  </div>
                </div>

                <div className="h-10 w-10 bg-slate-900 flex items-center justify-center rounded-2xl text-white shadow-lg shadow-slate-200">
                  <HandCoins className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SCROLL TO TOP BUTTON */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-opacity duration-300 z-50
                    ${showTopButton ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        ▲
      </button>

    </div>
  );
}

export default Deals;