import React from "react";
import Slider from "react-slick";

import prishtina from "../images/tirana.jpg";
import tirana from "../images/tirana.jpg";
import brezovica from "../images/tirana.jpg";
import dhermi from "../images/tirana.jpg";
import ksamil from "../images/tirana.jpg";
import peje from "../images/tirana.jpg";
import sarande from "../images/tirana.jpg";
import prizren from "../images/tirana.jpg";
import himare from "../images/tirana.jpg";
import korce from "../images/tirana.jpg";

const destinations = [
  { name: "Prishtina", image: prishtina},
  { name: "Tirana", image: tirana},
  { name: "Brezovica", image: brezovica},
  { name: "Dhërmi", image:dhermi },
  { name: "Ksamil", image: ksamil },
  { name: "Pejë", image: peje },
  { name: "Sarandë", image: sarande},
  { name: "Prizren", image: prizren },
  { name: "Himarë", image: himare },
  { name: "Korçë", image: korce },
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
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        Destinacionet 
      </h1>

      <Slider {...settings}>
        {destinations.map((d, index) => (
          <div key={index} className="p-4">
            <div
              className={`bg-white rounded-xl shadow-sm overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-3xl ${
                index % 2 === 0 ? "mt-0" : "mt-8" 
              }`}
            >
              <img
                src={d.image}
                alt={d.name}
                className="h-64 w-full object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-2xl font-bold text-gray-700">{d.name}</h2>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}