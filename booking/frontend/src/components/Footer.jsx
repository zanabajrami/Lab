import React, { useState } from "react";
import Contact from "../pages/Contact";

function Footer() {
    const [showContact, setShowContact] = useState(false);
    
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
                    <button
                        onClick={() => setShowContact(true)}
                        className="text-gray-700 hover:text-red-600 transition"
                    >
                        Contact
                    </button>
                </div>

                <div className="text-sm">
                    © 2025 Booking. All rights reserved.
                </div>
            </div>
            {showContact && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
                        <button
                            className="absolute top-2 right-3 text-gray-500 text-2xl hover:text-red-500"
                            onClick={() => setShowContact(false)}
                        >
                            &times;
                        </button>
                        <Contact />
                    </div>
                </div>
            )}
        </footer>

    );
}

export default Footer;

