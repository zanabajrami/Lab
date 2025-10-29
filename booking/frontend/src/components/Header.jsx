import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contact from "../pages/Contact";

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-2xl font-bold text-gray-800 cursor-pointer">
                BookInn
              </h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600 transition">
              Destinations
            </a>
            <a href="/" className="text-gray-700 hover:text-blue-600 transition">
              Hotels
            </a>
            <Link
              to="/deals"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Deals
            </Link>
            <button
              onClick={() => setShowContact(true)}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Contact
            </button>
            <Link
              to="/favorites"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Favorites💗
            </Link>
          </nav>

          {/* Login/Register Buttons */}
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => setShowLogin(true)}
              className="
                px-5 py-2 
                rounded-lg 
                border border-cyan-600 
                text-cyan-700 
                bg-transparent 
                hover:bg-blue-300 hover:text-blue 
                transition-all duration-300 
                shadow-sm hover:shadow-md
                font-medium
              "
            >
              Login
            </button>

            <button
              onClick={() => setShowRegister(true)}
              className="
                px-5 py-2 
                rounded-lg 
                bg-cyan-900 
                text-white 
                font-medium 
                shadow-sm 
                hover:bg-blue-400 
                transition-colors duration-300
              "
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Login Modal */}
      {showLogin && (
        <Login
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          onClose={() => setShowLogin(false)}
        />
      )}

      {/* ✅ Register Modal */}
      {showRegister && (
        <Register
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
          onClose={() => setShowRegister(false)}
        />
      )}

      {/* ✅ Contact Modal */}
      {showContact && (
        <Contact onClose={() => setShowContact(false)} />
      )}
    </header>
  );
}

export default Header;
