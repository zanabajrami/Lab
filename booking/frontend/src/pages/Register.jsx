import React, { useState } from "react";

function Register({ onSwitchToLogin, onClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validimi
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

    // ✅ Alert dhe pastrimi i fushave
    alert("You are signed up!");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && typeof onClose === "function") {
      onClose(); // Modal mbyllet vetëm kur përdoruesi klikon jashtë formës
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Mos mbyll kur klikohet brenda formës
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign up
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="flex items-center">
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
          <button
            type="submit"
            className="bg-gradient-to-r from-gray-800 to-blue-800 hover:from-blue-800 hover:to-gray-800 text-white font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-300"
          >
            Sign up
          </button>
        </form>

        <p className="mt-4 text-gray-600 text-sm text-center">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-cyan-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
