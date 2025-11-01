import React, { useState } from "react";
import { motion } from "framer-motion";

function Register({ onSwitchToLogin, onClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
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

    alert("You are signed up!");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative p-[2px] rounded-3xl bg-gradient-to-r from-slate-400 via-gray-300 to-slate-400 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-2xl min-w-[420px] border border-white/20 shadow-lg">
          <h2 className="text-3xl font-extrabold text-center mb-2 tracking-wide bg-gradient-to-r from-slate-600 via-gray-500 to-slate-600 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {/* First Name */}
            <div className="relative group">
              <label className="text-base font-medium text-slate-700 mb-1 block">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-300 text-lg"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            {/* Last Name */}
            <div className="relative group">
              <label className="text-base font-medium text-slate-700 mb-1 block">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Smith"
                className="w-full px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-300 text-lg"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <label className="text-base font-medium text-slate-700 mb-1 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-300 text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <label className="text-base font-medium text-slate-700 mb-1 block">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-300 text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>

            {/* Confirm Password */}
            <div className="relative group">
              <label className="text-base font-medium text-slate-700 mb-1 block">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-300 text-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Show Password */}
            <div className="flex items-center mt-1">
              <label className="flex items-center cursor-pointer relative">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="w-5 h-5 cursor-pointer rounded border border-gray-400 bg-gray-400 appearance-none relative"
                />
                {showPassword && (
                  <span className="absolute left-1 top-0.5 text-gray-700 text-sm">
                    ✔
                  </span>
                )}
                <span className="ml-2 text-sm text-gray-700 select-none">
                  Show Password
                </span>
              </label>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(25, 2, 75, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-gradient-to-r from-slate-600 via-gray-400 to-slate-600 text-slate-700 font-semibold py-2.5 rounded-xl shadow-lg transition-all duration-300 hover:from-slate-500 hover:via-gray-400 hover:to-slate-500 text-lg"
            >
              Sign Up
            </motion.button>
          </form>

          <p className="mt-4 text-slate-600 text-base text-center">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-slate-800 hover:underline hover:text-white transition"
            >
              Login
            </button>
          </p>
        </div>
      </motion.div>

      {/* Autofill fix */}
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
