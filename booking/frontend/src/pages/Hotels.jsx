import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, useScroll, useSpring } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Heart, BedDouble, Users, HandCoins, X, RotateCcw, MapPin, ChevronDown } from "lucide-react";
import HotelCalendar from "../components/HotelCalendar";

export default function HotelsPage({ favorites, setFavorites }) {
  const [showTopButton, setShowTopButton] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 20;
  const [selectedLocation, setSelectedLocation] = useState("all");
  const location = useLocation();
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [, setShowCalendar] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const navigate = useNavigate();
  const [calendarHotel, setCalendarHotel] = useState(null);
  const [user, setUser] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [, setLoading] = useState(true);

  const BASE_URL = "http://localhost:8000";

  useEffect(() => {
    fetch("http://localhost:8000/api/hotels")
      .then(res => res.json())
      .then(data => {
        const hotelsWithFullImages = data.map(hotel => {
          let images = Array.isArray(hotel.images) ? hotel.images : [];

          images = images
            .filter(Boolean)
            .map(img => {
              if (img.startsWith("http")) return img;
              if (img.startsWith("/")) return `${BASE_URL}${img}`;
              return `${BASE_URL}/images/${img}`;
            });

          return {
            ...hotel,
            images
          };
        });

        setHotels(hotelsWithFullImages);
        setLoading(false);
      });
  }, []);

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
      // Bllock scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
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
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const resetAllForms = () => {
    // Reset InfoModal
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setSpecialRequests("");

    // Reset Calendar
    setCalendarHotel(null);
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const [isBooked, setIsBooked] = useState(false);

  const closeAllModals = () => {
    setIsBooked(false);
    setCalendarHotel(null);
    setShowInfoModal(false);
    resetAllForms();
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleBookingConfirm = async () => {
    if (!calendarHotel || !checkInDate || !checkOutDate) {
      alert("Please select a hotel and both Check-In and Check-Out dates.");
      return;
    }
    if (!firstName || !lastName || !email || !phone) {
      alert("Please fill in all required fields (name, email, phone).");
      return;
    }

    const bookingData = {
      hotel_id: calendarHotel.id,
      hotel_name: calendarHotel.name,
      location: calendarHotel.location,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      special_requests: specialRequests || "",
      check_in: checkInDate.toISOString().split("T")[0], // YYYY-MM-DD
      check_out: checkOutDate.toISOString().split("T")[0],
      nights,
      total_price: calendarHotel.price * nights
    };

    try {
      const response = await fetch("http://localhost:8000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Booking failed:", data);
        alert("Booking failed: " + (data.message || JSON.stringify(data.errors)));
        return;
      }

      console.log("Booking success:", data);
      setIsBooked(true);       
      setShowInfoModal(false); // Mbyll modalin e informacionit
      setCalendarHotel(null);  // Reset calendar
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong while booking. Please try again.");
    }
  };

  useEffect(() => {
    const handleHotelAddedEvent = (e) => {
      const newHotel = e.detail;
      setHotels(prev => [newHotel, ...prev]);
    };

    window.addEventListener("hotelAdded", handleHotelAddedEvent);

    return () => {
      window.removeEventListener("hotelAdded", handleHotelAddedEvent);
    };
  }, []);

  return (
    <div className="px-6 py-8">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-200 origin-left z-[100]" style={{ scaleX }} />

      {/* Tabs */}
      <div className="flex gap-2 sm:gap-4 mb-10 justify-center flex-wrap bg-slate-100 p-2 rounded-[2rem] w-fit mx-auto shadow-inner" id="listings-section">
        {["all", "hotels", "villas", "apartments"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-6 sm:px-8 py-2.5 rounded-[1.5rem] text-sm font-bold transition-all duration-400 tracking-tight ${activeTab === tab
              ? "bg-slate-800 text-white shadow-lg shadow-slate-400 scale-105"
              : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Location Dropdown */}
      <div className="flex justify-center mb-6 gap-4 items-center">
        <div className="relative flex items-center group">
          <MapPin size={18} className="absolute left-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none" />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="pl-11 pr-12 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 font-bold text-sm appearance-none cursor-pointer focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 w-full sm:w-64"
          >
            {locations.map((loc, i) => (
              <option key={i} value={loc} className="bg-white text-slate-700">
                {loc === "all" ? "All Locations" : loc}
              </option>
            ))}
          </select>
          <ChevronDown size={18} className="absolute right-4 text-slate-400 pointer-events-none group-focus-within:rotate-180 transition-transform duration-300" />
        </div>

        {/* Reset Filters Button */}
        <button
          onClick={handleResetFilters}
          className="group flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 text-slate-600 font-bold border border-slate-200 hover:bg-white/70 hover:border-slate-200 hover:text-indigo-950 transition-all duration-300 active:scale-95 shadow-sm"
        >
          <RotateCcw size={16} className="group-hover:rotate-[-180deg] transition-transform duration-500" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {currentHotels.map((hotel, index) => (
          <div key={index} className="group relative flex flex-col mx-auto w-full max-w-[300px] rounded-[2.5rem] bg-white border border-gray-100 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl" >
            <div className="relative h-64 w-full p-2 overflow-hidden">
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] transform-gpu">
                <img
                  src={hotel.images?.[0] || `${BASE_URL}/images/placeholder.jpg`}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden"
                  }}
                />

                {/* Rating */}
                <span className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                  ★ {hotel.rating}
                </span>

                {/* Favorite */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(hotel.id);
                  }}
                  className="absolute top-3 right-3 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-all"
                >
                  <Heart
                    className={`w-4 h-4 ${favorites.includes(hotel.id) ? "text-pink-600 fill-pink-500" : "text-white/70"
                      }`}
                  />
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="px-5 pb-5 pt-2 flex flex-col gap-3">
              <div>
                <h2 className="font-bold text-lg text-slate-900 leading-tight">
                  {hotel.name}
                </h2>
                <p className="text-[14px] text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin size={14} className="text-slate-400" /> {hotel.location}
                </p>
              </div>

              {/* Info Row */}
              <div className="flex items-center gap-3 text-[11px] font-bold text-gray-500 uppercase tracking-tight">
                <span className="flex items-center gap-1">
                  <BedDouble size={14} className="text-slate-400" />
                  {hotel.rooms} {hotel.rooms === 1 ? "Room" : "Rooms"}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} className="text-slate-400" />
                  {hotel.capacity} {hotel.capacity === 1 ? "Guest" : "Guests"}
                </span>
              </div>

              {/* Price & Details Row */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-xl font-black text-slate-900">${hotel.price}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">/night</span>
                </div>

                <button
                  onClick={() => setSelectedHotel(hotel)}
                  className="text-[13px] font-extrabold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-tighter"
                >
                  Details
                </button>
              </div>

              {user && (
                <button
                  onClick={() => {
                    setCalendarHotel(hotel);
                    setShowCalendar(true);
                  }}
                  className="mt-1 w-full py-3.5 rounded-2xl bg-slate-100 text-slate-800 font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-slate-900 hover:text-slate-100 hover:shadow-[0_10px_20px_rgba(51,65,85,0.3)] hover:-translate-y-0.5 active:scale-95 shadow-md flex items-center justify-center gap-2"
                >
                  Book Now
                </button>
              )}

            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Ultra-smooth Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md transition-opacity animate-fadeIn"
            onClick={() => setSelectedHotel(null)}
          />

          {/* The "Floating" Card */}
          <div className="relative w-full max-w-[440px] bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden animate-slideUp flex flex-col max-h-[85vh]">

            {/* Floating Close Button */}
            <button
              onClick={() => setSelectedHotel(null)}
              className="absolute z-20 top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/20 backdrop-blur-xl border border-white/30 text-white rounded-full hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-xl"
            >
              ✕
            </button>

            {/* Image Container with Gradient Overlay */}
            <div className="relative h-60 min-h-[240px] overflow-hidden">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true, dynamicBullets: true }}
                modules={[Navigation, Pagination]}
                className="h-full w-full"
              >
                {selectedHotel.images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      key={idx}
                      src={img}
                      alt={selectedHotel.name}
                      className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Content Area */}
            <div className="p-7 overflow-y-auto custom-scrollbar">
              {/* Header: Title and Rating */}
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <h2 className="text-2xl font-extrabold text-slate-900 leading-tight tracking-tight">
                    {selectedHotel.name}
                  </h2>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium">{selectedHotel.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-2xl shadow-sm">
                  <span className="text-slate-700">★</span>
                  <span className="text-sm font-bold text-slate-700">{selectedHotel.rating}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[15px] leading-relaxed text-slate-600 mb-6 font-normal italic">
                "{selectedHotel.description}"
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-3 p-3 bg-slate-50/80 rounded-2xl border border-slate-100">
                  <div className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm">
                    <BedDouble className="w-4 h-4 text-slate-600" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">{selectedHotel.rooms} Rooms</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50/80 rounded-2xl border border-slate-100">
                  <div className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm">
                    <Users className="w-4 h-4 text-slate-600" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">{selectedHotel.capacity} Guests</span>
                </div>
              </div>

              {/* Amenities Pill Box */}
              {selectedHotel.amenities && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedHotel.amenities.map((a, i) => (
                    <span key={i} className="px-3 py-1.5 text-[11px] font-bold text-slate-600 bg-slate-50/50 border border-indigo-100 rounded-full tracking-wide">
                      {a.toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Price Sticky Footer */}
            <div className="p-6 bg-slate-50/50 backdrop-blur-sm border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Price</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900">{selectedHotel.price}€</span>
                  <span className="text-sm font-semibold text-slate-500">/ night</span>
                </div>
              </div>

              <div className="h-10 w-10 bg-slate-900 flex items-center justify-center rounded-2xl text-white shadow-lg shadow-slate-200">
                <HandCoins className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal për Calendar */}
      {calendarHotel && !showInfoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 px-4">
          <div className="relative bg-white p-6 rounded-3xl shadow-xl min-w-[350px]">
            <button onClick={() => setCalendarHotel(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" >
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
              <p className="text-gray-800 font-semibold mt-3">
                Total price for {nights} night{nights > 1 ? "s" : ""}:{" "}
                <span className="text-red-600 font-bold">
                  {calendarHotel ? calendarHotel.price * nights : 0}€
                </span>
              </p>
              <button
                onClick={() => {
                  if (!checkInDate || !checkOutDate) {
                    alert("Please select both Check-In and Check-Out dates before continuing.");
                    return;
                  }
                  setShowInfoModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-950"
              >
                Next ❯
              </button>
            </div>
          </div>
        </div>
      )}

      {showInfoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 px-4">
          <div className="relative bg-white p-6 rounded-3xl shadow-xl min-w-[350px] max-w-md w-full">
            <button
              onClick={() => {
                setShowInfoModal(false);
                resetAllForms();
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Your Info
            </h2>
            <div className="flex flex-col gap-4">
              <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border p-3 rounded-lg focus:outline-indigo-500" />
              <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="border p-3 rounded-lg focus:outline-indigo-500" />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-3 rounded-lg focus:outline-indigo-500" />
              <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="border p-3 rounded-lg focus:outline-indigo-500" />
              <textarea placeholder="Special Requests (optional)" value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} className="border p-3 rounded-lg focus:outline-indigo-500" rows={3} />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-6 py-2 rounded-xl bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                ❮ Back
              </button>
              <button
                onClick={handleBookingConfirm}
                className="px-6 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-950"
              >
                Confirm Booking ❯
              </button>
            </div>
          </div>
        </div>
      )}

      {isBooked && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-[60] px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-2xl font-black text-slate-900 mb-2">Success!</h2>
            <p className="text-slate-600 font-medium leading-relaxed mb-8">
              Your reservation has been made. <br />
              <span className="text-slate-800 font-bold underline">You can make your payment at the property.</span>
            </p>

            <button
              onClick={closeAllModals}
              className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-950 transition-all shadow-lg"
            >
              Excellent
            </button>
          </motion.div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-12 mb-8">
        {getPagesToShow().map((page, idx) => (
          <button
            key={idx}
            onClick={() => (page !== "..." ? setCurrentPage(page) : null)}
            disabled={page === "..."}
            className={`
        relative min-w-[40px] h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-200
        ${page === "..."
                ? "cursor-default text-slate-400"
                : currentPage === page
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200 scale-110 z-10"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-900 hover:text-slate-900"
              }
      `}
          >
            {page}

            {/* Subtle indicator for active page */}
            {currentPage === page && (
              <span className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-opacity duration-300 z-50 ${showTopButton ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        ▲
      </button>
    </div>
  );
}