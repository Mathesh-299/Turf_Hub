import React from "react";
import { NavLink } from "react-router-dom";
import pic from "../assets/img/depositphotos_150617828-stock-photo-soccer-ball-on-grass.jpg";
import pic1 from "../assets/img/depositphotos_8307714-stock-photo-cricket-ball.jpg";
import pic2 from "../assets/img/photo-1494199505258-5f95387f933c.jpeg";
import pic3 from "../assets/img/photo-1721760886713-1ab0c5045bf7.jpeg";
import pic4 from "../assets/img/premium_photo-1666913667082-c1fecc45275d.jpeg";

const Sports = () => {
    return (
        <div className="min-h-screen bg-gray-200 to-gray-500 py-20">
            <div className="max-w-6xl mx-auto text-center px-4">
                <h1 className="text-5xl font-extrabold text-black/70 mb-8 tracking-wide">
                    TurfHub Sports
                </h1>
                <p className="text-lg text-black mb-10 leading-relaxed">
                    Book your favorite turf and enjoy a variety of exciting sports games with friends, family, or teammates. Our turfs are designed to provide an unmatched sporting experience.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Football */}
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <img
                            src={pic}
                            alt="Football"
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Football</h2>
                        <p className="text-gray-600 mb-4">
                            Experience the thrill of football on well-maintained turfs.
                        </p>
                        <NavLink
                            to="/groundpage"
                            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-md transition-all duration-300"
                        >
                            Book Now
                        </NavLink>
                    </div>
                    {/* Cricket */}
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <img
                            src={pic1}
                            alt="Cricket"
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Cricket</h2>
                        <p className="text-gray-600 mb-4">
                            Play cricket with professional facilities on our custom-made turfs.
                        </p>
                        <NavLink
                            to="/groundpage"
                            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-md transition-all duration-300"
                        >
                            Book Now
                        </NavLink>
                    </div>
                    {/* Basketball */}
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <img
                            src={pic2}
                            alt="Basketball"
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Basketball</h2>
                        <p className="text-gray-600 mb-4">
                            Take your basketball game to the next level on our premium courts.
                        </p>
                        <NavLink
                            to="/groundpage"
                            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-md transition-all duration-300"
                        >
                            Book Now
                        </NavLink>
                    </div>
                    {/* Tennis */}
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <img
                            src={pic3}
                            alt="Tennis"
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tennis</h2>
                        <p className="text-gray-600 mb-4">
                            Enjoy a game of tennis with high-quality courts and equipment.
                        </p>
                        <NavLink
                            to="/groundpage"
                            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-md transition-all duration-300"
                        >
                            Book Now
                        </NavLink>
                    </div>
                    {/* Volleyball */}
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <img
                            src={pic4}
                            alt="Volleyball"
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Volleyball</h2>
                        <p className="text-gray-600 mb-4">
                            Play volleyball on our state-of-the-art indoor and outdoor courts.
                        </p>
                        <NavLink
                            to="/groundpage"
                            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-md transition-all duration-300"
                        >
                            Book Now
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sports;
