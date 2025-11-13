import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { BedDouble, Users, HandCoins } from "lucide-react";

//Prishtina
import hotel1 from "../images/prishtina4.jpg";
import hotel1_1 from "../images/hotel1_1.jpg";
import hotel1_2 from "../images/hotel1_2.avif";

import hotel2 from "../images/prishtina5.jpg";
import hotel2_1 from "../images/hotel2_1.jpg";
import hotel2_2 from "../images/hotel2_2.jpg";

import hotel3 from "../images/prishtina6.jpg";
import hotel3_1 from "../images/hotel3_1.jpg";
import hotel3_2 from "../images/hotel3_2.png";

import hotel4 from "../images/prishtina7.webp";
import hotel4_1 from "../images/hotel4_1.webp";
import hotel4_2 from "../images/hotel4_2.jpg";
import hotel4_3 from "../images/hotel4_3.jpg";

import hotel5 from "../images/prishtina8.jpg";
import hotel5_1 from "../images/hotel5_1.jpg";
import hotel5_2 from "../images/hotel5_2.jpg";
import hotel5_3 from "../images/hotel5_3.jpg";

import hotel20 from "../images/prishtina10.jpg";
import hotel20_1 from "../images/hotel20_1.jpg";
import hotel20_2 from "../images/hotel20_2.avif";
import hotel20_3 from "../images/hotel20_3.jpg";
import hotel20_4 from "../images/hotel20_4.jpg";

import hotel21 from "../images/prishtina11.jpg";
import hotel21_1 from "../images/hotel21_1.jpg";
import hotel21_2 from "../images/hotel21_2.jpg";
import hotel21_3 from "../images/hotel21_3.jpg";

import hotel22 from "../images/prishtina12.jpg";
import hotel22_1 from "../images/hotel22_1.jpg";
import hotel22_2 from "../images/hotel22_2.jpg";
import hotel22_3 from "../images/hotel22_3.jpg";
import hotel22_4 from "../images/hotel22_4.jpg";

import hotel23 from "../images/prishtina13.jpg";
import hotel23_1 from "../images/hotel23_1.jpg";
import hotel23_2 from "../images/hotel23_2.jpg";
import hotel23_3 from "../images/hotel23_3.jpg";

import hotel24 from "../images/prishtina9.webp";
import hotel24_1 from "../images/hotel24_1.jpg";
import hotel24_2 from "../images/hotel24_2.webp";
import hotel24_3 from "../images/hotel24_3.webp";
import hotel24_4 from "../images/hotel24_4.webp";

import hotel25 from "../images/prishtina14.jpg";
import hotel25_1 from "../images/hotel25_1.jpg";
import hotel25_2 from "../images/hotel25_2.jpg";
import hotel25_3 from "../images/hotel25_3.jpg";

import hotel26 from "../images/prishtina15.jpg";
import hotel26_1 from "../images/hotel26_1.jpg";
import hotel26_2 from "../images/hotel26_2.jpg";
import hotel26_3 from "../images/hotel26_3.jpg";

import hotel27 from "../images/prishtina16.jpg";
import hotel27_1 from "../images/hotel27_1.jpg";
import hotel27_2 from "../images/hotel27_2.jpg";
import hotel27_3 from "../images/hotel27_3.jpg";

import hotel28 from "../images/prishtina19.jpg";
import hotel28_1 from "../images/hotel28_1.jpg";
import hotel28_2 from "../images/hotel28_2.jpg";
import hotel28_3 from "../images/hotel28_3.jpg";
import hotel28_4 from "../images/hotel28_4.jpg";

import hotel29 from "../images/prishtina17.jpg";
import hotel29_1 from "../images/hotel29_1.jpg";
import hotel29_2 from "../images/hotel29_2.jpg";
import hotel29_3 from "../images/hotel29_3.jpg";

import hotel30 from "../images/prishtina18.jpg";
import hotel30_1 from "../images/hotel30_1.jpg";
import hotel30_2 from "../images/hotel30_2.jpg";
import hotel30_3 from "../images/hotel30_3.jpg";
import hotel30_4 from "../images/hotel30_4.jpg";

import hotel31 from "../images/prishtina20.jpg";
import hotel31_1 from "../images/hotel31_1.jpg";
import hotel31_2 from "../images/hotel31_2.jpg";
import hotel31_3 from "../images/hotel31_3.jpg";

import hotel32 from "../images/prishtina21.jpg";
import hotel32_1 from "../images/hotel32_1.jpg";
import hotel32_2 from "../images/hotel32_2.jpg";
import hotel32_3 from "../images/hotel32_3.jpg";

//Brezovica
import hotel6 from "../images/brezovica5.jpg";
import hotel6_1 from "../images/hotel6_1.jpg";
import hotel6_2 from "../images/hotel6_2.jpg";
import hotel6_3 from "../images/hotel6_3.jpg";

