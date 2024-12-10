import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import adminImage from '../assets/img/Bg.jpg';

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [showToaster, setShowToaster] = useState(false);
    const [showSuccessToaster, setShowSuccessToaster] = useState(false);  // Success toaster state
    const navigate = useNavigate();

    // Form validation
    const validateForm = () => {
        if (!username || !password) {
            setErrorMessage("Both username and password are required");
            setShowToaster(true);
            setTimeout(() => setShowToaster(false), 5000); // Hide error toaster after 5 seconds
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setErrorMessage("");
        setShowToaster(false); // Hide error toaster when form is valid
        setShowSuccessToaster(false); // Hide success toaster if it's visible from a previous login attempt

        try {
            const response = await axios.post("http://localhost:8000/api/admin/login", {
                username,
                password
            });

            const { token } = response.data;
            localStorage.setItem("adminToken", token);
            setShowSuccessToaster(true);  // Show success toaster
            setTimeout(() => setShowSuccessToaster(false), 5000); // Hide success toaster after 5 seconds
            navigate("/adminside");  // Redirect to the home page
        } catch (err) {
            setErrorMessage("Invalid credentials. Please try again.");
            setShowToaster(true);
            setTimeout(() => setShowToaster(false), 5000); // Hide error toaster after 5 seconds
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200 max-h-96">
            <div className="w-full max-w-xl bg-white/85 p-10 rounded-3xl shadow-lg">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
                    Admin Login
                </h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Username Input */}
                    <div className="relative">
                        <label htmlFor="username" className="block text-lg font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <div className="flex items-center border-2 border-gray-300 rounded-xl p-2">
                            <FaUserAlt className="text-gray-500 mr-3" />
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                className="w-full p-2 text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="flex items-center border-2 border-gray-300 rounded-xl p-2">
                            <FaLock className="text-gray-500 mr-3" />
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full p-2 text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <span
                                className="cursor-pointer"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                aria-label="Toggle password visibility"
                            >
                                {passwordVisible ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                            </span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-[50%] p-4 text-white font-semibold rounded-xl ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-indigo-300"} transition-all duration-300 ease-in-out`}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Error Message Toaster */}
                {showToaster && errorMessage && (
                    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-72 bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg z-50 text-center transition-all duration-300 ease-in-out opacity-100">
                        {errorMessage}
                    </div>
                )}

                {/* Success Message Toaster */}
                {showSuccessToaster && (
                    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-72 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-50 text-center transition-all duration-300 ease-in-out opacity-100">
                        Login successful!
                    </div>
                )}

                {/* Registration Link */}
                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <span
                            className="text-blue-600 cursor-pointer hover:underline"
                            onClick={() => navigate("/adminregister")}
                        >
                            Register here
                        </span>
                    </p>
                </div>
            </div>  
            <div className="hidden md:block w-1/2 bg-cover bg-center text-black p-8 rounded-3xl shadow-2xl " style={{ backgroundImage: `url(${adminImage})` }} >
                <h2 className="text-3xl font-bold mb-6 tracking-tight leading-tight">Welcome to the Admin Panel</h2>
                <p className="text-lg mb-4 opacity-80">
                    As an admin, you have full control over the Turf Hub platform. Here's what you can do:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-xl">
                    <li className="transition-all duration-300 ease-in-out hover:scale-105 hover:text-blue-100">Monitor Turf Bookings</li>
                    <li className="transition-all duration-300 ease-in-out hover:scale-105 hover:text-blue-100">Add/Edit Sports Categories</li>
                    <li className="transition-all duration-300 ease-in-out hover:scale-105 hover:text-blue-100">View User Activities</li>
                    <li className="transition-all duration-300 ease-in-out hover:scale-105 hover:text-blue-100">Manage Turf Locations</li>
                    <li className="transition-all duration-300 ease-in-out hover:scale-105 hover:text-blue-100">Control System Settings</li>
                </ul>
                <div className="mt-6 text-center">
                    <button
                        className="bg-white text-blue-600 py-3 px-6 rounded-full font-semibold shadow-md transition-all duration-300 ease-in-out hover:bg-blue-200 focus:ring-2 focus:ring-blue-300 transform hover:scale-105"
                        onClick={() => navigate("/")}
                    >
                        Need Help? Click Here
                    </button>
                </div>
            </div>

        </div>
    );
};

export default AdminLogin;
