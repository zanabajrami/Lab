import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react"; // Importojmë ikonën X

function Register({ onSwitchToLogin, onClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (firstName.trim().length < 1) {
      alert("First Name must be at least 1 character");
      return;
    }
    if (lastName.trim().length < 1) {
      alert("Last Name must be at least 1 character");
      return;
    }
    if (!email.endsWith("@gmail.com") && !email.endsWith("@hotmail.com")) {
      alert("Email must end with @gmail.com or @hotmail.com");
      return;
    }
    if (password.length < 8) {
      alert("Password must have at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signed up successfully!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        if (typeof onClose === "function") onClose(); // Mbyll modalin pas regjistrimit me sukses
      } else {
        alert(JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Check console.");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && typeof onClose === "function") {
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm z-50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative p-[2px] rounded-3xl bg-gradient-to-r from-slate-400 via-gray-300 to-slate-400 shadow-[0_0_20px_rgba(255,255,255,0.15)] w-full max-w-lg"
      >
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/20 shadow-lg">
          
          {/* --- BUTONI X --- */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-slate-800 transition-all duration-200 z-10"
          >
            <X size={24} />
          </button>
          {/* ----------------- */}

          <h2 className="text-3xl font-extrabold text-center mb-6 tracking-wide bg-gradient-to-r from-slate-600 via-gray-500 to-slate-600 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative group">
                <label className="text-sm font-medium text-slate-700 mb-1 block">First Name</label>
                <input
                  type="text"
                  placeholder="James"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="relative group">
                <label className="text-sm font-medium text-slate-700 mb-1 block">Last Name</label>
                <input
                  type="text"
                  placeholder="Smith"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="relative group">
              <label className="text-sm font-medium text-slate-700 mb-1 block">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative group">
                <label className="text-sm font-medium text-slate-700 mb-1 block">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="relative group">
                <label className="text-sm font-medium text-slate-700 mb-1 block">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center mt-1">
              <label className="flex items-center cursor-pointer relative">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="w-5 h-5 cursor-pointer rounded border border-gray-400 bg-gray-400 appearance-none"
                />
                {showPassword && (
                  <span className="absolute left-1 top-0.5 text-gray-700 text-sm">✔</span>
                )}
                <span className="ml-2 text-sm text-gray-700 select-none">Show Password</span>
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="mt-2 bg-gradient-to-r from-slate-600 via-gray-400 to-slate-600 text-slate-700 font-semibold py-3 rounded-xl shadow-lg hover:from-slate-500 transition-all text-lg"
            >
              Sign Up
            </motion.button>
          </form>

          <p className="mt-6 text-slate-600 text-base text-center">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-slate-800 font-bold hover:underline transition"
            >
              Login
            </button>
          </p>
        </div>
      </motion.div>

      <style jsx="true">{`
        input:-webkit-autofill {
          background-color: transparent !important;
          -webkit-box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 0) inset !important;
          -webkit-text-fill-color: #374151 !important;
          transition: background-color 9999s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
}

export default Register;