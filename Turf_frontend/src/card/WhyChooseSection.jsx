import React from 'react';
import { FaCheckCircle, FaClock, FaRegStar } from 'react-icons/fa';

const FeatureCard = ({ title, text, icon }) => (
    <div
        className={`p-8 bg-red-500 rounded-lg shadow-xl text-white hover:scale-105 transition-all duration-300 transform hover:shadow-2xl`}
        aria-label={title}
    >
        <div className="flex items-center justify-center mb-6">
            <div className="bg-white text-gray-800 rounded-full p-4 hover:scale-110 transition-all duration-300">
                {icon}
            </div>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">{title}</h3>
        <p className="text-gray-200 text-center">{text}</p>
    </div>
);

const WhyChooseSection = () => {
    return (
        <section
            className="py-16 px-6 sm:px-12 lg:px-24 bg-white text-center shadow-md"
            aria-label="Why Choose TurfHub"
        >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
                Why Choose TurfHub?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12">
                Experience top-notch facilities, seamless booking, and flexible schedules—all designed to elevate your sports journey.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                <FeatureCard
                    title="Premium Facilities"
                    text="Our turfs are equipped with state-of-the-art amenities like lighting, seating, and more, ensuring an exceptional experience."
                    
                    icon={<FaRegStar className="text-4xl text-yellow-300 hover:text-yellow-400 transition duration-300" />}
                />
                <FeatureCard
                    title="Easy Booking"
                    text="Book your turf in just a few clicks with our intuitive and user-friendly booking system, available anytime."
                    // gradientColors="from-purple-500 to-pink-500"
                    icon={<FaCheckCircle className="text-4xl text-yellow-400 hover:text-gray-200 transition duration-300" />}
                />
                <FeatureCard
                    title="Flexible Timings"
                    text="TurfHub offers flexible booking hours—book your favorite turf when it fits your schedule, anytime and any day."
                    // gradientColors="from-yellow-500 to-red-500"
                    icon={<FaClock className="text-4xl text-yellow-400 hover:text-gray-200 transition duration-300" />}
                />
            </div>
        </section>
    );
};

export default WhyChooseSection;
