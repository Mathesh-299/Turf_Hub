    import React from 'react';
import { Link } from 'react-router-dom';

    const CallToActionSection = () => {
        return (
            <section className="py-16 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-center px-6 sm:px-12 lg:px-24" aria-label="Call to Action">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">Ready to Play?</h2>
                <p className="text-base sm:text-lg md:text-xl mb-8">
                    Secure your turf and start playing with TurfHub. Don’t wait, book now and enjoy the game!
                </p>
                <Link to="/sports" className="px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold bg-gray-900 rounded-full hover:bg-gray-800 transition duration-300 transform hover:scale-105" aria-label="Book a Turf">
                    Book a Turf
                </Link>
            </section>
        );
    };

    export default CallToActionSection;
