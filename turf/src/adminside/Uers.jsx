import React, { useState } from "react";

const Uers = () => {
    // State for storing users data
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Ravi Kumar",
            email: "ravi.kumar@example.com",
            contact: "987-654-3210",
            city: "Chennai", // Indian user city
            state: "Tamil Nadu", // Indian user state
            profilePicture: "https://via.placeholder.com/100", // Profile picture for users
            role: "User",
            status: "Active",
        },
        {
            id: 2,
            name: "Priya Sharma",
            email: "priya.sharma@example.com",
            contact: "912-345-6789",
            city: "Bengaluru",
            state: "Karnataka",
            profilePicture: "https://via.placeholder.com/100",
            role: "User",
            status: "Inactive",
        },
        {
            id: 3,
            name: "Arun Patel",
            email: "arun.patel@example.com",
            contact: "822-334-5566",
            city: "Hyderabad",
            state: "Telangana",
            profilePicture: "", // No picture for some users
            role: "Admin", // Admin role for management
            status: "Active",
        },
    ]);

    // Separate users into "Admins" and "Users"
    const admins = users.filter((user) => user.role === "Admin");
    const regularUsers = users.filter((user) => user.role === "User");

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            {/* Top Bar */}
            <div className="bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Turf Booking System - Users</h1>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-4">
                {/* Admins Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4">Admins</h2>
                    <div className="flex overflow-x-scroll space-x-6">
                        {admins.map((admin) => (
                            <div
                                key={admin.id}
                                className="bg-white shadow-lg rounded-lg p-4 w-64 flex-shrink-0"
                            >
                                {/* Profile Picture for Admin */}
                                {admin.profilePicture && (
                                    <img
                                        src={admin.profilePicture}
                                        alt={admin.name}
                                        className="w-20 h-20 object-cover rounded-full mx-auto mb-4"
                                    />
                                )}
                                <h3 className="text-center text-lg font-semibold">{admin.name}</h3>
                                <p className="text-center text-sm text-gray-600 mb-2">
                                    <strong>Email:</strong> {admin.email}
                                </p>
                                <p className="text-center text-sm text-gray-600 mb-2">
                                    <strong>Contact:</strong> {admin.contact}
                                </p>
                                <p className="text-center text-sm text-gray-600 mb-2">
                                    <strong>Location:</strong> {admin.city}, {admin.state}
                                </p>
                                <p className="text-center text-sm text-gray-600 mb-2">
                                    <strong>Role:</strong> {admin.role}
                                </p>
                                <p className="text-center text-sm text-gray-600 mb-2">
                                    <strong>Status:</strong> {admin.status}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Users Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Users</h2>
                    <div className="flex overflow-x-scroll space-x-6">
                        {regularUsers.map((user) => (
                            <div
                                key={user.id}
                                className="bg-white shadow-lg rounded-lg p-4 w-64 flex-shrink-0"
                            >
                                {/* Profile Picture for Regular Users */}
                                {user.profilePicture && (
                                    <img
                                        src={user.profilePicture}
                                        alt={user.name}
                                        className="w-20 h-20 object-cover rounded-full mx-auto mb-4"
                                    />
                                )}
                                <h3 className="text-center text-lg font-semibold">{user.name}</h3>
                                <p className="text-center text-sm text-gray-600 mb-2">
                                    <strong>Email:</strong> {user.email}
                                </p>
                                <p className="text-center text-sm text-gray-600 mb-2">
                                    <strong>Contact:</strong> {user.contact}
                                </p>
                                <p className="text-center text-sm text-gray-600 mb-2">
                                    <strong>Location:</strong> {user.city}, {user.state}
                                </p>
                                <p className="text-center text-sm text-gray-600 mb-2">
                                    <strong>Role:</strong> {user.role}
                                </p>
                                <p className="text-center text-sm text-gray-600 mb-2">
                                    <strong>Status:</strong> {user.status}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Uers;
