import React from 'react';
import { FaArrowRight, FaInfoCircle, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FinalHeroSection = () => {
    return (
        <section
            className="relative"
            aria-label="Final Hero Section"
        >
            {/* Background Image with Overlay */}
            <div
                className="bg-cover bg-center h-screen text-white flex justify-center items-center relative"
                style={{
                    backgroundImage: 'url(https://example.com/your-image.jpg)',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 z-0"></div>

                {/* Main Content */}
                <div className="text-center px-6 md:px-12 z-10">
                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-wide text-shadow-md leading-tight flex justify-center items-center gap-4">
                        Welcome to <span className="text-yellow-400">TurfHub</span>
                        <FaInfoCircle className="text-yellow-400 animate-pulse" />
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
                        At <span className="font-bold text-yellow-400">TurfHub</span>, we bring the best turf booking experience right to your fingertips. From flexible slots to premium turfs across Tamil Nadu, we’re here to elevate your game.
                    </p>

                    {/* Call-to-Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/contact"
                            className="flex items-center justify-center bg-yellow-500 text-gray-900 py-3 px-8 rounded-full text-xl font-semibold hover:bg-yellow-600 transition duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl gap-2"
                            aria-label="Get in Touch"
                        >
                            <FaPhoneAlt className="text-gray-900" />
                            Get in Touch
                        </Link>
                        <Link
                            to="/about"
                            className="flex items-center justify-center bg-gray-800 text-white py-3 px-8 rounded-full text-xl font-semibold hover:bg-gray-700 transition duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl gap-2"
                            aria-label="Learn More About Us"
                        >
                            Learn More <FaArrowRight className="text-yellow-400" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinalHeroSection;
