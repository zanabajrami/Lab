import { useState, useEffect } from "react";
import axios from "axios";

export default function EditBookingModal({ booking, onClose, onUpdated }) {
    const token = localStorage.getItem("token");
    const [form, setForm] = useState({ ...booking });
    const [pricePerNight] = useState(
        booking.total_price / booking.nights || 100
    );
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/hotels")
            .then(res => setHotels(res.data))
            .catch(err => console.error("Error fetching hotels:", err));
    }, []);

    useEffect(() => {
        const checkIn = new Date(form.check_in);
        const checkOut = new Date(form.check_out);

        if (!isNaN(checkIn) && !isNaN(checkOut) && checkOut > checkIn) {
            const diffTime = checkOut - checkIn;
            const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setForm((prev) => ({
                ...prev,
                nights,
                total_price: (nights * pricePerNight).toFixed(2),
            }));
        }
    }, [form.check_in, form.check_out, pricePerNight]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const save = async () => {
        try {
            await axios.put(
                `http://localhost:8000/api/bookings/${booking.id}`,
                form,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onUpdated(form);
            onClose();
        } catch (err) {
            console.error("Failed to save booking", err);
        }
    };

    // Stilet e tua origjinale
    const inputStyle = "w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all";
    const readOnlyStyle = "bg-gray-50 text-gray-500 cursor-not-allowed border-dashed";
    const labelStyle = "block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 ml-1";

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, []);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh]">
                <div className="px-5 py-4 border-b flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Edit Booking</h2>
                        <p className="text-xs text-gray-500">ID: {booking.id.toString().slice(-5)}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 text-2xl leading-none">&times;</button>
                </div>
                <div className="p-5 overflow-y-auto space-y-4">

                    {/* Hotel Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="w-full">
                            <label className={labelStyle}>Hotel Name</label>
                            <select
                                name="hotel_id"
                                value={form.hotel_id}
                                onChange={(e) => {
                                    const hotelId = Number(e.target.value);
                                    const hotel = hotels.find(h => h.id === hotelId);
                                    if (!hotel) return;
                                    setForm(prev => ({
                                        ...prev,
                                        hotel_id: hotel.id,
                                        hotel_name: hotel.name,
                                        location: hotel.location,
                                        total_price: (hotel.price * prev.nights).toFixed(2)
                                    }));
                                }}
                                className={inputStyle}
                            >
                                {hotels.map(h => (
                                    <option key={h.id} value={h.id}>
                                        {h.name} — {h.location}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full">
                            <label className={labelStyle}>Location</label>
                            <input
                                value={form.location}
                                readOnly
                                className={`${inputStyle} ${readOnlyStyle}`}
                            />
                        </div>
                    </div>

                    {/* Guest */}
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className={labelStyle}>First Name</label>
                                <input value={form.first_name} readOnly className={`${inputStyle} ${readOnlyStyle}`} />
                            </div>
                            <div>
                                <label className={labelStyle}>Last Name</label>
                                <input value={form.last_name} readOnly className={`${inputStyle} ${readOnlyStyle}`} />
                            </div>
                        </div>
                        <div>
                            <label className={labelStyle}>Email Address</label>
                            <input value={form.email} readOnly className={`${inputStyle} ${readOnlyStyle}`} />
                        </div>
                    </div>

                    {/* Dates & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-1">
                            <label className={labelStyle}>Phone</label>
                            <input name="phone" value={form.phone} onChange={handleChange} className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelStyle}>Check In</label>
                            <input type="date" name="check_in" value={form.check_in} onChange={handleChange} className={inputStyle} />
                        </div>
                        <div>
                            <label className={labelStyle}>Check Out</label>
                            <input type="date" name="check_out" value={form.check_out} onChange={handleChange} className={inputStyle} />
                        </div>
                    </div>

                    {/* Total */}
                    <div className="grid grid-cols-2 gap-3 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                        <div>
                            <label className={labelStyle}>Total Nights</label>
                            <div className="font-semibold text-gray-700 px-2 text-sm">{form.nights} nights</div>
                        </div>
                        <div>
                            <label className={labelStyle}>Total Price</label>
                            <div className="font-bold text-red-600 px-2 text-sm">${form.total_price}</div>
                        </div>
                    </div>

                    {/* Status & Notes */}
                    <div className="space-y-3">
                        <div>
                            <label className={labelStyle}>Status</label>
                            <select name="status" value={form.status} onChange={handleChange} className={`${inputStyle} bg-white`}>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelStyle}>Notes</label>
                            <textarea
                                name="special_requests"
                                value={form.special_requests || ""}
                                onChange={handleChange}
                                className={`${inputStyle} h-20 resize-none`}
                                placeholder="Special requests..."
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t bg-gray-50 flex flex-col sm:flex-row gap-3 shrink-0 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="w-full sm:flex-1 px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-100 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={save}
                        className="w-full sm:flex-[2] px-4 py-2.5 rounded-xl bg-slate-950 text-white font-bold text-sm hover:bg-slate-900 shadow-lg transition-all active:scale-95"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}