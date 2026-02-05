import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Slider from "react-slick";
import { Clock, Bed, Utensils, MapPinned, ChevronRight } from "lucide-react";

const BASE_URL = "http://localhost:8000"; // backend path

export const destinations = [
    { name: "Prishtina", image: `${BASE_URL}/images/prishtina1.png` },
    { name: "Tirana", image: `${BASE_URL}/images/tirana1.jpg` },
    { name: "Brezovicë", image: `${BASE_URL}/images/brezovica1.jpg` },
    { name: "Dhërmi", image: `${BASE_URL}/images/dhermi1.jpg` },
    { name: "Ksamil", image: `${BASE_URL}/images/ksamil1.jpg` },
    { name: "Pejë", image: `${BASE_URL}/images/peja1.jpg` },
    { name: "Sarandë", image: `${BASE_URL}/images/sarande2.webp` },
    { name: "Prizren", image: `${BASE_URL}/images/prizren1.webp` },
    { name: "Himarë", image: `${BASE_URL}/images/himare1.webp` },
];

export const aboutDestinations = [
    {
        name: "Prishtina",
        image: `${BASE_URL}/images/prishtina1.png`,
        description:
            "The capital of Kosovo, a modern city with vibrant nightlife, numerous cafes, and interesting history blending the old with the new.",
        activities: "Visit the Newborn Monument, National Museum, stroll in Germi Park, and explore the nightlife.",
        food: "Traditional Flija, Sarma, and desserts like Trileqe.",
        bestTime: "Spring and autumn for mild weather and cultural events.",
        stay: "Modern hotels near the city center and apartments with panoramic views.",
        weather: "Weather:❄️ 0°C winter 🌤️ 28°C summer"
    },
    {
        name: "Tirana",
        image: `${BASE_URL}/images/tirana1.jpg`,
        description:
            "Tirana offers Mediterranean energy, colors, urban art, and Albanian hospitality in every corner of the city.",
        activities: "Dajti Cable Car, walk in Blloku, visit the New Bazaar, and National Museum.",
        food: "Tavë kosi, Tirana-style meatballs, and local wine from surrounding areas.",
        bestTime: "April - June and September - October to avoid the heat.",
        stay: "Modern urban resorts and artistically styled guesthouses in Blloku.",
        weather: "Weather:❄️ 5°C winter 🌤️ 31°C summer"
    },
    {
        name: "Brezovicë",
        image: `${BASE_URL}/images/brezovica1.jpg`,
        description:
            "One of the most beautiful mountain spots in Kosovo, ideal for winter skiing and nature vacations.",
        activities: "Skiing, summer hiking, stops at mountain lakes, and relaxing in spa-hotels.",
        food: "Stuffed peppers, homemade pies, and local grilled meat.",
        bestTime: "December – March for skiing, July – September for nature.",
        stay: "Alpine hotels with mountain views and wooden cabins.",
        weather: "Weather:❄️ -5°C winter 🌤️ 20°C summer"
    },
    {
        name: "Dhërmi",
        image: `${BASE_URL}/images/dhermi1.jpg`,
        description:
            "A gem of the Albanian Riviera with crystal-clear waters, quiet beaches, and summer parties.",
        activities: "Swimming, diving, exploring sea caves, and nights with live music by the sea.",
        food: "Fresh fish, calamari, and local white wine.",
        bestTime: "June – September for beach and summer events.",
        stay: "Seaside resorts and luxury villas with panoramic views.",
        weather: "Weather:❄️ 7°C winter 🌤️ 30°C summer"
    },
    {
        name: "Ksamil",
        image: `${BASE_URL}/images/ksamil1.jpg`,
        description:
            "Albania's most famous coastal destination, known for its small islands and turquoise waters.",
        activities: "Boat trips, snorkeling, and visits to Butrint.",
        food: "Seafood, shrimp pasta, and fresh Mediterranean salads.",
        bestTime: "May – September for perfect weather and warm water.",
        stay: "Modern apartments near the beach and hotels with island views.",
        weather: "Weather:❄️ 8°C winter 🌤️ 32°C summer"
    },
    {
        name: "Pejë",
        image: `${BASE_URL}/images/peja1.jpg`,
        description:
            "A historic city surrounded by majestic mountains, ideal for adventure and culture.",
        activities: "Zip-line in Rugova, rafting, and visits to Pejë Monastery.",
        food: "Bean stew, spinach pies, and traditional mountain tea.",
        bestTime: "Spring – Autumn for outdoor activities.",
        stay: "Traditional guesthouses and hotels near the Rugova Gorge.",
        weather: "Weather:❄️ 1°C winter 🌤️ 27°C summer"
    },
    {
        name: "Sarandë",
        image: `${BASE_URL}/images/sarande2.webp`,
        description:
            "A lively coastal city across from Corfu, with blue waters and summer nights full of light.",
        activities: "Seaside walks, visit the Blue Eye, and boat trips.",
        food: "Fresh seafood and Greek salads.",
        bestTime: "June – September for beach holidays.",
        stay: "Panoramic hotels and modern apartments in the center.",
        weather: "Weather:❄️ 10°C winter 🌤️ 33°C summer"
    },
    {
        name: "Prizren",
        image: `${BASE_URL}/images/prizren1.webp`,
        description:
            "Kosovo's most historic city, with cobblestone streets, the stone bridge, and famous summer festivals.",
        activities: "Walks in Prizren Fortress, DokuFest, and exploring the old town.",
        food: "Kebabs, baklava, and traditional coffee.",
        bestTime: "July – August for festivals and lively atmosphere.",
        stay: "Small hotels in the center and traditional guesthouses near the river.",
        weather: "Weather:❄️ 1°C winter 🌤️ 29°C summer"
    },
    {
        name: "Himarë",
        image: `${BASE_URL}/images/himare1.webp`,
        description:
            "A perfect combination of mountains and sea, Himara offers tranquility and untouched beaches.",
        activities: "Hidden beaches, kayaking, and exploring old villages.",
        food: "Grilled octopus, seafood salads, and local wine.",
        bestTime: "June – September for sun and sea.",
        stay: "Vacation homes with sea views and boutique hotels.",
        weather: "Weather:❄️ 9°C winter 🌤️ 32°C summer"
    }
];

