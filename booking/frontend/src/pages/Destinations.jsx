import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";

import prishtina1 from "../images/prishtina1.png";
import tirana1 from "../images/tirana1.jpg";
import brezovica1 from "../images/brezovica1.jpg";
import dhermi1 from "../images/dhermi1.jpg";
import ksamil1 from "../images/ksamil1.jpg";
import peja1 from "../images/peja1.jpg";
import sarande2 from "../images/sarande2.webp";
import prizren1 from "../images/prizren1.webp";
import himare1 from "../images/himare1.webp";
import korca1 from "../images/korca1.jpg";

const destinations = [
    { name: "Prishtina", image: prishtina1 },
    { name: "Tirana", image: tirana1 },
    { name: "Brezovica", image: brezovica1 },
    { name: "Dhërmi", image: dhermi1 },
    { name: "Ksamil", image: ksamil1 },
    { name: "Pejë", image: peja1 },
    { name: "Sarandë", image: sarande2 },
    { name: "Prizren", image: prizren1 },
    { name: "Himarë", image: himare1 },
    { name: "Korçë", image: korca1 },
];
const aboutDestinations = [
    {
        name: "Prishtina",
        description:
            'Kryeqyteti i Kosovës është qendra kulturore, ekonomike dhe rinore e vendit. Vizito Sheshin “Nënë Tereza”, Katedralen, Muzeun Etnologjik dhe shijo jetën e natës plot energji.',
        image: prishtina1,
    },
    {
        name: "Tirana",
        description:
            "Një qytet plot jetë dhe ngjyra, me bulevarde të gjera, muze moderne dhe kafenetë që mbushin çdo cep. Mos e humb teleferikun e Dajtit për pamje mahnitëse të qytetit.",
        image: tirana1,
    },
    {
        name: "Brezovica",
        description:
            "Një nga destinacionet më të bukura malore në Ballkan, ideale për ski, snowboarding dhe hiking. Ofron pamje të jashtëzakonshme të Sharrit dhe ajër të pastër malor.",
        image: brezovica1,
    },
    {
        name: "Dhërmi",
        description:
            "Një nga plazhet më mahnitëse të Rivierës Shqiptare. Ujë i kristaltë, rërë e bardhë dhe atmosfera verore e qetë e bëjnë Dhërmin një vend perfekt për relaks total.",
        image: dhermi1,
    },
    {
        name: "Ksamil",
        description:
            "Parajsa e jugut me ujëra turkeze dhe ishuj të vegjël që mund t’i arrish me not ose varkë. Ideale për pushime romantike apo familjare buzë detit Jon.",
        image: ksamil1,
    },
    {
        name: "Pejë",
        description:
            "E rrethuar nga Bjeshkët e Nemuna, Peja ofron një natyrë madhështore, ujëvara, Grykën e Rugovës, si dhe kulturë të pasur historike. Një vend për aventurë dhe qetësi.",
        image: peja1,
    },
    {
        name: "Sarandë",
        description:
            "Qytet bregdetar me pamje drejt Korfuzit, Saranda kombinon relaksin veror me historinë e Butrintit, një nga sitet arkeologjike më të njohura në rajon.",
        image: sarande2,
    },
    {
        name: "Prizren",
        description:
            "Qyteti më romantik dhe historik i Kosovës. Kalaja, Ura e Gurit, Lumbardhi dhe Dokufesti e bëjnë Prizrenin një përzierje të kulturës, traditës dhe artit.",
        image: prizren1,
    },
    {
        name: "Himarë",
        description:
            "Një perlë tjetër e Rivierës Shqiptare me plazhe të virgjëra, ushqim të shkëlqyer deti dhe mikpritje tradicionale. Ideale për pushime të qeta e autentike.",
        image: himare1,
    },
    {
        name: "Korçë",
        description:
            "E njohur si ‘Parisi i Vogël’, Korça ofron rrugica me kalldrëm, muze kulture, serenata dhe atmosferë të ngrohtë. Një vend plot histori dhe shije të vërtetë shqiptare.",
        image: korca1,
    },
];

export default function ZigZagCarousel() {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2500,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
                Destinacionet
            </h1>
            <Slider {...settings}>
                {destinations.map((d, index) => {
                    // Zig-Zag: herë lart, herë poshtë
                    const translateY = index % 2 === 0 ? "mt-0" : "mt-8";

                    return (
                        <div key={index} className={`p-4 ${translateY}`}>
                            <div className="relative rounded-xl overflow-hidden transform transition duration-500 hover:scale-105">
                                {/* Imazhi */}
                                <img
                                    src={d.image}
                                    alt={d.name}
                                    className="h-64 w-full object-cover"
                                />
                                {/* Vetëm emri mbi imazh */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                    <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                                        {d.name}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
     (
    <section className="py-24 bg-gradient-to-b from-gray-100 via-white to-gray-50 text-gray-800 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-20 text-center bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-400 text-transparent bg-clip-text">
          Rreth Destinacioneve
        </h2>

        <div className="space-y-32">
          {aboutDestinations.map((d, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              } items-center gap-12`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {/* Foto me overlay */}
              <div className="relative group w-full md:w-1/2 overflow-hidden rounded-3xl shadow-2xl">
                <motion.img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-[450px] object-cover transform transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition duration-500"></div>
                <h3 className="absolute bottom-6 left-8 text-3xl font-bold text-white drop-shadow-lg">
                  {d.name}
                </h3>
              </div>

              {/* Teksti */}
              <div className="md:w-1/2 space-y-4">
                <h4 className="text-xl font-semibold text-teal-600 tracking-wide uppercase">
                  Eksploro {d.name}
                </h4>
                <p className="text-lg leading-relaxed text-gray-700">{d.description}</p>

                {/* Butoni */}
                <button
                  onClick={() => toggleExpand(index)}
                  className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium shadow-md hover:shadow-lg transition"
                >
                  {expandedIndex === index ? "Mbyll ↑" : "Zbulo më shumë →"}
                </button>

                {/* Info shtesë (shfaqet kur klikon) */}
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 bg-gray-100/70 rounded-2xl p-6 shadow-inner">
                        <h5 className="text-lg font-semibold text-gray-900 mb-2">
                          Më shumë rreth {d.name}:
                        </h5>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>
                            📍 <strong>Aktivitete:</strong> {d.activities || "Hiking, kulturë, ushqim lokal"}
                          </li>
                          <li>
                            🍴 <strong>Ushqim tradicional:</strong> {d.food || "Specialitete vendore me shije unike"}
                          </li>
                          <li>
                            🕓 <strong>Koha më e mirë për vizitë:</strong> {d.bestTime || "Pranverë dhe verë"}
                          </li>
                          <li>
                            🏨 <strong>Akomodimi:</strong> {d.stay || "Hotele komode dhe bujtina tradicionale"}
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

            <section className="py-16 bg-gray-50 text-gray-800 px-6 md:px-20">
                <h2 className="text-3xl font-bold mb-10 text-center">Aktivitete Popullore</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg">
                        <h3 className="text-xl font-semibold mb-2">Brezovicë</h3>
                        <p>Ski, hiking, dhe relaks në male gjatë dimrit dhe verës.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg">
                        <h3 className="text-xl font-semibold mb-2">Ksamil</h3>
                        <p>Not, zhytje, dhe plazhe kristal të detit Jon.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg">
                        <h3 className="text-xl font-semibold mb-2">Prizren</h3>
                        <p>Festivalet kulturore dhe arkitektura historike.</p>
                    </div>
                </div>
            </section>

        </div>
    );
}