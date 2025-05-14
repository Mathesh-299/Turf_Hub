import React from 'react';

const Admindash = () => {
    return (
        <div className="p-8">
            {/* Admin Dashboard Header */}
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
    );
}

export default Admindash;
