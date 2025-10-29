import React, { useState } from "react";

function Login({ onSwitchToRegister, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
  e.preventDefault();

  // Validimi i email-it
  if (!email.endsWith("@gmail.com") && !email.endsWith("@hotmail.com")) {
    alert("Please enter a valid email ending with @gmail.com or @hotmail.com");
    return;
  }

  // Validimi i password-it
  if (password.length < 8) {
    alert("Password must have at least 8 characters");
    return;
  }

  alert("You are logged in!");

  // Mbyll modal-in pas alert-it
  if (typeof onClose === "function") onClose();

  // Pastro fushat
  setEmail("");
  setPassword("");
  setShowPassword(false);
};


  const handleOverlayClick = (e) => {
    // Vetëm kur klikohet jashtë formës
    if (e.target === e.currentTarget && typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()} // mos mbyll kur klikohet brenda formës
        className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md relative"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-600 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="showPassword"
                className="mr-2"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword" className="text-sm text-gray-600">
                Show Password
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-gray-800 to-blue-800 hover:from-blue-800 hover:to-gray-800 text-white font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-gray-600 text-sm text-center">
          Don’t have an account?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-cyan-600 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
