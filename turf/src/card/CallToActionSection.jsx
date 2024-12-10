import React from 'react';
import { FaArrowRight, FaFutbol } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CallToActionSection = () => {
    return (
        <section
            className="relative py-16 bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-center px-6 sm:px-12 lg:px-24"
            aria-label="Call to Action"
        >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>

            {/* Main Content */}
            <div className="relative z-10">
                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 flex justify-center items-center gap-3">
                    <FaFutbol className="text-white text-4xl sm:text-5xl animate-bounce" />
                    Ready to Play?
                </h2>

                {/* Subheading */}
                <p className="text-lg sm:text-xl md:text-2xl mb-10">
                    Your next match awaits at TurfHub! Reserve your turf, gather your team, and experience the ultimate sporting thrill.
                </p>

                {/* Call-to-Action Button */}
                <Link
                    to="/sports"
                    className="px-8 sm:px-10 py-4 text-lg sm:text-xl font-semibold bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl transition duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                    aria-label="Book a Turf"
                >
                    Book a Turf <FaArrowRight className="text-yellow-400" />
                </Link>

                {/* Decorative Divider */}
                <div className="mt-10">
                    <hr className="border-gray-300 w-1/3 mx-auto" />
                </div>

                {/* Informative Details */}
                <div className="mt-8 space-y-4">
                    <p className="text-sm sm:text-base md:text-lg font-medium">
                        🌟 **Premium Quality Turfs:** Book from a wide range of well-maintained turfs across Tamil Nadu.
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-medium">
                        🎉 **Events & Tournaments:** Stay updated on upcoming tournaments and exclusive events.
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-medium">
                        🕒 **Flexible Slots:** Choose from morning, afternoon, evening, or night sessions that fit your schedule.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CallToActionSection;
