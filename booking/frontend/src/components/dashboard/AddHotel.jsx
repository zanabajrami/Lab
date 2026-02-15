import React, { useState, useEffect } from "react";
import { X, Upload, MapPin, Star, Bed, Users, Info, PlusCircle, DollarSign } from "lucide-react";

export default function AddHotelModal({ onClose, onHotelAdded }) {
    const [form, setForm] = useState({
        name: "",
        location: "",
        rating: 1,
        description: "",
        rooms: 1,
        capacity: 1,
        price: 0,
        amenities: "",
        images: [],
    });

    const [uploading, setUploading] = useState(false);

    // Bllock scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setForm(prev => ({ ...prev, images: e.target.files }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return alert("Ju lutem logohuni!");

        const formData = new FormData();
        for (const key in form) {
            if (key === "images") {
                for (let i = 0; i < form.images.length; i++) {
                    formData.append("images[]", form.images[i]);
                }
            } else if (key === "amenities") {
                const amenitiesArray = form[key]
                    .split(",")
                    .map(a => a.trim())
                    .filter(Boolean);
                formData.append("amenities", JSON.stringify(amenitiesArray));
            } else {
                formData.append(key, form[key]);
            }
        }

        setUploading(true);
        try {
            const res = await fetch("http://localhost:8000/api/hotels", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (!res.ok) throw new Error("Dështoi shtimi i hotelit");

            const data = await res.json();
            onHotelAdded(data);
            onClose();
        } catch (err) {
            console.error(err);
            alert("Gabim gjatë procesimit!");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
                onClick={onClose}
            />

            {/* Container */}
            <div className="relative bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden transition-all duration-200 animate-in zoom-in-95">
                <div className="relative p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shrink-0">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-slate-400 hover:text-white transition-all p-2 hover:bg-white/10 rounded-full"
                    >
                        <X size={22} />
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                            <PlusCircle className="text-indigo-400" size={20} />
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">
                            Add New Hotel
                        </h2>
                    </div>
                    <p className="text-slate-400 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em]">
                        Register a new <span className="text-indigo-300">Property</span>
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 sm:p-10 overflow-y-auto space-y-6 bg-[#f8fafc] scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Name */}
                        <div className="md:col-span-2 space-y-2">
                            <Label icon={<Info size={14} />} text="Hotel Name" />
                            <input
                                type="text" name="name" required value={form.name} onChange={handleChange}
                                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-900 font-medium placeholder:text-slate-400 shadow-sm"
                                placeholder="E.g. Emerald Hotel"
                            />
                        </div>

                        {/* Location */}
                        <div className="md:col-span-2 space-y-2">
                            <Label icon={<MapPin size={14} />} text="Location" />
                            <input
                                type="text" name="location" required value={form.location} onChange={handleChange}
                                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-900 font-medium placeholder:text-slate-400 shadow-sm"
                                placeholder="Prishtina"
                            />
                        </div>

                        {/* Rating */}
                        <div className="space-y-2">
                            <Label icon={<Star size={14} />} text="Rating (1-5)" />
                            <input
                                type="number" name="rating" min="1" max="5" value={form.rating} onChange={handleChange}
                                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-900 font-medium shadow-sm"
                            />
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <Label icon={<DollarSign size={14} />} text="Price per Night" />
                            <input
                                type="number" name="price" value={form.price} onChange={handleChange}
                                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-900 font-medium shadow-sm"
                            />
                        </div>

                        {/* Rooms */}
                        <div className="space-y-2">
                            <Label icon={<Bed size={14} />} text="Total Rooms" />
                            <input
                                type="number" name="rooms" value={form.rooms} onChange={handleChange}
                                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-900 font-medium shadow-sm"
                            />
                        </div>

                        {/* Capacity */}
                        <div className="space-y-2">
                            <Label icon={<Users size={14} />} text="Max Capacity" />
                            <input
                                type="number" name="capacity" value={form.capacity} onChange={handleChange}
                                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-900 font-medium shadow-sm"
                            />
                        </div>

                        {/* Amenities */}
                        <div className="md:col-span-2 space-y-2">
                            <Label text="Amenities (comma separated)" />
                            <input
                                type="text" name="amenities" value={form.amenities} onChange={handleChange}
                                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-900 font-medium shadow-sm placeholder:text-slate-400 text-sm"
                                placeholder="WiFi, Pool, Spa, Gym, Breakfast..."
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2 space-y-2">
                            <Label text="Description" />
                            <textarea
                                name="description" value={form.description} onChange={handleChange} rows="3"
                                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-900 font-medium shadow-sm resize-none min-h-[100px]"
                                placeholder="Describe the property..."
                            />
                        </div>

                        {/* Image Upload Area */}
                        <div className="md:col-span-2 space-y-2">
                            <Label text="Upload Images" />
                            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-slate-200 rounded-[2rem] bg-white hover:bg-indigo-50/30 hover:border-indigo-400 transition-all cursor-pointer group shadow-sm">
                                <div className="flex flex-col items-center justify-center p-4 text-center">
                                    <Upload className="w-8 h-8 text-slate-300 group-hover:text-indigo-500 group-hover:-translate-y-1 transition-all mb-2" />
                                    <p className="text-sm text-slate-500 font-semibold">
                                        {form.images.length > 0
                                            ? <span className="text-indigo-600 font-bold">{form.images.length} files selected</span>
                                            : "Click to upload hotel images"}
                                    </p>
                                </div>
                                <input type="file" multiple onChange={handleFileChange} className="hidden" />
                            </label>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="pt-8 flex flex-col sm:flex-row gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-4 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-white hover:border-slate-300 transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="flex-[2] py-4 rounded-2xl font-bold bg-slate-900 text-indigo-400 hover:bg-indigo-300 hover:text-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                            {uploading ? "Publishing..." : "Publish Hotel Listing"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Sub-komponent për Labelat që të mos përsëritet kodi
function Label({ icon, text }) {
    return (
        <label className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">
            {icon && <span className="text-slate-300">{icon}</span>}
            {text}
        </label>
    );
}