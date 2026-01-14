import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { motion, useScroll, useSpring } from "framer-motion";
import SearchBar from "../components/SearchBar";
import { useNavigate, Link } from "react-router-dom";
import { Search, Hotel, CircleCheck, BedDouble, Users, HandCoins, Euro, Phone, LockKeyhole, Clock } from "lucide-react";

import mainImage from "../images/main.jpg";
import prishtina0Image from "../images/prishtina-.jpeg";

import tirana0Image from "../images/tirana-.jpg";
import tirana3Image from "../images/tirana3.jpg";

import brezovica0Image from "../images/brezovica-.jpg";
import brezovica3Image from "../images/villa9.jpg";

import dhermi0Image from "../images/dhermi-.jpg";

import radhimeImage from "../images/radhime.jpg";
import ksamil1 from "../images/ksamil1.jpg";

import sarande0Image from "../images/sarande0.jpg";

import peja0Image from "../images/peja0.jpg";
import prizren0Image from "../images/prizren0.jpg";
import himare0Image from "../images/himare0.jpg";

import villa21 from "../images/villa21.jpg";
import hotel23 from "../images/hotel23.jpg";
import apartment95 from "../images/apartment95.avif";
import villa4 from "../images/villa4.avif";

const destinationss = [
  { name: "Prishtina", image: prishtina0Image },
  { name: "Tirana", image: tirana0Image },
  { name: "Brezovicë", image: brezovica0Image },
  { name: "Dhërmi", image: dhermi0Image },
  { name: "Ksamil", image: ksamil1 },
  { name: "Pejë", image: peja0Image },
  { name: "Sarandë", image: sarande0Image },
  { name: "Prizren", image: prizren0Image },
  { name: "Himarë", image: himare0Image }
];

const deals = [
  { id: 167, name: "Ionian Premium Villas", location: "Sarandë", rating: 4.8, images: [villa21], description: "Vila premium me pishinë të jashtme, ambiente familjare dhe pamje relaksuese.", rooms: 3, capacity: 7, price: 230, originalPrice: 260, discountPrice: 230, amenities: ["Free on-site parking", "Outdoor swimming pool", "Free Wifi", "Private bathroom", "Family rooms", "View", "Air conditioning", "Non-smoking rooms", "Flat-screen TV"] },
  { id: 72, name: "Hotel MANAMI", location: "Prishtina", rating: 4.7, images: [hotel23], description: "Hotel butik elegant në qendër të Prishtinës me dizajn modern, restorant gourmet dhe ambiente relaksuese.", rooms: 1, capacity: 2, price: 117, originalPrice: 150, discountPrice: 117, amenities: ["Wi-Fi", "Breakfast", "Restaurant", "Parking", "Air Conditioning", "24h Reception"] },
  { id: 48, name: "Cinco Apartments", location: "Pejë", rating: 4.3, images: [apartment95], description: "Apartament modern dhe i rehatshëm për 5 persona, me kuzhinë të pajisur dhe facilitete për një qëndrim të komod.", rooms: 2, capacity: 5, price: 94, originalPrice: 108, discountPrice: 94, amenities: ["Kitchen", "Wifi", "Free parking on premises", "TV", "Washer"] },
  { id: 82, name: "Villa Bora", location: "Brezovicë", rating: 4.6, images: [villa4], description: "Hapësira të ngrohta me dekor modern, ideal për relaks dhe aktivitete të ndryshme.", rooms: 3, capacity: 7, price: 172, originalPrice: 200, discountPrice: 172, amenities: ["Mountain View", "Wi-Fi", "Parking", "Fully Equipped Kitchen", "Fireplace", "Private Garden"] },
]
const reviews = [
  { name: "Arta", comment: "Eksperiencë fantastike në Brezovicë!" },
  { name: "Besnik", comment: "Shërbim perfekt dhe çmime të mira." },
];

// ✅ Slider Settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 640, settings: { slidesToShow: 1 } },
  ],
};

