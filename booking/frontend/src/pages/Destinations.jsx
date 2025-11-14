import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import { useLocation } from "react-router-dom";
import { Clock, Bed, Hamburger, MapPinned, MapPin, Waves, Mountain, Castle, Wine } from "lucide-react";

import prishtina0Image from "../images/prishtina-.jpeg";
import prishtina1 from "../images/prishtina1.png";
import prishtina3 from "../images/prishtina3.jpg";

import tirana0Image from "../images/tirana-.jpg";
import tirana1 from "../images/tirana1.jpg";
import tirana4 from "../images/tirana4.jpg";

import brezovica0Image from "../images/brezovica-.jpg";
import brezovica1 from "../images/brezovica1.jpg";
import brezovica4 from "../images/brezovica4.jpg";

import dhermi1 from "../images/dhermi1.jpg";
import dhermi3 from "../images/dhermi3.webp";

import ksamil0 from "../images/ksamil0.jpg";
import ksamil1 from "../images/ksamil1.jpg";

import peja1 from "../images/peja1.jpg";
import peja2 from "../images/peja2.jpg";

import sarande0Image from "../images/sarande0.jpg";
import sarande2 from "../images/sarande2.webp";
import sarande3 from "../images/sarande3.jpg";

import prizren1 from "../images/prizren1.webp";
import prizren2 from "../images/prizren2.jpg";

import himare1 from "../images/himare1.webp";
import himare2 from "../images/himare2.jpg";

import korca1 from "../images/korca1.jpg";
import korca2 from "../images/korca2.jpg";

export const destinations = [
    { name: "Prishtina", image: prishtina1 },
    { name: "Tirana", image: tirana1 },
    { name: "Brezovicë", image: brezovica1 },
    { name: "Dhërmi", image: dhermi1 },
    { name: "Ksamil", image: ksamil1 },
    { name: "Pejë", image: peja1 },
    { name: "Sarandë", image: sarande2 },
    { name: "Prizren", image: prizren1 },
    { name: "Korçë", image: korca1 },
    { name: "Himarë", image: himare1 },
];

