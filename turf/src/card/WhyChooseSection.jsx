import React from 'react';

const FeatureCard = ({ title, text, gradientColors }) => (
    <div className={`p-8 bg-gradient-to-r ${gradientColors} rounded-lg shadow-xl text-white hover:scale-105 transition-all duration-300`}>
        <h3 className="text-xl sm:text-2xl font-bold mb-4">{title}</h3>
        <p className="text-gray-200">{text}</p>
    </div>
);

const WhyChooseSection = () => {
    return (
        <section className="py-16 px-6 sm:px-12 lg:px-24 bg-white text-center shadow-md" aria-label="Why Choose TurfHub">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
                Why Choose TurfHub?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-12">
                Experience the best facilities, seamless booking, and flexible schedules—all designed to make your sports journey unforgettable.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                <FeatureCard title="Premium Facilities" text="Our turfs are equipped with state-of-the-art amenities for an unmatched sports experience." gradientColors="from-green-500 to-blue-500" />
                <FeatureCard title="Easy Booking" text="Book your turf in just a few clicks with our simple and user-friendly booking system." gradientColors="from-purple-500 to-pink-500" />
                <FeatureCard title="Flexible Timings" text="TurfHub offers flexible booking hours to fit your busy schedule—book any time, any day." gradientColors="from-yellow-500 to-red-500" />
            </div>
        </section>
    );
};

export default WhyChooseSection;
