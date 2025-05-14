import React, { useState } from 'react';

const GooglePayPage = ({ onClose }) => {
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentHistory] = useState([
        { date: '2024-12-01', amount: '₹500', status: 'Completed' },
        { date: '2024-11-25', amount: '₹750', status: 'Completed' },
        { date: '2024-11-20', amount: '₹300', status: 'Failed' },
    ]);

    const handlePayNowClick = () => {
        setShowPaymentForm(true);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Google Pay Payment
                </h2>

                {!showPaymentForm ? (
                    <>
                        <p className="mb-6">You are about to pay through Google Pay.</p>
                        <div className="space-y-4 mb-6">
                            <button
                                onClick={handlePayNowClick}
                                className="w-full p-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                            >
                                Pay Now with Google Pay
                            </button>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={onClose}
                                className="text-red-600 font-bold hover:text-red-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <div>
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Payment Form
                            </h3>
                            <div className="flex items-center justify-center mb-4">
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="User QR Code"
                                    className="h-32 w-32"
                                />
                            </div>
                            <input
                                type="number"
                                placeholder="Enter Amount"
                                className="w-full p-3 border border-gray-300 rounded-md mb-4"
                            />
                            <button className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                Proceed to Pay
                            </button>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Payment History
                            </h3>
                            <ul className="space-y-2">
                                {paymentHistory.map((payment, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center p-3 border border-gray-300 rounded-md"
                                    >
                                        <span>{payment.date}</span>
                                        <span>{payment.amount}</span>
                                        <span
                                            className={`font-semibold ${
                                                payment.status === 'Completed'
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }`}
                                        >
                                            {payment.status}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setShowPaymentForm(false)}
                                className="text-red-600 font-bold hover:text-red-700"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GooglePayPage;
