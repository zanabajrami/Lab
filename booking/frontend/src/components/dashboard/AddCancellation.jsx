import { useEffect, useState } from "react";
import { X, MapPin, Hotel, ArrowRight, Info } from "lucide-react";

export default function AddCancellation({ open, onClose, token, onSaved }) {
    const [bookings, setBookings] = useState([]);
    const [cancelledIds, setCancelledIds] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [open]);

    useEffect(() => {
        if (!open) return;

        const fetchData = async () => {
            try {
                const headers = { Authorization: `Bearer ${token}` };
                
                const [resBookings, resCancelled] = await Promise.all([
                    fetch("http://localhost:8000/api/bookings", { headers }),
                    fetch("http://localhost:8000/api/cancel-bookings", { headers })
                ]);

                const bookingsData = await resBookings.json();
                const cancelledData = await resCancelled.json();

                // Marrim ID e booking_id nga lista e anulimeve
                const ids = cancelledData.map(item => item.booking_id);
                
                setBookings(bookingsData);
                setCancelledIds(ids);
            } catch (error) {
                console.error("Failed to load bookings:", error);
            }
        };

        fetchData();
    }, [open, token]);

    // Filtrojmë bookings që nuk janë në listën e anulimeve
    const availableBookings = bookings.filter(b => !cancelledIds.includes(b.id));

    const handleBookingChange = (e) => {
        const booking = availableBookings.find(b => b.id === Number(e.target.value));
        setSelectedBooking(booking);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedBooking) return alert("Please select a booking");

        setLoading(true);

        const payload = {
            booking_id: selectedBooking.id,
            name: `${selectedBooking.first_name} ${selectedBooking.last_name}`,
            email: selectedBooking.email,
            hotel_name: selectedBooking.hotel_name,
            location: selectedBooking.location,
            check_in: selectedBooking.check_in,
            check_out: selectedBooking.check_out,
            reason
        };

        try {
            const res = await fetch("http://localhost:8000/api/cancel-bookings", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                onSaved();
                onClose();
                setSelectedBooking(null);
                setReason("");
            } else {
                const errorData = await res.json();
                alert(errorData.message || "Failed to create cancellation");
            }
        } catch (error) {
            alert("Network error, please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-[6px]" onClick={onClose} />

            <form
                onSubmit={handleSubmit}
                className="relative bg-white w-full max-w-xl rounded-[2rem] md:rounded-[2.5rem] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-300"
            >
                {/* Header */}
                <div className="px-5 py-4 md:px-8 md:py-6 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
                            Cancel <span className="text-indigo-400">Reservation</span>
                        </h2>
                        <p className="text-xs md:text-sm text-slate-400 font-medium">Select an active booking to proceed</p>
                    </div>
                    <button type="button" onClick={onClose} className="p-2 md:p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 transition-all">
                        <X className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>

                <div className="p-5 md:p-8 overflow-y-auto space-y-6 md:space-y-8 scrollbar-hide">
                    {/* DROPDOWN */}
                    <div className="space-y-2 md:space-y-3">
                        <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[2px] text-slate-400 ml-1">
                            Available Bookings ({availableBookings.length})
                        </label>
                        <div className="relative group">
                            <select
                                onChange={handleBookingChange}
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl md:rounded-2xl p-3 md:p-4 text-sm md:text-base text-slate-700 font-bold focus:bg-white focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer shadow-sm"
                                required
                            >
                                <option value="">Select a booking...</option>
                                {availableBookings.map(b => (
                                    <option key={b.id} value={b.id}>
                                        {b.first_name} {b.last_name} — {b.hotel_name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                                <ArrowRight className="w-4 h-4 md:w-5 h-5 rotate-90" />
                            </div>
                        </div>
                    </div>

                    {/* CARD */}
                    {selectedBooking ? (
                        <div className="bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl animate-in slide-in-from-bottom-4">
                            <div className="bg-indigo-600 px-5 py-3 md:px-6 md:py-4 flex items-center justify-between">
                                <div className="flex items-center gap-2 md:gap-3 text-white">
                                    <Hotel className="w-4 h-4 md:w-5 h-5" />
                                    <span className="font-black tracking-wide uppercase text-[11px] md:text-sm truncate">
                                        {selectedBooking.hotel_name}
                                    </span>
                                </div>
                                <div className="bg-white/20 px-2 py-1 rounded-full text-[9px] text-white font-bold uppercase">Active</div>
                            </div>

                            <div className="p-5 md:p-6 grid grid-cols-2 gap-4 md:gap-6 text-white">
                                <div className="space-y-1">
                                    <span className="text-[9px] font-black text-indigo-400 uppercase block">Guest</span>
                                    <p className="font-bold text-xs md:text-base truncate">{selectedBooking.first_name} {selectedBooking.last_name}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[9px] font-black text-indigo-400 uppercase block">Email</span>
                                    <p className="font-medium text-xs md:text-sm truncate">{selectedBooking.email}</p>
                                </div>
                                <div className="col-span-2 pt-2 border-t border-slate-800 flex items-center gap-2 text-slate-300 text-xs">
                                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                                    {selectedBooking.location}
                                </div>
                                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                                    <span className="text-[9px] font-black text-emerald-400 uppercase block mb-1">Check In</span>
                                    <p className="font-bold text-xs">{selectedBooking.check_in}</p>
                                </div>
                                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                                    <span className="text-[9px] font-black text-rose-400 uppercase block mb-1">Check Out</span>
                                    <p className="font-bold text-xs">{selectedBooking.check_out}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="py-8 md:py-12 text-center border-2 border-dashed border-slate-100 rounded-[1.5rem] md:rounded-[2rem] bg-slate-50/50">
                            <Info className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                            <p className="text-slate-400 text-xs font-bold px-6 uppercase tracking-widest">Select to view data</p>
                        </div>
                    )}

                    {/* REASON */}
                    <div className="space-y-2 md:space-y-3">
                        <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[2px] text-slate-400 ml-1">
                            Reason for Cancellation
                        </label>
                        <textarea
                            value={reason}
                            onChange={e => setReason(e.target.value)}
                            placeholder="Briefly describe the reason..."
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl md:rounded-2xl p-3 md:p-4 text-sm text-slate-700 focus:bg-white focus:border-red-500 outline-none transition-all resize-none min-h-[100px]"
                            required
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-5 md:p-8 bg-white border-t border-slate-50 flex flex-col-reverse sm:flex-row gap-3">
                    <button type="button" onClick={onClose} className="flex-1 px-4 py-3 text-slate-500 font-black uppercase text-[10px] tracking-widest hover:bg-slate-100 rounded-xl transition-all">
                        Dismiss
                    </button>
                    <button
                        disabled={loading || !selectedBooking}
                        className="flex-[2] bg-slate-900 text-indigo-400 hover:bg-indigo-300 hover:text-slate-800 disabled:bg-slate-200 py-3 md:py-4 rounded-xl md:rounded-2xl font-black uppercase text-[10px] tracking-[2px] transition-all flex items-center justify-center gap-2 group shadow-xl shadow-slate-200"
                    >
                        {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Confirm Cancellation"}
                    </button>
                </div>
            </form>
        </div>
    );
}