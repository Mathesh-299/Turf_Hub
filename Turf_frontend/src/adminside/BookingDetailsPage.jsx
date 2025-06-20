import React, { useState } from "react";

const BookingDetailsPage = () => {
    // Static booking data
    const [bookings, setBookings] = useState([
        {
            id: 1,
            name: "Arun Kumar",
            contact: "987-654-3210",
            email: "arun.kumar@example.com",
            date: "2024-12-14",
            service: "Turf Booking - Chennai Turf Arena",
            status: "Confirmed",
        },
        {
            id: 2,
            name: "Meena Devi",
            contact: "876-543-2109",
            email: "meena.devi@example.com",
            date: "2024-12-15",
            service: "Turf Booking - Coimbatore Sports Hub",
            status: "Pending",
        },
        {
            id: 3,
            name: "Rajesh Varma",
            contact: "765-432-1098",
            email: "rajesh.varma@example.com",
            date: "2024-12-16",
            service: "Turf Booking - Madurai Play Ground",
            status: "Cancelled",
        },
    ]);

    // Filter bookings by status
    const [filter, setFilter] = useState("All");
    const filteredBookings =
        filter === "All" ? bookings : bookings.filter((booking) => booking.status === filter);

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            {/* Top Bar */}
            <div className="bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Booking Details</h1>
                <select
                    className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-4">
                {/* Total Bookings */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <h2 className="text-lg font-semibold">Total Bookings</h2>
                    <p className="text-2xl font-bold text-blue-600 mt-2">{bookings.length}</p>
                </div>

                {/* Booking Details Table */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4">Booking History</h2>
                    {filteredBookings.length > 0 ? (
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Contact</th>
                                    <th className="border p-2">Email</th>
                                    <th className="border p-2">Date</th>
                                    <th className="border p-2">Service</th>
                                    <th className="border p-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="bg-white hover:bg-gray-100">
                                        <td className="border p-2">{booking.name}</td>
                                        <td className="border p-2">{booking.contact}</td>
                                        <td className="border p-2">{booking.email}</td>
                                        <td className="border p-2">{booking.date}</td>
                                        <td className="border p-2">{booking.service}</td>
                                        <td
                                            className={`border p-2 font-semibold ${booking.status === "Confirmed"
                                                    ? "text-green-600"
                                                    : booking.status === "Pending"
                                                        ? "text-yellow-600"
                                                        : "text-red-600"
                                                }`}
                                        >
                                            {booking.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-600">No bookings found for the selected status.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingDetailsPage;