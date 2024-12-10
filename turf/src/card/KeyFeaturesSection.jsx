import React from 'react';

const KeyFeaturesSection = () => {
    return (
        <section className="py-16 bg-gray-50 px-6 sm:px-12 lg:px-24" aria-label="Key Features">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10">
                Our Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                <div className="p-8 bg-white shadow-xl rounded-lg text-center hover:shadow-2xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">24/7 Availability</h3>
                    <p className="text-gray-600">
                        TurfHub is available at any time, 7 days a week, allowing you to book at your convenience.
                    </p>
                </div>
                <div className="p-8 bg-white shadow-xl rounded-lg text-center hover:shadow-2xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Customizable Packages</h3>
                    <p className="text-gray-600">
                        Whether you're booking for an event or a casual game, we offer customizable packages for all needs.
                    </p>
                </div>
                <div className="p-8 bg-white shadow-xl rounded-lg text-center hover:shadow-2xl transition-shadow duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Group Discounts</h3>
                    <p className="text-gray-600">
                        Booking with friends or a team? Enjoy great group discounts on your bookings!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default KeyFeaturesSection;
