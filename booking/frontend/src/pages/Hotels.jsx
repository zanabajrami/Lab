import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Heart, BedDouble, Users, HandCoins, X } from "lucide-react";
import HotelCalendar from "../components/HotelCalendar";
import { hotels } from "../data/HotelsData";

export default function HotelsPage({ favorites, setFavorites }) {
  const [showTopButton, setShowTopButton] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 20;
  const [selectedLocation, setSelectedLocation] = useState("all");
  const location = useLocation();
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const navigate = useNavigate();
  const [calendarHotel, setCalendarHotel] = useState(null);

  const handleConfirmDates = () => {
    if (!checkInDate) return alert("Please choose a check-in date.");
    if (!checkOutDate) return alert("Please choose a check-out date.");

    alert(`You selected: ${checkInDate.toDateString()} → ${checkOutDate.toDateString()}`);

    // Reset calendar selections
    setCheckInDate(null);
    setCheckOutDate(null);
    setShowCalendar(false);
  };

  const locations = [
    "all", "Prishtina", "Brezovicë", "Sarandë", "Himarë",
    "Tirana", "Pejë", "Dhërmi", "Prizren", "Ksamil",
  ];

  // Leximi i parametrit nga SearchBar
  const [searchParams, setSearchParams] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    guests: 1,
    rooms: 1,
  });

  useEffect(() => {
    const destination = query.get("destination") || "";
    const startDate = query.get("startDate") || "";
    const endDate = query.get("endDate") || "";
    const guests = parseInt(query.get("guests")) || 1;
    const rooms = parseInt(query.get("rooms")) || 1;

    setSearchParams({ destination, startDate, endDate, guests, rooms });

    setSelectedLocation(destination || "all");
    setCurrentPage(1);
  }, [query]);

  const filteredHotels = hotels.filter((hotel) => {
    // Filtrim sipas tab
    if (activeTab === "hotels" && !hotel.name.toLowerCase().includes("hotel")) return false;
    if (activeTab === "villas" && !(hotel.name.toLowerCase().includes("villa") || hotel.name.toLowerCase().includes("chalet"))) return false;
    if (activeTab === "apartments" && !hotel.name.toLowerCase().includes("apartment")) return false;

    // Filtrim sipas location dropdown
    if (selectedLocation !== "all" && !hotel.location.toLowerCase().includes(selectedLocation.toLowerCase()))
      return false;

    // Filtrim sipas search bar vetëm nëse searchParams ekziston
    if (searchParams.destination && searchParams.destination !== "") {
      if (hotel.location.toLowerCase() !== searchParams.destination.toLowerCase()) return false;
      if (searchParams.guests && hotel.capacity !== Number(searchParams.guests)) return false;
      if (searchParams.rooms && hotel.rooms !== Number(searchParams.rooms)) return false;
    }
    return true;
  });

  const handleResetFilters = () => {
    setSelectedLocation("all");  // reset location dropdown
    setActiveTab("all");          // reset tab
    setCurrentPage(1);            // shko tek page 1
    setCheckInDate(null);         // reset calendar
    setCheckOutDate(null);
    setShowCalendar(false);       // mbyll calendarin

    // Reset search bar params
    setSearchParams({
      destination: "",
      startDate: "",
      endDate: "",
      guests: 1,
      rooms: 1,
    });

    // Navigo tek faqja pa query params
    navigate("/hotels");
  };

  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);
  const currentHotels = filteredHotels.slice(
    (currentPage - 1) * hotelsPerPage,
    currentPage * hotelsPerPage
  );

  // --- Pagination ---
  const getPagesToShow = () => {
    const pages = [];
    const total = totalPages;
    const current = currentPage;

    if (total >= 1) pages.push(1);
    if (current > 4) pages.push("...");
    for (let i = current - 1; i <= current + 1; i++) {
      if (i > 1 && i < total) pages.push(i);
    }
    if (current < total - 3) pages.push("...");
    if (total > 3) pages.push(total);
    return pages;
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (selectedHotel) {
      // Bllokon scroll kur modal hapet
      document.body.style.overflow = "hidden";
    } else {
      // Çliron scroll kur modal mbyllet
      document.body.style.overflow = "auto";
    }

    // Cleanup nëse komponenti shkatërrohet
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedHotel]);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const updated = prev.includes(id)
        ? prev.filter(fav => fav !== id)
        : [...prev, id];
      return [...new Set(updated)];
    });
  };

  useEffect(() => {
    const tabFromURL = query.get("tab") || "all";
    setActiveTab(tabFromURL);
    setCurrentPage(1); // scroll ose refresh i faqes te page 1
  }, [query]);

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Kur ndryshon faqja, shko direkt në top të faqes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const calculateNights = (start, end) => {
    if (!start || !end) return 1;
    const diff = end.getTime() - start.getTime();
    const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };
  const nights = calculateNights(checkInDate, checkOutDate);
  const totalPrice = calendarHotel ? calendarHotel.price * nights : 0;

  return (
    <div className="px-6 py-8">
      {/* Tabs */}
      <div className="flex gap-4 mb-6 justify-center flex-wrap" id="listings-section">
        {["all", "hotels", "villas", "apartments"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-6 py-2 rounded-xl font-semibold transition ${activeTab === tab
              ? "bg-indigo-900 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Location Dropdown */}
      <div className="flex justify-center mb-6 gap-4 items-center">
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="px-4 py-2 rounded-2xl bg-gray-200 text-gray-800 font-semibold"
        >
          {locations.map((loc, i) => (
            <option key={i} value={loc}>
              {loc === "all" ? "All Locations" : loc}
            </option>
          ))}
        </select>

        {/* Reset Filters Button */}
        <button
          onClick={handleResetFilters}  // thërret funksionin e kombinuar
          className="px-4 py-2 rounded-2xl bg-indigo-300 text-indigo-900 font-semibold border border-indigo-800 hover:bg-indigo-200 transition"
        >
          Reset Filters
        </button>
      </div>

      {/* Hotels Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentHotels.map((hotel, index) => (
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(hotel.id);
                }}
                className="absolute top-3 right-3 bg-white/30 p-2 rounded-full hover:scale-110 transition"
              >
                <Heart
                  className={`w-5 h-5 ${favorites.includes(hotel.id) ? "text-pink-600 fill-pink-500" : "text-gray-700"}`}
                />
              </button>
            </div>
            <div className="p-5 text-gray-700">
              <h2 className="font-semibold text-xl">{hotel.name}</h2>
              <p className="text-sm text-gray-600">{hotel.location}</p>
              <div className="flex justify-between text-sm text-gray-600 mt-3">
                <span className="flex items-center gap-1">
                  <BedDouble className="w-4 h-4" />
                  {hotel.rooms === 1 ? "1 room" : `${hotel.rooms} rooms`}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {hotel.capacity} {hotel.capacity === 1 ? "guest" : "guests"}
                </span>
              </div>
              <p className="text-gray-600 font-bold mt-2 flex items-center gap-1">
                <HandCoins className="w-4 h-4" /> {hotel.price}€ / {hotel.nights ? `${hotel.nights} nights` : "night"}
              </p>
              <p
                onClick={() => setSelectedHotel(hotel)} // hap modalin e hotelit
                className="mt-3 text-indigo-700 font-semibold cursor-pointer hover:underline"
              >
                {hotel.name.toLowerCase().includes("villa") || hotel.name.toLowerCase().includes("chalet")
                  ? "View Villa →"
                  : hotel.name.toLowerCase().includes("apartment")
                    ? "View Apartment →"
                    : "View Hotel →"}
              </p>
              <button
                onClick={() => {
                  setCalendarHotel(hotel);
                  setShowCalendar(true);
                }}
                className="mt-3 w-full py-2 rounded-2xl bg-gray-400/40 border border-gray-400 text-gray-900 font-semibold shadow-lg hover:bg-indigo-900 hover:text-indigo-300 hover:transition-colors"
              >
                Book
              </button>
            </div>
          </div>
        ))}
      </div>
{/* Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] p-6 relative shadow-2xl overflow-y-auto animate-fadeIn">
            <button
              onClick={() => setSelectedHotel(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedHotel.name}</h2>
            <p className="text-gray-600 mb-1">{selectedHotel.location}</p>
            <p className="text-yellow-500 mb-2">
              {"★".repeat(Math.round(selectedHotel.rating))}{" "}
              <span className="text-gray-500 text-sm">({selectedHotel.rating})</span>
            </p>
            <p className="text-gray-700 mb-3">{selectedHotel.description}</p>
            {selectedHotel.amenities && (
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedHotel.amenities.map((a, i) => (
                  <span key={i} className="bg-indigo-100 text-indigo-700 px-3 py-1 text-sm rounded-full">{a}</span>
                ))}
              </div>
            )}
            <p className="text-gray-800 font-medium flex items-center gap-2">
              <BedDouble className="w-4 h-4" />
              {selectedHotel.rooms} {selectedHotel.rooms === 1 ? "room" : "rooms"} —
              <Users className="w-4 h-4" />
              {selectedHotel.capacity} {selectedHotel.capacity === 1 ? "guest" : "guests"}
            </p>
            <p className="text-gray-900 font-semibold mt-2 flex items-center gap-2">
              <HandCoins className="w-4 h-4" /> {selectedHotel.price}€ / night
            </p>
          </div>
        </div>
      )}

      {calendarHotel && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="relative bg-white p-6 rounded-3xl shadow-xl min-w-[350px]">
            <button
              onClick={() => setCalendarHotel(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {calendarHotel?.name}
            </h2>

            <HotelCalendar
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              minDate={new Date()}
              unavailableDates={[]}
            />

            <div className="flex justify-between items-center mt-4">
              {/* Total Price */}
              <p className="text-gray-800 font-semibold mt-3">
                Total price for {nights} night{nights > 1 ? "s" : ""}:{" "}
                <span className="text-indigo-700 font-bold">
                  {calendarHotel ? calendarHotel.price * nights : 0}€
                </span>
              </p>
              <button
                onClick={handleConfirmDates}
                className="px-4 py-2 rounded-xl bg-indigo-900 text-white hover:bg-indigo-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8 flex-wrap">
        {getPagesToShow().map((page, idx) => (
          <button
            key={idx}
            onClick={() => (page !== "..." ? setCurrentPage(page) : null)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${currentPage === page
              ? "bg-indigo-900 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              } ${page === "..." ? "cursor-default opacity-60" : ""}`}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-opacity duration-300 z-50 ${showTopButton ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        ▲
      </button>
    </div>
  );
}