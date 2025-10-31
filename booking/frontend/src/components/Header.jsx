import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contact from "../pages/Contact";

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerBg = scrolled
    ? "bg-gray-900/80 backdrop-blur-sm shadow-md"
    : "bg-gray-900/60 backdrop-blur-sm shadow-md";

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerBg}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="font-bold text-indigo-200 tracking-wider cursor-pointer text-3xl hover:text-indigo-400 transition-colors duration-300">
                  BookInn
                </h1>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-6">
              {[
                { name: "Destinations", to: "/" },
                { name: "Hotels", to: "/" },
                { name: "Deals", to: "/deals" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="group relative text-indigo-100 font-serif text-base tracking-wide transition-all duration-300"
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
              <button
                onClick={() => setShowContact(true)}
                className="group relative text-indigo-100 font-serif text-base tracking-wide transition-all duration-300"
              >
                Contact
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <Link
                to="/favorites"
                className="group relative text-indigo-100 font-serif text-base tracking-wide transition-all duration-300"
              >
                Favorites 𖹭
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Login/Register Buttons */}
            <div className="hidden md:flex space-x-4">
              <button
                onClick={() => { setShowLogin(true); setShowRegister(false); }}
                className="px-5 py-2 rounded-2xl border border-indigo-400/30 text-indigo-200 bg-transparent hover:bg-indigo-900/40 hover:shadow-[0_0_10px_2px_rgba(99,102,241,0.3)] transition duration-300 font-semibold"
              >
                Login
              </button>
              <button
                onClick={() => { setShowRegister(true); setShowLogin(false); }}
                className="px-5 py-2 rounded-2xl bg-indigo-300 text-gray-700 font-semibold shadow-md hover:bg-indigo-500 hover:shadow-[0_0_12px_3px_rgba(99,102,241,0.4)] transition duration-300"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Modals */}
      {showLogin && (
        <Login
          isOpen={showLogin}
          onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
          onClose={() => setShowLogin(false)}
        />
      )}
      {showRegister && (
        <Register
          isOpen={showRegister}
          onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }}
          onClose={() => setShowRegister(false)}
        />
      )}
      {showContact && (
        <Contact
          isOpen={showContact}
          onClose={() => setShowContact(false)}
        />
      )}
    </>
  );
}

export default Header;
