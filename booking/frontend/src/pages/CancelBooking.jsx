import React, { useState } from "react";

function CancelBookingPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        bookingNumber: "",
        reason: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert("Your cancellation request has been submitted!");
        setFormData({ name: "", email: "", bookingNumber: "", reason: "" });
    };

    return (<div className="min-h-screen bg-gray-100 flex items-center justify-center"> <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-md"> <h2 className="text-2xl font-semibold mb-6 text-center">Cancel Hotel Booking</h2> <form onSubmit={handleSubmit} className="space-y-4"> <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
    /> <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        /> <input
            type="text"
            name="bookingNumber"
            placeholder="Booking Number"
            value={formData.bookingNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        /> <textarea
            name="reason"
            placeholder="Reason for Cancellation"
            value={formData.reason}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
        /> <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
            Submit Cancellation </button>
    </form>
    </div>
    </div>
    );
}

export default CancelBookingPage;
