import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react"; // Importojmë ikonën X

function Login({ onSwitchToRegister, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@gmail.com") && !email.endsWith("@hotmail.com")) {
      alert("Please enter a valid email ending with @gmail.com or @hotmail.com");
      return;
    }

    if (password.length < 8) {
      alert("Password must have at least 8 characters");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Logged in successfully!");
        
        if (typeof onClose === "function") onClose();
        setEmail("");
        setPassword("");
        setShowPassword(false);
      } else {
        alert(JSON.stringify(data));
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Check console.");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && typeof onClose === "function") onClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
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

          <h2 className="text-4xl font-extrabold text-center mb-8 tracking-wide bg-gradient-to-r from-slate-600 via-gray-500 to-slate-600 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="relative group">
              <label className="text-base font-medium text-slate-700 mb-1 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative group">
              <label className="text-base font-medium text-slate-700 mb-1 block">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex items-center mt-3">
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
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-gradient-to-r from-slate-600 via-gray-400 to-slate-600 text-slate-700 font-semibold py-3.5 rounded-xl shadow-lg hover:from-slate-500 transition-all text-lg"
            >
              Login
            </motion.button>
          </form>

          <p className="mt-8 text-slate-600 text-base text-center">
            Don’t have an account?{" "}
            <button
              onClick={onSwitchToRegister}
              className="text-slate-800 font-bold hover:underline transition"
            >
              Sign up
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

export default Login;