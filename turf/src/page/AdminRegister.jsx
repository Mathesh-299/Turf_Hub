import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast"; // For Toaster notifications
import { FaEye, FaEyeSlash, FaLock, FaRegCheckCircle, FaUserAlt } from "react-icons/fa"; // Icons for input fields
import { useNavigate } from "react-router-dom";
import adminImage from '../assets/img/Bg.jpg';

const AdminRegister = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [usernameExists, setUsernameExists] = useState(false); // To check username existence
    const navigate = useNavigate();

    // Password strength check
    const checkPasswordStrength = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    // Form validation
    const validateForm = () => {
        if (!username || !password || !confirmPassword) {
            setErrorMessage("All fields are required");
            return false;
        }
        if (!checkPasswordStrength(password)) {
            setErrorMessage("Password must be at least 8 characters long and contain both letters and numbers.");
            return false;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return false;
        }
        if (usernameExists) {
            setErrorMessage("Username is already taken");
            return false;
        }
        return true;
    };

    const handleUsernameChange = async (e) => {
        setUsername(e.target.value);
        try {
            const response = await axios.post("http://localhost:8000/api/admin/check-username", { username: e.target.value });
            setUsernameExists(response.data.exists);
        } catch (err) {
            setUsernameExists(false); // Reset on error
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setErrorMessage("");

        try {
            const response = await axios.post("http://localhost:8000/api/admin/register", {
                username,
                password,
            });
            toast.success(response.data.message); // Show success toast
            setUsername("");
            setPassword("");
            setConfirmPassword("");
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed"); // Show error toast
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-300">
            <div className="flex w-full max-w-7xl bg-blue-50 p-8 rounded-xl shadow-lg">
                <div
                    className="hidden md:block w-full md:w-1/2 bg-cover bg-center h-screen rounded-xl"
                    style={{ backgroundImage: `url(${adminImage})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
                >
                    <div className="w-full h-full bg-black bg-opacity-40 p-8 rounded-xl space-y-6">
                        <h2 className="text-4xl font-extrabold text-white mb-4">Welcome to TurfHub Admin</h2>
                        <p className="text-lg text-white mb-4">
                            Manage TurfHub services, bookings, and user access efficiently. As an admin, you can ensure smooth operations and user satisfaction.
                        </p>
                        <p className="text-lg text-white mb-6">
                            Register now to get access to all admin features and start managing your TurfHub platform.
                        </p>
                    </div>
                </div>

                {/* Right side - Registration Form */}
                <div className="w-full md:w-1/2 space-y-6 bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-4xl font-semibold text-center text-gray-700 mb-6">Admin Registration</h1>
                    <form onSubmit={handleRegister} className="space-y-6">
                        {/* Username Input */}
                        <div className="relative">
                            <label htmlFor="username" className="block text-gray-600 font-medium">Username</label>
                            <div className="flex items-center border-2 border-gray-300 rounded-md mt-2">
                                <FaUserAlt className="text-gray-400 ml-3" />
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    placeholder="Enter username"
                                    className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                                />
                            </div>
                            {usernameExists && (
                                <p className="text-sm text-red-500 mt-2">This username is already taken</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
                            <div className="flex items-center border-2 border-gray-300 rounded-md mt-2">
                                <FaLock className="text-gray-400 ml-3" />
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                                />
                                <span
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                >
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="block text-gray-600 font-medium">Confirm Password</label>
                            <div className="flex items-center border-2 border-gray-300 rounded-md mt-2">
                                <FaRegCheckCircle className="text-gray-400 ml-3" />
                                <input
                                    type={confirmPasswordVisible ? "text" : "password"}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password"
                                    className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                                />
                                <span
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                >
                                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`w-[50%] p-3 mt-4 text-white font-semibold rounded-md ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"} transition-all`}
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    {/* Error or Success Message */}
                    {errorMessage && (
                        <div className="mt-4 text-red-500 text-center">
                            <p>{errorMessage}</p>
                        </div>
                    )}

                    {/* Link to Login Page */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <span
                                className="text-blue-600 cursor-pointer hover:underline"
                                onClick={() => navigate("/adminlogin")}
                            >
                                Login here
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
