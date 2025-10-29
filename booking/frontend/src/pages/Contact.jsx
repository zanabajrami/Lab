import React, { useState } from "react";

function Contact({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Alert për sukses
    alert("Your message has been sent!");

    // ✅ Pastrim i fushave
    setName("");
    setEmail("");
    setMessage("");

    // Modal nuk mbyllet automatikisht
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && typeof onClose === "function") {
      onClose(); // Mbyll modal-in vetëm kur klikohet jashtë formës
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Mos mbyll kur klikohet brenda formës
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Contact us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 focus:outline-none text-black"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 focus:outline-none text-black"
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 focus:outline-none text-black"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
