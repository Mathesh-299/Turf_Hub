import React, { useState } from 'react';
import {
    FaBars,
    FaCalendarAlt, FaClipboardList, FaMoneyBillWave, FaSignOutAlt, FaTachometerAlt,
    FaTimes,
    FaUserCircle, FaUsers
} from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router-dom';

const AdminPanel = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex">

            {/* Sidebar */}
            <div className={`lg:w-1/5 w-72 bg-gray-800 text-white h-full fixed shadow-lg transition-all duration-300 ease-in-out ${isSidebarOpen ? 'left-0' : '-left-72'} lg:left-0`}>
                <div className="p-6 text-center border-b border-gray-700">
                    <h1 className="text-3xl font-extrabold text-yellow-400">TurfHub Admin</h1>
                </div>

                {/* User Info Section */}
                <div className="p-6 flex items-center space-x-4 border-b border-gray-700 bg-gray-900 rounded-xl">
                    <FaUserCircle className="text-4xl text-yellow-400" />
                    <div className="text-white">
                        <h3 className="text-lg font-semibold">Admin</h3>
                        <p className="text-sm text-gray-400">admin@turfhub.com</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 mt-6">
                    <ul className="space-y-2">
                        <li>
                            <NavLink
                                to="/adminside"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 rounded-xl transition-all duration-300 ease-in-out ${isActive ? 'bg-indigo-700 text-white' : 'hover:bg-indigo-700 hover:text-white'}`}
                                onClick={closeSidebar}
                            >
                                <FaTachometerAlt className="mr-3 text-xl" />
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <Link
                                to="bookings"
                                className="flex items-center px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-indigo-700 hover:text-white"
                                onClick={closeSidebar}
                            >
                                <FaCalendarAlt className="mr-3 text-xl" />
                                Bookings
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="users"
                                className="flex items-center px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-indigo-700 hover:text-white"
                                onClick={closeSidebar}
                            >
                                <FaUsers className="mr-3 text-xl" />
                                Users
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="payments"
                                className="flex items-center px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-indigo-700 hover:text-white"
                                onClick={closeSidebar}
                            >
                                <FaMoneyBillWave className="mr-3 text-xl" />
                                Payments
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="manage"
                                className="flex items-center px-4 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-indigo-700 hover:text-white"
                                onClick={closeSidebar}
                            >
                                <FaClipboardList className="mr-3 text-xl" />
                                Manage Turf
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Logout Button */}
                <div className="mt-auto p-6">
                    <Link
                        to="/login"
                        className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 ease-in-out"
                    >
                        <FaSignOutAlt className="mr-3 text-xl" />
                        Logout
                    </Link>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 ml-72 lg:ml-1/5 p-8 overflow-auto bg-white rounded-xl shadow-lg">
                <div className="lg:hidden p-6">
                    <button onClick={toggleSidebar} className="text-3xl text-white">
                        {isSidebarOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
                <Outlet /> {/* This is where the nested routes will be rendered */}
            </div>

        </div>
    );
};

export default AdminPanel;
