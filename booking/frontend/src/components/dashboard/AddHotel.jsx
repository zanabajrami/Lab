import { useState } from "react";
import { X } from "lucide-react";

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setForm(prev => ({ ...prev, images: e.target.files }));
    };

    const getFullImageUrl = (img) => {
        if (!img) return null;
        return img.startsWith("http")
            ? img
            : `http://localhost:8000/storage/images/${img}`;
    };

    const parseAmenities = (a) => {
        if (!a) return [];
        if (Array.isArray(a)) return a;
        if (typeof a === "string") {
            try { return JSON.parse(a); }
            catch { return a.split(",").map(x => x.trim()); }
        }
        return [];
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
                    .filter(a => a.length > 0);
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

            if (!res.ok) {
                const text = await res.text();
                console.error("Gabim nga serveri:", text);
                alert("Gabim: " + text);
                return;
            }

            const data = await res.json();

            const images = Array.isArray(data.images)
                ? data.images.map(getFullImageUrl)
                : data.images ? [getFullImageUrl(data.images)] : [];

            const amenities = parseAmenities(data.amenities);

            const hotelWithFullImages = { ...data, images, amenities };

            onHotelAdded(hotelWithFullImages);
            onClose();
            alert("Hotel added successfully!");
        } catch (err) {
            console.error("Gabim:", err);
            alert("Gabim! Shiko console për detaje.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <div className="relative bg-white p-6 rounded-3xl w-full max-w-lg shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                    <X />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-center">Add New Hotel</h2>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Hotel Name" required value={form.name} onChange={handleChange} className="border p-3 rounded-lg" />
                    <input type="text" name="location" placeholder="Location" required value={form.location} onChange={handleChange} className="border p-3 rounded-lg" />
                    <input type="number" name="rating" placeholder="Rating" min={1} max={5} value={form.rating} onChange={handleChange} className="border p-3 rounded-lg" />
                    <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-3 rounded-lg" rows={3} />
                    <input type="number" name="rooms" placeholder="Rooms" min={1} value={form.rooms} onChange={handleChange} className="border p-3 rounded-lg" />
                    <input type="number" name="capacity" placeholder="Capacity" min={1} value={form.capacity} onChange={handleChange} className="border p-3 rounded-lg" />
                    <input type="number" name="price" placeholder="Price per night" min={0} value={form.price} onChange={handleChange} className="border p-3 rounded-lg" />
                    <input type="text" name="amenities" placeholder="Amenities (comma separated)" value={form.amenities} onChange={handleChange} className="border p-3 rounded-lg" />
                    <input type="file" multiple onChange={handleFileChange} className="border p-3 rounded-lg" />
                    <button type="submit" disabled={uploading} className="bg-gray-900 text-white py-3 rounded-xl mt-2 hover:bg-gray-950">
                        {uploading ? "Uploading..." : "Add Hotel"}
                    </button>
                </form>
            </div>
        </div>
    );
}
