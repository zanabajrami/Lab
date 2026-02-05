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

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectBooking = (e) => {
    const selected = hotels.find((h) => h.id === Number(e.target.value));
    if (!selected) return;

    setFormData((prev) => ({
      ...prev,
      booking_id: selected.id,
      hotel_name: selected.name || "",
      location: selected.location || "Unknown",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.booking_id) {
      alert("Please select a booking to cancel.");
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

      alert("Your cancellation request has been sent!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      className="fixed inset-0 flex items-center justify-center bg-black/95 z-50 backdrop-blur-sm p-4"
    >
      <div
        className="w-full max-w-sm p-7 rounded-[2rem] relative
             bg-slate-950/50 border border-slate-700/50 shadow-[0_10px_50px_rgba(0,0,0,0.5)]
             transform transition-all duration-500 animate-in fade-in zoom-in-95"
      >
        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-3">
            Service Support
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Cancel <span className="text-indigo-200">Booking</span>
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Inputs for name, email */}
          {[
            { name: "name", placeholder: "Full Name", type: "text" },
            { name: "email", placeholder: "Email Address", type: "email" },
          ].map((field) => (
            <div className="relative group" key={field.name}>
              <label className="absolute -top-2 left-4 px-2 bg-slate-900 text-[10px] font-bold text-indigo-300 uppercase">
                {field.placeholder}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 text-sm rounded-xl bg-slate-950/50 border border-slate-700 text-slate-200 
                           placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 
                           focus:border-indigo-400/50 transition-all duration-300"
              />
            </div>
          ))}

          <div className="space-y-3">
            {/* Dropdown me bookings */}
            <div className="relative group">
              <label className="absolute -top-2 left-4 px-2 bg-slate-900 text-[10px] font-bold text-indigo-300 uppercase">
                Select Booking
              </label>
              <select
                name="booking_id"
                value={formData.booking_id}
                onChange={handleSelectBooking}
                required
                className="w-full px-5 py-3 text-sm rounded-xl bg-slate-950/50 border border-slate-700 text-slate-200"
              >
                <option value="">-- Select your booking --</option>
                {hotels.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name} — {h.check_in} to {h.check_out} ({h.location})
                  </option>
                ))}
              </select>

              <div className="mt-4 space-y-3">=
                {/* Check-in */}
                <div className="relative group">
                  <label className="absolute -top-2 left-4 px-2 bg-slate-900 text-[10px] font-bold text-indigo-300 uppercase">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    name="check_in"
                    value={formData.check_in || ""}
                    onChange={handleChange}
                    className="w-full px-5 py-3 text-sm rounded-xl bg-slate-950/30 border border-slate-700 text-slate-400"
                  />
                </div>

                {/* Check-out */}
                <div className="relative group">
                  <label className="absolute -top-2 left-4 px-2 bg-slate-900 text-[10px] font-bold text-indigo-300 uppercase">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    name="check_out"
                    value={formData.check_out || ""}
                    onChange={handleChange}
                    className="w-full px-5 py-3 text-sm rounded-xl bg-slate-950/30 border border-slate-700 text-slate-400"
                  />
                </div>

                {/* Location */}
                <div className="relative group">
                  <label className="absolute -top-2 left-4 px-2 bg-slate-900 text-[10px] font-bold text-indigo-300 uppercase">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    readOnly
                    className="w-full px-5 py-3 text-sm rounded-xl bg-slate-950/30 border border-slate-700 text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Reason */}
            <div className="relative group">
              <label className="absolute -top-2 left-4 px-2 bg-slate-900 text-[10px] font-bold text-indigo-300 uppercase">
                Reason for cancellation
              </label>
              <textarea
                name="reason"
                rows="2"
                placeholder="Reason for cancellation..."
                value={formData.reason}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 text-sm rounded-xl bg-slate-950/50 border border-slate-700 text-slate-200 
                           placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 
                           focus:border-indigo-400/50 resize-none transition-all duration-300"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 mt-2 rounded-xl bg-indigo-200 hover:bg-white 
                     text-slate-900 font-extrabold text-sm shadow-xl shadow-indigo-500/10
                     transform transition-all active:scale-[0.96] hover:-translate-y-0.5"
          >
            Submit Cancellation
          </button>
        </form>

        {/* Close modal */}
        <button
          onClick={handleClose}
          className="w-full mt-6 text-slate-500 hover:text-indigo-200 transition-colors text-xs font-semibold tracking-wide"
        >
          Nevermind, keep my stay
        </button>
      </div>
    </div>
  );
}

export default CancelBookingPage;
