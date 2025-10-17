import React, { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">Booking</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-red-600 transition">Destinations</a>
            <a href="/" className="text-gray-700 hover:text-red-600 transition">Hotels</a>
            <a href="/" className="text-gray-700 hover:text-red-600 transition">Deals</a>
            <a href="/" className="text-gray-700 hover:text-red-600 transition">Contact</a>
          </nav>

          {/* Login/Register Buttons */}
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 text-gray-800 hover:text-red-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => setShowRegister(true)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 transition"
            >
              Sign Up
            </button>
          </div>

        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
          <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl"
            >
              &times;
            </button>
            <Login
              onSwitchToRegister={() => {
                setShowLogin(false);
                setShowRegister(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
          <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl"
            >
              &times;
            </button>
            <Register
              onSwitchToLogin={() => {
                setShowRegister(false);
                setShowLogin(true);
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
