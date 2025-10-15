import React from 'react';
import { Link } from 'react-router-dom'; 

function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-800">
              Booking
            </h1>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-red-600 transition">
              Destinations
            </a>
            <a href="/" className="text-gray-700 hover:text-red-600 transition">
              Hotels
            </a>
            <a href="/" className="text-gray-700 hover:text-red-600 transition">
              Deals
            </a>
            <a href="/" className="text-gray-700 hover:text-red-600 transition">
              Contact
            </a>
          </nav>

          {/* Login/Register */}
          <div className="hidden md:flex space-x-4">
          <Link to="/login" className="px-4 py-2 text-gray-800 hover:text-red-600 transition">
              Login
            </Link>
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 transition">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-800 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
