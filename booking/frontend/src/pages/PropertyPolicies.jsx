export default function PropertyPolicies() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 ">
            <h1 className="text-3xl font-bold mb-2 text-gray-700 text-center">Property Policies</h1>
            <p className="text-center text-gray-500 text-sm mb-5">Last Updated: December 6, 2025</p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Check-In & Check-Out */}
                <div className="bg-gray-50 border border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-700">Check-In & Check-Out</h2>
                    <p className="text-gray-600">
                        Check-in is available from 2:00 PM and check-out until 11:00 AM. Early check-in or late check-out
                        may be available upon request and subject to availability.
                    </p>
                </div>

                {/* Cancellation Policy */}
                <div className="bg-gray-50 border border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-700">Cancellation Policy</h2>
                    <p className="text-gray-600">
                        Free cancellation is available up to 48 hours before check-in. Late cancellations may incur charges.
                        Specific policies may vary by property.
                    </p>
                </div>

                {/* Maximum Occupancy */}
                <div className="bg-gray-50 border border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-700">Maximum Occupancy</h2>
                    <p className="text-gray-600">
                        Each property has a maximum number of guests allowed per room or unit. Exceeding the limit may incur extra charges.
                    </p>
                </div>

                {/* Children & Infants */}
                <div className="bg-gray-50 border border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-700">Children & Infants</h2>
                    <p className="text-gray-600">
                        Children are welcome. Extra beds or cots may be available upon request and may incur additional charges.
                    </p>
                </div>

                {/* Pets */}
                <div className="bg-gray-50 border border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-700">Pets</h2>
                    <p className="text-gray-600">
                        Pets are allowed only if the property explicitly permits them. Additional fees or deposits may apply.
                    </p>
                </div>

                {/* Smoking */}
                <div className="bg-gray-50 border border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-700">Smoking Policy</h2>
                    <p className="text-gray-600">
                        Smoking is strictly prohibited inside the property. Designated smoking areas may be available outside.
                    </p>
                </div>

                {/* Parking */}
                <div className="bg-gray-50 border border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-700">Parking</h2>
                    <p className="text-gray-600">
                        Parking availability varies by property. Some offer free parking, while others may charge a fee.
                    </p>
                </div>

                {/* Noise / Quiet Hours */}
                <div className="bg-gray-50 border border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-700">Noise / Quiet Hours</h2>
                    <p className="text-gray-600">
                        Guests are expected to maintain low noise levels, especially during designated quiet hours.
                    </p>
                </div>

                {/* Events / Parties */}
                <div className="bg-gray-50 border border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-700">Events / Parties</h2>
                    <p className="text-gray-600">
                        Hosting events or parties is only allowed if explicitly permitted by the property. Limits may apply.
                    </p>
                </div>

                {/* Extra Beds / Rollaway Beds */}
                <div className="bg-gray-50 border border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-700">Extra Beds / Rollaway Beds</h2>
                    <p className="text-gray-600">
                        Extra beds or rollaway beds may be available upon request and may incur additional charges.
                    </p>
                </div>

                {/* Housekeeping / Cleaning */}
                <div className="bg-gray-50 border border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-700">Housekeeping / Cleaning</h2>
                    <p className="text-gray-600">
                        Housekeeping services and cleaning frequency may vary. Guests are encouraged to follow property hygiene guidelines.
                    </p>
                </div>

                {/* Liability */}
                <div className="bg-gray-50 border border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow md:col-span-3">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-700">Liability</h2>
                    <p className="text-gray-600">
                        The property is not responsible for loss, theft, or damage to personal belongings. Guests are encouraged to use safes or lockers provided.
                    </p>
                </div>
            </div>
        </div>
    );
}
