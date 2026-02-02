import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { 
  Pencil, Trash2, CheckCircle, XCircle, Calendar, 
  MapPin, CalendarCheck2, Search, Plus, User,
  ChevronLeft, ChevronRight 
} from "lucide-react";
import EditBooking from "../../components/dashboard/EditBooking";
import CreateBooking from "../../components/dashboard/CreateBooking";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [editing, setEditing] = useState(null);
    const [creating, setCreating] = useState(false);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    
    // Pagination (6 per faqe)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const token = localStorage.getItem("token");

    const fetchBookings = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:8000/api/bookings", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(res.data);
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const deleteBooking = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        await axios.delete(`http://localhost:8000/api/bookings/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(bookings.filter(b => b.id !== id));
    };

    const filteredBookings = useMemo(() => {
        return bookings.filter(b => {
            const query = search.toLowerCase();
            return (
                `${b.first_name} ${b.last_name}`.toLowerCase().includes(query) ||
                b.hotel_name?.toLowerCase().includes(query)
            );
        });
    }, [bookings, search]);

    useEffect(() => { setCurrentPage(1); }, [search]);

    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const currentItems = filteredBookings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) return <div className="p-10 text-center text-slate-400 font-bold text-lg animate-pulse uppercase tracking-widest">Loading...</div>;

    return (
        <div className="bg-[#F8F9FB] rounded-[2.5rem] w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
            {creating && <CreateBooking onClose={() => setCreating(false)} onCreated={(n) => { setBookings([n, ...bookings]); setCreating(false); }} />}
            {editing && <EditBooking booking={editing} onClose={() => setEditing(null)} onUpdated={(u) => { setBookings(bookings.map(b => b.id === u.id ? u : b)); setEditing(null); }} />}

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 px-2">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-800 rounded-2xl shadow-lg shadow-indigo-500/10 border border-slate-700 transition-transform hover:rotate-3">
                        <CalendarCheck2 size={28} className="text-indigo-300" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">Bookings</h2>
                        <p className="text-sm text-slate-400 font-medium tracking-wide">All hotel reservations in one place.</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Find a reservation..."
                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-700 font-medium shadow-sm focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all placeholder:text-slate-400"
                        />
                    </div>
                    <button
                        onClick={() => setCreating(true)}
                        className="bg-slate-800 text-indigo-300 p-4 rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-slate-200 border border-slate-700 flex items-center justify-center group"
                    >
                        <Plus size={24} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>
            </div>

            {/* --- CONTENT CONTAINER --- */}
            <div className="bg-slate-900 md:rounded-[2rem] shadow-2xl border border-slate-700 overflow-hidden rounded-2xl shadow-slate-900/50">

                {/* --- DESKTOP TABLE --- */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-800 text-[11px] font-black text-indigo-300 uppercase tracking-widest border-b border-slate-700">
                                <th className="px-8 py-5 text-left">Hotel</th>
                                <th className="px-8 py-5 text-left">Guest</th>
                                <th className="px-8 py-5 text-center">Dates</th>
                                <th className="px-8 py-5 text-center">Total</th>
                                <th className="px-8 py-5 text-center">Status</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {currentItems.map((b) => (
                                <tr key={b.id} className="hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-white text-base group-hover:text-indigo-200">{b.hotel_name}</div>
                                        <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 font-medium italic"><MapPin size={12} className="text-indigo-400" />{b.location}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-slate-200">{b.first_name} {b.last_name}</div>
                                        <div className="text-xs text-slate-400 font-medium">{b.email}</div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <div className="text-sm font-bold text-indigo-100">{b.check_in} — {b.check_out}</div>
                                        <div className="text-[12px] text-slate-400">{b.nights} nights</div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className="text-base font-black text-indigo-600">€{b.total_price}</span>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <StatusBadge status={b.status} />
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-1">
                                            <button onClick={() => setEditing(b)} className="p-2 hover:bg-slate-700 rounded-lg text-indigo-300 transition-all"><Pencil size={18} /></button>
                                            <button onClick={() => deleteBooking(b.id)} className="p-2 hover:bg-rose-500/10 rounded-lg text-slate-400 hover:text-rose-400 transition-all"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- IPAD & MOBILE GRID --- */}
                <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:gap-px bg-slate-700/50">
                    {currentItems.map((b) => (
                        <div key={b.id} className="p-5 md:p-6 bg-slate-800 flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-white text-lg leading-tight">{b.hotel_name}</h3>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <div className="bg-slate-700 p-1 rounded-md"><User size={12} className="text-indigo-300" /></div>
                                        <p className="text-sm text-slate-300 font-bold">{b.first_name} {b.last_name}</p>
                                    </div>
                                </div>
                                <StatusBadge status={b.status} />
                            </div>

                            <div className="flex items-center justify-between bg-slate-900/40 p-4 rounded-2xl border border-slate-700 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-slate-800 p-2 rounded-xl shadow-sm border border-slate-700"><Calendar size={16} className="text-indigo-400" /></div>
                                    <div className="text-xs font-bold text-slate-200 tracking-tight leading-none">
                                        {b.check_in} <br />
                                        <span className="text-slate-500 font-normal">to</span> <br />
                                        {b.check_out}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase font-black text-slate-500 leading-none mb-1">Total Paid</p>
                                    <p className="text-base font-black text-white">€{b.total_price}</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={() => setEditing(b)} className="flex-1 bg-slate-700 border border-slate-600 py-3 rounded-xl text-xs font-black text-indigo-300 active:bg-slate-600 transition-all">EDIT BOOKING</button>
                                <button onClick={() => deleteBooking(b.id)} className="w-14 flex justify-center items-center bg-rose-500/10 rounded-xl text-rose-400 active:bg-rose-500/20 transition-colors border border-rose-500/20"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- PAGINATION --- */}
                <div className="p-6 bg-slate-900/30 border-t border-slate-700 flex items-center justify-between">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        Page {currentPage} of {totalPages || 1}
                    </div>
                    <div className="flex gap-2">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2.5 rounded-xl bg-slate-700 text-indigo-300 disabled:opacity-20 hover:bg-slate-600 transition-all"><ChevronLeft size={18} /></button>
                        <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)} className="p-2.5 rounded-xl bg-indigo-500 text-white disabled:opacity-20 hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-500/20"><ChevronRight size={18} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const StatusBadge = ({ status }) => {
    const isConfirmed = status === "confirmed";
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
            isConfirmed ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20"
        }`}>
            {isConfirmed ? <CheckCircle size={12} strokeWidth={3} /> : <XCircle size={12} strokeWidth={3} />}
            {status}
        </span>
    );
};