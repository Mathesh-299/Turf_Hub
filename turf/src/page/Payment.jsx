import React, { useState } from 'react';
import qrCodeImage from "../assets/img/payment.png";
// Google Pay Page Component
const GooglePayPage = ({ onConfirm, onClose }) => {
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    const handlePayNow = () => {
        setPaymentConfirmed(true);
        onConfirm('Google Pay');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Google Pay Payment</h2>
                {paymentConfirmed ? (
                    <div className="text-green-600 text-center">
                        <p className="mb-6">Payment Successful!</p>
                        <button
                            onClick={onClose}
                            className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        <p className="mb-6">Scan the QR code below or click "Pay Now" to complete the payment:</p>
                        <div className="flex justify-center mb-6">
                            <img
                                src={qrCodeImage} // Replace with actual QR code image
                                alt="Google Pay QR Code"
                                className="w-40 h-40"
                            />
                        </div>
                        <button
                            onClick={handlePayNow}
                            className="w-full p-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                        >
                            Pay Now with Google Pay
                        </button>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={onClose}
                                className="text-red-600 font-bold hover:text-red-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// Payment Form for Credit Card and PayPal
const PaymentForm = ({ paymentMethod, onConfirm, onCancel }) => {
    const [formData, setFormData] = useState({
        cardholderName: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        email: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(paymentMethod);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {paymentMethod === 'Credit Card' ? (
                <>
                    <input
                        type="text"
                        name="cardholderName"
                        value={formData.cardholderName}
                        onChange={handleInputChange}
                        placeholder="Cardholder Name"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                    <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="Card Number"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            name="expirationDate"
                            value={formData.expirationDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                        <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="CVV"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                </>
            ) : paymentMethod === 'PayPal' ? (
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="PayPal Email"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                />
            ) : null}

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onCancel}
                    className="w-1/3 p-3 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="w-1/3 p-3 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                    Confirm Payment
                </button>
            </div>
        </form>
    );
};

// Payment Modal Component
const PaymentModal = ({ onClose }) => {
    const [isGooglePaySelected, setIsGooglePaySelected] = useState(false);
    const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleGooglePayClick = () => {
        setPaymentMethod('Google Pay');
        setIsGooglePaySelected(true);
    };

    const handlePaymentConfirmation = (method) => {
        setIsPaymentConfirmed(true);
        setPaymentMethod(method);
        console.log(`Payment confirmed with ${method}`);
    };

    const handleCancel = () => {
        setIsGooglePaySelected(false);
        setIsPaymentConfirmed(false);
        setPaymentMethod('');
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {isGooglePaySelected ? (
                <GooglePayPage onConfirm={handlePaymentConfirmation} onClose={handleCancel} />
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Method</h2>
                    <p className="mb-6">Please select a payment method to complete your booking:</p>
                    <div className="space-y-4">
                        <button
                            onClick={() => handlePaymentConfirmation('Credit Card')}
                            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Pay with Credit Card
                        </button>
                        <button
                            onClick={() => handlePaymentConfirmation('PayPal')}
                            className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Pay with PayPal
                        </button>
                        <button
                            onClick={handleGooglePayClick}
                            className="w-full p-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                        >
                            Pay with Google Pay
                        </button>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleCancel}
                            className="text-red-600 font-bold hover:text-red-700"
                        >
                            Close
                        </button>
                    </div>
                    {isPaymentConfirmed && (
                        <div className="mt-6 text-green-600 font-semibold text-center">
                            Payment Successful!
                        </div>
                    )}
                </div>
            )}

            {paymentMethod && !isGooglePaySelected && !isPaymentConfirmed && (
                <PaymentForm
                    paymentMethod={paymentMethod}
                    onConfirm={handlePaymentConfirmation}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default PaymentModal;
