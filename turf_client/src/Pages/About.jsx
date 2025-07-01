import { Calendar, Mail, PhoneCall, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="min-h-screen pt-24 bg-gradient-to-t from-white/50 to-gray-600 text-gray-800 flex flex-col justify-between">
            <div className="max-w-6xl mx-auto space-y-16 pb-12">
                <div className="text-center space-y-4 text-white">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-400 to-blue-600 drop-shadow-md">
                        About Turf Hub
                    </h1>
                    <p className="text-lg">
                        Turf Hub is a smart turf booking platform that makes it easy to find and reserve play slots for your favorite sports.
                    </p>
                    <p className="text-md max-w-3xl mx-auto">
                        We provide real-time turf availability, secure booking, and personalized scheduling for football, cricket, badminton, and more — so you can focus on enjoying your game without hassle.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10 text-center ">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border hover:border-green-400 transition hover:scale-95">
                        <Users className="mx-auto text-blue-500 w-10 h-10 mb-4 animate-pulse" />
                        <h2 className="text-xl font-semibold text-blue-600">Community Driven</h2>
                        <p className="text-gray-600">Thousands of players, one platform. Turf Hub is built for everyone.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border hover:border-blue-400 transition hover:scale-95">
                        <Calendar className="mx-auto text-green-500 w-10 h-10 mb-4 animate-pulse" />
                        <h2 className="text-xl font-semibold text-green-600">Live Slot Booking</h2>
                        <p className="text-gray-600">Book instantly with real-time turf availability.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border hover:border-yellow-400 transition hover:scale-95">
                        <Trophy className="mx-auto text-yellow-500 w-10 h-10 mb-4 animate-pulse" />
                        <h2 className="text-xl font-semibold text-yellow-600">Game-Ready Always</h2>
                        <p className="text-gray-600">Our mission is to get you on the turf — fast, easy, and reliably.</p>
                    </div>
                </div>
            </div>

            <footer className="bg-black text-white py-4 mt-10">
                <div className="w-full mx-auto flex flex-row sm:flex-row justify-center items-center px-6 gap-6 text-sm">
                    <div className="text-center sm:text-left">
                        <p>© 2025 Turf Hub. All rights reserved.</p>
                        <p className="opacity-75">Crafted with dedication by Mathesh</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-300">
                        <div className="flex items-center gap-2">
                            <PhoneCall className="w-4 h-4 text-green-400" />
                            <span>+91 98765 43210</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-400" />
                            <span>support@turfhub.com</span>
                        </div>
                        <Link to="/contact" className="underline hover:text-blue-300">Contact Us</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default About;