import hotel7 from "../images/brezovica6.webp";
import hotel7_1 from "../images/hotel7_1.jpg";
import hotel7_2 from "../images/hotel7_2.jpg";
import hotel7_3 from "../images/hotel7_3.webp";

import villa1 from "../images/brezovica10.avif";
import villa1_1 from "../images/villa1_1.avif";
import villa1_2 from "../images/villa1_2.avif";
import villa1_3 from "../images/villa1_3.avif";
import villa1_4 from "../images/villa1_4.avif";

import villa2 from "../images/villa2.avif";
import villa2_1 from "../images/villa2_1.avif";
import villa2_2 from "../images/villa2_2.avif";
import villa2_3 from "../images/villa2_3.avif";
import villa2_4 from "../images/villa2_4.avif";

import villa3 from "../images/villa3.jpg";
import villa3_1 from "../images/villa3_1.avif";
import villa3_2 from "../images/villa3_2.jpg";
import villa3_3 from "../images/villa3_3.avif";

import villa4 from "../images/villa4.avif";
import villa4_1 from "../images/villa4_1.avif";
import villa4_2 from "../images/villa4_2.avif";
import villa4_3 from "../images/villa4_3.avif";
import villa4_4 from "../images/villa4_4.avif";

import villa5 from "../images/villa5.avif";
import villa5_1 from "../images/villa5_1.avif";
import villa5_2 from "../images/villa5_2.avif";
import villa5_3 from "../images/villa5_3.avif";

import villa6 from "../images/villa6.avif";
import villa6_1 from "../images/villa6_1.avif";
import villa6_2 from "../images/villa6_2.avif";
import villa6_3 from "../images/villa6_3.jpeg";
import villa6_4 from "../images/villa6_4.jpeg";

import villa7 from "../images/villa7.avif";
import villa7_1 from "../images/villa7_1.avif";
import villa7_2 from "../images/villa7_2.avif";
import villa7_3 from "../images/villa7_3.avif";

import villa8 from "../images/brezovica7.jpg";
import villa8_1 from "../images/villa8_1.jpg";
import villa8_2 from "../images/villa8_2.jpg";
import villa8_3 from "../images/villa8_3.jpg";
import villa8_4 from "../images/villa8_4.avif";

import villa9 from "../images/brezovica8.jpg";
import villa9_1 from "../images/villa9_1.jpg";
import villa9_2 from "../images/villa9_2.jpg";
import villa9_3 from "../images/villa9_3.jpg";

import villa10 from "../images/brezovica9.avif";
import villa10_1 from "../images/villa10_1.avif";
import villa10_2 from "../images/villa10_2.avif";
import villa10_3 from "../images/villa10_3.avif";
import villa10_4 from "../images/villa10_4.avif";

import villa11 from "../images/villa11.avif";
import villa11_1 from "../images/villa11_1.avif";
import villa11_2 from "../images/villa11_2.avif";
import villa11_3 from "../images/villa11_3.avif";

import villa12 from "../images/villa12.png";
import villa12_1 from "../images/villa12_1.avif";
import villa12_2 from "../images/villa12_2.avif";
import villa12_3 from "../images/villa12_3.avif";

import villa13 from "../images/villa13.avif";
import villa13_1 from "../images/villa13_1.avif";
import villa13_2 from "../images/villa13_2.avif";
import villa13_3 from "../images/villa13_3.avif";
import villa13_4 from "../images/villa13_4.avif";

import villa14 from "../images/villa14.avif";
import villa14_1 from "../images/villa14_1.avif";
import villa14_2 from "../images/villa14_2.jpeg";
import villa14_3 from "../images/villa14_3.avif";

import villa15 from "../images/villa15.avif";
import villa15_1 from "../images/villa15_1.avif";
import villa15_2 from "../images/villa15_2.avif";
import villa15_3 from "../images/villa15_3.jpg";

import villa16 from "../images/villa16.avif";
import villa16_1 from "../images/villa16_1.avif";
import villa16_2 from "../images/villa16_2.avif";
import villa16_3 from "../images/villa16_3.avif";

import villa17 from "../images/villa17.avif";
import villa17_1 from "../images/villa17_1.avif";
import villa17_2 from "../images/villa17_2.avif";

import villa18 from "../images/villa18.avif";
import villa18_1 from "../images/villa18_1.avif";
import villa18_2 from "../images/villa18_2.avif";
import villa18_3 from "../images/villa18_3.avif";

import villa19 from "../images/villa19.avif";
import villa19_1 from "../images/villa19_1.avif";
import villa19_2 from "../images/villa19_2.avif";
import villa19_3 from "../images/villa19_3.avif";

