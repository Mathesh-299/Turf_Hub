import React from 'react';
import { Link } from 'react-router-dom';

const FinalHeroSection = () => {
    return (
        <section className="relative" aria-label="Final Hero Section">
            <div className="bg-cover bg-center h-screen text-white flex justify-center items-center relative" style={{ backgroundImage: 'url(https://example.com/your-image.jpg)' }}>
                <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
                <div className="text-center px-4 md:px-10 z-10">
                    <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 tracking-wide text-shadow-md">
                        Welcome to Our Website
                    </h1>
                    <p className="text-lg sm:text-xl mb-12 max-w-2xl mx-auto">
                        We're here to make your experience seamless, enjoyable, and memorable.
                    </p>
                    <Link to="/contact" className="bg-yellow-500 text-gray-800 py-3 px-8 rounded-full text-xl font-semibold hover:bg-yellow-600 transition-all duration-300 ease-in-out transform hover:scale-110 shadow-xl hover:shadow-2xl" aria-label="Get in Touch">
                        Get in Touch
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FinalHeroSection;
