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
    alert("Cancellation request sent! 📩");
    handleClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      className="fixed inset-0 flex items-center justify-center bg-black/95 z-50 backdrop-blur-sm p-4"
    >
      {/* Container Kryesor me Shkëlqim Anash */}
      <div
        className="w-full max-w-sm p-7 rounded-[2rem] relative
             bg-slate-950/50 border border-slate-700/50 shadow-[0_10px_50px_rgba(0,0,0,0.5)]
             transform transition-all duration-500 animate-in fade-in zoom-in-95"
      >
        
        {/* Header - I rregulluar më bukur */}
        <div className="text-center mb-7">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-3">
            Service Support
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Cancel <span className="text-indigo-200">Booking</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            {/* Inputet me stil të ri */}
            {[
              { name: "name", placeholder: "Full Name", type: "text" },
              { name: "email", placeholder: "Email Address", type: "email" },
              { name: "hotelName", placeholder: "Hotel Name", type: "text" },
            ].map((field) => (
              <input
                key={field.name}
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
            ))}

            <div className="relative group">
              <label className="absolute -top-2 left-4 px-2 bg-slate-900 text-[10px] font-bold text-indigo-300 uppercase">
                Check-in Date
              </label>
              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 text-sm rounded-xl bg-slate-950/50 border border-slate-700 text-slate-200 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400/50 transition-all"
              />
            </div>

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

          <button
            type="submit"
            className="w-full py-4 mt-2 rounded-xl bg-indigo-200 hover:bg-white 
                     text-slate-900 font-extrabold text-sm shadow-xl shadow-indigo-500/10
                     transform transition-all active:scale-[0.96] hover:-translate-y-0.5"
          >
            Submit Cancellation
          </button>
        </form>

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