import villa20 from "../images/villa20.avif";
import villa20_1 from "../images/villa20_1.avif";
import villa20_2 from "../images/villa20_2.avif";
import villa20_3 from "../images/villa20_3.avif";
import villa20_4 from "../images/villa20_4.avif";

//Sarande
import hotel11 from "../images/sarande4.jpg";
import hotel11_1 from "../images/hotel11_1.jpg";
import hotel11_2 from "../images/hotel11_2.webp";
import hotel11_3 from "../images/hotel11_3.jpg";

import hotel12 from "../images/sarande5.jpg";
import hotel12_1 from "../images/hotel12_1.jpg";
import hotel12_2 from "../images/hotel12_2.jpg";
import hotel12_3 from "../images/hotel12_3.jpg";
import hotel12_4 from "../images/hotel12_4.jpg";

import hotel13 from "../images/sarande6.webp";
import hotel13_1 from "../images/hotel13_1.jpg";
import hotel13_2 from "../images/hotel13_2.jpg";
import hotel13_3 from "../images/hotel13_3.jpg";

import hotel14 from "../images/sarande7.jpg";
import hotel14_1 from "../images/hotel14_1.avif";
import hotel14_2 from "../images/hotel14_2.jpg";
import hotel14_3 from "../images/hotel14_3.jpg";

//Himare
import hotel15 from "../images/himare3.jpg";
import hotel15_1 from "../images/hotel15_1.jpg";
import hotel15_2 from "../images/hotel15_2.jpg";
import hotel15_3 from "../images/hotel15_3.jpg";

import hotel16 from "../images/himare4.jpg";
import hotel16_1 from "../images/hotel16_1.webp";
import hotel16_2 from "../images/hotel16_2.jpg";
import hotel16_3 from "../images/hotel16_3.webp";

import hotel17 from "../images/himare5.jpg";
import hotel17_1 from "../images/hotel17_1.jpg";
import hotel17_2 from "../images/hotel17_2.jpg";
import hotel17_3 from "../images/hotel17_3.jpg";

import hotel18 from "../images/himare6.jpg";
import hotel18_1 from "../images/hotel18_1.jpg";
import hotel18_2 from "../images/hotel18_2.jpg";
import hotel18_3 from "../images/hotel18_3.jpg";
import hotel18_4 from "../images/hotel18_4.jpg";

import hotel19 from "../images/himare7.webp";
import hotel19_1 from "../images/hotel19_1.jpg";
import hotel19_2 from "../images/hotel19_2.jpg";
import hotel19_3 from "../images/hotel19_3.jpg";



