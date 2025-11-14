import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Tilt from 'react-parallax-tilt';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, Hotel, CircleCheck, Percent, Euro, Phone, LockKeyhole, Clock, MessageCircle, MessageSquareText } from "lucide-react";

import mainImage from "../images/main.jpg";
import prishtina0Image from "../images/prishtina-.jpeg";
import prishtina3Image from "../images/prishtina0.jpg";
import prishtina2Image from "../images/prishtina2.webp";

import tirana0Image from "../images/tirana-.jpg";
import tirana1Image from "../images/tirana0.webp";
import tiranaImage from "../images/tirana.jpg";
import tirana3Image from "../images/tirana3.jpg";

import brezovica0Image from "../images/brezovica-.jpg";
import brezovica1Image from "../images/brezovica0.webp";
import brezovicaImage from "../images/brezovica.jpg";
import brezovica3Image from "../images/brezovica3.jpg";

import dhermi0Image from "../images/dhermi-.jpg";
import dhermiImage from "../images/dhermi.jpg";

import radhimeImage from "../images/radhime.jpg";
import ksamil1 from "../images/ksamil1.jpg";

import sarande0Image from "../images/sarande0.jpg";
import sarande1Image from "../images/sarande1.jpeg";

import peja0Image from "../images/peja0.jpg";
import prizren0Image from "../images/prizren0.jpg";
import korca0Image from "../images/korca0.jpg";
import himare0Image from "../images/himare0.jpg";

const destinationss = [
  { name: "Prishtina", image: prishtina0Image },
  { name: "Tirana", image: tirana0Image },
  { name: "Brezovicë", image: brezovica0Image },
  { name: "Dhërmi", image: dhermi0Image },
  { name: "Ksamil", image: ksamil1 },
  { name: "Pejë", image: peja0Image },
  { name: "Sarandë", image: sarande0Image },
  { name: "Prizren", image: prizren0Image },
  { name: "Korçë", image: korca0Image },
  { name: "Himarë", image: himare0Image },

];

