import { Link } from 'react-router-dom';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const reviewsData = [
    {
        id: 1,
        quote: "My experience with BookInn was exceptional. I found the perfect hotel at the best price, and the booking process was incredibly fast and easy. Their support staff was also very helpful!",
        name: "Arta Haxhiu",
        location: "Prishtina, Kosovo",
        rating: 5,
    },
    {
        id: 2,
        quote: "I loved the 'Packing List Generator' feature before my beach trip. BookInn not only helped me find a great hotel but also helped me organize. Highly recommended.",
        name: "Ledion Basha",
        location: "Tirana, Albania",
        rating: 5,
    },
    {
        id: 3,
        quote: "I always check prices across multiple sites, and BookInn genuinely gave me the best deal. I appreciate their commitment to the price guarantee. It saves me time and money.",
        name: "Elisa Zeka",
        location: "Shkodër, Albania",
        rating: 5,
    },
    {
        id: 4,
        quote: "I had a minor issue with check-in times, but the contact team acted fast. The quick response and professional solution were impressive. Excellent customer service.",
        name: "Krenar Gashi",
        location: "Gjakova, Kosovo",
        rating: 4,
    },
    {
        id: 5,
        quote: "The 'Last Minute Deals' offer was a lifesaver! I managed to book a luxury suite at an unexpected price. BookInn makes luxury travel affordable.",
        name: "Donika Leka",
        location: "Durrës, Albania",
        rating: 5,
    },
    {
        id: 6,
        quote: "I have used BookInn for our family vacations for years. We always find accommodations that are child-friendly and in safe areas. A truly reliable platform.",
        name: "Gentian Deda",
        location: "Fier, Albania",
        rating: 5,
    },
    {
        id: 7,
        quote: "The 'Travel Guides' page was very informative. It helped me decide on my next destination and find the best local attractions. More than just a booking service.",
        name: "Liridona Metaj",
        location: "Tetovo, North Macedonia",
        rating: 4,
    },
    {
        id: 8,
        quote: "The cancellation process was very simple and stress-free. This shows that BookInn values its customers and offers flexible terms. Very satisfied with the service.",
        name: "Besnik Syla",
        location: "Gjilan, Kosovo",
        rating: 4,
    },
    {
        id: 9,
        quote: "Beautiful and clean design makes searching very easy. Property information is detailed, and the photos are realistic. There were no unpleasant surprises.",
        name: "Zana Kuçi",
        location: "Zürich, Switzerland",
        rating: 5,
    },
    {
        id: 10,
        quote: "The prices were competitive, and there were no hidden fees. What you see is what you get. Definitely the best option for my international bookings.",
        name: "Arian Nushi",
        location: "Berlin, Germany",
        rating: 5,
    },
];

// Komponenti i yjeve për vlerësimin
const RatingStars = ({ rating }) => {
    const stars = Array.from({ length: 5 }, (_, index) => {
        return (
            <FaStar
                key={index}
                className={`w-4 h-4 ${index < rating ? 'text-indigo-950' : 'text-gray-300'}`}
            />
        );
    });
    return <div className="flex gap-0.5">{stars}</div>;
};

export default function CustomerReviewsV2() {
    return (
        <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 -mt-5">
                    <h2 className="text-sm text-indigo-900 font-semibold tracking-widest uppercase">
                        CUSTOMER FEEDBACK
                    </h2>
                    <p className="mt-2 text-3xl leading-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
                        BookInn Reviews
                    </p>
                    <p className="mt-4 text-md text-gray-500 max-w-2xl mx-auto">
                        We strive to offer exceptional booking experiences. Read the authentic reviews from people who chose us.
                    </p>
                </div>

                {/* Grid i Dëshmive - Stil Minimalist */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviewsData.map((review) => (
                        <div
                            key={review.id}
                            className="bg-gray-50 p-6 rounded-lg border border-gray-100 transition duration-300 hover:shadow-xl hover:bg-white flex flex-col"
                        >
                            {/* Header i Review-t */}
                            <div className="flex justify-between items-start mb-4">
                                <FaQuoteLeft className="w-6 h-6 text-indigo-950 opacity-70" />
                                <RatingStars rating={review.rating} />
                            </div>

                            {/* Kuotimi */}
                            <p className="text-gray-700 italic text-base mb-6 flex-grow">
                                "{review.quote}"
                            </p>

                            {/* Informacioni i klientit */}
                            <div className="mt-auto">
                                <p className="text-lg font-bold text-gray-900">{review.name}</p>
                                <p className="text-sm text-indigo-800 font-medium">{review.location}</p>
                            </div>
                        </div>
                    ))}

                    <div className="bg-indigo-950 p-6 rounded-lg flex flex-col justify-center items-center text-center shadow-lg transform hover:scale-[1.02] transition duration-300">
                        <h4 className="text-2xl font-bold text-white mb-3">Be Our Next Success Story!</h4>
                        <p className="text-white/90 mb-6">
                            Book your perfect stay today and share your travel experience with us.
                        </p>
                        <Link
                            to="/hotels"
                            className="inline-block bg-indigo-700 text-gray-900 font-bold py-2 px-6 rounded-full shadow-md hover:bg-indigo-100 transition"
                        >
                            Start Booking
                        </Link>
                    </div>
                </div>

                <div className="mt-20 text-center border-t border-gray-200 pt-10">
                    <p className="text-lg font-medium text-gray-700">
                        Don't just take our word for it – discover your next destination!
                    </p>
                    <Link
                        to="/destinations"
                        className="mt-4 inline-block bg-gray-900 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-teal-700 transition duration-300 transform hover:scale-105"
                    >
                        Explore Travel Guides
                    </Link>
                </div>
            </div>
        </div>
    );
}