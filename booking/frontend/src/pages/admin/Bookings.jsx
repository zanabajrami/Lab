import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Pencil, Trash2, CheckCircle, XCircle, Calendar, MapPin, CalendarCheck2, Search, Plus, User } from "lucide-react";
import EditBooking from "../../components/dashboard/EditBooking";
import CreateBooking from "../../components/dashboard/CreateBooking";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [editing, setEditing] = useState(null);
    const [creating, setCreating] = useState(false);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const token = localStorage.getItem("token");

    const fetchBookings = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:8000/api/bookings", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(res.data);
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

    const filteredBookings = bookings.filter(b => {
        const query = search.toLowerCase();
        return (
            `${b.first_name} ${b.last_name}`.toLowerCase().includes(query) ||
            b.hotel_name?.toLowerCase().includes(query)
        );
    });

    if (loading) return <div className="p-10 text-center text-gray-400 font-bold text-lg">Loading...</div>;

    return (
        <div className="bg-[#F8F9FB] rounded-[2.5rem] w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
            {creating && <CreateBooking onClose={() => setCreating(false)} onCreated={(n) => { setBookings([n, ...bookings]); setCreating(false); }} />}
            {editing && <EditBooking booking={editing} onClose={() => setEditing(null)} onUpdated={(u) => { setBookings(bookings.map(b => b.id === u.id ? u : b)); setEditing(null); }} />}

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 px-2">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="p-2 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <CalendarCheck2 size={24} className="text-gray-600" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Bookings</h2>
                    </div>
                     <p className="text-sm text-gray-500 ml-10">All hotel reservations in one place.</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative flex-1 md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search bookings..."
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-base shadow-sm focus:ring-4 focus:ring-slate-100 outline-none transition-all"
                        />
                    </div>
                    <button onClick={() => setCreating(true)} className="bg-slate-800 text-white p-3.5 rounded-2xl hover:bg-black transition-all shadow-md active:scale-95">
                        <Plus size={22} />
                    </button>
                </div>
            </div>

            {/* --- CONTENT CONTAINER --- */}
            <div className="bg-white md:rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden rounded-2xl">

                {/* --- DESKTOP TABLE --- */}
                <div className="bg-white hidden lg:block overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-[11px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50">
                                <th className="px-8 py-5 text-left">Hotel</th>
                                <th className="px-8 py-5 text-left">Guest</th>
                                <th className="px-8 py-5 text-center">Dates</th>
                                <th className="px-8 py-5 text-center">Total</th>
                                <th className="px-8 py-5 text-center">Status</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredBookings.map((b) => (
                                <tr key={b.id} className="hover:bg-gray-50/30 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-gray-900 text-base">{b.hotel_name}</div>
                                        <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5 font-medium"><MapPin size={12} />{b.location}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-gray-800">{b.first_name} {b.last_name}</div>
                                        <div className="text-xs text-gray-400 font-medium">{b.email}</div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <div className="text-sm font-bold text-gray-600">{b.check_in} — {b.check_out}</div>
                                        <div className="text-[12px] text-gray-400">
                                            {b.nights} {b.nights === 1 ? 'night' : 'nights'}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className="text-base font-black text-gray-900">€{b.total_price}</span>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <StatusBadge status={b.status} />
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-1">
                                            <button onClick={() => setEditing(b)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 transition-all"><Pencil size={18} /></button>
                                            <button onClick={() => deleteBooking(b.id)} className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-all"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- IPAD & MOBILE GRID --- */}
                <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:gap-px bg-gray-100">
                    {filteredBookings.map((b) => (
                        <div key={b.id} className="p-5 md:p-6 bg-white flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{b.hotel_name}</h3>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <div className="bg-slate-100 p-1 rounded-md"><User size={12} className="text-slate-500" /></div>
                                        <p className="text-sm text-gray-500 font-bold">{b.first_name} {b.last_name}</p>
                                    </div>
                                </div>
                                <StatusBadge status={b.status} />
                            </div>

                            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100"><Calendar size={16} className="text-slate-400" /></div>
                                    <div className="text-xs font-bold text-gray-700 tracking-tight leading-none">
                                        {b.check_in} <br />
                                        <span className="text-gray-300 font-normal">to</span> <br />
                                        {b.check_out}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase font-black text-gray-300 leading-none mb-1">Total Paid</p>
                                    <p className="text-base font-black text-slate-900">€{b.total_price}</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={() => setEditing(b)} className="flex-1 bg-white border border-gray-200 py-3 rounded-xl text-xs font-black text-gray-700 active:bg-gray-50 shadow-sm transition-all">EDIT BOOKING</button>
                                <button onClick={() => deleteBooking(b.id)} className="w-14 flex justify-center items-center bg-red-50 rounded-xl text-red-500 active:bg-red-100 transition-colors"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const StatusBadge = ({ status }) => (
    <span className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${status === "confirmed"
            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
            : "bg-red-50 text-red-600 border-red-100"
        }`}>
        {status === "confirmed" ? <CheckCircle size={12} /> : <XCircle size={12} />}
        {status}
    </span>
);