export const aboutDestinations = [
    {
        name: "Prishtina",
        image: prishtina3,
        description:
            "Kryeqyteti i Kosovës, një qytet modern me jetë të gjallë nate, kafene të shumta dhe histori interesante që ndërthur të vjetrën me të renë.",
        activities: "Vizita në Newborn, Muzeun Kombëtar, shëtitje në Germi Park dhe eksplorim i jetës së natës.",
        food: "Flija tradicionale, sarmë, dhe ëmbëlsira si trileqe.",
        bestTime: "Pranvera dhe vjeshta për mot të butë dhe evente kulturore.",
        stay: "Hotele moderne afër qendrës dhe apartamente me pamje panoramike.",
        weather: " Moti:❄️ 0°C dimër,🌤️ 28°C verë"
    },
    {
        name: "Tirana",
        image: tirana4,
        description:
            "Tirana ofron energji mesdhetare, ngjyra, art urban dhe mikpritje shqiptare në çdo cep të qytetit.",
        activities: "Teleferiku i Dajtit, shëtitje në Bllok, vizita në Pazarin e Ri dhe Muzeun Kombëtar.",
        food: "Tavë kosi, qofte Tirane, dhe verë lokale nga zonat përreth.",
        bestTime: "Prill - Qershor dhe Shtator - Tetor për të shmangur vapën.",
        stay: "Resorte urbane moderne dhe bujtina me stil artistik në Bllok.",
        weather: "Moti:❄️ 5°C dimër,🌤️ 31°C verë"
    },
    {
        name: "Brezovicë",
        image: brezovica4,
        description:
            "Një ndër vendet më të bukura malore në Kosovë, ideale për ski dimërore dhe pushime në natyrë.",
        activities: "Ski, hiking veror, ndalesa në liqenet malore dhe relaks në spa-hotele.",
        food: "Speca të mbushura, pite të shtëpisë dhe mish lokal në zgarrë.",
        bestTime: "Dhjetor – Mars për ski, Korrik – Shtator për natyrë.",
        stay: "Hotele alpine me pamje nga malet dhe kabina prej druri.",
        weather: "Moti:❄️ -5°C dimër,🌤️ 20°C verë"
    },
    {
        name: "Dhërmi",
        image: dhermi3,
        description:
            "Një perlë e Rivierës Shqiptare me ujëra të kristalta, plazhe të qeta dhe festa verore.",
        activities: "Not, zhytje, eksplorim i shpellave detare dhe netë me muzikë live buzë detit.",
        food: "Peshk i freskët, kallamarë, dhe verë e bardhë vendore.",
        bestTime: "Qershor – Shtator për plazh dhe evente verore.",
        stay: "Resorte buzë detit dhe vila luksoze me pamje panoramike.",
        weather: "Moti:❄️ 7°C dimër,🌤️ 30°C verë"
    },
    {
        name: "Ksamil",
        image: ksamil0,
        description:
            "Destinacioni më i famshëm bregdetar i Shqipërisë, i njohur për ishujt e vegjël dhe ujërat turkeze.",
        activities: "Ekskursione me varkë, snorkeling dhe vizita në Butrint.",
        food: "Fruta deti, pastë me karkaleca, dhe sallata të freskëta mesdhetare.",
        bestTime: "Maj – Shtator për mot perfekt dhe ujë të ngrohtë.",
        stay: "Apartamente moderne pranë plazhit dhe hotele me pamje nga ishujt.",
        weather: "Moti:❄️ 8°C dimër,🌤️ 32°C verë"
    },
    {
        name: "Pejë",
        image: peja2,
        description:
            "Qytet historik me male madhështore përreth, i përshtatshëm për aventurë dhe kulturë.",
        activities: "Zip-line në Rugovë, rafting, dhe vizita në Manastirin e Pejës.",
        food: "Pasul, pite me spinaq dhe çaj mali tradicional.",
        bestTime: "Pranverë – Vjeshtë për aktivitete në natyrë.",
        stay: "Bujtina tradicionale dhe hotele në afërsi të Grykës së Rugovës.",
        weather: "Moti:❄️ 1°C dimër,🌤️ 27°C verë"
    },
    {
        name: "Sarandë",
        image: sarande3,
        description:
            "Një qytet bregdetar plot gjallëri, përballë Korfuzit, me ujëra të kaltra dhe netë verore plot dritë.",
        activities: "Shëtitje buzë detit, vizita në Syri i Kaltër dhe udhëtime me varkë.",
        food: "Fruta deti të freskëta dhe sallata greke.",
        bestTime: "Qershor – Shtator për pushime plazhi.",
        stay: "Hotele panoramike dhe apartamente moderne në qendër.",
        weather: "Moti:❄️ 10°C dimër,🌤️ 33°C verë"
    },
    {
        name: "Prizren",
        image: prizren2,
        description:
            "Qyteti më historik i Kosovës, me rrugë kalldrëmi, urën e gurit dhe festivalet e famshme të verës.",
        activities: "Shëtitje në Kalatë e Prizrenit, DokuFest dhe eksplorim të qytetit të vjetër.",
        food: "Qebapë, bakllava, dhe kafe tradicionale.",
        bestTime: "Korrik – Gusht për festivalet dhe atmosferën e gjallë.",
        stay: "Hotele të vogla në qendër dhe bujtina tradicionale pranë lumit.",
        weather: "Moti:❄️ 1°C dimër,🌤️ 29°C verë"
    },
    {
        name: "Himarë",
        image: himare2,
        description:
            "Një kombinim perfekt midis maleve dhe detit, Himara ofron qetësi dhe plazhe të paprekura.",
        activities: "Plazhe të fshehta, lundrim me kajak, eksplorim të fshatrave të vjetër.",
        food: "Oktapod i pjekur, sallata deti dhe verë lokale.",
        bestTime: "Qershor – Shtator për det dhe diell.",
        stay: "Shtëpi pushimi me pamje nga deti dhe hotele boutique.",
        weather: "Moti:❄️ 9°C dimër,🌤️ 32°C verë"
    },
    {
        name: "Korçë",
        image: korca2,
        description:
            "Qyteti i serenatave dhe kulturës, me arkitekturë elegante dhe atmosferë romantike.",
        activities: "Shëtitje në Pazarin e Vjetër, muze, dhe festivalet tradicionale.",
        food: "Lakror, birrë Korça, dhe ëmbëlsira me mjaltë.",
        bestTime: "Vjeshtë dhe dimër për eventet kulturore dhe atmosferë festive.",
        stay: "Hotele elegante me stil klasik dhe bujtina me oborre të gurta.",
        weather: "Moti:❄️ -2°C dimër,🌤️ 25°C verë"
    },
];

