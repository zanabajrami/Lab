import React, { useState } from "react";

function Contact({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!📩");
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center bg-black/95 z-50 backdrop-blur-md"
    >
    <div
  onClick={(e) => e.stopPropagation()}
  className="w-full max-w-md p-10 rounded-3xl relative
             bg-gradient-to-br from-gray-950 via-gray-900/90 to-gray-950/80
             border border-gray-800 shadow-[0_0_80px_rgba(0,0,0,0.9)]
             backdrop-blur-md transform scale-90 animate-heavyPop"
>

        <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center 
               text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
               drop-shadow-lg tracking-wide uppercase">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-2xl border-2 border-gray-700
                       bg-gray-900 placeholder-gray-400 text-white
                       focus:outline-none focus:ring-2 focus:ring-purple-500
                       shadow-lg shadow-purple-900/50 text-base transition-all duration-300 hover:shadow-purple-700/70"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-2xl border-2 border-gray-700
                       bg-gray-900 placeholder-gray-400 text-white
                       focus:outline-none focus:ring-2 focus:ring-purple-500
                       shadow-lg shadow-purple-900/50 text-base transition-all duration-300 hover:shadow-purple-700/70"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-2xl border-2 border-gray-700
                       bg-gray-900 placeholder-gray-400 text-white
                       focus:outline-none focus:ring-2 focus:ring-purple-500
                       shadow-lg shadow-purple-900/50 text-base transition-all duration-300 hover:shadow-purple-700/70 resize-none"
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-900 via-blue-800 to-cyan-700
             text-white font-extrabold hover:scale-105 hover:shadow-[0_0_20px_rgba(100,200,255,0.7)]
             transform transition-all duration-300 text-base tracking-wide"
          >
            Send Message
          </button>

        </form>
      </div>

      <style>
  {`
    @keyframes heavyPop {
      0% { transform: scale(0.7); opacity: 0; }
      60% { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1); }
    }
    .animate-heavyPop {
      animation: heavyPop 0.6s ease-out forwards;
    }

    /* Autofill për Chrome/Edge/Safari */
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0px 1000px #1f2937 inset; /* bg-gray-900 */
      -webkit-text-fill-color: #fff; /* text-white */
      transition: background-color 5000s ease-in-out 0s;
    }
  `}
</style>

    </div>
  );
}

export default Contact;
