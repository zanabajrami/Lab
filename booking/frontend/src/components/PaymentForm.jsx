import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

function PaymentForm({ title = "Payment", amount = "", hotelName, numNights, onClose, onSubmit, onBack }) {
const [paymentMethod, setPaymentMethod] = useState("");
const [cardHolder, setCardHolder] = useState("");
const [cardNumber, setCardNumber] = useState("");
const [expiry, setExpiry] = useState("");
const [cvc, setCvc] = useState("");

const resetForm = () => {
    setPaymentMethod("");
    setCardHolder("");
    setCardNumber("");
    setExpiry("");
    setCvc("");
};

const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (paymentMethod === "online" && (!cardHolder || !cardNumber || !expiry || !cvc)) {
        alert("Please fill in all card details.");
        return;
    }
    if (onSubmit) onSubmit(paymentMethod);
    alert("Your reservation has been made!");
    resetForm();
    onClose();
};

useEffect(() => {
    document.body.style.overflow = "hidden"; // blloko scroll kur hapet modal
    return () => { document.body.style.overflow = "auto"; }; // çliro scroll kur mbyllet
}, []);

const buttonStyle = "w-full py-3.5 rounded-2xl font-semibold transition focus:outline-none";

return (
    <AnimatePresence>
        <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-xl relative"
                initial={{ scale: 0.95, y: -30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: -30 }}>

                {/* Close Button */}
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition" onClick={onClose}>
                    <X className="w-6 h-6" />
                </button>

                {/* Back Button */}
                {!paymentMethod && onBack && (
                    <button className="absolute top-0 left-0 px-4 py-2 text-gray-800" onClick={onBack}>
                        ❮ Back
                    </button>
                )}
                {paymentMethod && (
                    <button className="absolute top-0 left-0 px-4 py-2 text-gray-800" onClick={() => setPaymentMethod("")}>
                        ❮ Back
                    </button>
                )}

                {/* Title */}
                <h2 className="text-2xl font-bold mb-2 text-center">{title}</h2>

                {/* Hotel Info */}
                {hotelName && numNights && (
                    <p className="mb-4 text-center text-gray-600">
                        {hotelName} - {numNights} {numNights === 1 ? "night" : "nights"}
                    </p>
                )}

                {/* Amount */}
                {amount && (
                    <p className="mb-6 text-center text-gray-700 font-semibold">
                        Amount: <span className="text-indigo-600">{amount}</span>
                    </p>
                )}

                {/* Payment Method Selection */}
                {!paymentMethod && (
                    <div className="flex flex-col gap-4 mt-4">
                        <button onClick={() => setPaymentMethod("online")} className={`${buttonStyle} bg-gray-900 text-white`}>Pay Online</button>
                        <button onClick={() => setPaymentMethod("inperson")} className={`${buttonStyle} bg-indigo-900 text-white`}>Pay In Person</button>
                    </div>
                )}

                {/* Online Form */}
                {paymentMethod === "online" && (
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <input type="text" placeholder="Card Holder Name" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)}
                            className="w-full p-3 border rounded-xl border-gray-300 focus:outline-indigo-900 focus:ring-2 focus:ring-indigo-200" required />
                        <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full p-3 border rounded-xl border-gray-300 focus:outline-indigo-900 focus:ring-2 focus:ring-indigo-200" required />
                        <div className="flex gap-2">
                            <input type="text" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)}
                                className="w-1/2 p-3 border rounded-xl border-gray-300 focus:outline-indigo-900 focus:ring-2 focus:ring-indigo-200" required />
                            <input type="text" placeholder="CVC" value={cvc} onChange={(e) => setCvc(e.target.value)}
                                className="w-1/2 p-3 border rounded-xl border-gray-300 focus:outline-indigo-900 focus:ring-2 focus:ring-indigo-200" required />
                        </div>
                        <button type="submit" className={`${buttonStyle} bg-gray-900 text-white`}>Pay Now</button>
                    </form>
                )}

                {/* In-Person */}
                {paymentMethod === "inperson" && (
                    <div className="mt-4">
                        <button onClick={handleSubmit} className={`${buttonStyle} bg-indigo-900 text-white`}>
                            Confirm Payment In Person
                        </button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    </AnimatePresence>
);

}

export default PaymentForm;
