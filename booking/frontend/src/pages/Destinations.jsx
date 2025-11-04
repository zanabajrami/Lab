import React from "react";
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

export default function ZigZagCarousel() {
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
        </div>
    );
}