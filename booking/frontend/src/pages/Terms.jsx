import React, { useEffect } from "react";

export default function Terms() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    const lastUpdated = new Date().toLocaleDateString();

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <header className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-gray-700 mb-3 -mt-5">Terms & Conditions</h1>
                <p className="text-sm text-gray-500">Last updated: <strong>{lastUpdated}</strong></p>
            </header>

            {/* Intro */}
            <section className="mb-8">
                <p className="text-gray-700 leading-relaxed">
                    Welcome to <span className="font-semibold">BookInn</span>. These Terms & Conditions outline the rules,
                    obligations, and rights you agree to when using our platform to browse, compare,
                    or book hotels and accommodations.
                </p>
            </section>

            {/* Table of contents */}
            <nav className="mb-10 p-4 bg-gray-50 border border-gray-100 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Contents</h2>
                <ul className="space-y-2 text-gray-700">
                    <li><a href="#acceptance" className="hover:font-semibold">Acceptance</a></li>
                    <li><a href="#reservations" className="hover:font-semibold">Reservations</a></li>
                    <li><a href="#cancellations" className="hover:font-semibold">Cancellations & Refunds</a></li>
                    <li><a href="#guest" className="hover:font-semibold">Guest Responsibilities</a></li>
                    <li><a href="#property" className="hover:font-semibold">Property Policies</a></li>
                    <li><a href="#accuracy" className="hover:font-semibold">Accuracy of Information</a></li>
                    <li><a href="#availability" className="hover:font-semibold">Platform Availability</a></li>
                    <li><a href="#liability" className="hover:font-semibold">Limitation of Liability</a></li>
                    <li><a href="#changes" className="hover:font-semibold">Changes to Terms</a></li>
                </ul>
            </nav>

            <article className="prose prose-lg max-w-none prose-blue">
                {/* 1. Acceptance */}
                <section id="acceptance" className="mb-12">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-3">1. Acceptance</h3>
                    <p className="text-gray-700 leading-relaxed">
                        By accessing or using BookInn, you confirm that you have read, understood, and
                        agreed to these Terms & Conditions. If you do not agree with any part of these
                        terms, you must stop using our platform and services.
                    </p>
                </section>

                {/* 2. Eligibility */}
                <section id="eligibility" className="mb-12">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-3">2. Eligibility</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        To use the BookInn platform, you must meet the following eligibility requirements:
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 space-y-2">
                        <li>You must be at least 18 years old to make a reservation or create an account.</li>
                        <li>The platform may only be used for lawful and legitimate purposes related to booking accommodations.</li>
                        <li>Any attempt to misuse the platform, including fraudulent activity or false reservations, is strictly prohibited and may result in account suspension or legal action.</li>
                    </ul>
                </section>

                {/* 3. Reservations */}
                <section id="reservations" className="mb-12">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-3">3. Reservations & Booking Process</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Our platform allows you to browse hotels, compare prices, and book your stay
                        seamlessly. Reservations are confirmed instantly.
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 space-y-2">
                        <li>Choose your preferred accommodation and review details carefully.</li>
                        <li>Enter accurate guest information before completing the booking.</li>
                        <li>You will receive a confirmation alert immediately after your booking is completed.</li>
                    </ul>
                </section>

                {/* 4. Cancellations */}
                <section id="cancellations" className="mb-12">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-3">4. Cancellations & Refunds</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        Cancellation and refund eligibility depends entirely on the hotel's terms. Some
                        bookings may be non-refundable, while others allow free cancellation within a
                        specific time frame.
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 space-y-2">
                        <li>Refunds are processed only if the hotel confirms approval.</li>
                        <li>Modification requests must be submitted at least 1 week before check-in.</li>
                        <li>Service fees may be non-refundable in some cases.</li>
                    </ul>
                </section>

                {/* 5. Guest Responsibilities */}
                <section id="guest" className="mb-12">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-3">5. Guest Responsibilities</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        Guests are expected to provide accurate details and follow the accommodation's
                        rules. Misuse of the platform, including fraudulent activity, is strictly
                        prohibited.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Damage to property, misconduct, or violation of house rules may result in
                        additional charges from the accommodation provider.
                    </p>
                </section>

                {/* 6. Accuracy */}
                <section id="accuracy" className="mb-12">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-3">6. Accuracy of Information</h3>
                    <p className="text-gray-700 leading-relaxed">
                        We work to ensure that all listings, images, availability, and pricing are
                        accurate. However, occasional errors may occur due to frequent updates or
                        changes made by the property owners. We are not responsible for temporary
                        inaccuracies caused by third-party data updates.
                    </p>
                </section>

                {/* 7. Platform Availability */}
                <section id="availability" className="mb-12">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-3">7. Platform Availability</h3>
                    <p className="text-gray-700 leading-relaxed">
                        BookInn strives for uninterrupted service, but maintenance or outages may
                        occasionally occur. We are not liable for downtime caused by system updates,
                        hosting issues, or technical failures.
                    </p>
                </section>

                {/* 8. Liability */}
                <section id="liability" className="mb-12">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-3">8. Limitation of Liability</h3>
                    <p className="text-gray-700 leading-relaxed">
                        BookInn serves as an intermediary platform and is not responsible for the
                        operations, services, or conditions provided by hotels. We are not liable for
                        travel disruptions, loss of items, safety incidents, or other issues controlled
                        by the accommodation.
                    </p>
                </section>

                {/* 9. Property Policies */}
                <section id="property" className="mb-12">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-3">9. Property Policies</h3>
                    <p className="text-gray-700 leading-relaxed">
                        Each property listed on BookInn has its own set of policies, including
                        damage deposits, smoking rules, and pet policies. Guests
                        are responsible for reviewing and respecting these rules.
                    </p>
                </section>

                {/* 10. Changes */}
                <section id="changes" className="mb-12">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-3">10. Changes to Terms</h3>
                    <p className="text-gray-700 leading-relaxed">
                        BookInn may update these Terms & Conditions periodically. Updates will be
                        posted on this page, and continued use of the platform indicates acceptance of
                        the new terms.
                    </p>
                </section>

                {/* Contact */}
                <section className="mt-16 border-t pt-10">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Contact Us</h3>
                    <p className="text-gray-700 leading-relaxed">
                        If you have any questions about these Terms & Conditions, please contact us
                        through our official support page.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        <em>This document provides general policy information and is not legal advice.</em>
                    </p>
                </section>
            </article>
        </div>
    );
}