export default function ZigZagCarousel() {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [showTopButton, setShowTopButton] = useState(false);
    const location = useLocation();
    // refs për secilin destinacion
    const sectionRefs = useRef([]);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) setShowTopButton(true);
            else setShowTopButton(false);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const scrollTo = params.get("scroll");
        if (scrollTo) {
            const index = aboutDestinations.findIndex(d => d.name === scrollTo);
            if (index !== -1 && sectionRefs.current[index]) {
                const yOffset = -80; // opsionale offset
                const elementPosition = sectionRefs.current[index].getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: elementPosition, behavior: "smooth" });
            }
        }
    }, [location]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToDestination = (index) => {
        if (sectionRefs.current[index]) {
            // Vetëm scroll, pa hap info
            const yOffset = -80;
            const elementPosition = sectionRefs.current[index].getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: elementPosition, behavior: "smooth" });
        }
    };

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const settings = {
        dots: true,
        infinite: false,
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
            <h2 className="text-3xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-700 to-gray-400 drop-shadow-lg tracking-wide uppercase">
                Destinations
            </h2>
            <Slider {...settings}>
                {destinations.map((d, index) => {
                    const translateY = index % 2 === 0 ? "mt-0" : "mt-8";
                    return (
                        <div key={index} className={`p-4 ${translateY}`}>
                            <div
                                className="relative rounded-xl overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer"
                                onClick={() => scrollToDestination(index)}
                            >
                                <img
                                    src={d.image}
                                    alt={d.name}
                                    className="h-64 w-full object-cover"
                                />
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

            <section className="py-24 text-gray-800 px-6 md:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-32">
                        {aboutDestinations.map((d, index) => (
                            <motion.div
                                key={index}
                                ref={(el) => el && (sectionRefs.current[index] = el)}
                                className={`flex flex-col md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
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
                                    <h4 className="text-xl font-semibold text-gray-900 tracking-wide uppercase">
                                        {d.name}
                                    </h4>
                                    <p className="text-lg leading-relaxed text-gray-700">{d.description}</p>

                                    {d.weather && (<p className="mt-2 inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-200 to-yellow-200 text-gray-900 font-medium shadow-md">
                                        {d.weather}
                                    </p>
                                    )}

                                    {/* Butoni */}
                                    <button
                                        onClick={() => toggleExpand(index)}
                                        className="ml-20 mt-4 px-6 py-2 rounded-full bg-gray-200 text-gray-500 font-medium shadow-lg border border-gray-400 hover:shadow-2xl transition"
                                    >
                                        {expandedIndex === index ? "Mbyll ↑" : "Zbulo më shumë →"}
                                    </button>

                                    {/* Info shtesë (shfaqet kur klikon) */}
                                    < AnimatePresence >
                                        {expandedIndex === index && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.5, ease: "easeOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="mt-2 p-6">
                                                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                                                        <li className="flex items-center gap-2">
                                                            <MapPinned className="w-6 h-6" />
                                                            <span>
                                                                <strong>Aktivitete:</strong> {d.activities}
                                                            </span>
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <Hamburger className="w-6 h-6" />
                                                            <span>
                                                                <strong>Ushqim tradicional:</strong> {d.food}
                                                            </span>
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <Clock className="w-6 h-6" />
                                                            <span>
                                                                <strong>Koha më e mirë për vizitë:</strong> {d.bestTime}
                                                            </span>
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <Bed className="w-6 h-6" />
                                                            <span>
                                                                <strong>Akomodimi:</strong> {d.stay}
                                                            </span>
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
            </section >

            <section className="py-20 text-gray-800 px-6 md:px-20">
                <h2
                    className="text-3xl mb-12 -mt-10 text-gray-800 drop-shadow-sm tracking-wide cursor-pointer transition-transform duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                    Destinacionet më të vizituara <MapPin className="w-6 h-6 text-gray-600" />
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            name: "Tiranë",
                            img: tirana0Image,
                            visitors: "1.2M vizitorë/vit",
                            desc: "Kryeqyteti plot jetë dhe kulturë moderne.",
                        },
                        {
                            name: "Sarandë",
                            img: sarande0Image,
                            visitors: "2M vizitorë/vit",
                            desc: "Qyteti bregdetar me ujëra të kristalta.",
                        },
                        {
                            name: "Prishtinë",
                            img: prishtina0Image,
                            visitors: "700K vizitorë/vit",
                            desc: "Qendër urbane me histori dhe art bashkëkohor.",
                        },
                        {
                            name: "Brezovicë",
                            img: brezovica0Image,
                            visitors: "500K vizitorë/vit",
                            desc: "Resort dimëror ideal për ski dhe natyrë.",
                        },
                    ].map((d, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                        >
                            <img
                                src={d.img}
                                alt={d.name}
                                className="w-full h-56 object-cover transform hover:scale-105 transition"
                            />
                            <div className="p-6 text-center">
                                <h3 className="text-2xl font-bold text-gray-700 mb-2">{d.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">{d.visitors}</p>
                                <p className="text-gray-600">{d.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="py-20 text-gray-800 px-6 md:px-20">
                <h2 className="text-3xl text-center mb-12 text-gray-700">
                    Aktivitetet më të Rekomanduara
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { icon: <Waves className="w-6 h-6 text-blue-500" />, title: "Plazhe", desc: "Relaksohu në bregdetet e Ksamilit dhe Himarës." },
                        { icon: <Mountain className="w-6 h-6 text-blue-500" />, title: "Hiking", desc: "Shëtitje në Rugovë dhe malet e Brezovicës." },
                        { icon: <Castle className="w-6 h-6 text-blue-500" />, title: "Kulturë", desc: "Zbulo historinë e Prizrenit dhe Tiranës." },
                        { icon: <Wine className="w-6 h-6 text-blue-500" />, title: "Gastronomi", desc: "Provo verërat dhe ushqimin lokal." },
                    ].map((item, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
                            <div className="flex flex-col items-center text-center mb-4">
                                {React.cloneElement(item.icon, { className: "w-10 h-10 text-indigo-900" })}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SCROLL TO TOP BUTTON */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 p-4 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-opacity duration-300 z-50
                    ${showTopButton ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
                ▲
            </button>

        </div >
    );
}