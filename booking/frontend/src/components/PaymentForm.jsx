import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

function PaymentForm({ title = "Payment", amount = "", onClose, onSubmit }) {
    const [paymentMethod, setPaymentMethod] = useState(""); // "online" ose "inperson"
    const [cardHolder, setCardHolder] = useState(""); // Card holder name
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

        if (paymentMethod === "inperson") {
            alert("Your reservation has been made!");
        } else if (paymentMethod === "online") {
            if (!cardHolder || !cardNumber || !expiry || !cvc) {
                alert("Please fill in all card details.");
                return;
            }
            if (onSubmit) onSubmit(paymentMethod);
            alert("Your reservation has been made!");
        }

        resetForm();
        onClose();

    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
            resetForm(); // edhe kur modal mbyllet nga X
        };
    }, []);

    return (<AnimatePresence>
        <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white rounded-2xl p-8 w-full max-w-md relative"
                initial={{ scale: 0.8, y: -50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: -50 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={() => {
                        resetForm();
                        onClose();
                    }}
                > <X className="w-6 h-6" /> </button>

                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                {amount && <p className="mb-4 text-gray-700 font-semibold">Amount: {amount}</p>}

                {!paymentMethod && (
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => setPaymentMethod("online")}
                            className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition"
                        >
                            Pay Online
                        </button>
                        <button
                            onClick={() => setPaymentMethod("inperson")}
                            className="w-full py-3.5 bg-green-600 text-white font-semibold rounded-2xl hover:bg-green-700 transition"
                        >
                            Pay In Person
                        </button>
                    </div>
                )}

                {paymentMethod === "online" && (
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <input
                            type="text"
                            placeholder="Card Holder Name"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            className="w-full p-3 border rounded-xl"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Card Number"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full p-3 border rounded-xl"
                            required
                        />
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="MM/YY"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                className="w-1/2 p-3 border rounded-xl"
                                required
                            />
                            <input
                                type="text"
                                placeholder="CVC"
                                value={cvc}
                                onChange={(e) => setCvc(e.target.value)}
                                className="w-1/2 p-3 border rounded-xl"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition"
                        >
                            Pay Now
                        </button>
                    </form>
                )}

                {paymentMethod === "inperson" && (
                    <div className="mt-4">
                        <button
                            onClick={handleSubmit}
                            className="w-full py-3.5 bg-green-600 text-white font-semibold rounded-2xl hover:bg-green-700 transition"
                        >
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