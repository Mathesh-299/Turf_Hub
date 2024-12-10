import React from 'react';
import { FaCalendarAlt, FaClipboardList, FaMoneyBillWave, FaSignOutAlt, FaTachometerAlt, FaUsers } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const AdminPanel = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="flex flex-col w-64 bg-gray-800 text-white h-full fixed">
                <div className="p-6 text-center border-b border-gray-700">
                    <h1 className="text-2xl font-bold text-yellow-400">TurfHub Admin</h1>
                </div>
                <nav className="flex-1 mt-6">
                    <ul>
                        <li>
                            <NavLink
                                to="/adminside/dashboard"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                                    }`
                                }
                            >
                                <FaTachometerAlt className="mr-3" />
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/adminside/bookings"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                                    }`
                                }
                            >
                                <FaCalendarAlt className="mr-3" />
                                Bookings
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/adminside/users"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                                    }`
                                }
                            >
                                <FaUsers className="mr-3" />
                                Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/adminside/payments"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                                    }`
                                }
                            >
                                <FaMoneyBillWave className="mr-3" />
                                Payments
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/adminside/manage"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                                    }`
                                }
                            >
                                <FaClipboardList className="mr-3" />
                                Manage Turf
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                {/* Logout Button */}
                <div className="mt-auto p-4">
                    <NavLink
                        to="/login"
                        className="flex items-center justify-center px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        <FaSignOutAlt className="mr-3" />
                        Logout
                    </NavLink>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-64 p-8">
                <div className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <h3 className="text-lg font-semibold text-gray-700">Total Bookings</h3>
                        <p className="text-3xl font-bold text-yellow-500 mt-3">120</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <h3 className="text-lg font-semibold text-gray-700">Active Users</h3>
                        <p className="text-3xl font-bold text-green-500 mt-3">45</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <h3 className="text-lg font-semibold text-gray-700">Monthly Revenue</h3>
                        <p className="text-3xl font-bold text-blue-500 mt-3">₹50,000</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <h3 className="text-lg font-semibold text-gray-700">Pending Payments</h3>
                        <p className="text-3xl font-bold text-red-500 mt-3">5</p>
                    </div>
                </div>

                {/* Table Section */}
                <div className="mt-10 bg-white shadow-lg rounded-lg">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-700">Recent Bookings</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-4 py-2 text-gray-600 font-medium text-left">Booking ID</th>
                                    <th className="px-4 py-2 text-gray-600 font-medium text-left">User</th>
                                    <th className="px-4 py-2 text-gray-600 font-medium text-left">Date</th>
                                    <th className="px-4 py-2 text-gray-600 font-medium text-left">Time</th>
                                    <th className="px-4 py-2 text-gray-600 font-medium text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-2">B001</td>
                                    <td className="px-4 py-2">John Doe</td>
                                    <td className="px-4 py-2">2024-12-12</td>
                                    <td className="px-4 py-2">Evening</td>
                                    <td className="px-4 py-2 text-green-600 font-semibold">Confirmed</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-2">B002</td>
                                    <td className="px-4 py-2">Jane Smith</td>
                                    <td className="px-4 py-2">2024-12-13</td>
                                    <td className="px-4 py-2">Afternoon</td>
                                    <td className="px-4 py-2 text-yellow-600 font-semibold">Pending</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-2">B003</td>
                                    <td className="px-4 py-2">Alex Brown</td>
                                    <td className="px-4 py-2">2024-12-14</td>
                                    <td className="px-4 py-2">Night</td>
                                    <td className="px-4 py-2 text-red-600 font-semibold">Cancelled</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
