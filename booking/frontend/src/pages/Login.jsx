import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Login({ onSwitchToRegister, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.endsWith("@gmail.com") && !email.endsWith("@hotmail.com")) {
      alert("Please enter a valid email ending with @gmail.com or @hotmail.com");
      return;
    }

    if (password.length < 8) {
      alert("Password must have at least 8 characters");
      return;
    }

    alert("You are logged in!");
    if (typeof onClose === "function") onClose();
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && typeof onClose === "function") {
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden"; // disable scroll when modal is mounted
    return () => {
      document.body.style.overflow = "auto"; // re-enable on unmount
    };
  }, []);

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
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 
               w-[100%] sm:w-full sm:min-w-[430px] max-w-2xl border border-white/20 shadow-lg">
          <h2 className="text-4xl font-extrabold text-center mb-8 tracking-wide bg-gradient-to-r from-slate-600 via-gray-500 to-slate-600 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email */}
            <div className="relative group">
              <label className="text-base font-medium text-slate-700 mb-1 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 
                text-gray-700 placeholder-gray-500 focus:outline-none 
                focus:ring-2 focus:ring-gray-300 focus:shadow-[0_0_15px_rgba(255,255,255,0.15)] 
                transition-all duration-300 text-lg autofill:shadow-[inset_0_0_0px_1000px_rgba(255,255,255,0)] autofill:text-gray-700"
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
                className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 
                text-gray-700 placeholder-gray-500 focus:outline-none 
                focus:ring-2 focus:ring-gray-300 focus:shadow-[0_0_15px_rgba(255,255,255,0.15)] 
                transition-all duration-300 text-lg autofill:shadow-[inset_0_0_0px_1000px_rgba(255,255,255,0)] autofill:text-gray-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />

              <div className="flex items-center mt-3">
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
            </div>

            {/* Button */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(25, 2, 75, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-gradient-to-r from-slate-600 via-gray-400 to-slate-600 text-slate-700 font-semibold py-3.5 rounded-xl shadow-lg transition-all duration-300 hover:from-slate-500 hover:via-gray-400 hover:to-slate-500 text-lg"
            >
              Login
            </motion.button>
          </form>

          <p className="mt-8 text-slate-600 text-base text-center">
            Don’t have an account?{" "}
            <button
              onClick={onSwitchToRegister}
              className="text-slate-800 hover:underline hover:text-white transition"
            >
              Sign up
            </button>
          </p>
        </div>
      </motion.div>

      {/* Custom autofill fix */}
      <style jsx="true">{`
        input:-webkit-autofill {
          background-color: transparent !important;
          -webkit-box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 0) inset !important;
          -webkit-text-fill-color: #374151 !important; /* text-gray-700 */
          transition: background-color 9999s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
}

export default Login;
