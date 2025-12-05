import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import { useLocation } from "react-router-dom";
import { Clock, Bed, Hamburger, MapPinned, MapPin, Waves, Mountain, Castle, Wine } from "lucide-react";

import prishtina0Image from "../images/prishtina-.jpeg"; import prishtina1 from "../images/prishtina1.png"; import prishtina3 from "../images/prishtina3.jpg";
import tirana0Image from "../images/tirana-.jpg"; import tirana1 from "../images/tirana1.jpg"; import tirana4 from "../images/tirana4.jpg";
import brezovica0Image from "../images/brezovica-.jpg"; import brezovica1 from "../images/brezovica1.jpg"; import brezovica4 from "../images/brezovica4.jpg";
import dhermi1 from "../images/dhermi1.jpg"; import dhermi3 from "../images/dhermi3.webp";
import ksamil0 from "../images/ksamil0.jpg"; import ksamil1 from "../images/ksamil1.jpg";
import peja1 from "../images/peja1.jpg"; import peja2 from "../images/peja2.jpg";
import sarande0Image from "../images/sarande0.jpg"; import sarande2 from "../images/sarande2.webp"; import sarande3 from "../images/sarande3.jpg";
import prizren1 from "../images/prizren1.webp"; import prizren2 from "../images/prizren2.jpg";
import himare1 from "../images/himare1.webp"; import himare2 from "../images/himare2.jpg";

export const destinations = [
    { name: "Prishtina", image: prishtina1 },
    { name: "Tirana", image: tirana1 },
    { name: "Brezovicë", image: brezovica1 },
    { name: "Dhërmi", image: dhermi1 },
    { name: "Ksamil", image: ksamil1 },
    { name: "Pejë", image: peja1 },
    { name: "Sarandë", image: sarande2 },
    { name: "Prizren", image: prizren1 },
    { name: "Himarë", image: himare1 },
];

