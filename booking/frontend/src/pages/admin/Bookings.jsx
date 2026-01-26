import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Pencil, Trash2, CheckCircle, XCircle, Calendar, MapPin } from "lucide-react";
import EditBooking from "../../components/dashboard/EditBooking";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(true);

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
        if (!window.confirm("Delete this booking?")) return;
        await axios.delete(`http://localhost:8000/api/bookings/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(bookings.filter(b => b.id !== id));
    };

    if (loading) {
        return <p className="text-center font-bold text-gray-500 mt-10">Loading bookings...</p>;
    }

    return (
        <>
            {editing && (
                <EditBooking
                    booking={editing}
                    onClose={() => setEditing(null)}
                    onUpdated={(updatedBooking) => {
                        setBookings((prev) =>
                            prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b))
                        );
                        setEditing(null);
                    }}
                />
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 md:p-6 border-b">
                    <h1 className="text-xl md:text-2xl font-black text-gray-800">Bookings</h1>
                    <p className="text-sm text-gray-500 mt-1">All hotel reservations</p>
                </div>

                {/* --- DESKTOP VIEW (Table) --- */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold">
                            <tr>
                                <th className="px-6 py-4 text-left">Hotel</th>
                                <th className="px-6 py-4 text-left">Guest</th>
                                <th className="px-6 py-4">Dates</th>
                                <th className="px-6 py-4">Nights</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((b) => (
                                <tr key={b.id} className="border-t hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-800">{b.hotel_name}</p>
                                        <p className="text-xs text-gray-500">{b.location}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-semibold">{b.first_name} {b.last_name}</p>
                                        <p className="text-xs text-gray-500">{b.email}</p>
                                    </td>
                                    <td className="px-6 py-4 text-center font-semibold text-gray-600">
                                        {b.check_in} → {b.check_out}
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold">{b.nights}</td>
                                    <td className="px-6 py-4 text-center font-black text-slate-800">€{b.total_price}</td>
                                    <td className="px-6 py-4 text-center">
                                        <StatusBadge status={b.status} />
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <ActionButton onClick={() => setEditing(b)} icon={<Pencil size={16} />} variant="edit" />
                                            <ActionButton onClick={() => deleteBooking(b.id)} icon={<Trash2 size={16} />} variant="delete" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- MOBILE VIEW (Cards) --- */}
                <div className="md:hidden grid grid-cols-1 divide-y divide-gray-100">
                    {bookings.map((b) => (
                        <div key={b.id} className="p-4 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-black text-gray-800 text-lg">{b.hotel_name}</h3>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <MapPin size={12} /> {b.location}
                                    </div>
                                </div>
                                <StatusBadge status={b.status} />
                            </div>

                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-xl">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-400">Guest</p>
                                    <p className="text-sm font-semibold text-gray-700">{b.first_name} {b.last_name}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-400">Total Price</p>
                                    <p className="text-sm font-black text-slate-800">€{b.total_price}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-[10px] uppercase font-bold text-gray-400">Stay Duration</p>
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                        <Calendar size={14} /> {b.check_in} - {b.check_out} ({b.nights} nights)
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setEditing(b)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm active:scale-95 transition"
                                >
                                    <Pencil size={16} /> Edit
                                </button>
                                <button
                                    onClick={() => deleteBooking(b.id)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-sm active:scale-95 transition"
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

// Sub-komponentet për pastërti kodi
const StatusBadge = ({ status }) => (
    status === "confirmed" ? (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
            <CheckCircle size={14} /> Confirmed
        </span>
    ) : (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
            <XCircle size={14} /> Cancelled
        </span>
    )
);

const ActionButton = ({ onClick, icon, variant }) => {
    const styles = variant === 'edit'
        ? "hover:bg-indigo-50 hover:text-indigo-900"
        : "hover:bg-red-50 hover:text-red-600";
    return (
        <button
            onClick={onClick}
            className={`w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all ${styles}`}
        >
            {icon}
        </button>
    );
};