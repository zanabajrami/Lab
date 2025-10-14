import React from 'react';

function Footer() {
  return (
    <footer className="bg-white shadow-xl border-t border-gray-400 text-gray-900 mt-10">
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">
        <h1 className="text-xl font-bold text-gray-900">Booking</h1>
      </div>
  
      <div className="flex space-x-6 mb-4 md:mb-0">
        <a href="/" className="hover:text-red-400 transition">Destinations</a>
        <a href="/" className="hover:text-red-400 transition">Hotels</a>
        <a href="/" className="hover:text-red-400 transition">Deals</a>
        <a href="/" className="hover:text-red-400 transition">Contact</a>
      </div>
  
      <div className="text-sm">
        © 2025 Booking. All rights reserved.
      </div>
    </div>
  </footer>
  
  );
}

export default Footer;