export default function ZigZagCarousel() {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [showTopButton, setShowTopButton] = useState(false);
    const sectionRefs = useRef([]);

    // 1. Progress Bar Logic - tregon sa ka mbetur nga faqja
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    useEffect(() => {
        const handleScroll = () => setShowTopButton(window.scrollY > 500);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const scrollToDestination = (index) => {
        if (sectionRefs.current[index]) {
            const yOffset = -100;
            const elementPosition = sectionRefs.current[index].getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: elementPosition, behavior: "smooth" });
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-20 text-slate-900 selection:bg-indigo-100">
            {/* Slim Progress Bar */}
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-200 origin-left z-[100]" style={{ scaleX }} />

            <div className="pt-16 pb-10 text-center -mt-5">
                <h2 className="text-3xl font-extrabold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-700 to-gray-400 drop-shadow-lg tracking-wide uppercase">
                    DESTINATIONS
                </h2>
                <div className="w-20 h-1 bg-slate-600 mx-auto rounded-full"></div>
            </div>

            {/* Slider */}
            <div className="max-w-7xl mx-auto px-8 mb-24">
                <Slider {...settings} className="destination-slider">
                    {destinations.map((d, index) => (
                        <div key={index} className="p-3 outline-none">
                            <motion.div
                                whileHover={{ y: -8 }}
                                className="relative h-72 rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                                onClick={() => scrollToDestination(index)}
                            >
                                <img src={d.image} alt={d.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                <div className="absolute bottom-5 left-5 text-white">
                                    <p className="text-[10px] uppercase tracking-[0.2em] opacity-80 mb-1">Discover</p>
                                    <h3 className="text-xl font-bold">{d.name}</h3>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </Slider>
            </div>

            <section className="max-w-7xl mx-auto px-6 space-y-32">
                {aboutDestinations.map((d, index) => (
                    <motion.div
                        key={index}
                        ref={(el) => el && (sectionRefs.current[index] = el)}
                        className={`flex flex-col ${index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {/* Image Side - Madhësi e kufizuar h-96 */}
                        <div className="w-full md:w-1/2 relative group">
                            <div className="absolute -inset-3 bg-slate-100 rounded-[2rem] -z-10 transition-transform group-hover:rotate-1"></div>
                            <div className="relative h-96 overflow-hidden rounded-[1.5rem] shadow-xl">
                                <img src={d.image} alt={d.name} className="w-full h-full object-cover transform transition duration-1000 group-hover:scale-105" />
                                <div className="absolute top-4 right-4 backdrop-blur-md px-3 py-1 rounded-full border border-black/10">
                                    <span className="text-xs font-bold text-white uppercase">{d.weather?.split(":")[1]}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/2 space-y-5">
                            <div className="flex items-center gap-3">
                                <span className="text-indigo-600 font-bold text-3xl opacity-20">0{index + 1}</span>
                                <h3 className="text-3xl font-black tracking-tight text-slate-900">{d.name}</h3>
                            </div>
                            <p className="text-lg leading-relaxed text-slate-600 font-light max-w-md">
                                {d.description}
                            </p>

                            <button
                                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                className="group flex items-center gap-4 px-0 py-2 text-slate-800 transition-all duration-300"
                            >
                                <div className="flex flex-col items-start">
                                    <span className="text-sm font-black tracking-widest uppercase">
                                        {expandedIndex === index ? "View Less" : "Discover Details"}
                                    </span>
                                    <span className={`h-[2px] bg-slate-800 transition-all duration-300 ${expandedIndex === index ? "w-full" : "w-6 group-hover:w-full"}`}></span>
                                </div>

                                <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 transition-all duration-300 
        ${expandedIndex === index
                                        ? "bg-slate-800 border-slate-800 text-white rotate-90"
                                        : "text-slate-800 group-hover:border-slate-700 group-hover:bg-slate-50"
                                    }`}
                                >
                                    <ChevronRight size={18} strokeWidth={2.5} />
                                </div>
                            </button>

                            <AnimatePresence>
                                {expandedIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="grid gap-4 pt-6 border-t border-slate-100"
                                    >
                                        <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-50">
                                            <div className="bg-indigo-50 p-3 rounded-xl text-slate-800 self-start">
                                                <MapPinned size={22} />
                                            </div>
                                            <div>
                                                <h4 className="text-base font-bold text-slate-800">Activities</h4>
                                                <p className="text-sm text-slate-600 leading-relaxed">{d.activities}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-50">
                                            <div className="bg-red-50 p-3 rounded-xl text-red-600 self-start">
                                                <Utensils size={22} />
                                            </div>
                                            <div>
                                                <h4 className="text-base font-bold text-slate-800">Cuisine</h4>
                                                <p className="text-sm text-slate-600 leading-relaxed">{d.food}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-slate-50 rounded-2xl flex flex-col gap-1">
                                                <Clock className="mb-1 text-indigo-400" size={20} />
                                                <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Best Time</p>
                                                <p className="text-sm font-semibold text-slate-800">{d.bestTime}</p>
                                            </div>
                                            <div className="p-4 bg-slate-50 rounded-2xl flex flex-col gap-1">
                                                <Bed className="mb-1 text-indigo-400" size={20} />
                                                <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Stay</p>
                                                <p className="text-sm font-semibold text-slate-800">{d.stay}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Floating Back to Top */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 p-3 rounded-full bg-slate-900 text-white shadow-lg hover:bg-slate-950 transition-opacity duration-300 z-50
                    ${showTopButton ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
                ▲
            </button>

        </div>
    );
}