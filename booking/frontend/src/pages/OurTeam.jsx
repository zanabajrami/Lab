import { useState } from "react";
import { motion } from "framer-motion";

import team_member1 from "../images/team_member1.png";
import team_member2 from "../images/team_member2.png";
import team_member3 from "../images/team_member3.png";
import team_member4 from "../images/team_member4.png";
import team_member5 from "../images/team_member5.png";
import team_member6 from "../images/team_member6.png";
import team_member7 from "../images/team_member7.png";
import team_member8 from "../images/team_member8.png";
import team_member9 from "../images/team_member9.png";
import team_member10 from "../images/team_member10.png";
import team_member11 from "../images/team_member11.png";
import team_member12 from "../images/team_member12.png";

const teamMembers = [
    { name: "Albert Kelmendi", role: "Founder & CEO", img: team_member1, bio: "Albert oversees all aspects of BookInn, focusing on company vision and strategy." },
    { name: "Ariana Berisha", role: "Hotel Partnerships Manager", img: team_member2, bio: "Ariana builds strong relationships with hotels to ensure the best options for travelers." },
    { name: "Erina Gashi", role: "Customer Support Manager", img: team_member3, bio: "Erina ensures all customer queries are answered quickly and professionally." },
    { name: "Gentian Hoxha", role: "Senior Booking Coordinator", img: team_member4, bio: "Gentian manages bookings and ensures a seamless experience for travelers." },
    { name: "Mimoza Shala", role: "Promotions & Offers Specialist", img: team_member7, bio: "Mimoza designs attractive deals and promotions for users." },
    { name: "Sara Kelmendi", role: "Marketing Lead", img: team_member5, bio: "Sara leads campaigns to make BookInn visible to travelers worldwide." },
    { name: "Art Imeri", role: "Junior Booking Coordinator", img: team_member6, bio: "Art focuses on assisting with hotel bookings, data entry, and customer queries under supervision." },
    { name: "Diana Shoshi", role: "Front-End Developer", img: team_member8, bio: "Diana develops and maintains the booking platform's front-end." },
    { name: "Amar Rexhepi", role: "Booking Analytics Specialist", img: team_member9, bio: "Amar analyzes booking data to optimize performance and conversions." },
    { name: "Valon Leka", role: "Data Specialist", img: team_member10, bio: "Valon manages data and ensures accuracy across all hotel listings." },
    { name: "Adea Imeri", role: "Special Offers Coordinator", img: team_member11, bio: "Adea creates seasonal and special offers for travelers." },
    { name: "Nerit Berisha", role: "Back-End Developer", img: team_member12, bio: "Nerit develops and maintains the backend of the platform, ensuring smooth booking operations and database management." }

];

function HotelTeamSection() {
    const [expandedIdx, setExpandedIdx] = useState(null);

    return (
        <section className="mb-16 px-4">
            <h2 className="text-3xl font-semibold mb-8 mt-5 text-gray-700 text-center">
                Our Team
            </h2>

            {/* Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-gray-50 border border-gray-300 rounded-xl shadow p-6 text-center max-w-[280px] mx-auto w-full cursor-pointer"
                        onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                    >
                        <img
                            src={member.img}
                            alt={member.name}
                            className="mx-auto rounded-xl w-[220px] h-[300px] object-cover mb-4 border-2 border-blue-100"
                        />
                        <h3 className="font-semibold text-lg text-gray-800">{member.name}</h3>
                        <p className="text-gray-500">{member.role}</p>

                        {/* Bio shfaqet vetëm kur karta është zgjeruar */}
                        {expandedIdx === idx && (
                            <p className="text-gray-700 text-sm mt-2">{member.bio}</p>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default HotelTeamSection;
