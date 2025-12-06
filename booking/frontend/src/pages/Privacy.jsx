function PrivacyPolicy() {
    return (
        <div className="max-w-6xl mx-auto p-6 space-y-16">
            {/* Header */}
            <header className="text-center">
                <h1 className="text-3xl font-bold text-gray-700 mb-1">Privacy Policy</h1>
                <p className="text-gray-500 text-sm mb-4">Last Updated: December 6, 2025</p>
                <p className="text-gray-700 text-md">
                    Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you use BookInn.
                </p>
            </header>

            {/* Information We Collect */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">Information We Collect</h2>
                <p className="text-gray-700">
                    We may collect personal information such as your name, last name, email address and phone number when you book a hotel or create an account on our platform.
                </p>
                <p className="text-gray-700">
                    We also collect non-personal information such as your IP address, browser type, and usage data to help improve our services and enhance your experience.
                </p>
            </section>

            {/* How We Use Your Information */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">How We Use Your Information</h2>
                <p className="text-gray-700">
                    Your information is used to provide and improve our services, process bookings, communicate with you, and personalize your experience on BookInn.
                </p>
                <p className="text-gray-700">
                    We may also use your data for marketing purposes, sending you updates about new features, promotions, and special offers, with your consent.
                </p>
            </section>

            {/* Sharing and Disclosure */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">Sharing and Disclosure</h2>
                <p className="text-gray-700">
                    We do not sell or rent your personal information to third parties. We may share information with trusted partners and service providers who assist us in operating the platform and providing services.
                </p>
                <p className="text-gray-700">
                    We may also disclose your information if required by law or to protect our rights, safety, or property.
                </p>
            </section>

            {/* Security */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">Security</h2>
                <p className="text-gray-700">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, or misuse.
                </p>
                <p className="text-gray-700">
                    However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
                </p>
            </section>

            {/* Your Choices */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">Your Choices</h2>
                <p className="text-gray-700">
                    You have the right to access, update, or delete your personal information.
                    If you wish to make any changes, you should contact us directly, and we will assist you.
                </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">Changes to This Privacy Policy</h2>
                <p className="text-gray-700">
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
            </section>

            {/* Contact */}
            <section className="space-y-4">
                <p className="text-gray-700 border border-gray-300 p-4 rounded-lg">
                    If you have any questions about this Privacy Policy or our data practices, please
                    <strong> Contact Us </strong>.
                </p>
            </section>
        </div>
    );
}

export default PrivacyPolicy;
