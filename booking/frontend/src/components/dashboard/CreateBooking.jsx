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

    useEffect(() => {
        if (!token) return;
        axios.get("http://localhost:8000/api/users", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setUsers(res.data))
        .catch(err => console.error("Auth error:", err));
    }, [token]);

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

  const submit = async () => {
    const requiredFields = [
        { key: "user_id", label: "User" },
        { key: "hotel_id", label: "Hotel" },
        { key: "first_name", label: "First Name" },
        { key: "last_name", label: "Last Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone Number" },
        { key: "check_in", label: "Check-In Date" },
        { key: "check_out", label: "Check-Out Date" },
    ];

    for (let field of requiredFields) {
        if (!form[field.key] || form[field.key].toString().trim() === "") {
            alert(`Please enter ${field.label} — You didn't!`);
            return; // ndalon submit-in
        }
    }

    try {
        const res = await axios.post(
            "http://localhost:8000/api/bookings",
            form,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        onCreated(res.data.booking);
        onClose();
    } catch (err) {
        console.error("Booking creation error:", err);
        alert("Error creating booking. Check console for details.");
    }
};

    const inputStyle = "w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-200 outline-none transition-all";
    const labelStyle = "block text-[10px] font-bold text-gray-400 uppercase mb-0.5 ml-1";

       useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, []);
    
    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                
                {/* Header */}
                <div className="px-5 py-3 border-b bg-gray-50/50 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-800">New Booking</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-slate-800 transition-colors">✕</button>
                </div>

                <div className="p-5">
                    <div className="grid grid-cols-2 gap-3">
                        
                        {/* Guest Section */}
                        <div className="col-span-2">
                            <label className={labelStyle}>Guest Selection</label>
                            <select className={inputStyle} onChange={e => handleUserSelect(e.target.value)}>
                                <option value="">Select a user...</option>
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>{u.first_name} {u.last_name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className={labelStyle}>First Name</label>
                            <input className={`${inputStyle} bg-gray-50 text-gray-500`} value={form.first_name} disabled />
                        </div>
                        <div>
                            <label className={labelStyle}>Last Name</label>
                            <input className={`${inputStyle} bg-gray-50 text-gray-500`} value={form.last_name} disabled />
                        </div>

                        <div className="col-span-2">
                            <label className={labelStyle}>Phone Number</label>
                            <input className={inputStyle} placeholder="Enter phone..." value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                        </div>

                        <div className="col-span-2 border-t my-1"></div>

                        {/* Hotel Section - Tani me Lokacion */}
                        <div className="col-span-2">
                            <label className={labelStyle}>Hotel & Location</label>
                            <select className={inputStyle} onChange={e => handleHotelSelect(e.target.value)}>
                                <option value="">Select hotel...</option>
                                {hotels.map(h => (
                                    <option key={h.id} value={h.id}>
                                        {h.name} — ({h.location})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Dates */}
                        <div>
                            <label className={labelStyle}>Check-In</label>
                            <input type="date" className={inputStyle} onChange={e => setForm({...form, check_in: e.target.value})} />
                        </div>
                        <div>
                            <label className={labelStyle}>Check-Out</label>
                            <input type="date" className={inputStyle} onChange={e => setForm({...form, check_out: e.target.value})} />
                        </div>

                        {/* Special Requests - Kthyer përsëri */}
                        <div className="col-span-2">
                            <label className={labelStyle}>Special Requests</label>
                            <textarea 
                                className={`${inputStyle} h-16 resize-none`} 
                                placeholder="Any notes..." 
                                value={form.special_requests}
                                onChange={e => setForm({...form, special_requests: e.target.value})}
                            />
                        </div>

                        {/* Summary Box */}
                        <div className="col-span-2 flex items-center justify-between bg-slate-900 p-3 rounded-xl text-white">
                            <div className="flex flex-col border-r border-slate-600 pr-4">
                                <span className="text-[9px] uppercase opacity-60">Stay</span>
                                <span className="text-sm font-bold">{form.nights} Nights</span>
                            </div>
                            <div className="flex flex-col flex-1 px-4">
                                <span className="text-[9px] uppercase opacity-60">Total Cost</span>
                                <span className="text-lg font-black text-red-600">€{form.total_price}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] uppercase opacity-60">Status</span>
                                <select className="bg-transparent font-bold text-sm outline-none cursor-pointer" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                                    <option className="text-black" value="confirmed">Confirmed</option>
                                    <option className="text-black" value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-4 bg-gray-50 flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700">Cancel</button>
                    <button onClick={submit} className="px-6 py-2 bg-slate-200 text-slate-800 text-sm font-bold rounded-lg shadow-lg hover:bg-slate-900 hover:text-white transition-all active:scale-95">
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
}