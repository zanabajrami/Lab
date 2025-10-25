import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import mainImage from "../images/main.jpg";
import prishtina0Image from "../images/prishtina-.jpeg";
import tirana0Image from "../images/tirana-.jpg";
import brezovica0Image from "../images/brezovica-.jpg";
import dhermi0Image from "../images/dhermi-.jpg";
import brezovicaImage from "../images/brezovica.jpg";
import dhermiImage from "../images/dhermi.jpg";
import tiranaImage from "../images/tirana.jpg";
import peja0Image from "../images/peja0.jpg";
import sarande0Image from "../images/sarande0.jpg";
import prizren0Image from "../images/prizren0.jpg";
import prishtina2Image from "../images/prishtina2.webp";
import korca0Image from "../images/korca0.jpg";
import radhime0Image from "../images/radhime0.jpg";
import himare0Image from "../images/himare0.jpg";
import tirana3Image from "../images/tirana3.jpg";
import brezovica3Image from "../images/brezovica3.jpg";
import radhimeImage from "../images/radhime.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const destinations = [
  { name: "Prishtina", image: prishtina0Image },
  { name: "Tirana", image: tirana0Image },
  { name: "Brezovicë", image: brezovica0Image },
  { name: "Dhërmi", image: dhermi0Image },
  { name: "Pejë", image: peja0Image },
  { name: "Sarandë", image: sarande0Image },
  { name: "Prizren", image: prizren0Image },
  { name: "Radhimë", image: radhime0Image },
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
  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${mainImage})` }}
      >
        <div className="bg-black bg-opacity-40 h-full flex flex-col justify-center items-center text-white text-center px-4">
          <p className="mb-6 text-lg">Start your hotel search below...</p>
          <SearchBar />
        </div>
      </section>


      {/* Destinacionet */}
      <section className="max-w-8xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Destinacionet</h2>

        <Slider {...sliderSettings}>
          {destinations.map((dest) => (
            <div key={dest.name} className="px-2">
              <div className="relative rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-white p-2 text-center font-semibold">
                  {dest.name}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-8">Destinacionet më të njohura</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {["Prishtinë", "Tiranë", "Dhërmi", "Brezovicë", "Sarandë"].map((city, i) => (
            <button
              key={i}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-600 text-gray-300 rounded-full font-semibold transition"
            >
              {city}
            </button>
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
                className="mt-4 bg-gray-900 hover:bg-gray-700 text-gray-400 px-5 py-2 rounded-md font-semibold"
              >
                Shiko më shumë
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
                className="mt-4 bg-gray-900 hover:bg-gray-700 text-gray-400 px-5 py-2 rounded-md font-semibold"
              >
                Shiko më shumë
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
                className="mt-4 bg-gray-900 hover:bg-gray-700 text-gray-400 px-5 py-2 rounded-md font-semibold"
              >
                Shiko më shumë
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ofertat */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-8xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Ofertat tona</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {deals.map((deal) => (
              <div key={deal.id} className="relative rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                <img src={deal.image} alt={deal.hotelName} className="w-full h-48 object-cover" />
                <div className="absolute bottom-0 bg-black bg-opacity-60 w-full text-white p-3 text-center">
                  <p className="font-bold text-lg">{deal.hotelName}</p>
                  <p className="text-sm">{deal.location}</p>
                  <p className="mt-1 font-bold">{deal.discount}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Button për të shikuar të gjitha ofertat */}
          <div className="text-center mt-6">
            <Link
              to="/deals"
              className="bg-gray-300 text-gray-700 hover:bg-gray-500 text-gray px-6 py-3 rounded-md font-bold"
            >
              Shiko të gjitha ofertat
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 text-center">
  <div className="max-w-5xl mx-auto text-center">
    <h2
      className="text-2xl font-bold mb-8"
      data-aos="fade-up"
    >
      Si funksionon platforma jonë?
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        className="p-6 shadow rounded-lg bg-white transition-transform hover:scale-105"
        data-aos="zoom-in"
        data-aos-delay="100"
      >
        <span className="text-3xl">🔍</span>
        <h3 className="font-bold mt-2">Kërko</h3>
        <p className="text-gray-600 text-sm mt-1">
          Gjeni hotelin ideal sipas vendndodhjes, çmimit dhe datës.
        </p>
      </div>

      <div
        className="p-6 shadow rounded-lg bg-white transition-transform hover:scale-105"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <span className="text-3xl">🏨</span>
        <h3 className="font-bold mt-2">Zgjedh</h3>
        <p className="text-gray-600 text-sm mt-1">
          Shfletoni ofertat dhe shikoni detajet e çdo hoteli.
        </p>
      </div>

      <div
        className="p-6 shadow rounded-lg bg-white transition-transform hover:scale-105"
        data-aos="zoom-in"
        data-aos-delay="300"
      >
        <span className="text-3xl">✅</span>
        <h3 className="font-bold mt-2">Rezervo</h3>
        <p className="text-gray-600 text-sm mt-1">
          Rezervoni me disa klikime dhe merrni konfirmimin menjëherë.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Pse të zgjedhësh ne */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-12" data-aos="fade-up">
          Pse të zgjedhësh platformën tonë?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div
            className="p-6 shadow-lg rounded-lg hover:shadow-2xl transition-all bg-white"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <span className="text-5xl mb-3 block">🕒</span>
            <h3 className="font-bold text-lg mb-1">Rezervim i shpejtë</h3>
            <p className="text-gray-600 text-sm">Proces i lehtë dhe i menjëhershëm.</p>
          </div>

          <div
            className="p-6 shadow-lg rounded-lg hover:shadow-2xl transition-all bg-white"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <span className="text-5xl mb-3 block">💸</span>
            <h3 className="font-bold text-lg mb-1">Çmime më të mira</h3>
            <p className="text-gray-600 text-sm">Krahaso dhe gjej ofertën më të volitshme.</p>
          </div>

          <div
            className="p-6 shadow-lg rounded-lg hover:shadow-2xl transition-all bg-white"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <span className="text-5xl mb-3 block">🔒</span>
            <h3 className="font-bold text-lg mb-1">Rezervim i sigurt</h3>
            <p className="text-gray-600 text-sm">Të dhënat dhe pagesat mbrohen maksimalisht.</p>
          </div>

          <div
            className="p-6 shadow-lg rounded-lg hover:shadow-2xl transition-all bg-white"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            <span className="text-5xl mb-3 block">📞</span>
            <h3 className="font-bold text-lg mb-1">Mbështetje 24/7</h3>
            <p className="text-gray-600 text-sm">Ekipi ynë është gjithmonë në dispozicionin tënd.</p>
          </div>
        </div>
      </section>

      {/* Sugjerimet */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Sugjerime nga ne</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Artikulli 1 */}
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition relative group overflow-hidden">
              <img
                src={himare0Image}
                alt="blog1"
                className="rounded-md mb-4 h-40 w-full object-cover"
              />
              <h3 className="font-bold mb-2">Top 5 vendet për pushime verore në Shqipëri</h3>
              <p className="text-sm text-gray-600 transition-all duration-500 max-h-16 overflow-hidden group-[.expanded]:max-h-96">
                Plazhet më të bukura, ushqimi dhe çmimet më të mira... Nga Dhërmi deri në Ksamil, çdo vend ofron përvoja të veçanta.
                <span className="hidden group-[.expanded]:inline">
                  {" "}Nëse preferoni qetësinë, Radhima dhe Himara janë ideale për relaks, ndërsa Ksamili dhe Saranda ofrojnë jetën e gjallë të natës.
                  Mos harroni të provoni ushqimet tradicionale të zonës dhe të rezervoni akomodimin paraprakisht gjatë sezonit të verës.
                </span>
              </p>
              <button
                className="text-cyan-600 font-semibold mt-2 hover:underline focus:outline-none"
                data-text="Lexo më pak ←"
                onClick={(e) => {
                  const card = e.target.closest(".group");
                  const expanded = card.classList.toggle("expanded");
                  e.target.textContent = expanded ? e.target.dataset.text : "Lexo më shumë →";
                }}
              >
                Lexo më shumë →
              </button>
            </div>

            {/* Artikulli 2 */}
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition relative group overflow-hidden">
              <img
                src={brezovica0Image}
                alt="blog2"
                className="rounded-md mb-4 h-40 w-full object-cover"
              />
              <h3 className="font-bold mb-2">Pse Brezovica është destinacion perfekt dimëror?</h3>
              <p className="text-sm text-gray-600 transition-all duration-500 max-h-16 overflow-hidden group-[.expanded]:max-h-96">
                Brezovica është vendi ideal për ski, pushim dhe natyrë. Shijo ajrin e pastër malor dhe hotelet komode.
                <span className="hidden group-[.expanded]:inline">
                  {" "}Pista të përgatitura mirë, peizazhe të mbuluara me borë dhe restorante me ushqim tradicional bëjnë që çdo vizitë të jetë e paharrueshme.
                  Në mbrëmje mund të relaksohesh pranë zjarrit në lodge ose të provosh spa-t lokale. Për një përvojë më të plotë, vizito edhe fshatrat përreth.
                </span>
              </p>
              <button
                className="text-cyan-600 font-semibold mt-2 hover:underline focus:outline-none"
                data-text="Lexo më pak ←"
                onClick={(e) => {
                  const card = e.target.closest(".group");
                  const expanded = card.classList.toggle("expanded");
                  e.target.textContent = expanded ? e.target.dataset.text : "Lexo më shumë →";
                }}
              >
                Lexo më shumë →
              </button>
            </div>

            {/* Artikulli 3 */}
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition relative group overflow-hidden">
              <img
                src={tirana0Image}
                alt="blog-tirana"
                className="rounded-md mb-4 h-40 w-full object-cover"
              />
              <h3 className="font-bold mb-2">Udhëzues për një fundjavë në Tiranë</h3>
              <p className="text-sm text-gray-600 transition-all duration-500 max-h-16 overflow-hidden group-[.expanded]:max-h-96">
                Tirana ofron muzeume, restorante moderne dhe jetën e gjallë të natës.
                <span className="hidden group-[.expanded]:inline">
                  {" "}Vizito Sheshin Skënderbej, shijo kafen në Bllok dhe eksploro artin modern dhe galeritë lokale. Perfekte për të përjetuar kulturën dhe energjinë e kryeqytetit.
                </span>
              </p>
              <button
                className="text-cyan-600 font-semibold mt-2 hover:underline focus:outline-none"
                data-text="Lexo më pak ←"
                onClick={(e) => {
                  const card = e.target.closest(".group");
                  const expanded = card.classList.toggle("expanded");
                  e.target.textContent = expanded ? e.target.dataset.text : "Lexo më shumë →";
                }}
              >
                Lexo më shumë →
              </button>
            </div>
          </div>
        </div>
      </section >

      {/* Reviews */}
      < section className="bg-gray-100 py-12" >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Përshtypjet e klientëve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition-shadow">
                <p className="italic mb-2">"{review.comment}"</p>
                <p className="font-bold">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section >

    </div >
  );
}

export default HomePage;
