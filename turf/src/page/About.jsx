import React from "react";
import { FaCompass, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaTrophy } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const About = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto p-6">
                <h2 className="text-4xl font-bold text-gray-800 text-center my-6">About Turfhub</h2>
                <p className="text-lg text-gray-600 text-center mb-8">
                    Welcome to <span className="text-red-500 font-bold">Turf</span>
                    <span className="text-yellow-500 font-bold">hub</span>, your trusted partner for turf
                    bookings across Tamil Nadu. Our platform connects sports enthusiasts from cities like
                    Chennai, Coimbatore, Madurai, Trichy, and beyond to top-quality sports facilities.
                </p>

                {/* Key Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-blue-200 shadow-lg rounded-lg flex flex-col items-center text-center text-black">
                        <FaMapMarkerAlt className="text-red-500 text-5xl mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-800">Extensive Reach</h3>
                        <p className="text-gray-600">
                            We cover major cities across Tamil Nadu, ensuring you can book turfs in your location
                            quickly and easily.
                        </p>
                    </div>
                    <div className="p-6 bg-blue-200 shadow-lg rounded-lg flex flex-col items-center text-center">
                        <FaPhoneAlt className="text-green-500 text-5xl mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-800">24/7 Assistance</h3>
                        <p className="text-gray-600">
                            Our dedicated support team is here to assist you anytime, providing smooth booking
                            experiences.
                        </p>
                    </div>
                    <div className="p-6 bg-blue-200 shadow-lg rounded-lg flex flex-col items-center text-center">
                        <FaTrophy className="text-yellow-500 text-5xl mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-800">Top-Class Facilities</h3>
                        <p className="text-gray-600">
                            Partnered with premium turfs to bring you exceptional sports facilities for every need.
                        </p>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="mt-10 p-6 bg-gradient-to-r from-gray-500 to-purple-400 text-white rounded-lg shadow-lg">
                    <h3 className="text-3xl font-bold text-center mb-4">Why Choose Turfhub?</h3>
                    <ul className="text-lg space-y-2">
                        <li>🌟 Seamless booking experience</li>
                        <li>🌟 Real-time availability updates</li>
                        <li>🌟 Extensive network across Tamil Nadu</li>
                        <li>🌟 Affordable rates with exclusive offers</li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                        <FaEnvelope className="text-blue-500 text-5xl mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-800">Email Us</h3>
                        <p className="text-gray-600">support@turfhub.com</p>
                    </div>
                    <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                        <FaPhoneAlt className="text-green-500 text-5xl mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-800">Call Us</h3>
                        <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                    <div className="p-6 bg-white shadow-lg rounded-lg text-center">
                        <FaMapMarkerAlt className="text-red-500 text-5xl mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-800">Visit Us</h3>
                        <p className="text-gray-600">Multiple locations across Tamil Nadu</p>
                    </div>
                </div>

                {/* Explore Button */}
                <div className="mt-12 flex justify-center">
                    <NavLink
                        to="/groundpage"
                        className="flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300"
                    >
                        <FaCompass className="mr-2 text-2xl" />
                        Explore
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default About;
