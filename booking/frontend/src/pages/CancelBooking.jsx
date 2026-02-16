import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CancelBookingPage() {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/hotels")
      .then(res => res.json())
      .then(data => setHotels(data))
      .catch(err => console.error("Failed to fetch hotels:", err));
  }, []);

  const [formData, setFormData] = useState({
    booking_id: "",
    name: "",
    email: "",
    hotel_name: "",
    check_in: "",
    check_out: "",
    location: "",
    reason: "",
  });

  const handleClose = () => navigate(-1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectHotel = (e) => {
    const selected = hotels.find((h) => h.name === e.target.value);
    if (!selected) return;

    setFormData((prev) => ({
      ...prev,
      hotel_name: selected.name || "",
      location: selected.location || "Unknown",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.booking_id) {
      alert("Please enter your Booking ID.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/cancel-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Failed to send cancellation request.");
        return;
      }

      alert("Your cancellation request has been sent successfully!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      className="fixed inset-0 flex items-center justify-center bg-black/90 z-50 backdrop-blur-sm p-4"
    >
      <div
        className="w-full max-w-[95%] md:max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-10 rounded-[2rem] relative
             bg-slate-950 border border-slate-700/50 shadow-2xl
             transform transition-all duration-500 animate-in fade-in zoom-in-95 scrollbar-hide"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-3">
            Service Support
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Cancel <span className="text-indigo-200">Booking</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <label className="absolute -top-2 left-4 px-2 bg-slate-950 text-[10px] font-bold text-indigo-300 uppercase z-10">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="James Smith"
                className="w-full px-5 py-3 text-sm rounded-xl bg-slate-900/50 border border-slate-700 text-slate-200 outline-none focus:border-indigo-400/50 transition-all"
              />
            </div>
            <div className="relative group">
              <label className="absolute -top-2 left-4 px-2 bg-slate-950 text-[10px] font-bold text-indigo-300 uppercase z-10">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="james@gmail.com"
                className="w-full px-5 py-3 text-sm rounded-xl bg-slate-900/50 border border-slate-700 text-slate-200 outline-none focus:border-indigo-400/50 transition-all"
              />
            </div>
          </div>

          {/* Booking ID & Hotel Select */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <label className="absolute -top-2 left-4 px-2 bg-slate-950 text-[10px] font-bold text-indigo-300 uppercase z-10">
                Booking ID 
              </label>
              <input
                type="text"
                name="booking_id"
                value={formData.booking_id}
                onChange={handleChange}
                required
                placeholder="e.g. 11"
                className="w-full px-5 py-3 text-sm rounded-xl bg-slate-900/50 border border-indigo-500/30 text-white font-mono focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              />
            </div>

            <div className="relative group">
              <label className="absolute -top-2 left-4 px-2 bg-slate-950 text-[10px] font-bold text-indigo-300 uppercase z-10">
                Select Hotel
              </label>
              <select
                name="hotel_name"
                onChange={handleSelectHotel}
                required
                className="w-full px-5 py-3 text-sm rounded-xl bg-slate-900/50 border border-slate-700 text-slate-200 focus:outline-none"
              >
                <option value="">-- Choose Hotel --</option>
                {hotels.map((h) => (
                  <option key={h.id} value={h.name} className="bg-slate-900">
                    {h.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dates & Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group">
              <label className="absolute -top-2 left-4 px-2 bg-slate-950 text-[10px] font-bold text-indigo-300 uppercase z-10">
                Check-in
              </label>
              <input
                type="date"
                name="check_in"
                value={formData.check_in}
                onChange={handleChange}
                className="w-full px-5 py-3 text-sm rounded-xl bg-slate-900/50 border border-slate-700 text-slate-200 outline-none"
              />
            </div>

            <div className="relative group">
              <label className="absolute -top-2 left-4 px-2 bg-slate-950 text-[10px] font-bold text-indigo-300 uppercase z-10">
                Check-out
              </label>
              <input
                type="date"
                name="check_out"
                value={formData.check_out}
                onChange={handleChange}
                className="w-full px-5 py-3 text-sm rounded-xl bg-slate-900/50 border border-slate-700 text-slate-200 outline-none"
              />
            </div>

            <div className="relative group">
              <label className="absolute -top-2 left-4 px-2 bg-slate-950 text-[10px] font-bold text-indigo-300 uppercase z-10">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                readOnly
                placeholder="Auto-filled..."
                className="w-full px-5 py-3 text-sm rounded-xl bg-slate-900/30 border border-slate-800 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Reason */}
          <div className="relative group">
            <label className="absolute -top-2 left-4 px-2 bg-slate-950 text-[10px] font-bold text-indigo-300 uppercase z-10">
              Cancellation Reason
            </label>
            <textarea
              name="reason"
              rows="3"
              value={formData.reason}
              onChange={handleChange}
              required
              placeholder="Please tell us why you are canceling..."
              className="w-full px-5 py-3 text-sm rounded-xl bg-slate-900/50 border border-slate-700 text-slate-200 focus:border-indigo-400/50 outline-none resize-none transition-all"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="submit"
              className="flex-1 py-4 rounded-xl bg-indigo-200 hover:bg-white text-slate-900 font-extrabold text-sm shadow-xl transition-all active:scale-[0.96]"
            >
              Confirm Cancellation
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-4 rounded-xl bg-slate-800 text-white font-bold text-sm hover:bg-slate-700 transition-all"
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CancelBookingPage;