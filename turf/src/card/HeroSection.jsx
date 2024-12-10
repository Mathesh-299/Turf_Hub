import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="relative bg-cover bg-center h-screen flex items-center justify-center" style={{ backgroundImage: "url('/path-to-your-hero-image.jpg')" }} aria-label="Hero Section">
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="text-center px-6 md:px-12 lg:px-24 text-white relative z-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
                    <span className="text-green-500">Welcome to</span>
                    <span className="text-red-500">Turf</span><span className="text-yellow-500">Hub</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 text-cyan-700 font-medium">
                    Book your favorite turfs and enjoy seamless sports experiences with top-tier facilities.
                </p>
                <Link to="/sports" className="px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold text-gray-900 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl" aria-label="Book Now">
                    Book Now
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;
