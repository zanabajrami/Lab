import { useState, useEffect } from "react";
import axios from "axios";
import { hotels } from "../../data/HotelsData";

export default function CreateBooking({ onClose, onCreated }) {
    const token = localStorage.getItem("token");

    // --- FORM STATE ---
    const [form, setForm] = useState({
        user_id: "",
        hotel_id: "",
        hotel_name: "",
        location: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        special_requests: "",
        check_in: "",
        check_out: "",
        nights: 1,
        total_price: "",
        status: "confirmed"
    });

    // --- AUTO CALCULATE NIGHTS ---
    useEffect(() => {
        if (form.check_in && form.check_out) {
            const inDate = new Date(form.check_in);
            const outDate = new Date(form.check_out);
            const diff = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
            if (diff > 0) {
                setForm(prev => ({ ...prev, nights: diff }));
            }
        }
    }, [form.check_in, form.check_out]);

    // --- SUBMIT ---
    const submit = async () => {
        const res = await axios.post(
            "http://localhost:8000/api/bookings",
            form,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        onCreated(res.data.booking);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-2xl p-6 relative">

                {/* CLOSE */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-black text-gray-800 mb-4">
                    Add New Booking
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* USER ID */}
                    <input
                        className="input"
                        placeholder="User ID"
                        value={form.user_id}
                        onChange={e => setForm({ ...form, user_id: e.target.value })}
                    />

                    {/* PHONE */}
                    <input
                        className="input"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                    />

                    {/* FIRST NAME */}
                    <input
                        className="input"
                        placeholder="First name"
                        value={form.first_name}
                        onChange={e => setForm({ ...form, first_name: e.target.value })}
                    />

                    {/* LAST NAME */}
                    <input
                        className="input"
                        placeholder="Last name"
                        value={form.last_name}
                        onChange={e => setForm({ ...form, last_name: e.target.value })}
                    />

                    {/* EMAIL */}
                    <input
                        className="input"
                        placeholder="Email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                    />

                    {/* HOTEL */}
                    <select
                        className="input"
                        onChange={(e) => {
                            const h = hotels.find(x => x.id === Number(e.target.value));
                            if (!h) return;
                            setForm({
                                ...form,
                                hotel_id: h.id,
                                hotel_name: h.name,
                                location: h.location
                            });
                        }}
                    >
                        <option value="">Select hotel</option>
                        {hotels.map(h => (
                            <option key={h.id} value={h.id}>
                                {h.name} – {h.location}
                            </option>
                        ))}
                    </select>

                    {/* CHECK IN */}
                    <input
                        type="date"
                        className="input"
                        onChange={e => setForm({ ...form, check_in: e.target.value })}
                    />

                    {/* CHECK OUT */}
                    <input
                        type="date"
                        className="input"
                        onChange={e => setForm({ ...form, check_out: e.target.value })}
                    />

                    {/* NIGHTS (AUTO) */}
                    <input
                        className="input bg-gray-100"
                        value={`Nights: ${form.nights}`}
                        disabled
                    />

                    {/* TOTAL PRICE */}
                    <input
                        className="input"
                        placeholder="Total price (€)"
                        value={form.total_price}
                        onChange={e => setForm({ ...form, total_price: e.target.value })}
                    />

                    {/* STATUS */}
                    <select
                        className="input"
                        value={form.status}
                        onChange={e => setForm({ ...form, status: e.target.value })}
                    >
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    {/* SPECIAL REQUESTS */}
                    <textarea
                        className="input col-span-1 md:col-span-2"
                        placeholder="Special requests"
                        value={form.special_requests}
                        onChange={e => setForm({ ...form, special_requests: e.target.value })}
                    />
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-gray-100 font-bold"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={submit}
                        className="px-5 py-2 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-900"
                    >
                        Create Booking
                    </button>
                </div>
            </div>
        </div>
    );
}
