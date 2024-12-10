import React from 'react';
import { Link } from 'react-router-dom';
import SportsBackground from '../assets/img/photo-1452778374718-046c69a5c02f.jpg'; // Replace with the actual path to your image

const Login = () => {
    return (
        <div
            className="fixed inset-0 bg-cover bg-center bg-no-repeat flex justify-center items-center z-30"
            style={{
                backgroundImage: `url(${SportsBackground})`, // Using imported image
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>

            {/* Modal Box */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-96 px-8 py-10 text-center z-40">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                    Welcome to <span className="text-red-500">Turf</span>
                    <span className="text-yellow-500">Hub</span>
                </h2>
                <p className="text-gray-500 mb-8">
                    Choose your login type to continue.
                </p>

                {/* Login Buttons */}
                <div className="space-y-6">
                    <Link
                        to="/adminlogin"
                        className="block w-full py-3 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-red-500/50 transition duration-300"
                    >
                        Admin Login
                    </Link>
                    <Link
                        to="/userlogin"
                        className="block w-full py-3 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-blue-500/50 transition duration-300"
                    >
                        User Login
                    </Link>
                </div>

                {/* Close Button */}
                <Link
                    to="/"
                    className="absolute top-4 right-4 text-white bg-gray-800 hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition duration-300"
                >
                    ✕
                </Link>
            </div>
        </div>
    );
};

export default Login;
