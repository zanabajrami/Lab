import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";
import EditBooking from "../../components/dashboard/EditBooking";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:8000/api/bookings", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(res.data);
        } finally {
            setLoading(false);
        }
    };
    
    const deleteBooking = async (id) => {
        if (!window.confirm("Delete this booking?")) return;

        await axios.delete(`http://localhost:8000/api/bookings/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        setBookings(bookings.filter(b => b.id !== id));
    };

    if (loading) {
        return <p className="text-center font-bold text-gray-500">Loading bookings...</p>;
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
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-black text-gray-800">Bookings</h1>
                    <p className="text-sm text-gray-500 mt-1">All hotel reservations</p>
                </div>

                <div className="overflow-x-auto">
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
                                        <p className="text-xs text-gray-400">{b.phone}</p>
                                    </td>

                                    <td className="px-6 py-4 text-center font-semibold">
                                        {b.check_in} → {b.check_out}
                                    </td>

                                    <td className="px-6 py-4 text-center font-bold">
                                        {b.nights}
                                    </td>

                                    <td className="px-6 py-4 text-center font-black text-slate-800">
                                        €{b.total_price}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        {b.status === "confirmed" ? (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                                <CheckCircle size={14} /> Confirmed
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                                                <XCircle size={14} /> Cancelled
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => setEditing(b)}
                                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-900 transition-all"
                                                title="Edit"
                                            >
                                                <Pencil size={16} />
                                            </button>

                                            <button
                                                onClick={() => deleteBooking(b.id)}
                                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all" title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
