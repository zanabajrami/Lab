import React, { useEffect, useState, useRef } from 'react';
import {MapPin, BedDouble, Users, Wifi, Coffee, Tv, Pencil, Trash2, Car, Check, WavesLadder, ChevronLeft, ChevronRight,MoreHorizontal, 
CheckCircle2, Bubbles, Martini, Utensils, ChefHat, CableCar, Leaf, CigaretteOff, Fan, Waves, PawPrint, HandPlatter} from 'lucide-react';
import { BiStar } from "react-icons/bi";
import { MdOutlineDomainAdd } from "react-icons/md";
import EditHotel from "../../components/dashboard/EditHotel";
import AddHotel from "../../components/dashboard/AddHotel";

const HotelTable = () => {
    const [hotels, setHotels] = useState([]);
    const [editingHotel, setEditingHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const hotelsPerPage = 10;
    const tableTopRef = useRef(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const getFullImageUrl = (img) => {
        if (!img) return null;
        return img.startsWith("http")
            ? img
            : `http://localhost:8000/storage/images/${img}`;
    };

    const parseAmenities = (a) => {
        if (!a) return [];
        if (Array.isArray(a)) return a;
        if (typeof a === 'string') {
            try { return JSON.parse(a); }
            catch { return a.split(',').map(x => x.trim()); }
        }
        return [];
    };

    // Fetch hotels
    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch('http://localhost:8000/api/hotels', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                const hotelsWithFullImages = data.map(hotel => ({
                    ...hotel,
                    images: Array.isArray(hotel.images) ? hotel.images.map(getFullImageUrl) : [],
                    amenities: parseAmenities(hotel.amenities)
                }));
                setHotels(hotelsWithFullImages);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    // Shto hotelin direkt
    const handleHotelAdded = (newHotel) => {
        const hotelWithFullImages = {
            ...newHotel,
            images: Array.isArray(newHotel.images) ? newHotel.images.map(getFullImageUrl) : [],
            amenities: parseAmenities(newHotel.amenities)
        };
        setHotels(prev => [hotelWithFullImages, ...prev]);
    };

    useEffect(() => {
        if (!loading && tableTopRef.current) {
            tableTopRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentPage]);

    const getIcon = (item) => {
        const name = item.toLowerCase();
        if (name.includes('wifi') || name.includes('wi-fi') || name.includes('free wi-fi')) return <Wifi size={14} />;
        if (name.includes('breakfast') || name.includes('coffee')) return <Coffee size={14} />;
        if (name.includes('tv')) return <Tv size={14} />;
        if (name.includes('parking')) return <Car size={14} />;
        if (name.includes('pool')) return <WavesLadder size={14} />;
        if (name.includes('washer')) return <Bubbles size={14} />;
        if (name.includes('bar')) return <Martini size={14} />;
        if (name.includes('restaurant')) return <Utensils size={14} />;
        if (name.includes('kitchen')) return <ChefHat size={14} />;
        if (name.includes('ski acces') || name.includes('ski-in/ski-out')) return <CableCar size={14} />;
        if (name.includes('spa') || name.includes('luxury spa')) return <Leaf size={14} />;
        if (name.includes('non-smoking rooms')) return <CigaretteOff size={14} />;
        if (name.includes('air conditioning') || name.includes('ac')) return <Fan size={14} />;
        if (name.includes('sea view') || name.includes('shared beach')) return <Waves size={14} />;
        if (name.includes('pet')) return <PawPrint size={14} />;
        if (name.includes('room service')) return <HandPlatter size={14} />;
        return <Check size={14} />;
    };

    const filteredHotels = hotels.filter(hotel =>
        (hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (hotel.location?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
    );

    const indexOfLastHotel = currentPage * hotelsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
    const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);
    const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) pages.push(1, 2, 3, 4, '...', totalPages);
            else if (currentPage >= totalPages - 2) pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            else pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
        return pages;
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center rounded-[2.5rem]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-400"></div>
        </div>
    );

    const handleDelete = (hotelId) => {
        if (!window.confirm("Are you sure you want to delete this hotel?")) return;

        const token = localStorage.getItem("token");

        fetch(`http://localhost:8000/api/hotels/${hotelId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(async res => {
                if (!res.ok) {
                    const text = await res.text();
                    console.error("Failed to delete hotel:", text);
                    throw new Error(`HTTP ${res.status}`);
                }
                // Success → hiq hotelin nga state
                setHotels(prev => prev.filter(h => h.id !== hotelId));
            })
            .catch(err => console.error("Error:", err));
    };

    return (
        <div className="min-h-screen bg-slate-900 p-4 md:p-12 text-slate-100 rounded-[2.5rem]">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div ref={tableTopRef} className="bg-indigo-300 rounded-[2.5rem] p-8 md:p-10 mb-8 shadow-2xl relative overflow-hidden border border-indigo-400/20">
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/20 blur-[100px] -z-0" />
                    <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-8 text-slate-900">
                        <div>
                            <h1 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase">
                                HOTEL <span className="text-white">MANAGEMENT</span>
                            </h1>
                            <p className="text-slate-700/80 italic mt-2 font-bold flex items-center gap-2">
                                <CheckCircle2 size={18} className="text-indigo-600" />
                                Managing {hotels.length} Properties
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
                            <div className="relative w-full sm:w-[350px]">
                                <input
                                    type="text"
                                    placeholder="Search property..."
                                    className="w-full pl-12 pr-4 py-4 bg-indigo-200 backdrop-blur-sm rounded-2xl text-slate-950 outline-none font-semibold shadow-inner focus:ring-2 focus:ring-slate-900 transition-all"
                                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                />
                            </div>
                            <button onClick={() => setShowAddModal(true)} className="relative group flex items-center justify-center w-14 h-14 bg-slate-900 text-indigo-300 rounded-2xl hover:bg-slate-800 transition-all duration-300 shadow-xl active:scale-95 border border-slate-700/50 flex-shrink-0">
                                <MdOutlineDomainAdd
                                    size={26}
                                    className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-slate-900 backdrop-blur-xl border border-slate-700/50 rounded-[2rem] overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-950/50 text-indigo-300 border-b border-slate-700/50">
                                    <th className="p-6 text-xs uppercase tracking-widest font-black">Information</th>
                                    <th className="p-6 text-xs uppercase tracking-widest font-black">Structure</th>
                                    <th className="p-6 text-xs uppercase tracking-widest font-black text-center">Amenities</th>
                                    <th className="p-6 text-xs uppercase tracking-widest font-black">Price</th>
                                    <th className="p-6 text-xs uppercase tracking-widest font-black text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/30">
                                {currentHotels.map((hotel) => (
                                    <tr key={hotel.id} className="hover:bg-indigo-500/[0.03] transition-colors group">
                                        {/* INFO */}
                                        <td className="p-6 align-top min-w-[300px]">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-white font-bold text-xl group-hover:text-indigo-300 transition-colors">{hotel.name}</span>
                                                    <span className="flex items-center text-indigo-400 text-xs font-bold bg-indigo-400/10 px-2 py-1 rounded-lg border border-indigo-400/20">
                                                        <BiStar size={12} className="mr-1" /> {hotel.rating}
                                                    </span>
                                                </div>
                                                <span className="text-indigo-400/80 text-sm flex items-center font-medium"><MapPin size={14} className="mr-1" /> {hotel.location}</span>
                                                <p className="text-slate-400 text-sm mt-3 italic leading-relaxed whitespace-pre-line">
                                                    {hotel.description}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="p-6 align-top">
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col items-center justify-center bg-slate-900/80 w-16 h-16 rounded-2xl border border-slate-700 group-hover:border-indigo-500/50">
                                                    <BedDouble className="text-indigo-400 mb-0.5" size={18} />
                                                    <span className="text-[10px] text-white font-black uppercase tracking-tighter">
                                                        {hotel.rooms} {hotel.rooms === 1 ? 'Room' : 'Rooms'}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col items-center justify-center bg-slate-900/80 w-16 h-16 rounded-2xl border border-slate-700 group-hover:border-indigo-500/50">
                                                    <Users className="text-indigo-400 mb-0.5" size={18} />
                                                    <span className="text-[10px] text-white font-black uppercase tracking-tighter">
                                                        {hotel.capacity} {hotel.capacity === 1 ? 'Guest' : 'Guests'}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* AMENITIES */}
                                        <td className="p-6 align-top">
                                            <div className="flex flex-wrap justify-center gap-2 max-w-[140px] mx-auto">
                                                {hotel.amenities?.map((item, idx) => (
                                                    <div key={idx} className="relative group/tooltip">
                                                        <div className="p-2.5 bg-slate-900 rounded-xl text-indigo-300 border border-slate-700 hover:bg-indigo-500 hover:text-white transition-all cursor-help">
                                                            {getIcon(item)}
                                                        </div>
                                                        {/* Tooltip Badge */}
                                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-slate-950 text-white text-[10px] font-bold uppercase tracking-widest rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-slate-700 shadow-xl">
                                                            {item}
                                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-950" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>

                                        <td className="p-6 align-top">
                                            <div className="relative inline-block">
                                                <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-full" />
                                                <span className="relative text-2xl font-black text-indigo-600">${hotel.price}</span>
                                                <span className="block text-slate-600 text-[10px] uppercase font-black tracking-widest mt-1">Per Night</span>
                                            </div>
                                        </td>

                                        <td className="p-6 text-right align-top">
                                            <div className="flex justify-end gap-2">
                                                <button title="Edit" onClick={() => setEditingHotel(hotel)} className="p-3 bg-slate-900 rounded-xl text-slate-400 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500/50 transition-all shadow-lg"><Pencil size={18} /></button>
                                                <button title="Delete" onClick={() => handleDelete(hotel.id)} className="p-3 bg-slate-900 rounded-xl text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-500/50 transition-all shadow-lg"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    <div className="bg-slate-950/40 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-sm font-medium text-slate-400">
                            Showing <span className="text-indigo-300">{indexOfFirstHotel + 1}</span> to <span className="text-indigo-300">{Math.min(indexOfLastHotel, filteredHotels.length)}</span> properties
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-3 rounded-2xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white disabled:opacity-10 transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className="flex gap-1.5">
                                {getPageNumbers().map((pageNum, idx) => (
                                    pageNum === '...' ? (
                                        <div key={idx} className="w-12 h-12 flex items-center justify-center text-slate-600"><MoreHorizontal size={20} /></div>
                                    ) : (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`w-12 h-12 rounded-2xl border text-sm font-black transition-all ${currentPage === pageNum ? 'bg-indigo-300 border-indigo-300 text-slate-900 shadow-lg shadow-indigo-500/20' : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'}`}
                                        >
                                            {pageNum}
                                        </button>
                                    )
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-3 rounded-2xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white disabled:opacity-10 transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {editingHotel && (
                <EditHotel
                    hotel={editingHotel}
                    onClose={() => setEditingHotel(null)}
                    onUpdated={(updatedHotel) => {
                        setHotels(prev =>
                            prev.map(h =>
                                h.id === updatedHotel.id ? updatedHotel : h
                            )
                        );
                    }}
                />
            )}

            {showAddModal && (
                <AddHotel
                    onClose={() => setShowAddModal(false)}
                    onHotelAdded={handleHotelAdded}
                />
            )}

        </div>
    );
};
export default HotelTable;