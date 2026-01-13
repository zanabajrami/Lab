import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contact from "./Contact";

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Dropdown për madhësinë
  const [headerSize, setHeaderSize] = useState("7xl");
  const headerSizes = ["full", "6xl", "7xl", "8xl"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerBg = scrolled
    ? "bg-gray-900/80 backdrop-blur-sm shadow-md"
    : "bg-gray-900/60 backdrop-blur-sm shadow-md";

  const navItems = [
    { name: "Destinations", to: "/destinations" },
    { name: "Hotels", to: "/hotels" },
    { name: "Deals", to: "/deals" },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerBg}`}
      >
        <div className={`max-w-${headerSize} mx-auto px-4 sm:px-6 lg:px-8 relative z-10`}>
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="font-bold text-indigo-200 tracking-wider cursor-pointer text-3xl hover:text-indigo-400 transition-colors duration-300">
                  BookInn
                </h1>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-6 items-center">
              {navItems.map((item) => (
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
                className="group relative text-indigo-100 font-serif text-base tracking-wide transition-all duration-300 flex items-center gap-1"
              >
                Favorites <Heart className="w-4 h-4 text-indigo-100" />
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {user && user.role === 'admin' && (
              <Link to="/admin" className="text-indigo-100 hover:underline">Dashboard</Link>
            )}

            {/* Login/Register Buttons */}
            <div className="hidden md:flex space-x-4">
              {user ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    navigate("/"); 
                  }}
                  className="px-5 py-2 rounded-2xl bg-transparent text-indigo-200 font-semibold border border-indigo-200 hover:bg-indigo-50 transition duration-300"
                >
                  Logout
                </button>
              ) : (
                <>
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
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              {/* Dropdown për madhësinë */}
              <select
                value={headerSize}
                onChange={(e) => setHeaderSize(e.target.value)}
                className="bg-gray-800 text-white text-sm rounded px-2 py-1 focus:outline-none"
              >
                {headerSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={28} className="text-indigo-200" /> : <Menu size={28} className="text-indigo-200" />}
              </button>
            </div>

          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden mt-2 bg-gray-900/95 backdrop-blur-sm rounded-xl p-4 space-y-3 shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="block text-indigo-100 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => { setShowContact(true); setMenuOpen(false); }}
                className="block text-indigo-100 font-medium"
              >
                Contact
              </button>
              <Link
                to="/favorites"
                className="block text-indigo-100 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Favorites
              </Link>

              {/* Login / SignUp për mobile */}
              <button
                onClick={() => { setShowLogin(true); setShowRegister(false); setMenuOpen(false); }}
                className="block w-full text-left text-indigo-200 font-semibold mt-2"
              >
                Login
              </button>
              <button
                onClick={() => { setShowRegister(true); setShowLogin(false); setMenuOpen(false); }}
                className="block w-full text-left text-indigo-100 font-semibold mt-1"
              >
                Sign Up
              </button>
            </div>
          )}
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

      {showContact && <Contact isOpen={showContact} onClose={() => setShowContact(false)} />}

    </>
  );
}

export default Header;
