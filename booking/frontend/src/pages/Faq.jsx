import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
    const faqs = [
        {
            question: "How does the booking process work on BookInn?",
            answer:
                "The booking process on BookInn is very simple and secure. You start by selecting your destination, travel dates, and preferred type of accommodation. Then you fill in your personal information, including your first name, last name, email address, and other details required for the booking. Once all necessary information is provided, you immediately receive a booking confirmation.",
        },
        {
            question: "Is my personal information safe on BookInn?",
            answer:
                "Yes, BookInn takes the security of your personal data very seriously. All information is stored on secure servers with advanced encryption and is not shared with third parties without your permission. Your data is used only to process bookings or provide relevant information.",
        },
        {
            question: "Can I cancel my reservation?",
            answer:
                "Yes, most properties offer free cancellation within a certain timeframe. You can cancel or modify your reservation directly from your BookInn account or through our support team.",
        },
        {
            question: "How can I change my reservation dates or information?",
            answer:
                "You can modify your reservation directly from your BookInn account. If you are within one week of your check-in date, changes can be made by contacting our support team directly to ensure that modifications are handled safely and accurately.",
        },
        {
            question: "Do you offer 24/7 support?",
            answer:
                "Yes, our support team is available every day, at any hour, to help you with any issue or question. You can contact us through the Contact Us page.",
        },
        {
            question: "Are there any additional fees?",
            answer:
                "Prices are transparent and clearly displayed during the booking process. Some properties may have local taxes or additional fees, which are always shown before payment confirmation.",
        },
        {
            question: "How can I request accommodations in specific locations?",
            answer:
                "You can use filters to choose accommodations in specific locations. You can also mention special requests in the information fields required for booking.",
        },
        {
            question: "Do you offer discounts or special deals?",
            answer:
                "Yes, BookInn offers a variety of deals and discounts. You can view all current offers in the deals section on the homepage and benefit from special promotions to make your booking more affordable.",
        },
        {
            question: "Can I book accommodation for a large group?",
            answer:
                "Yes, you can book villas, apartments, or hotels for large groups. You may contact our support team to receive personalized offers and plans.",
        },
        {
            question: "What services do accommodations usually offer on BookInn?",
            answer:
                "Most accommodations offer free Wi-Fi, parking, kitchen facilities, laundry, and in some cases, a pool or gym. Full details about available services can be found on each accommodation's page.",
        },
        {
            question: "What happens if the accommodation does not match the description?",
            answer:
                "If there is any issue with the accommodation, you can contact our support team within 24 hours of arrival to find a solution or request a refund.",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 py-16 px-4 sm:px-8 lg:px-24">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-600 mb-10 text-center -mt-5">
                    Frequently Asked Questions
                </h1>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} faq={faq} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function AccordionItem({ faq }) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="bg-gray-50 border border-gray-300 rounded-2xl shadow p-6">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between text-left focus:outline-none"
            >
                <span className="text-lg text-gray-800">{faq.question}</span>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown />
                </motion.div>
            </button>

            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-3"
            >
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </motion.div>
        </div>
    );
}
