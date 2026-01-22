import { useState, useEffect } from "react";
import axios from "axios";

export default function EditBookingModal({ booking, onClose, onUpdated }) {
    const token = localStorage.getItem("token");

    const [form, setForm] = useState({ ...booking });
    const [pricePerNight, setPricePerNight] = useState(
        booking.total_price / booking.nights || 100
    );

    // Llogarit nights dhe total_price çdo herë që ndryshojnë datat
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

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[520px] rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-black">Edit Booking</h2>

                <div className="grid grid-cols-2 gap-3">
                    <input
                        name="hotel_name"
                        value={form.hotel_name}
                        onChange={handleChange}
                        className="input"
                    />
                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="input"
                    />

                    <input
                        name="first_name"
                        value={form.first_name}
                        onChange={handleChange}
                        className="input"
                    />
                    <input
                        name="last_name"
                        value={form.last_name}
                        onChange={handleChange}
                        className="input"
                    />

                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="input"
                    />
                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="input"
                    />

                    <input
                        type="date"
                        name="check_in"
                        value={form.check_in}
                        onChange={handleChange}
                        className="input"
                    />
                    <input
                        type="date"
                        name="check_out"
                        value={form.check_out}
                        onChange={handleChange}
                        className="input"
                    />

                    <input
                        type="number"
                        name="nights"
                        value={form.nights}
                        readOnly
                        className="input bg-gray-100"
                    />
                    <input
                        type="number"
                        name="total_price"
                        value={form.total_price}
                        readOnly
                        className="input bg-gray-100"
                    />
                </div>

                <textarea
                    name="special_requests"
                    value={form.special_requests || ""}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                    placeholder="Special requests"
                />

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                >
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-100 font-bold"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={save}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
