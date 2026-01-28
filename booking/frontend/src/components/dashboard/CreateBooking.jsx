import { useState, useEffect } from "react";
import axios from "axios";
import { hotels } from "../../data/HotelsData";

export default function CreateBooking({ onClose, onCreated }) {
    const token = localStorage.getItem("token");
    const [users, setUsers] = useState([]);

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
        total_price: 0,
        status: "confirmed"
    });

    // Fetch users
    useEffect(() => {
        axios.get("http://localhost:8000/api/users", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setUsers(res.data));
    }, [token]);

    // Auto-fill name/email when user selected
    const handleUserSelect = (userId) => {
        const user = users.find(u => u.id === Number(userId));
        if (!user) return;
        setForm(prev => ({
            ...prev,
            user_id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }));
    };

    // Auto-fill hotel_name/location/price when hotel selected
    const handleHotelSelect = (hotelId) => {
        const hotel = hotels.find(h => h.id === Number(hotelId));
        if (!hotel) return;
        setForm(prev => ({
            ...prev,
            hotel_id: hotel.id,
            hotel_name: hotel.name,
            location: hotel.location,
            total_price: hotel.price * prev.nights
        }));
    };

    // Auto-calculate nights
    useEffect(() => {
        if (form.check_in && form.check_out) {
            const inDate = new Date(form.check_in);
            const outDate = new Date(form.check_out);
            const diff = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
            if (diff > 0) {
                setForm(prev => ({
                    ...prev,
                    nights: diff,
                    total_price: hotels.find(h => h.id === prev.hotel_id)?.price * diff || 0
                }));
            }
        }
    }, [form.check_in, form.check_out, form.hotel_id]);

    // Submit with validation
    const submit = async () => {
        // Minimal validation
        const requiredFields = ["user_id", "hotel_id", "first_name", "last_name", "email", "phone", "check_in", "check_out"];
        for (let field of requiredFields) {
            if (!form[field]) {
                alert(`Please fill in ${field.replace("_", " ")}`);
                return;
            }
        }

        try {
            const res = await axios.post(
                "http://localhost:8000/api/bookings",
                form,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onCreated(res.data.booking);
        } catch (err) {
            console.error(err);
            alert("Failed to create booking. Check console for details.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-3xl rounded-2xl p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold">✕</button>
                <h2 className="text-2xl font-black mb-6">Add New Booking</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* USER */}
                    <select className="input" onChange={e => handleUserSelect(e.target.value)}>
                        <option value="">Select user</option>
                        {users.map(u => (
                            <option key={u.id} value={u.id}>
                                {u.first_name} {u.last_name} ({u.email})
                            </option>
                        ))}
                    </select>

                    <input className="input bg-gray-100" value={form.email} disabled />
                    <input className="input bg-gray-100" value={form.first_name} disabled />
                    <input className="input bg-gray-100" value={form.last_name} disabled />

                    {/* PHONE */}
                    <input
                        className="input"
                        placeholder="Phone Number"
                        name="phone"
                        value={form.phone || ""}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                    />

                    {/* HOTEL */}
                    <select className="input" onChange={e => handleHotelSelect(e.target.value)}>
                        <option value="">Select hotel</option>
                        {hotels.map(h => (
                            <option key={h.id} value={h.id}>
                                {h.name} – {h.location} (€{h.price}/night)
                            </option>
                        ))}
                    </select>

                    <input className="input bg-gray-100" value={form.location} disabled />

                    {/* DATES */}
                    <input type="date" className="input" onChange={e => setForm({ ...form, check_in: e.target.value })} />
                    <input type="date" className="input" onChange={e => setForm({ ...form, check_out: e.target.value })} />

                    {/* NIGHTS */}
                    <input className="input bg-gray-100" value={`Nights: ${form.nights}`} disabled />

                    {/* PRICE */}
                    <input className="input bg-gray-100" value={`Price: €${form.total_price}`} disabled />

                    {/* STATUS */}
                    <select className="input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    {/* SPECIAL REQUESTS */}
                    <textarea
                        className="input col-span-1 md:col-span-2"
                        placeholder="Special requests"
                        value={form.special_requests || ""}  // controlled
                        onChange={e => setForm({ ...form, special_requests: e.target.value })}
                    />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-100 font-bold">Cancel</button>
                    <button onClick={submit} className="px-5 py-2 rounded-xl bg-slate-800 text-white font-bold">Create Booking</button>
                </div>
            </div>
        </div>
    );
}
