import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CancelBookingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hotelName: "",
    bookingDate: "",
    reason: "",
  });

  const handleClose = () => navigate(-1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data submitted:", formData);
    alert("Cancellation request sent! 📩");
    handleClose();
  };

  // Ndalon scroll-in e faqes kur modal është i hapur
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      className="fixed inset-0 flex items-center justify-center bg-slate-950/80 z-50 backdrop-blur-sm p-4"
    >
      <div
        className="w-full max-w-sm p-6 rounded-2xl relative
             bg-slate-900 border border-slate-700 shadow-2xl
             transform transition-all duration-300 animate-in fade-in zoom-in-95"
      >
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-indigo-200 tracking-tight">
            Cancel Booking
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Please fill out the form to cancel your reservation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 text-sm rounded-lg bg-slate-900 border border-slate-700 text-slate-200 
                         placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-400 
                         focus:border-indigo-400 transition-all"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 text-sm rounded-lg bg-slate-900 border border-slate-700 text-slate-200 
                         placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-400 
                         focus:border-indigo-400 transition-all"
            />

            <input
              type="text"
              name="hotelName"
              placeholder="Hotel Name"
              value={formData.hotelName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 text-sm rounded-lg bg-slate-900 border border-slate-700 text-slate-200 
                         placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-400 
                         focus:border-indigo-400 transition-all"
            />

            <div className="group">
              <label className="text-[10px] font-bold text-indigo-300/70 ml-1 uppercase tracking-widest">
                Booking Date
              </label>
              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 text-sm rounded-lg bg-slate-900 border border-slate-700 text-slate-200 
                           focus:outline-none focus:ring-1 focus:ring-indigo-400 transition-all"
              />
            </div>

            <textarea
              name="reason"
              rows="2"
              placeholder="Reason for cancellation..."
              value={formData.reason}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 text-sm rounded-lg bg-slate-900 border border-slate-700 text-slate-200 
                         placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-400 
                         resize-none transition-all"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-lg bg-indigo-200 hover:bg-white 
                     text-slate-900 font-bold text-sm shadow-lg
                     transform transition-all active:scale-[0.97]"
          >
            Confirm Cancellation
          </button>
        </form>

        <button 
          onClick={handleClose}
          className="w-full mt-4 text-slate-500 hover:text-slate-300 transition-colors text-xs font-medium"
        >
          Nevermind, go back
        </button>
      </div>
    </div>
  );
}

export default CancelBookingPage;