const deals = [
  { id: 2, hotelName: "Brezovica Hotel", location: "Brezovica, Kosovo", price: "$170 / night", image: brezovicaImage, discount: "15% Off" },
  { id: 3, hotelName: "Villa 16", location: "Dhermi, Albania", price: "$350 / night", image: dhermiImage, discount: "15% Off" },
  { id: 4, hotelName: "Marriott Hotel", location: "Tirana, Albania", price: "$211 / night", image: tiranaImage, discount: "20% Off" },
  { id: 7, hotelName: "Prishtina City Apartaments", location: "Prishtina, Kosovo", price: "$55 / night", image: prishtina2Image, discount: "30% Off" },];

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

  return (
    <div>
      {/* Hero Section */}
      <section
        className={`relative bg-cover bg-center h-screen transition-opacity duration-700 w-full ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url(${mainImage})` }}
      >
        {loaded && (
          <div className="bg-black bg-opacity-40 h-full flex flex-col justify-center items-center text-white text-center px-4 w-full">
            <motion.h1
              className="mb-6 text-4xl md:text-6xl font-extrabold drop-shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Start your hotel search below...
            </motion.h1>

            <motion.p
              className="mb-8 text-lg md:text-xl text-gray-200 max-w-xl"
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
      <section className="max-w-8xl mx-auto px-4 py-12">
        <h2
          onClick={() => navigate("/destinations")}
          className="text-3xl mb-10 text-gray-800 flex items-center justify-center gap-4 cursor-pointer"
        >
          <span className="w-16 h-[2px] bg-gray-400 rounded-full"></span>
          <span>Destinacionet</span>
          <span className="w-16 h-[2px] bg-gray-400 rounded-full"></span>
        </h2>
        <Slider {...sliderSettings}>
          {destinationss.map((dest) => (
            <div key={dest.name} className="px-2">
              <div
                className="relative rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => goToDestination(dest.name)}
              >
                <img src={dest.image} alt={dest.name} className="w-full h-48 object-cover" />
                <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-white p-2 text-center font-semibold">
                  {dest.name}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      <section className="py-16 text-center">
        <h2
          className="text-3xl mb-12 text-gray-800 drop-shadow-sm tracking-wide cursor-pointer transition-transform duration-300 hover:scale-105 flex items-center justify-center gap-2"
        >
          Destinacionet më të vizituara <MapPin className="w-6 h-6 text-gray-600" />
        </h2>
        <div
          onClick={() => navigate("/destinations")}
          className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {[
            { img: tirana1Image, name: "Tiranë" },
            { img: sarande1Image, name: "Sarandë" },
            { img: prishtina3Image, name: "Prishtinë" },
            { img: brezovica1Image, name: "Brezovicë" },
          ].map((dest, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl w-64 h-44 transform transition-all duration-500
             shadow-[0_20px_60px_rgba(0,0,0,0.4)]
             hover:scale-105 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)] group"
            >

              {/* Fotoja */}
              <img
                src={dest.img}
                alt={dest.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:blur-sm group-hover:brightness-90"
              />

              {/* Overlay gradient për emrin */}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white text-center py-2 font-semibold text-lg">
                {dest.name}
              </div>

              {/* Teksti që shfaqet kur hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 bg-black/40 text-white text-m font-semibold">
                More →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kategoritë: Hotele, Villa, Apartamente */}
      <section className="max-w-7xl mx-auto px-4 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {/* Hotele */}
          <div className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <img
              src={radhimeImage}
              alt="Hotels"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
              <h3 className="text-2xl font-bold mb-2">Hotele</h3>
              <p className="text-sm">Zbuloni hotele të përshtatshme për çdo buxhet.</p>
              <Link
                to="/hotels"
                className="mt-4 bg-gray-900 text-gray-400 px-6 py-2 rounded-md font-semibold
             shadow-xl hover:shadow-2xl transition-all duration-300
             transform hover:scale-105 active:scale-95
             bg-gradient-to-r from-gray-800 via-gray-900 to-gray-900
             hover:from-gray-700 hover:via-gray-800 hover:to-gray-900
             ring-1 ring-gray-700 hover:ring-gray-500"
              >
                More
              </Link>
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
              <h3 className="text-2xl font-bold mb-2">Villa</h3>
              <p className="text-sm">Relaksohu në vilat më luksoze.</p>
              <Link
                to="/villas"
                className="mt-4 bg-gray-900 text-gray-400 px-6 py-2 rounded-md font-semibold
             shadow-xl hover:shadow-2xl transition-all duration-300
             transform hover:scale-105 active:scale-95
             bg-gradient-to-r from-gray-800 via-gray-900 to-gray-900
             hover:from-gray-700 hover:via-gray-800 hover:to-gray-900
             ring-1 ring-gray-700 hover:ring-gray-500"
              >
                More
              </Link>
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
              <h3 className="text-2xl font-bold mb-2">Apartamente</h3>
              <p className="text-sm">Qëndrim komod për familje ose grupe të vogla.</p>
              <Link
                to="/apartments"
                className="mt-4 bg-gray-900 text-gray-400 px-6 py-2 rounded-md font-semibold
             shadow-xl hover:shadow-2xl transition-all duration-300
             transform hover:scale-105 active:scale-95
             bg-gradient-to-r from-gray-800 via-gray-900 to-gray-900
             hover:from-gray-700 hover:via-gray-800 hover:to-gray-900
             ring-1 ring-gray-700 hover:ring-gray-500"
              >
                More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ofertat */}
      <section className="py-12 w-full px-4">
        <div className="max-w-8xl mx-auto px-4 text-center">
          <div className="relative inline-block text-center w-full">
            <h2
              className="text-3xl mb-12 text-gray-800 drop-shadow-sm tracking-wide cursor-pointer transition-transform duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Percent className="w-5 h-5 text-gray-600" /> Ofertat tona <Percent className="w-5 h-5 text-gray-600" />
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {deals.map((deal) => (
              <Tilt
                key={deal.id}
                className="rounded-lg shadow-lg overflow-hidden transition-transform duration-300"
                tiltMaxAngleX={20}  // sa të rrotullohet horizontal
                tiltMaxAngleY={20}  // sa të rrotullohet vertical
                perspective={1000}   // sa "3D" të duket
                scale={1.05}         // efekti i zoom kur hover
                transitionSpeed={400}
              >
                <div className="relative">
                  <img src={deal.image} alt={deal.hotelName} className="w-full h-48 object-cover" />
                  <div className="absolute bottom-0 bg-black bg-opacity-60 w-full text-white p-3 text-center">
                    <p className="font-bold text-lg">{deal.hotelName}</p>
                    <p className="text-sm">{deal.location}</p>
                    <p className="mt-1 font-bold">{deal.discount}</p>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              to="/deals"
              className="inline-block px-6 py-2 rounded-md text-gray-800 bg-gray-200 border border-gray-400 hover:bg-gray-300 transition-colors duration-200"
            >
             Më shumë oferta
            </Link>

          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        {/* Section heading */}
        <h2
          className="relative text-3xl md:text-3xl mb-12 text-gray-800 tracking-tight inline-block overflow-hidden"
          data-aos="fade-up"
          data-aos-duration="900"
        >
          Si funksionon platforma jonë?
          <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-400 to-purple-400 animate-[slide_2s_ease-in-out_infinite]"></span>

          <style>{`
    @keyframes slide {
      0% { transform: translateX(-100%); }
      50% { transform: translateX(0); }
      100% { transform: translateX(100%); }
    }
  `}</style>
        </h2>

        {/* Container with cards and colored blobs */}
        <div className="relative overflow-hidden rounded-3xl p-12 bg-gray-900">
          {/* Colored blobs inside container */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-pink-500 opacity-30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-10 right-1/4 w-80 h-80 bg-blue-500 opacity-25 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
            {/* Card */}
            <div
              className="p-6 bg-gray-900/50 backdrop-blur-md rounded-3xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer relative z-10 group flex flex-col items-center text-center"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div className="text-5xl mb-4 animate-bounce">
                <Search className="w-10 h-10 text-indigo-800" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-gray-300 transition-colors duration-500 group-hover:text-blue-400">
                Kërko
              </h3>
              <p className="text-gray-400 text-sm">
                Gjeni hotelin ideal sipas vendndodhjes, çmimit dhe datës.
              </p>
              <div className="mt-4 h-1 w-16 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full transition-all duration-500 group-hover:w-full"></div>
            </div>

            {/* Card 2 */}
            <div
              className="p-6 bg-gray-900/50 backdrop-blur-md rounded-3xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer relative z-10 group flex flex-col items-center text-center"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="text-5xl mb-4 animate-bounce">
                <Hotel className="w-10 h-10 text-indigo-800" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-gray-300 transition-colors duration-500 group-hover:text-blue-400">
                Zgjedh
              </h3>
              <p className="text-gray-400 text-sm">
                Shfletoni ofertat dhe shikoni detajet e çdo hoteli.
              </p>
              <div className="mt-4 h-1 w-16 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full transition-all duration-500 group-hover:w-full"></div>
            </div>

            {/* Card 3 */}
            <div
              className="p-6 bg-gray-900/50 backdrop-blur-md rounded-3xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer relative z-10 group flex flex-col items-center text-center"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="text-5xl mb-4 animate-bounce">
                <CircleCheck className="w-10 h-10 text-indigo-800" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-gray-300 transition-colors duration-500 group-hover:text-blue-400">
                Rezervo
              </h3>
              <p className="text-gray-400 text-sm">
                Rezervoni me disa klikime dhe merrni konfirmimin menjëherë.
              </p>
              <div className="mt-4 h-1 w-16 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full transition-all duration-500 group-hover:w-full"></div>
            </div>

          </div>

        </div>
      </section>

      {/* Pse të zgjedhësh */}
      <section className="max-w-7xl mx-auto px-4 py-20 -mt-5 text-center relative overflow-hidden">
        {/* Section heading */}
        <h2
          className="text-4xl md:text-3xl mb-16 text-gray-800 inline-block relative bg-clip-text animate-gradient-x"
          data-aos="fade-down"
          data-aos-duration="1200"
        >
          Pse të zgjedhësh platformën tonë?
          <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 w-24 h-1 bg-gradient-to-r from-gray-700 to-purple-400 rounded-full animate-pulse"></span>
        </h2>

        {/* Flex container with cards and colored blobs */}
        <div className="flex flex-wrap justify-center gap-8 relative z-10 overflow-hidden rounded-3xl p-12 bg-gray-900">
          {/* Colored blobs inside container */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-pink-500 opacity-30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-10 right-1/4 w-80 h-80 bg-blue-500 opacity-25 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

          {/* Cards */}
          {[
            { icon: <Clock className="w-10 h-10 text-indigo-800" />, title: "Rezervim i shpejtë", text: "Proces i lehtë dhe i menjëhershëm.", delay: 100 },
            { icon: <Euro className="w-10 h-10 text-indigo-800" />, title: "Çmime më të mira", text: "Krahaso dhe gjej ofertën më të volitshme.", delay: 200 },
            { icon: <LockKeyhole className="w-10 h-10 text-indigo-800" />, title: "Rezervim i sigurt", text: "Të dhënat dhe pagesat mbrohen maksimalisht.", delay: 300 },
            { icon: <Phone className="w-10 h-10 text-indigo-800" />, title: "Mbështetje 24/7", text: "Ekipi ynë është gjithmonë në dispozicionin tënd.", delay: 400 },
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

      {/* Sugjerimet */}
      <section className="py-12 mb-10 -mt-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl text-center text-gray-800 mb-10 transition-transform duration-500 hover:scale-105">
            <div className="flex justify-center mb-2">
              <MessageSquareText className="w-8 h-8 text-gray-600" />
            </div>
            Sugjerime nga ne
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[himare0Image, brezovica0Image, tirana0Image].map((img, idx) => {
              const titles = [
                "Top 5 vendet për pushime verore në Shqipëri",
                "Pse Brezovica është destinacion perfekt dimëror?",
                "Udhëzues për një fundjavë në Tiranë"
              ];

              const texts = [
                "Plazhet më të bukura, ushqimi dhe çmimet më të mira... Nga Dhërmi deri në Ksamil, çdo vend ofron përvoja të veçanta.",
                "Brezovica është vendi ideal për ski, pushim dhe natyrë. Shijo ajrin e pastër malor dhe hotelet komode.",
                "Tirana ofron muzeume, restorante moderne dhe jetën e gjallë të natës."
              ];

              const extraTexts = [
                "Nëse preferoni qetësinë, Radhima dhe Himara janë ideale për relaks, ndërsa Ksamili dhe Saranda ofrojnë jetën e gjallë të natës. Mos harroni të provoni ushqimet tradicionale të zonës dhe të rezervoni akomodimin paraprakisht gjatë sezonit të verës.",
                "Pista të përgatitura mirë, peizazhe të mbuluara me borë dhe restorante me ushqim tradicional bëjnë që çdo vizitë të jetë e paharrueshme. Në mbrëmje mund të relaksohesh pranë zjarrit në lodge ose të provosh spa-t lokale. Për një përvojë më të plotë, vizito edhe fshatrat përreth.",
                "Vizito Sheshin Skënderbej, shijo kafen në Bllok dhe eksploro artin modern dhe galeritë lokale. Perfekte për të përjetuar kulturën dhe energjinë e kryeqytetit."
              ];

              return (
                <div
                  key={idx}
                  className="bg-grey p-5 rounded-xl shadow-2xl relative group overflow-hidden cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:rotate-1 hover:shadow-2xl"
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
                  <h3 className="font-bold mb-2 mt-4 text-gray-800">
                    {titles[idx]}
                  </h3>
                  <p className="text-sm text-gray-600 transition-all duration-500 max-h-16 overflow-hidden group-[.expanded]:max-h-96">
                    {texts[idx]}
                    <span className="hidden group-[.expanded]:inline">
                      {" "}{extraTexts[idx]}
                    </span>
                  </p>

                  {/* Button */}
                  <button
                    className="text-blue-900 font-semibold mt-3 hover:underline focus:outline-none transition-colors duration-300"
                    data-text="Lexo më pak ←"
                    onClick={(e) => {
                      const card = e.target.closest(".group");
                      const expanded = card.classList.toggle("expanded");
                      e.target.textContent = expanded ? e.target.dataset.text : "Lexo më shumë →";
                    }}
                  >
                    Lexo më shumë →
                  </button>

                  {/* Optional shimmer overlay */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/10 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-pulse"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 relative overflow-hidden">
        {/* Sfondo dekorativ me linja lëvizëse, mbulon të gjithë seksionin */}
        <div className="absolute inset-0 flex flex-wrap opacity-20 justify-between">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="w-1 h-16 bg-gradient-to-b from-black to-blue-400 rounded-full animate-wave"
              style={{
                margin: `${Math.random() * 10}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Përshtypjet e klientëve */}
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl mb-16 relative inline-block text-center">
            <div className="flex justify-center mb-2">
              <MessageCircle className="w-8 h-8 text-gray-600" />
            </div>
            Përshtypjet e klientëve
            <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-black to-blue-500 rounded-full animate-pulse"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="relative p-10 rounded-3xl bg-white/20 backdrop-blur-md border border-white/25 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-2 hover:shadow-gray-900/50"
              >
                {/* Dekor abstrakt */}
                <div className="absolute -top-5 -right-5 w-14 h-14 bg-gradient-to-tr from-black via-blue-700 to-indigo-400 rounded-full opacity-40 animate-ping-slow"></div>
                <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-gradient-to-tr from-gray-900 via-gray-600 to-red-300 rounded-full opacity-30 animate-bounce-slow"></div>

                {/* Quote */}
                <p className="text-gray-900 italic text-lg mb-8 relative z-10">
                  “{review.comment}”
                </p>

                {/* Klienti */}
                <div className="flex items-center justify-center space-x-4 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-blue-700 flex items-center justify-center font-bold text-white text-2xl">
                    {review.name[0]}
                  </div>
                  <span className="font-semibold text-gray-900 text-lg">{review.name}</span>
                </div>

                {/* Yjet */}
                <div className="mt-6 flex justify-center space-x-2 relative z-10 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="animate-spin-slow hover:animate-spin-fast">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 p-4 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-opacity duration-300 z-50
          ${showTopButton ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            ▲
          </button>
        </div>

        <style>
          {`
      @keyframes wave {
        0% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0); }
      }
      .animate-wave { animation: wave infinite ease-in-out; }

      @keyframes ping-slow {
        0%, 100% { transform: scale(1); opacity: 0.4; }
        50% { transform: scale(1.2); opacity: 0.7; }
      }
      .animate-ping-slow { animation: ping-slow 5s ease-in-out infinite; }

      @keyframes bounce-slow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
      }
      .animate-bounce-slow { animation: bounce-slow 6s ease-in-out infinite; }

      @keyframes spin-slow {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      
      @keyframes spin-fast {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .animate-spin-fast { animation: spin-fast 1s linear infinite; }
    `}
        </style>
      </section>
    </div >
  );
}

export default HomePage;
