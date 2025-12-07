function AboutUs() {
    const values = [
        { title: "Customer First", description: "Every decision is made with the traveler in mind." },
        { title: "Integrity", description: "Transparent pricing and honest communication." },
        { title: "Innovation", description: "Continuously improving our platform for a better experience." },
        { title: "Passion", description: "We love travel and helping people explore the world." },
    ];

    const journey = [
        {
            year: "2022",
            event: "The idea of BookInn was born with a simple goal: to help travelers easily find and book comfortable hotels without stress."
        },
        {
            year: "2023",
            event: "A small but passionate team started building the platform, focusing on creating an easy and reliable booking experience for travelers."
        },
        {
            year: "2024",
            event: "We refined our platform based on user needs, improving features and making it simpler for travelers to find their ideal stays."
        },
        {
            year: "2025",
            event: "BookInn expanded to offer hundreds of hotels across Kosova and Albania, helping thousands of travelers plan their trips with confidence and ease."
        },
    ];

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-16">
            {/* Header */}
            <header className="text-center">
                <h1 className="text-3xl font-bold text-gray-700 mb-4">About Us</h1>
                <p className="text-gray-700 text-lg">
                    Discover who we are, our mission, and how we make hotel booking simple and enjoyable for travelers worldwide.
                </p>
            </header>

            {/* Our Story */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">Our Story</h2>
                <p className="text-gray-700">
                    BookInn was founded in 2022 with a simple but powerful idea: to make travel planning easier and more enjoyable for everyone.
                    We noticed that booking hotels online could often be confusing, time-consuming, and stressful for travelers, and we wanted to change that.
                </p>
                <p className="text-gray-700">
                    Starting as a small team of passionate travel enthusiasts, we worked tirelessly to create a platform that is simple, reliable, and tailored to the needs of modern travelers.
                    Every feature was designed with the goal of helping users find the perfect stay quickly and confidently.
                </p>
                <p className="text-gray-700">
                    From our humble beginnings, BookInn has grown steadily, now offering hundreds of hotels, villas and apartments across Kosova and Albania.
                    Our commitment to quality and user satisfaction has allowed us to help thousands of travelers discover comfortable and affordable accommodations, making their trips memorable and stress-free.
                </p>
                <p className="text-gray-700">
                    Over the years, we have continuously refined our platform, listened to user feedback, and introduced innovative features to improve the booking experience.
                    Today, BookInn is not just a hotel booking platform – it is a trusted companion for travelers looking for convenience, comfort, and peace of mind.
                </p>
            </section>

            {/* Our Mission */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">Our Mission</h2>
                <p className="text-gray-700">
                    Our mission at BookInn is to provide travelers with a seamless, reliable, and fully personalized booking experience.
                    We aim to make planning a trip as simple and enjoyable as the trip itself.
                </p>
                <p className="text-gray-700">
                    Every feature we build, every service we offer, is designed with the traveler in mind.
                    We want our users to feel confident that they have found the perfect stay, tailored to their preferences and needs.
                </p>
                <p className="text-gray-700">
                    By combining innovative technology, exceptional customer service, and a vast network of trusted hotels, we strive to make every trip stress-free and memorable.
                    Our mission is not just about bookings; it's about creating experiences, building trust, and empowering travelers to explore the world with ease.
                </p>
            </section>

            {/* Our Vision */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">Our Vision</h2>
                <p className="text-gray-700">
                    Our vision at BookInn is to become the most trusted online hotel booking platform in the region and beyond.
                    We strive to empower travelers to explore the world with ease, comfort, and confidence, knowing that their stay is taken care of.
                </p>
                <p className="text-gray-700">
                    We aim to set a new standard for convenience, reliability, and personalized experiences in the travel industry.
                    By continuously innovating and listening to our users, we envision a world where planning a trip is as joyful and exciting as the journey itself.
                </p>
            </section>


            {/* Our Values */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">Our Values</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((v) => (
                        <div key={v.title} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">{v.title}</h3>
                            <p className="text-gray-700">{v.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Our Journey / Timeline */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">Our Journey</h2>
                <ol className="border-l-2 border-indigo-200">
                    {journey.map((j) => (
                        <li key={j.year} className="mb-6 ml-6">
                            <span className="bg-gray-700 text-white rounded-full px-3 py-1 text-sm font-semibold">{j.year}</span>
                            <p className="text-gray-700 mt-2">{j.event}</p>
                        </li>
                    ))}
                </ol>
            </section>
        </div>
    );
}

export default AboutUs;