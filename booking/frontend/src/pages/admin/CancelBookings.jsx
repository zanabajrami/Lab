import React, { useEffect, useState, useCallback } from "react";
import { Check, X, Trash2, Edit3, Plus, RefreshCw, User, MapPin, Calendar } from "lucide-react";
import EditCanceledBooking from "../../components/dashboard/EditCanceledBooking";

function CancelBookings() {
    const [cancellations, setCancellations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editOpen, setEditOpen] = useState(false);
    const [selectedCancel, setSelectedCancel] = useState(null);

    const token = localStorage.getItem("token");

    const fetchCancellations = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:8000/api/cancel-bookings", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to fetch data");
            const data = await res.json();
            setCancellations(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchCancellations();
    }, [fetchCancellations]);
    
    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const res = await fetch(`http://localhost:8000/api/cancel-bookings/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) fetchCancellations();
        } catch (err) {
            alert("Update failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this record?")) return;
        try {
            const res = await fetch(`http://localhost:8000/api/cancel-bookings/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` },
            });
            if (res.ok) fetchCancellations();
        } catch (err) {
            alert("Delete failed");
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center rounded-[2.5rem]">
            <div className="flex items-center gap-3 text-indigo-400 animate-pulse">
                <RefreshCw className="animate-spin" />
                <span className="text-xl font-bold uppercase tracking-widest">Loading...</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-900 p-4 md:p-10 text-slate-100 rounded-[2.5rem] overflow-x-hidden w-full">
            <div className="w-full max-w-6xl mx-auto h-full">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 gap-4 border-b border-slate-800 pb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                            CANCELLATION <span className="text-indigo-500 font-light">REQUESTS</span>
                        </h2>
                        <p className="text-slate-400 text-sm md:text-base mt-1 font-medium italic">Manage and review all booking status updates.</p>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <button
                            onClick={() => alert("Open Add Modal")}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 text-sm"
                        >
                            <Plus size={18} strokeWidth={3} /> ADD RECORD
                        </button>
                        <button
                            onClick={fetchCancellations}
                            className="p-3 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-xl transition-colors border border-slate-700"
                        >
                            <RefreshCw size={18} />
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-900/30 border border-red-500/50 text-red-200 p-4 rounded-xl mb-6 flex items-center gap-3">
                        <X className="text-red-500" /> {error}
                    </div>
                )}

                {/* DESKTOP TABLE */}
                <div className="hidden lg:block bg-slate-800/50 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden backdrop-blur-sm w-full">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-slate-800 text-indigo-300 uppercase text-[11px] font-black tracking-[0.15em]">
                                    <th className="px-6 py-5">Guest Info</th>
                                    <th className="px-6 py-5">Stay Details</th>
                                    <th className="px-6 py-5">Reason</th>
                                    <th className="px-6 py-5 text-center">Status Control</th>
                                    <th className="px-6 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {cancellations.map((c) => (
                                    <tr key={c.id} className="hover:bg-slate-700/30 transition-colors group">
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-slate-800 rounded-lg text-indigo-400 border border-slate-700">
                                                    <User size={18} />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-lg text-white">{c.name}</div>
                                                    <div className="text-sm text-slate-400">{c.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2 font-bold text-slate-200">
                                                <MapPin size={14} className="text-indigo-500" /> {c.hotel_name}
                                            </div>
                                            <div className="flex items-center gap-2 text-[12px] text-slate-500 mt-1 font-semibold uppercase">
                                                <Calendar size={12} /> {new Date(c.check_in).toLocaleDateString()} - {new Date(c.check_out).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-sm text-slate-400 italic leading-relaxed max-w-[200px]">
                                            "{c.reason}"
                                            {c.admin_note && <div className="mt-1 text-xs text-indigo-400 not-italic">Note: {c.admin_note}</div>}
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter border ${c.status === "approved" ? "bg-green-500/10 text-green-400 border-green-500/30" :
                                                    c.status === "rejected" ? "bg-red-500/10 text-red-400 border-red-500/30" :
                                                        "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                                    }`}>
                                                    {c.status}
                                                </span>
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleUpdateStatus(c.id, "approved")} className="p-2 bg-slate-800 hover:bg-green-600 text-white rounded-lg transition-all border border-slate-700"><Check size={16} strokeWidth={3} /></button>
                                                    <button onClick={() => handleUpdateStatus(c.id, "rejected")} className="p-2 bg-slate-800 hover:bg-red-600 text-white rounded-lg transition-all border border-slate-700"><X size={16} strokeWidth={3} /></button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <div className="flex justify-end gap-3">
                                                <button onClick={() => { setSelectedCancel(c); setEditOpen(true); }} className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 font-bold text-sm"><Edit3 size={18} /> Edit</button>
                                                <button onClick={() => handleDelete(c.id)} className="flex items-center gap-1 text-slate-400 hover:text-red-500 font-bold text-sm"><Trash2 size={18} /> Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- MOBILE & IPAD --- */}
                <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mx-auto">
                    {cancellations.map((c) => (
                        <div key={c.id} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 shadow-xl flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-3 gap-2">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20 shrink-0">
                                        <User size={16} />
                                    </div>
                                    <div className="truncate">
                                        <h4 className="font-bold text-white text-sm leading-tight truncate">{c.name}</h4>
                                        <p className="text-[10px] text-slate-500 truncate">{c.email}</p>
                                    </div>
                                </div>
                                <span className={`shrink-0 px-2 py-0.5 rounded text-[9px] font-black uppercase border ${c.status === "approved" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                    c.status === "rejected" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                        "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                    }`}>
                                    {c.status}
                                </span>
                            </div>

                            <div className="space-y-2 bg-slate-900/40 rounded-xl p-3 border border-slate-700/50 text-xs">
                                <div className="flex items-center gap-2 font-semibold text-slate-300">
                                    <MapPin size={12} className="text-indigo-500 shrink-0" />
                                    <span className="truncate">{c.hotel_name}</span>
                                </div>
                                <div className="text-slate-400 italic line-clamp-2">"{c.reason}"</div>
                            </div>

                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700/50">
                                <div className="flex gap-2">
                                    <button onClick={() => handleUpdateStatus(c.id, "approved")} className="p-2 bg-green-600/20 text-green-400 rounded-lg border border-green-500/20 hover:bg-green-600 hover:text-white transition-all"><Check size={14} /></button>
                                    <button onClick={() => handleUpdateStatus(c.id, "rejected")} className="p-2 bg-red-600/20 text-red-400 rounded-lg border border-red-500/20 hover:bg-red-600 hover:text-white transition-all"><X size={14} /></button>
                                </div>
                                <div className="flex gap-4 px-2">
                                    <button onClick={() => { setSelectedCancel(c); setEditOpen(true); }} className="text-slate-400 hover:text-indigo-400 transition-colors"><Edit3 size={16} /></button>
                                    <button onClick={() => handleDelete(c.id)} className="text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <EditCanceledBooking
                open={editOpen}
                onClose={() => setEditOpen(false)}
                cancellation={selectedCancel}
                token={token}
                onSaved={fetchCancellations}
            />
        </div>
    );
}

export default CancelBookings;