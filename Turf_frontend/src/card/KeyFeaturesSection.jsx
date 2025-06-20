import React from 'react';
import { FaClock, FaRegHandshake, FaUsers } from 'react-icons/fa';

const KeyFeaturesSection = () => {
    return (
        <section className="py-16 bg-gray-50 px-6 sm:px-12 lg:px-24" aria-label="Key Features">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10">
                Our Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                {/* 24/7 Availability */}
                <div className="p-8 bg-white shadow-xl rounded-lg text-center hover:shadow-2xl transition-shadow duration-300">
                    <FaClock className="text-yellow-500 text-4xl mb-4 mx-auto" />
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">24/7 Availability</h3>
                    <p className="text-gray-600">
                        TurfHub is available around the clock, 7 days a week, allowing you to book at any time.
                    </p>
                </div>
                
                {/* Customizable Packages */}
                <div className="p-8 bg-white shadow-xl rounded-lg text-center hover:shadow-2xl transition-shadow duration-300">
                    <FaRegHandshake className="text-yellow-500 text-4xl mb-4 mx-auto" />
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Customizable Packages</h3>
                    <p className="text-gray-600">
                        Choose from a variety of customizable packages tailored to your specific event or game needs.
                    </p>
                </div>

                {/* Group Discounts */}
                <div className="p-8 bg-white shadow-xl rounded-lg text-center hover:shadow-2xl transition-shadow duration-300">
                    <FaUsers className="text-yellow-500 text-4xl mb-4 mx-auto" />
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Group Discounts</h3>
                    <p className="text-gray-600">
                        Book with a group or team and enjoy amazing discounts on your turf bookings.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default KeyFeaturesSection;