const hotels = [
  { name: "Four Points by Sheraton Prishtina", location: "Prishtina", rating: 4.8, images: [hotel1, hotel1_1, hotel1_2], description: "Hotel modern me spa, pishinë të brendshme dhe restorant luksoz me pamje panoramike.", rooms: 1, capacity: 2, price: 130, amenities: ["Spa", "Indoor Pool", "Free Wi-Fi", "Breakfast Included", "Parking", "Fitness Center"] },
  { name: "Swiss Diamond Hotel Prishtina", location: "Prishtina", rating: 4.9, images: [hotel2, hotel2_1, hotel2_2], description: "Një hotel 5-yje me spa, restorante ndërkombëtare dhe dhoma elegante në qendër të qytetit.", rooms: 2, capacity: 4, price: 160, amenities: ["Luxury Spa", "Indoor Pool", "Free Breakfast", "Parking", "Wi-Fi", "Room Service 24/7"] },
  { name: "Hotel Sirius", location: "Prishtina", rating: 4.7, images: [hotel3, hotel3_1, hotel3_2], description: "Ofron ambiente moderne, bar rooftop me pamje të mahnitshme dhe kuzhinë bashkëkohore.", rooms: 1, capacity: 2, price: 110, amenities: ["Rooftop Bar", "Restaurant", "Wi-Fi", "Breakfast", "Meeting Rooms", "Parking"] },
  { name: "Hotel Garden", location: "Prishtina", rating: 4.6, images: [hotel4, hotel4_1, hotel4_2, hotel4_3], description: "Hotel i qetë me kopshte të bukura, ambient relaksues dhe restorant tradicional kosovar.", rooms: 1, capacity: 2, price: 90, amenities: ["Garden View", "Pool", "Breakfast", "Wi-Fi", "Free Parking", "Pet Friendly"] },
  { name: "Hotel Nartel", location: "Prishtina", rating: 4.5, images: [hotel5, hotel5_1, hotel5_2, hotel5_3], description: "Ideal për udhëtarë biznesi, me sallë takimesh moderne dhe parkim falas.", rooms: 1, capacity: 2, price: 85, amenities: ["Business Center", "Wi-Fi", "Parking", "Conference Room"] },
  { name: "Brezovica Hotel", location: "Brezovicë", rating: 4.6, images: [hotel6, hotel6_1, hotel6_2, hotel6_3], description: "Hotel malor pranë pistave të skijimit me sauna, spa dhe dhoma me pamje fantastike.", rooms: 1, capacity: 2, price: 120, amenities: ["Ski Access", "Spa", "Sauna", "Restaurant", "Parking", "Wi-Fi"] },
  { name: "Hotel Pine", location: "Brezovicë", rating: 4.7, images: [hotel7, hotel7_1, hotel7_2, hotel7_3], description: "Hotel komod me stil alpin, shumë afër teleferikut, i përshtatshëm për çifte dhe familje.", rooms: 1, capacity: 3, price: 115, amenities: ["Mountain View", "Wi-Fi", "Spa", "Restaurant", "Free Parking"] },
  { name: "Monte Villa", location: "near Brezovicë", rating: 4.9, images: [villa8, villa8_1, villa8_2, villa8_3, villa8_4], description: "Një villë ekskluzive në natyrë me pamje fantastike.", rooms: 2, capacity: 5, price: 280, amenities: ["Luxury Spa", "Gourmet Restaurant", "Indoor Pool", "Wi-Fi", "Valet Parking"] },
  { name: "Snow White Chalet", location: "near Brezovicë", rating: 4.5, images: [villa9, villa9_1, villa9_2, villa9_3], description: "Chalet prej druri në zemër të maleve, perfekt për pushime dimërore private.", rooms: 2, capacity: 4, price: 160, amenities: ["Private Chalet", "Fireplace", "Mountain View", "Parking", "Wi-Fi"] },
  { name: "Mont Chalet", location: "Brezovicë", rating: 4.8, images: [villa10, villa10_1, villa10_2, villa10_3, villa10_4], description: "Luks alpin me pamje të mahnitshme të maleve.", rooms: 3, capacity: 6, price: 913, nights: 2, amenities: ["Kitchen", "TV", "Pets allowed", "Wi-Fi", "Parking"] },
  { name: "Hotel Butrinti", location: "Sarandë", rating: 4.8, images: [hotel11, hotel11_1, hotel11_2, hotel11_3], description: "Hotel i njohur buzë detit me pamje fantastike, pishinë dhe restorant mesdhetar.", rooms: 1, capacity: 2, price: 140, amenities: ["Beach Access", "Outdoor Pool", "Wi-Fi", "Breakfast", "Restaurant", "Parking"] },
  { name: "Bougainville Bay Hotel", location: "Sarandë", rating: 4.6, images: [hotel12, hotel12_1, hotel12_2, hotel12_3, hotel12_4], description: "Kompleks luksoz me plazh privat, 5 pishina dhe dhoma me dizajn artistik.", rooms: 1, capacity: 3, price: 155, amenities: ["Private Beach", "Multiple Pools", "Spa", "Wi-Fi", "Parking", "Restaurant"] },
  { name: "Saranda Palace Hotel", location: "Sarandë", rating: 4.9, images: [hotel13, hotel13_1, hotel13_2, hotel13_3], description: "Hotel i qetë me plazh privat, bar panoramik dhe dhoma me ballkon detar.", rooms: 1, capacity: 2, price: 135, amenities: ["Private Beach", "Bar", "Sea View", "Wi-Fi", "Parking"] },
  { name: "Hotel Emblem", location: "Sarandë", rating: 4.5, images: [hotel14, hotel14_1, hotel14_2, hotel14_3], description: "Ambiente elegante, afër qendrës dhe portit të Sarandës, me shërbim cilësor.", rooms: 1, capacity: 2, price: 100, amenities: ["Wi-Fi", "Breakfast", "Parking", "Air Conditioning"] },
  { name: "Prado Luxury Hotel", location: "Himarë", rating: 4.9, images: [hotel15, hotel15_1, hotel15_2, hotel15_3], description: "Hotel modern buzë detit me restorant gourmet dhe dhoma me pamje të Jonit.", rooms: 1, capacity: 2, price: 150, amenities: ["Sea View", "Restaurant", "Wi-Fi", "Breakfast", "Private Beach", "Pool", "Parking"] },
  { name: "Hotel Rea Boutique", location: "Himarë", rating: 4.8, images: [hotel16, hotel16_1, hotel16_2, hotel16_3], description: "Një butik i ngrohtë me arkitekturë elegante, për çifte që duan privatësi dhe qetësi.", rooms: 1, capacity: 2, price: 120, amenities: ["Wi-Fi", "Breakfast", "Sea View", "Free Parking", "Bar"] },
  { name: "Panorama Hotel", location: "Himarë", rating: 2.7, images: [hotel17, hotel17_1, hotel17_2, hotel17_3], description: "Me pamje panoramike të detit, pishinë të hapur dhe atmosferë relaksuese.", rooms: 1, capacity: 3, price: 110, amenities: ["Sea View", "Outdoor Pool", "Wi-Fi", "Breakfast", "Parking"] },
  { name: "Sea View Hotel Himara", location: "Himarë", rating: 4.6, images: [hotel18, hotel18_1, hotel18_2, hotel18_3, hotel18_4], description: "Hotel i ri me dizajn modern dhe ballkone me pamje të mrekullueshme.", rooms: 1, capacity: 2, price: 100, amenities: ["Balcony", "Wi-Fi", "Breakfast", "Sea View", "Air Conditioning"] },
  { name: "Dimitri Hotel", location: "Himarë", rating: 4.8, images: [hotel19, hotel19_1, hotel19_2, hotel19_3], description: "Hotel familjar me mikpritje tradicionale dhe mëngjes vendas shumë të shijshëm.", rooms: 1, capacity: 2, price: 95, amenities: ["Pool", "Wi-Fi", "Local Breakfast", "Free Parking", "Family Friendly"] },
  { name: "Hotel Derand", location: "Prishtina", rating: 4.7, images: [hotel20, hotel20_1, hotel20_2, hotel20_3, hotel20_4], description: "Hotel modern dhe i qetë në Prishtinë, me dhoma elegante, mëngjes të pasur dhe staf shumë miqësor.", rooms: 2, capacity: 4, price: 120, amenities: ["Wi-Fi", "Breakfast", "Parking", "Restaurant", "Air Conditioning", "24h Reception"] },
  { name: "Ruby Hotel Prishtina", location: "Prishtina", rating: 4.6, images: [hotel21, hotel21_1, hotel21_2, hotel21_3], description: "Hotel modern afër qendrës së Prishtinës, me dizajn elegant, mëngjes të shkëlqyer dhe ambiente të rehatshme.", rooms: 1, capacity: 2, price: 100, amenities: ["Wi-Fi", "Breakfast", "Parking", "Air Conditioning", "24h Reception"] },
  { name: "Venus Hotel", location: "Prishtina", rating: 4.8, images: [hotel22, hotel22_1, hotel22_2, hotel22_3, hotel22_4], description: "Hotel luksoz me spa, pishinë të madhe dhe restorant elegant, ideal për pushime relaksuese pranë Prishtinës.", rooms: 2, capacity: 4, price: 150, amenities: ["Spa", "Indoor Pool", "Restaurant", "Free Wi-Fi", "Parking", "Fitness Center"] },
  { name: "Hotel MANAMI", location: "Prishtina", rating: 4.7, images: [hotel23, hotel23_1, hotel23_2, hotel23_3], description: "Hotel butik elegant në qendër të Prishtinës me dizajn modern, restorant gourmet dhe ambiente relaksuese.", rooms: 1, capacity: 2, price: 110, amenities: ["Wi-Fi", "Breakfast", "Restaurant", "Parking", "Air Conditioning", "24h Reception"] },
  { name: "Hotel Diamond Prishtina", location: "Prishtina", rating: 4.9, images: [hotel24, hotel24_1, hotel24_2, hotel24_3, hotel24_4], description: "Hotel luksoz me spa, pishinë dhe kazino, vetëm disa minuta nga qendra e qytetit.", rooms: 1, capacity: 2, price: 180, amenities: ["Spa", "Indoor Pool", "Casino", "Restaurant", "Parking", "Wi-Fi"] },
  { name: "Hotel Prishtina", location: "Prishtina", rating: 4.5, images: [hotel25, hotel25_1, hotel25_2, hotel25_3], description: "Hotel komod në qendër të Prishtinës me dhoma të rehatshme, mëngjes të pasur dhe staf mikpritës.", rooms: 1, capacity: 2, price: 90, amenities: ["Wi-Fi", "Pool", "Breakfast", "Parking", "Restaurant", "Air Conditioning"] },
  { name: "Hotel Opera", location: "Prishtina", rating: 4.6, images: [hotel26, hotel26_1, hotel26_2, hotel26_3], description: "Hotel modern dhe elegant pranë qendrës së Prishtinës, me restorant, mëngjes të pasur dhe dhoma të rehatshme.", rooms: 1, capacity: 2, price: 105, amenities: ["Free Wi-Fi", "Breakfast", "Parking", "Restaurant", "Air Conditioning", "24h Reception"] },
  { name: "Golden Hotel", location: "Prishtina", rating: 4.7, images: [hotel27, hotel27_1, hotel27_2, hotel27_3], description: "Hotel luksoz me ambient modern, dhoma të rehatshme dhe restorant elegant në qendër të Prishtinës.", rooms: 2, capacity: 4, price: 64, amenities: ["Wi-Fi", "Breakfast", "Parking", "Restaurant", "Air Conditioning", "24h Reception"] },
  { name: "Mercure Prishtina City", location: "Prishtina", rating: 4.7, images: [hotel28, hotel28_1, hotel28_2, hotel28_3, hotel28_4], description: "Hotel modern dhe komod në qendër të Prishtinës, me dhoma elegante, restorant dhe shërbim të shkëlqyer.", rooms: 1, capacity: 2, price: 99, amenities: ["Free Wi-Fi", "Breakfast", "Parking", "Restaurant", "Fitness Center", "24h Reception"] },
  { name: "Hotel Callisto", location: "Prishtina", rating: 4.6, images: [hotel29, hotel29_1, hotel29_2, hotel29_3], description: "Hotel modern dhe i qetë në Prishtinë, me dhoma të rehatshme, restorant dhe staf shumë mikpritës.", rooms: 1, capacity: 3, price: 100, amenities: ["Wi-Fi", "Breakfast", "Parking", "Restaurant", "Air Conditioning", "24h Reception"] },
  { name: "Courtyard by Marriott Prishtina", location: "Prishtina", rating: 4.8, images: [hotel30, hotel30_1, hotel30_2, hotel30_3, hotel30_4], description: "Hotel modern luksoz me dhoma elegante, restorant gourmet dhe qendër fitnesi, vetëm disa minuta nga qendra e Prishtinës.", rooms: 1, capacity: 2, price: 149, amenities: ["Wi-Fi", "Breakfast", "Parking", "Restaurant", "Pool", "Fitness Center", "24h Reception"] },
  { name: "Vetus Hotel", location: "Prishtina", rating: 4.5, images: [hotel31, hotel31_1, hotel31_2, hotel31_3], description: "Hotel modern dhe komod në Prishtinë, me dhoma të rehatshme, mëngjes të pasur dhe staf mikpritës.", rooms: 1, capacity: 3, price: 110, amenities: ["Free Wi-Fi", "Breakfast", "Parking", "Restaurant", "Air Conditioning", "24h Reception"] },
  { name: "Plaza Boutique Hotel", location: "Prishtina", rating: 4.6, images: [hotel32, hotel32_1, hotel32_2, hotel32_3], description: "Hotel butik elegant në qendër të Prishtinës, me dhoma moderne, restorant gourmet dhe shërbim të shkëlqyer.", rooms: 1, capacity: 2, price: 89, amenities: ["Free Wi-Fi", "Breakfast", "Parking", "Restaurant", "Air Conditioning", "24h Reception"] },
  { name: "Villa Noari", location: "Brezovicë", rating: 4.9, images: [villa1, villa1_1, villa1_2, villa1_3, villa1_4], description: "Villë luksoze në natyrë me pamje mahnitëse, dhoma moderne dhe ambient të qetë, perfekt për pushime dimërore.", rooms: 3, capacity: 6, price: 172, amenities: ["Fireplace", "Mountain View", "Wi-Fi", "Parking", "Fully Equipped Kitchen"] },
  { name: "Villa Brezovica", location: "Brezovicë", rating: 4.8, images: [villa2, villa2_1, villa2_2, villa2_3, villa2_4], description: "Oaz modern me dritare panoramike që ofron pamje mahnitëse të maleve dhe hapësira të bollshme për argëtim.", rooms: 4, capacity: 8, price: 317, amenities: ["Private Pool", "Mountain View", "Wi-Fi", "Parking", "Fully Equipped Kitchen", "Fireplace"] },
  { name: "Villa Breza", location: "Brezovicë", rating: 4.7, images: [villa3, villa3_1, villa3_2, villa3_3], description: "Arkitekturë elegante me kopshte të gjelbërta dhe ambient të ndriçuar natyrshëm.", rooms: 3, capacity: 8, price: 210, amenities: ["Mountain View", "Wi-Fi", "Parking", "Fully Equipped Kitchen", "Fireplace", "Private Garden"] },
  { name: "Villa Bora", location: "Brezovicë", rating: 4.6, images: [villa4, villa4_1, villa4_2, villa4_3, villa4_4], description: "Hapësira të ngrohta me dekor modern, ideal për relaks dhe aktivitete të ndryshme.", rooms: 3, capacity: 7, price: 172, amenities: ["Mountain View", "Wi-Fi", "Parking", "Fully Equipped Kitchen", "Fireplace", "Private Garden"] },
  { name: "Villa Hoxha", location: "Brezovicë", rating: 4.7, images: [villa5, villa5_1, villa5_2, villa5_3], description: "Villë me dhoma të ndriçuara natyrshëm, hapësira të bollshme për aktivitet dhe qetësi.", rooms: 2, capacity: 8, price: 250, amenities: ["Mountain View", "Wi-Fi", "Parking", "Fully Equipped Kitchen", "Fireplace", "Private Garden"] },
  { name: "Villa Premium", location: "Brezovicë", rating: 4.8, images: [villa6, villa6_1, villa6_2, villa6_3, villa6_4], description: "Ambient modern dhe stil elegant, me zona relaksuese dhe pamje nga natyra përreth.", rooms: 3, capacity: 8, price: 326, amenities: ["Mountain View", "Wi-Fi", "Parking", "Fully Equipped Kitchen", "Fireplace"] },
  { name: "Villa Lumi 2", location: "Brezovicë", rating: 4.6, images: [villa7, villa7_1, villa7_2, villa7_3], description: "Villë komode me hapësira të ndara dhe dekor të kujdesshëm për rehati maksimale.", rooms: 2, capacity: 8, price: 195, amenities: ["Mountain View", "Wi-Fi", "Parking", "Fully Equipped Kitchen", "Fireplace", "Private Garden"] },
  { name: "Brezovica Luxury Villa", location: "Brezovicë", rating: 4.7, images: [villa11, villa11_1, villa11_2, villa11_3], description: "Dhoma me stil modern dhe ambiente të bollshme, perfekte për pushime të qeta.", rooms: 3, capacity: 8, price: 220, amenities: ["Mountain View", "Wi-Fi", "Parking", "Fully Equipped Kitchen", "Fireplace", "Private Garden"] },
  { name: "Baron Villas", location: "Brezovicë", rating: 4.8, images: [villa12, villa12_1, villa12_2, villa12_3], description: "Stil luksoz me dizajn të veçantë, hapësira të bollshme dhe relaks të plotë.", rooms: 3, capacity: 7, price: 263, amenities: ["Mountain View", "Wi-Fi", "Parking", "Fully Equipped Kitchen", "Fireplace"] },
  { name: "Triplex Villa", location: "Brezovicë", rating: 4.9, images: [villa13, villa13_1, villa13_2, villa13_3, villa13_4], description: "Villë moderne me hapësira të ndara dhe dizajn inovativ, ideale për pushime të veçanta.", rooms: 4, capacity: 9, price: 297, amenities: ["Mountain View", "Wi-Fi", "Parking", "Fully Equipped Kitchen", "Fireplace"] },
  { name: "Villa V", location: "Brezovicë", rating: 4.8, images: [villa14, villa14_1, villa14_2, villa14_3], description: "Dhoma të dizajnuara me stil dhe pajisje moderne për rehati maksimale.", rooms: 3, capacity: 6, price: 409, amenities: ["Kitchen", "Wi-Fi", "Free Parking", "TV", "Washer", "Indoor Fireplace", "Refrigerator", "Smoking Allowed"] },
  { name: "Luxury Villa", location: "Brezovicë", rating: 4.9, images: [villa15, villa15_1, villa15_2, villa15_3], description: "Villë luksoze me dizajn unik dhe akses të lehtë në pistat e skijimit.", rooms: 2, capacity: 4, price: 304, amenities: ["Mountain View", "Garden View", "Ski-in/Ski-out", "Kitchen", "Wi-Fi", "Free Parking", "TV", "Exterior Security Cameras"] },
  { name: "Point Villa 2", location: "Brezovicë", rating: 4.7, images: [villa16, villa16_1, villa16_2, villa16_3], description: "Villë moderne me dizajn komod, e pajisur me kuzhinë të plotë dhe pamje të bukur të maleve .", rooms: 3, capacity: 8, price: 95, amenities: ["Ski-in/Ski-out", "Kitchen", "Wi-Fi", "Free Parking", "TV", "Washer", "Indoor Fireplace", "Exterior Security Cameras"] },
  { name: "Villa in Brezovica", location: "Brezovicë", rating: 4.8, images: [villa17, villa17_1, villa17_2], description: "Villë komode me pamje mahnitëse nga liqeni dhe ambiente të bollshme për pushime të qeta.", rooms: 3, capacity: 8, price: 257, amenities: ["Lake View", "Kitchen", "Wi-Fi", "Free Parking", "TV", "Washer", "Air Conditioning", "Indoor Fireplace"] },
  { name: "Point Villa ", location: "Brezovicë", rating: 4.7, images: [villa18, villa18_1, villa18_2, villa18_3], description: "Villë moderne me akses direkt në pistat e skijimit dhe ambiente të rehatshme për pushime relaksuese.", rooms: 3, capacity: 9, price: 95, amenities: ["Ski-in/Ski-out", "Kitchen", "Wi-Fi", "Free Parking", "TV", "Washer", "Indoor Fireplace", "Exterior Security Cameras"] },
  { name: "Private Villa", location: "Brezovicë", rating: 4.8, images: [villa19, villa19_1, villa19_2, villa19_3], description: "Villë me dizajn të ngrohtë dhe pajisje moderne, ideale për pushime komode në mal.", rooms: 4, capacity: 6, price: 276, amenities: ["Kitchen", "Wi-Fi", "Free Parking", "Pets Allowed", "TV", "Washer", "Air Conditioning", "Indoor Fireplace"] },
  { name: "GO Villas", location: "Brezovicë", rating: 4.7, images: [villa20, villa20_1, villa20_2, villa20_3, villa20_4], description: "Villë moderne me ambiente të bollshme dhe pajisje të plota për një pushim të rehatshëm.", rooms: 2, capacity: 6, price: 263, amenities: ["Free Parking", "TV", "Washer"] },

];


