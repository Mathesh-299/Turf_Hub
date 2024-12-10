import React, { useState } from "react";
import { FaCalendarAlt, FaCode, FaSignOutAlt, FaTools, FaUserCog } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminPanel = () => {
    const [selectedModule, setSelectedModule] = useState("dashboard");

    // Dummy Data
    const bookings = [
        { id: 1, date: "2024-12-12", session: "Afternoon", user: "John Doe" },
        { id: 2, date: "2024-12-13", session: "Evening", user: "Jane Smith" },
    ];

    const users = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "User" },
        { id: 2, name: "Admin User", email: "admin@example.com", role: "Admin" },
    ];

    const handleModuleChange = (module) => {
        setSelectedModule(module);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-6 text-center text-2xl font-bold">
                    <span className="text-red-500">Turf</span>
                    <span className="text-yellow-500">hub</span> Admin
                </div>
                <nav className="flex-grow">
                    <ul>
                        <li>
                            <button
                                onClick={() => handleModuleChange("dashboard")}
                                className={`w-full text-left p-4 flex items-center space-x-3 hover:bg-gray-700 ${selectedModule === "dashboard" ? "bg-gray-700" : ""
                                    }`}
                            >
                                <FaUserCog />
                                <span>Dashboard</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleModuleChange("bookings")}
                                className={`w-full text-left p-4 flex items-center space-x-3 hover:bg-gray-700 ${selectedModule === "bookings" ? "bg-gray-700" : ""
                                    }`}
                            >
                                <FaCalendarAlt />
                                <span>Manage Bookings</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleModuleChange("users")}
                                className={`w-full text-left p-4 flex items-center space-x-3 hover:bg-gray-700 ${selectedModule === "users" ? "bg-gray-700" : ""
                                    }`}
                            >
                                <FaTools />
                                <span>Manage Users</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleModuleChange("codeHelp")}
                                className={`w-full text-left p-4 flex items-center space-x-3 hover:bg-gray-700 ${selectedModule === "codeHelp" ? "bg-gray-700" : ""
                                    }`}
                            >
                                <FaCode />
                                <span>Code Help</span>
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-600">
                    <NavLink
                        to="/"
                        className="w-full text-left flex items-center space-x-3 text-red-500 hover:text-yellow-500"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </NavLink>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-6">
                {selectedModule === "dashboard" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
                        <p>Welcome, Admin! Use the menu to navigate between modules.</p>
                    </div>
                )}

                {selectedModule === "bookings" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Manage Bookings</h2>
                        <table className="w-full bg-white shadow-lg rounded-lg">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Session</th>
                                    <th className="p-4">User</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.id} className="border-t">
                                        <td className="p-4">{booking.id}</td>
                                        <td className="p-4">{booking.date}</td>
                                        <td className="p-4">{booking.session}</td>
                                        <td className="p-4">{booking.user}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {selectedModule === "users" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
                        <table className="w-full bg-white shadow-lg rounded-lg">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-t">
                                        <td className="p-4">{user.id}</td>
                                        <td className="p-4">{user.name}</td>
                                        <td className="p-4">{user.email}</td>
                                        <td className="p-4">{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {selectedModule === "codeHelp" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Code Help</h2>
                        <p>Find code snippets and guidelines for each module below:</p>
                        <ul className="list-disc pl-6 mt-4">
                            <li>Frontend Code for Booking</li>
                            <li>Backend Code for User Management</li>
                            <li>API Documentation</li>
                            <li>Error Handling Tips</li>
                        </ul>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPanel;