function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = mainImage;
    img.onload = () => setLoaded(true);

    // Scroll event për button
    const handleScroll = () => {
      if (window.scrollY > 300) setShowTopButton(true);
      else setShowTopButton(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToDestination = (name) => {
    navigate(`/destinations?scroll=${name}`);
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true });
  }, []);

  const handleMoreClick = (tab) => {
    navigate(`/hotels?tab=${tab}`);
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-200 origin-left z-[100]" style={{ scaleX }} />
      {/* Hero Section */}
      <section
        className={`relative bg-cover bg-center h-[650px] transition-opacity duration-700 w-full ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url(${mainImage})` }}
      >
        {loaded && (
          <div className="bg-black bg-opacity-40 h-full flex flex-col justify-center items-center text-white text-center px-4 w-full">
            <motion.h1
              className="mb-6 text-4xl md:text-5xl mt-10 font-extrabold drop-shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Start your hotel search below...
            </motion.h1>

            <motion.p
              className="mb-5 text-lg md:text-xl text-gray-200 max-w-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            >
              Find the best hotels, resorts, and stays with the best prices.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1 }}
            >
              <SearchBar />
            </motion.div>

          </div>
        )}
      </section>

      {/* Destinacionet */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <Slider {...sliderSettings}>
          {destinationss.map((dest) => (
            <div key={dest.name} className="px-2">
              <div
                className="relative rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => goToDestination(dest.name)}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-72 object-cover"  // <— rritja e height
                />
                <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-white p-3 text-center font-semibold text-lg">
                  {dest.name}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Kategoritë: Hotele, Villa, Apartamente */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {/* Hotele */}
          <div className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <img
              src={radhimeImage}
              alt="Hotels"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
              <h3 className="text-2xl font-bold mb-2">Hotels</h3>
              <p className="text-sm">Discover hotels suitable for every budget.</p>
              <button
                onClick={() => handleMoreClick("hotels")}
                className="mt-4 px-6 py-2 rounded-md font-semibold text-gray-300 
                bg-black/40 border border-gray-700 hover:bg-black/60 hover:text-gray-400 transition-all duration-200"
              >
                More
              </button>
            </div>
          </div>

          {/* Villa */}
          <div className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <img
              src={brezovica3Image}
              alt="Villas"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
              <h3 className="text-2xl font-bold mb-2">Villas</h3>
              <p className="text-sm">Relax in the most luxurious villas.</p>
              <button
                onClick={() => handleMoreClick("villas")}
                className="mt-4 px-6 py-2 rounded-md font-semibold text-gray-300 
                bg-black/40 border border-gray-700 hover:bg-black/60 hover:text-gray-400 transition-all duration-200"
              >
                More
              </button>
            </div>
          </div>

          {/* Apartamente */}
          <div className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <img
              src={tirana3Image}
              alt="Apartments"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
              <h3 className="text-2xl font-bold mb-2">Apartments</h3>
              <p className="text-sm">Comfortable stay for families or small groups.</p>
              <button
                onClick={() => handleMoreClick("apartments")}
                className="mt-4 px-6 py-2 rounded-md font-semibold text-gray-300 
                bg-black/40 border border-gray-700 hover:bg-black/60 hover:text-gray-400 transition-all duration-200"
              >
                More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ofertat */}
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl mb-7 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-700 to-gray-400 drop-shadow-lg tracking-wide uppercase">
            Our Deals
          </h1>
          {/* Deals Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="relative rounded-3xl overflow-hidden bg-white/60 backdrop-blur-xl border border-gray-300 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 min-h-[420px]"
              >
                {/* Image */}
                <div className="relative h-60 w-full">
                  <img
                    src={deal.images[0]}
                    alt={deal.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Discount */}
                  {deal.originalPrice && deal.discountPrice && (
                    <span className="absolute top-3 left-3 bg-black/40 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {Math.round(
                        ((deal.originalPrice - deal.discountPrice) /
                          deal.originalPrice) *
                        100
                      )}
                      % OFF
                    </span>
                  )}
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
                  <p className="text-gray-600 font-bold mt-2 flex items-center gap-2">
                    <HandCoins className="w-4 h-4" />
                    <span className="line-through text-gray-400">
                      {deal.originalPrice}€
                    </span>
                    <span className="text-red-700">{deal.discountPrice}€</span> / night
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center items-center mt-10">
            <div className="w-full flex justify-center">
              <button
                onClick={() => navigate("/deals")}
                className="px-6 py-2 border border-gray-500 text-gray-700 rounded-xl 
                 backdrop-blur-sm bg-white/20 hover:bg-white/30 transition-all"
              >
                View More Deals
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sugjerimet */}
      <section className="py-12 -mt-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl text-center text-gray-600 mb-10 transition-transform duration-500 hover:scale-105">
            SUGGESTIONS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[himare0Image, brezovica0Image, tirana0Image].map((img, idx) => {
              const titles = [
                "Top 5 Summer Vacation Destinations in Albania",
                "Why Brezovica is the Perfect Winter Destination",
                "Guide for a Weekend in Tirana"
              ];

              const texts = [
                "The most beautiful beaches, food, and best prices... From Dhërmi to Ksamil, each place offers unique experiences.",
                "Brezovica is the ideal spot for skiing, relaxation, and nature. Enjoy the fresh mountain air and comfortable hotels.",
                "Tirana offers museums, modern restaurants, and a lively nightlife."
              ];

              const extraTexts = [
                "If you prefer tranquility, Radhima and Himara are perfect for relaxing, while Ksamil and Saranda offer vibrant nightlife. Don't forget to try the traditional local dishes and book your accommodation in advance during the summer season.",
                "Well-prepared ski slopes, snow-covered landscapes, and restaurants with traditional cuisine make every visit unforgettable. In the evening, you can relax by the lodge fire or try local spas. For a fuller experience, also visit the nearby villages.",
                "Visit Skanderbeg Square, enjoy coffee in Blloku, and explore modern art and local galleries. Perfect for experiencing the culture and energy of the capital."
              ];

              return (
                <div
                  key={idx}
                  className="bg-gray-50 p-5 rounded-xl shadow-2xl relative group overflow-hidden cursor-pointer transform transition-all duration-500 border border-gray-300 hover:-translate-y-2 hover:scale-105 hover:rotate-1 hover:shadow-2xl"
                >
                  {/* Animated Image */}
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={img}
                      alt={`blog-${idx}`}
                      className="h-40 w-full object-cover rounded-md transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
                    />
                  </div>

                  {/* Card content */}
                  <h3 className="font-bold mb-2 mt-4 text-gray-600 ">
                    {titles[idx]}
                  </h3>
                  <p className="text-sm text-gray-500 transition-all duration-500 max-h-16 overflow-hidden group-[.expanded]:max-h-96">
                    {texts[idx]}
                    <span className="hidden group-[.expanded]:inline">
                      {" "}{extraTexts[idx]}
                    </span>
                  </p>

                  {/* Button */}
                  <button
                    className="text-gray-600 font-semibold mt-3 hover:underline focus:outline-none transition-colors duration-300"
                    data-text="Less ←"
                    onClick={(e) => {
                      const card = e.target.closest(".group");
                      const expanded = card.classList.toggle("expanded");
                      e.target.textContent = expanded ? e.target.dataset.text : "More →";
                    }}
                  >
                    More →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 relative overflow-hidden -mt-5">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <Link
            to="/customer-reviews"
            className="text-3xl mb-16 mt-5 relative inline-block text-center text-gray-600 cursor-pointer"
          >
            REVIEWS
            <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-black to-blue-500 rounded-full animate-pulse"></span>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="relative p-4 rounded-3xl bg-gray-50 backdrop-blur-md border border-white/25 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-2 hover:shadow-gray-900/50"
              >
                {/* Dekor abstrakt */}
                <div className="absolute -top-5 -right-5 w-14 h-14 bg-gradient-to-tr from-black via-blue-700 to-indigo-400 rounded-full opacity-40 animate-ping-slow"></div>
                <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-gradient-to-tr from-gray-900 via-gray-600 to-red-300 rounded-full opacity-30 animate-bounce-slow"></div>

                {/* Quote */}
                <p className="text-gray-600 italic text-lg mb-8 relative z-10">
                  “{review.comment}”
                </p>

                {/* Klienti */}
                <div className="flex items-center justify-center space-x-4 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-indigo-900 flex items-center justify-center font-bold text-indigo-200 text-2xl">
                    {review.name[0]}
                  </div>
                  <span className="font-semibold text-gray-600 text-lg">{review.name}</span>
                </div>

                {/* Yjet */}
                <div className="mt-6 flex justify-center space-x-2 relative z-10 text-gray-700">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="animate-spin-slow hover:animate-spin-fast">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 -mt-5 text-center">
        {/* Section heading */}
        <h2
          className="relative text-2xl md:text-3xl mb-12 tracking-tight inline-block overflow-hidden bg-clip-text text-transparent bg-gray-600 uppercase drop-shadow-lg"
          data-aos="fade-up"
          data-aos-duration="900"
        > Steps
          <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#A7C7E7] to-[#C8B6E2] animate-[slide_2s_ease-in-out_infinite]"></span>
        </h2>

        {/* Container with cards and colored blobs */}
        <div className="relative overflow-hidden rounded-3xl p-12 bg-gray-900">
          {/* Soft pastel blobs */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#F2C6DE] opacity-40 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-10 right-1/4 w-80 h-80 bg-[#A7C7E7] opacity-35 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#C8B6E2] opacity-35 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">

            {/* Card 1 */}
            <div
              className="p-6 bg-gray-900/50 backdrop-blur-md rounded-3xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer relative z-10 group flex flex-col items-center text-center"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div className="text-5xl mb-4 animate-bounce">
                <Search className="w-10 h-10 text-[#9BA3EB]" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-gray-300 transition-colors duration-500 group-hover:text-[#A7C7E7]">
                Search
              </h3>
              <p className="text-gray-400 text-sm">
                Find the ideal hotel based on location, price, and date.
              </p>
              <div className="mt-4 h-1 w-16 bg-gradient-to-r from-[#F2C6DE] to-[#C8B6E2] rounded-full transition-all duration-500 group-hover:w-full"></div>
            </div>

            {/* Card 2 */}
            <div
              className="p-6 bg-gray-900/50 backdrop-blur-md rounded-3xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer relative z-10 group flex flex-col items-center text-center"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="text-5xl mb-4 animate-bounce">
                <Hotel className="w-10 h-10 text-[#9BA3EB]" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-gray-300 transition-colors duration-500 group-hover:text-[#A7C7E7]">
                Choose
              </h3>
              <p className="text-gray-400 text-sm">
                Browse offers and view the details of each hotel.
              </p>
              <div className="mt-4 h-1 w-16 bg-gradient-to-r from-[#F2C6DE] to-[#C8B6E2] rounded-full transition-all duration-500 group-hover:w-full"></div>
            </div>

            {/* Card 3 */}
            <div
              className="p-6 bg-gray-900/50 backdrop-blur-md rounded-3xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer relative z-10 group flex flex-col items-center text-center"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="text-5xl mb-4 animate-bounce">
                <CircleCheck className="w-10 h-10 text-[#9BA3EB]" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-gray-300 transition-colors duration-500 group-hover:text-[#A7C7E7]">
                Book
              </h3>
              <p className="text-gray-400 text-sm">
                Book in just a few clicks and receive instant confirmation.
              </p>
              <div className="mt-4 h-1 w-16 bg-gradient-to-r from-[#F2C6DE] to-[#C8B6E2] rounded-full transition-all duration-500 group-hover:w-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pse të zgjedhësh */}
      <section className="max-w-7xl mx-auto px-4 py-20 -mt-5 text-center relative overflow-hidden">
        {/* Section heading */}
        <h2
          className="relative text-2xl md:text-3xl mb-12 tracking-tight inline-block overflow-hidden bg-clip-text text-transparent bg-gray-600 uppercase drop-shadow-lg"
          data-aos="fade-up"
          data-aos-duration="900"
        >
          Benefits
          <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#A7C7E7] to-[#C8B6E2] animate-[slide_2s_ease-in-out_infinite]"></span>
        </h2>

        {/* Flex container with cards and colored blobs */}
        <div className="flex flex-wrap justify-center gap-8 relative z-10 overflow-hidden rounded-3xl p-12 bg-gray-900">
          {/* Colored blobs inside container */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#F2C6DE] opacity-40 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-10 right-1/4 w-80 h-80 bg-[#A7C7E7] opacity-35 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#C8B6E2] opacity-35 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          {/* Cards */}
          {[
            { icon: <Clock className="w-10 h-10 text-[#9BA3EB]" />, title: "Fast Booking", text: "Easy and instant process.", delay: 100 },
            { icon: <Euro className="w-10 h-10 text-[#9BA3EB]" />, title: "Best Prices", text: "Compare and find the most affordable deal.", delay: 200 },
            { icon: <LockKeyhole className="w-10 h-10 text-[#9BA3EB]" />, title: "Secure Booking", text: "Your data and payments are fully protected.", delay: 300 },
            { icon: <Phone className="w-10 h-10 text-[#9BA3EB]" />, title: "24/7 Support", text: "Our team is always at your disposal.", delay: 400 },
          ].map((item, i) => (
            <div
              key={i}
              className="flex-1 min-w-[220px] max-w-[250px] p-8 bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-4xl transform hover:-translate-y-4 hover:scale-110 hover:rotate-1 transition-all duration-700 cursor-pointer relative overflow-hidden group flex flex-col items-center text-center"
              data-aos="fade-up"
              data-aos-delay={item.delay}
              data-aos-duration="800"
            >
              {/* Subtle floating accents */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/20 rounded-full blur-2xl animate-blob animation-delay-1000"></div>

              {/* Card content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="text-7xl mb-4 animate-pulse">{item.icon}</div>
                <h3 className="font-bold text-xl mb-2 text-gray-300 group-hover:text-indigo-400 transition-colors duration-500">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.text}</p>

                {/* Animated underline */}
                <div className="mt-4 h-1 w-12 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full mx-auto scale-x-75 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
              </div>
            </div>

          ))}
        </div>
      </section>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-gray-800 text-white shadow-lg border border-gray-500 hover:bg-gray-700 transition-opacity duration-300 z-50
          ${showTopButton ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        ▲
      </button>

    </div >
  );
}

export default HomePage;