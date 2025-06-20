import React, { useState } from "react";

const Paymentdetailspage = () => {
  // Static payment data for Tamil Nadu users
  const [payments, setPayments] = useState([
    {
      id: 1,
      name: "Arun Kumar",
      contact: "987-654-3210",
      email: "arun.kumar@example.com",
      amount: 1500,
      status: "Completed",
      service: "Turf Booking - Chennai Turf Arena",
    },
    {
      id: 2,
      name: "Meena Devi",
      contact: "876-543-2109",
      email: "meena.devi@example.com",
      amount: 1200,
      status: "Pending",
      service: "Turf Booking - Coimbatore Sports Hub",
    },
    {
      id: 3,
      name: "Rajesh Varma",
      contact: "765-432-1098",
      email: "rajesh.varma@example.com",
      amount: 1000,
      status: "Failed",
      service: "Turf Booking - Madurai Play Ground",
    },
  ]);

  // State for filtering payments by status
  const [filterStatus, setFilterStatus] = useState("All");

  // Calculate total payments received
  const totalPayments = payments.reduce(
    (total, payment) => (payment.status === "Completed" ? total + payment.amount : total),
    0
  );

  // Filtered payments based on selected status
  const filteredPayments =
    filterStatus === "All"
      ? payments
      : payments.filter((payment) => payment.status === filterStatus);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Payment Details</h1>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4">
        {/* Total Payments */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold">Total Payments Received</h2>
          <p className="text-2xl font-bold text-green-600 mt-2">₹{totalPayments}</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white shadow-lg rounded-lg p-4 mb-6 flex justify-between items-center">
          <label htmlFor="statusFilter" className="text-md font-medium mr-4">Filter by Status:</label>
          <select
            id="statusFilter"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {/* Payment Details Table */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Payment History</h2>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Contact</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Service</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="bg-white hover:bg-gray-100 transition-colors"
                >
                  <td className="border p-2">{payment.name}</td>
                  <td className="border p-2">{payment.contact}</td>
                  <td className="border p-2">{payment.email}</td>
                  <td className="border p-2">₹{payment.amount}</td>
                  <td className={`border p-2 font-medium ${
                    payment.status === "Completed"
                      ? "text-green-600"
                      : payment.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}>
                    {payment.status}
                  </td>
                  <td className="border p-2">{payment.service}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPayments.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No payments to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paymentdetailspage;