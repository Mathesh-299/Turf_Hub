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

const Home = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      <HeroSection />
      <WhyChooseSection />
      <KeyFeaturesSection />
      <CallToActionSection />
      <FinalHeroSection />
    </div>
  );
};

export default Home;
