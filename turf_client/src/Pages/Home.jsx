// src/Pages/Home.jsx
import { motion } from "framer-motion";
import { Calendar, Clock, PhoneCall, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-600 to-white/50 text-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-12">

                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-6"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 drop-shadow">
                        Welcome to Turf Hub
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-700">
                        Book your game turf instantly — play, compete, and enjoy.
                    </p>
                    <Link to="/ground">
                        <button className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition active:scale-95">
                            Book a Turf Now
                        </button>
                    </Link>
                </motion.div>

                <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition"
                    >
                        <Trophy className="mx-auto text-blue-500 w-10 h-10 mb-3" />
                        <h2 className="text-xl font-bold text-blue-600 mb-2">Multi-Sport Turfs</h2>
                        <p>Play football, cricket, badminton, and more — all in one place.</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition"
                    >
                        <Calendar className="mx-auto text-blue-500 w-10 h-10 mb-3" />
                        <h2 className="text-xl font-bold text-blue-600 mb-2">Real-Time Booking</h2>
                        <p>Check slot availability and book immediately with live updates.</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition"
                    >
                        <Users className="mx-auto text-blue-500 w-10 h-10 mb-3" />
                        <h2 className="text-xl font-bold text-blue-600 mb-2">For All Players</h2>
                        <p>Whether casual or competitive — we have turf time for everyone.</p>
                    </motion.div>
                </div>

                <div className="mt-24">
                    <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">How Turf Hub Works</h2>
                    <div className="grid sm:grid-cols-3 gap-8 text-center">
                        <div>
                            <Calendar className="mx-auto text-green-500 w-10 h-10 mb-2" />
                            <h4 className="font-semibold text-lg">Choose Date & Time</h4>
                            <p className="text-sm text-gray-600">Select available slots and book instantly.</p>
                        </div>
                        <div>
                            <Clock className="mx-auto text-green-500 w-10 h-10 mb-2" />
                            <h4 className="font-semibold text-lg">Flexible Slots</h4>
                            <p className="text-sm text-gray-600">Morning to late-night slots to suit your schedule.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-24 text-center border-t pt-10">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                        <Link to="/contact" className="hover:text-blue-800 hover:underline">Have Questions?</Link>
                    </h3>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <PhoneCall className="text-blue-500" />
                        <p className="text-gray-600">Contact us at: <strong>+91 98765 43210</strong></p>
                    </div>
                    <p className="mt-4 text-gray-500">© 2025 Turf Hub. All rights reserved. Developed by Mathesh.</p>
                </div>

            </div>
        </div>
    );
};

export default Home;
