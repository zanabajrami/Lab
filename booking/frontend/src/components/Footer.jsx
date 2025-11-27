import React ,{ useState } from "react";
import { Link } from "react-router-dom";

function IconFacebook() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M22 12C22 6.477 17.523 2 12 2S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.88v-6.99H7.898v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33V21.88C18.343 21.128 22 16.991 22 12z" fill="currentColor" />
        </svg>
    );
}

function IconInstagram() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2A3.8 3.8 0 1 0 15.8 12 3.8 3.8 0 0 0 12 8.2zM18.5 6.2a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z" fill="currentColor" />
        </svg>
    );
}

function IconTwitter() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M22 5.92c-.63.28-1.31.47-2.02.56a3.5 3.5 0 0 0-6 3.19A9.93 9.93 0 0 1 3.1 4.9a3.5 3.5 0 0 0 1.08 4.67c-.52 0-1.02-.16-1.45-.4v.04c0 1.7 1.21 3.12 2.82 3.45a3.5 3.5 0 0 1-1.44.05c.41 1.28 1.6 2.21 3.01 2.24A7.02 7.02 0 0 1 2 18.57a9.9 9.9 0 0 0 5.35 1.57c6.42 0 9.94-5.32 9.94-9.94v-.45A7.1 7.1 0 0 0 22 5.92z" fill="currentColor" />
        </svg>
    );
}

export default function Footer() {
const [showContact, setShowContact] = useState(false);

    return (
        <footer className="bg-gradient-to-r from-indigo-300/30 via-indigo-200/30 to-indigo-400/30 backdrop-blur-md text-gray-900 py-10 mt-auto rounded-t-3xl shadow-inner">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo dhe Përshkrimi */}
                <div>
                    <h2 className="text-2xl font-bold mb-3 text-indigo-900">BookInn</h2>
                    <p className="text-sm text-gray-800">
                        Discover the best hotels, amazing deals, and exclusive offers. Stay comfortable with BookInn 🏢
                    </p>
                </div>

                {/* Services */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-indigo-900">Services</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li className="hover:text-indigo-600 cursor-pointer transition">
                            <Link to="/hotels">Hotel Booking</Link>
                        </li>
                        <li className="hover:text-indigo-600 cursor-pointer transition">Room Upgrades</li>
                        <li className="hover:text-indigo-600 cursor-pointer transition">Reservation Cancellation</li>
                        <li
                            className="hover:text-indigo-600 cursor-pointer transition"
                            onClick={() => setShowContact(true)}
                        >
                            Customer Support
                        </li>
                    </ul>
                </div>

                {/* Destinations */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-indigo-900">Destinations</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li className="hover:text-indigo-600 cursor-pointer transition">
                            <Link to="/destinations">Explore Destinations</Link>
                        </li>
                    </ul>
                </div>

                {/* Deals */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-indigo-900">Deals</h3>
                    <ul className="space-y-2 text-gray-700">
                        <li className="hover:text-indigo-600 cursor-pointer transition">
                            <Link to="/deals">Last Minute Deals</Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-indigo-300/50 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-4 text-sm text-gray-700">
                <p>© {new Date().getFullYear()} BookInn. All rights reserved.</p>
                <div className="flex gap-5 mt-3 md:mt-0">
                    <span className="cursor-pointer hover:text-indigo-600 transition"><IconFacebook /></span>
                    <span className="cursor-pointer hover:text-indigo-600 transition"><IconInstagram /></span>
                    <span className="cursor-pointer hover:text-indigo-600 transition"><IconTwitter /></span>
                </div>
            </div>
        </footer>
    );
}