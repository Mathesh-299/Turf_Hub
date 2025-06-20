import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import adminImage from '../assets/img/Bg.jpg';
import Navbar from "../component/Navbar";

const AdminRegister = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");  // Declare email state
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [usernameExists, setUsernameExists] = useState(false);
    const navigate = useNavigate();

    const checkPasswordStrength = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const validateForm = () => {
        if (!username || !password || !confirmPassword || !email) {
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

    const handleUsernameBlur = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/admin/check-username", { username });
            setUsernameExists(response.data.exists);
        } catch (err) {
            console.error("Error checking username:", err);
            setUsernameExists(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Ensure form validation

        setLoading(true);
        setErrorMessage("");

        try {
            const response = await axios.post("http://localhost:8000/api/admin/register", {
                username,
                email,  // Ensure you're sending email as well
                password,
                confirmPassword,  // Ensure this is sent
            });
            toast.success(response.data.message);
            setUsername("");
            setEmail("");  // Clear the email field
            setPassword("");
            setConfirmPassword("");
        } catch (err) {
            // Capture backend error message
            toast.error(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-20">
            <Navbar />
            <div className="min-h-80 flex justify-center items-center bg-gray-300">
                <div className="flex w-full max-w-7xl bg-blue-50 p-8 rounded-xl shadow-lg">
                    <div
                        className="hidden md:block w-full md:w-1/2 bg-cover bg-center h-screen rounded-xl"
                        style={{ backgroundImage: `url(${adminImage})` }}
                    >
                        <div className="w-full h-full bg-black bg-opacity-40 p-8 rounded-xl space-y-6">
                            <h2 className="text-4xl font-extrabold text-white mb-4">Welcome to TurfHub Admin</h2>
                            <p className="text-lg text-white mb-6">
                                Register now to access all admin features and manage your TurfHub platform.
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 space-y-6 bg-white p-8 rounded-xl shadow-lg">
                        <h1 className="text-4xl font-semibold text-center text-gray-700 mb-6">Admin Registration</h1>
                        <form onSubmit={handleRegister} className="space-y-6">
                            <div className="relative">
                                <label htmlFor="username" className="block text-gray-600 font-medium">Username</label>
                                <div className="flex items-center border-2 border-gray-300 rounded-md mt-2">
                                    <FaUserAlt className="text-gray-400 ml-3" />
                                    <input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onBlur={handleUsernameBlur}
                                        placeholder="Enter username"
                                        className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                                    />
                                </div>
                                {usernameExists && (
                                    <p className="text-sm text-red-500 mt-2">This username is already taken</p>
                                )}
                            </div>

                            <div className="relative">
                                <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
                                <div className="flex items-center border-2 border-gray-300 rounded-md mt-2">
                                    <FaEnvelope className="text-gray-400 ml-3" />
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}  // Use email state variable
                                        onChange={(e) => setEmail(e.target.value)}  // Update email state on change
                                        placeholder="Enter email"
                                        className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                                    />
                                </div>
                            </div>

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

                            <div className="relative">
                                <label htmlFor="confirmPassword" className="block text-gray-600 font-medium">Confirm Password</label>
                                <div className="flex items-center border-2 border-gray-300 rounded-md mt-2">
                                    <FaLock className="text-gray-400 ml-3" />
                                    <input
                                        type={confirmPasswordVisible ? "text" : "password"}
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm password"
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

                            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className={`w-full bg-blue-600 text-white p-3 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={loading}
                                >
                                    {loading ? "Registering..." : "Register"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
