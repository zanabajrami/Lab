import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function EditHotel({ hotel, onClose, onUpdated }) {
    const [form, setForm] = useState({
        name: "",
        location: "",
        rating: "",
        description: "",
        rooms: "",
        capacity: "",
        price: "",
        amenities: "",
    });

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, []);

    useEffect(() => {
        if (hotel) {
            setForm({
                name: hotel.name || "",
                location: hotel.location || "",
                rating: hotel.rating || "",
                description: hotel.description || "",
                rooms: hotel.rooms || "",
                capacity: hotel.capacity || "",
                price: hotel.price || "",
                amenities: (hotel.amenities || []).join(", "),
            });
        }
    }, [hotel]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const res = await fetch(
                `http://localhost:8000/api/hotels/${hotel.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        ...form,
                        rating: Number(form.rating),
                        price: Number(form.price),
                        rooms: Number(form.rooms),
                        capacity: Number(form.capacity),
                        amenities: form.amenities
                            .split(",")
                            .map(a => a.trim())
                            .filter(Boolean),
                    }),
                }
            );

            const updatedHotel = await res.json();

            if (!res.ok) {
                alert("Update failed");
                return;
            }

            onUpdated(updatedHotel);
            onClose();
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6">
            <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                <div className="bg-slate-900 p-6 sm:p-8 relative shrink-0">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-400 hover:text-white transition-colors p-2"
                    >
                        <X size={24} />
                    </button>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                        Edit <span className="text-indigo-400">Hotel</span>
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1 uppercase tracking-widest font-medium">
                        Update Property Information
                    </p>
                </div>

                <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-slate-500 ml-1">Name</label>
                            <input name="name" value={form.name} onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400/20 focus:border-indigo-400 outline-none transition-all text-slate-900" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-slate-500 ml-1">Location</label>
                            <input name="location" value={form.location} onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400/20 focus:border-indigo-400 outline-none transition-all text-slate-900" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-slate-500 ml-1">Rating</label>
                            <input name="rating" value={form.rating} onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400/20 focus:border-indigo-400 outline-none transition-all text-slate-900" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-slate-500 ml-1">Price</label>
                            <input name="price" value={form.price} onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400/20 focus:border-indigo-400 outline-none transition-all text-slate-900" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-500 ml-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400/20 focus:border-indigo-400 outline-none transition-all text-slate-900 resize-none"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-slate-500 ml-1">Amenities</label>
                        <input
                            name="amenities"
                            value={form.amenities}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400/20 focus:border-indigo-400 outline-none transition-all text-slate-900"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-slate-500 ml-1">Rooms</label>
                            <input
                                type="number"
                                name="rooms"
                                value={form.rooms}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400/20 focus:border-indigo-400 outline-none transition-all text-slate-900"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-slate-500 ml-1">Capacity</label>
                            <input
                                type="number"
                                name="capacity"
                                value={form.capacity}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400/20 focus:border-indigo-400 outline-none transition-all text-slate-900"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full mt-4 py-2 rounded-xl bg-slate-900 text-indigo-400 hover:bg-indigo-300 hover:text-slate-800 font-bold text-lg transition-all shadow-lg active:scale-[0.98]"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}