export default function HotelsPage() {
  const [showTopButton, setShowTopButton] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Filtro hotelet sipas butonit aktiv
  const filteredHotels =
    activeTab === "all"
      ? hotels
      : hotels.filter((h) => {
        if (activeTab === "hotels")
          return !h.name.toLowerCase().includes("villa") && !h.name.toLowerCase().includes("chalet");
        if (activeTab === "villas")
          return h.name.toLowerCase().includes("villa") || h.name.toLowerCase().includes("chalet");
        if (activeTab === "apartments")
          return h.name.toLowerCase().includes("apartment");
        return true;
      });

  return (
    <div className="px-6 py-8">
      {/* Tabs */}
      <div className="flex gap-4 mb-6 justify-center flex-wrap">
        {["all", "hotels", "villas", "apartments"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl font-semibold transition ${activeTab === tab
              ? "bg-indigo-900 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Hotels Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredHotels.map((hotel, index) => (
          <div
            key={index}
            className="relative rounded-3xl overflow-hidden bg-white/60 backdrop-blur-xl border border-gray-300 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            <div className="relative h-48 w-full">
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 bg-black/50 text-white text-xs font-semibold px-3 py-1 rounded-full">
                ⭐ {hotel.rating}
              </span>
            </div>

            <div className="p-5 text-gray-700">
              <h2 className="font-semibold text-xl">{hotel.name}</h2>
              <p className="text-sm text-gray-600">{hotel.location}</p>
              <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                {hotel.description}
              </p>

              <div className="flex justify-between text-sm text-gray-600 mt-3">
                <span className="flex items-center gap-1">
                  <BedDouble className="w-4 h-4" /> {hotel.rooms} rooms
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {hotel.capacity} people
                </span>
              </div>

              <p className="text-gray-600 font-bold mt-2 flex items-center gap-1">
                <HandCoins className="w-4 h-4" /> {hotel.price}€{" "}
                <span className="text-gray-600 font-medium text-sm">
                  / {hotel.nights ? `${hotel.nights} nights` : "night"}
                </span>
              </p>

              <p
                onClick={() => setSelectedHotel(hotel)}
                className="mt-3 text-indigo-700 font-semibold cursor-pointer hover:underline"
              >
                {hotel.name.toLowerCase().includes("villa") || hotel.name.toLowerCase().includes("chalet")
                  ? "View Villa →"
                  : hotel.name.toLowerCase().includes("apartment")
                    ? "View Apartment →"
                    : "View Hotel →"}
              </p>

              <button className="mt-3 w-full py-2 rounded-2xl bg-gray-400/40 border border-gray-400 text-gray-900 font-semibold shadow-lg hover:bg-indigo-900 hover:transition-colors">
                Book
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 relative shadow-2xl animate-fadeIn">
            <button
              onClick={() => setSelectedHotel(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>

            {/* Slider */}
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
            >
              {selectedHotel.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={`${selectedHotel.name} ${idx + 1}`}
                    className="w-full h-56 object-cover rounded-2xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedHotel.name}
            </h2>
            <p className="text-gray-600 mb-1">{selectedHotel.location}</p>
            <p className="text-yellow-500 mb-2">
              {"★".repeat(Math.round(selectedHotel.rating))}{" "}
              <span className="text-gray-500 text-sm">
                ({selectedHotel.rating})
              </span>
            </p>
            <p className="text-gray-700 mb-3">{selectedHotel.description}</p>

            {selectedHotel.amenities && (
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedHotel.amenities.map((a, i) => (
                  <span
                    key={i}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 text-sm rounded-full"
                  >
                    {a}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-800 font-medium flex items-center gap-2">
              <BedDouble className="w-4 h-4" /> {selectedHotel.rooms} rooms —
              <Users className="w-4 h-4" /> {selectedHotel.capacity} people
            </p>

            <p className="text-gray-900 font-semibold mt-2 flex items-center gap-2">
              <HandCoins className="w-4 h-4" /> {selectedHotel.price}€ / night
            </p>
          </div>
        </div>
      )}

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-opacity duration-300 z-50 ${showTopButton ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        ▲
      </button>
    </div>
  );
}