export const aboutDestinations = [
    {
        name: "Prishtina",
        image: prishtina3,
        description:
            "The capital of Kosovo, a modern city with vibrant nightlife, numerous cafes, and interesting history blending the old with the new.",
        activities: "Visit the Newborn Monument, National Museum, stroll in Germi Park, and explore the nightlife.",
        food: "Traditional Flija, Sarma, and desserts like Trileqe.",
        bestTime: "Spring and autumn for mild weather and cultural events.",
        stay: "Modern hotels near the city center and apartments with panoramic views.",
        weather: "Weather:❄️ 0°C winter,🌤️ 28°C summer"
    },
    {
        name: "Tirana",
        image: tirana4,
        description:
            "Tirana offers Mediterranean energy, colors, urban art, and Albanian hospitality in every corner of the city.",
        activities: "Dajti Cable Car, walk in Blloku, visit the New Bazaar, and National Museum.",
        food: "Tavë kosi, Tirana-style meatballs, and local wine from surrounding areas.",
        bestTime: "April - June and September - October to avoid the heat.",
        stay: "Modern urban resorts and artistically styled guesthouses in Blloku.",
        weather: "Weather:❄️ 5°C winter,🌤️ 31°C summer"
    },
    {
        name: "Brezovicë",
        image: brezovica4,
        description:
            "One of the most beautiful mountain spots in Kosovo, ideal for winter skiing and nature vacations.",
        activities: "Skiing, summer hiking, stops at mountain lakes, and relaxing in spa-hotels.",
        food: "Stuffed peppers, homemade pies, and local grilled meat.",
        bestTime: "December – March for skiing, July – September for nature.",
        stay: "Alpine hotels with mountain views and wooden cabins.",
        weather: "Weather:❄️ -5°C winter,🌤️ 20°C summer"
    },
    {
        name: "Dhërmi",
        image: dhermi3,
        description:
            "A gem of the Albanian Riviera with crystal-clear waters, quiet beaches, and summer parties.",
        activities: "Swimming, diving, exploring sea caves, and nights with live music by the sea.",
        food: "Fresh fish, calamari, and local white wine.",
        bestTime: "June – September for beach and summer events.",
        stay: "Seaside resorts and luxury villas with panoramic views.",
        weather: "Weather:❄️ 7°C winter,🌤️ 30°C summer"
    },
    {
        name: "Ksamil",
        image: ksamil0,
        description:
            "Albania's most famous coastal destination, known for its small islands and turquoise waters.",
        activities: "Boat trips, snorkeling, and visits to Butrint.",
        food: "Seafood, shrimp pasta, and fresh Mediterranean salads.",
        bestTime: "May – September for perfect weather and warm water.",
        stay: "Modern apartments near the beach and hotels with island views.",
        weather: "Weather:❄️ 8°C winter,🌤️ 32°C summer"
    },
    {
        name: "Pejë",
        image: peja2,
        description:
            "A historic city surrounded by majestic mountains, ideal for adventure and culture.",
        activities: "Zip-line in Rugova, rafting, and visits to Pejë Monastery.",
        food: "Bean stew, spinach pies, and traditional mountain tea.",
        bestTime: "Spring – Autumn for outdoor activities.",
        stay: "Traditional guesthouses and hotels near the Rugova Gorge.",
        weather: "Weather:❄️ 1°C winter,🌤️ 27°C summer"
    },
    {
        name: "Sarandë",
        image: sarande3,
        description:
            "A lively coastal city across from Corfu, with blue waters and summer nights full of light.",
        activities: "Seaside walks, visit the Blue Eye, and boat trips.",
        food: "Fresh seafood and Greek salads.",
        bestTime: "June – September for beach holidays.",
        stay: "Panoramic hotels and modern apartments in the center.",
        weather: "Weather:❄️ 10°C winter,🌤️ 33°C summer"
    },
    {
        name: "Prizren",
        image: prizren2,
        description:
            "Kosovo's most historic city, with cobblestone streets, the stone bridge, and famous summer festivals.",
        activities: "Walks in Prizren Fortress, DokuFest, and exploring the old town.",
        food: "Kebabs, baklava, and traditional coffee.",
        bestTime: "July – August for festivals and lively atmosphere.",
        stay: "Small hotels in the center and traditional guesthouses near the river.",
        weather: "Weather:❄️ 1°C winter,🌤️ 29°C summer"
    },
    {
        name: "Himarë",
        image: himare2,
        description:
            "A perfect combination of mountains and sea, Himara offers tranquility and untouched beaches.",
        activities: "Hidden beaches, kayaking, and exploring old villages.",
        food: "Grilled octopus, seafood salads, and local wine.",
        bestTime: "June – September for sun and sea.",
        stay: "Vacation homes with sea views and boutique hotels.",
        weather: "Weather:❄️ 9°C winter,🌤️ 32°C summer"
    }
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
        <div className="min-h-screen p-8">
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
                                        className="ml-20 mt-4 px-6 py-2 rounded-full bg-gray-200 text-gray-500 font-medium shadow-lg border border-gray-400 hover:shadow-2xl transition whitespace-nowrap"
                                    >
                                        {expandedIndex === index ? "Close ↑" : "More →"}
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
                                                            <MapPinned className="w-12 h-12 sm:w-6 sm:h-6" />
                                                            <span>
                                                                <strong>Activities:</strong> {d.activities}
                                                            </span>
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <Hamburger className="w-12 h-12 sm:w-6 sm:h-6" />
                                                            <span>
                                                                <strong>Food:</strong> {d.food}
                                                            </span>
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <Clock className="w-12 h-12 sm:w-6 sm:h-6" />
                                                            <span>
                                                                <strong>The best time to visit:</strong> {d.bestTime}
                                                            </span>
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <Bed className="w-12 h-12 sm:w-6 sm:h-6" />
                                                            <span>
                                                                <strong>Stay:</strong> {d.stay}
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
                    <MapPin className="w-6 h-6 text-gray-600" />
                    TRENDING <MapPin className="w-6 h-6 text-gray-600" />
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            name: "Tirana",
                            img: tirana0Image,
                            visitors: "1.2M visitors/year",
                            desc: "The lively capital full of modern culture."
                        },
                        {
                            name: "Sarandë",
                            img: sarande0Image,
                            visitors: "2M visitors/year",
                            desc: "Coastal city with crystal-clear waters."
                        },
                        {
                            name: "Prishtina",
                            img: prishtina0Image,
                            visitors: "700K visitors/year",
                            desc: "Urban center with history and contemporary art."
                        },
                        {
                            name: "Brezovicë",
                            img: brezovica0Image,
                            visitors: "500K visitors/year",
                            desc: "Winter resort ideal for skiing and nature."
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
                    Most Recommended Activities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { icon: <Waves className="w-6 h-6 text-gray-500" />, title: "Beaches", desc: "Relax on the beaches of Ksamil and Himarë." },
                        { icon: <Mountain className="w-6 h-6 text-gray-500" />, title: "Hiking", desc: "Walk through Rugova and the mountains of Brezovicë." },
                        { icon: <Castle className="w-6 h-6 text-gray-500" />, title: "Culture", desc: "Discover the history of Prizren and Tirana." },
                        { icon: <Wine className="w-6 h-6 text-gray-500" />, title: "Gastronomy", desc: "Try local wines and cuisine." },
                    ].map((item, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
                            <div className="flex flex-col items-center text-center mb-4">
                                {React.cloneElement(item.icon, { className: "w-10 h-10 text-gray-700" })}
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
                className={`fixed bottom-8 right-8 p-3 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-opacity duration-300 z-50
                    ${showTopButton ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
                ▲
            </button>

        </div >
    );
}