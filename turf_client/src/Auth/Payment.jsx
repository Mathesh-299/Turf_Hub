import { useState } from "react";
import { FaCheckCircle, FaCreditCard, FaMoneyBillWave, FaRupeeSign } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";

const Payment = () => {
    const { state } = useLocation();
    const price = state?.totalPrice || "0";

    const [selectedMethod, setSelectedMethod] = useState(null);
    const navigate = useNavigate();

    const handleConfirm = () => {
        if (!selectedMethod) {
            alert("Please select a payment method.");
            return;
        }
        // Simulate success and redirect or show confirmation
        alert(`Payment of ₹${price} via ${selectedMethod} successful!`);
        navigate("/"); // Redirect to homepage or success page
    };

    const paymentOptions = [
        { label: "UPI", icon: <FaRupeeSign /> },
        { label: "Credit / Debit Card", icon: <FaCreditCard /> },
        { label: "Cash on Arrival", icon: <FaMoneyBillWave /> },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-20 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4">Confirm Your Payment</h2>
            <div className="bg-neutral-800 p-6 rounded-xl shadow-xl w-full max-w-md space-y-4">
                <div className="text-xl flex justify-between">
                    <span>Total Price:</span>
                    <span className="font-bold text-green-400">₹{price}</span>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Select Payment Method</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {paymentOptions.map((method) => (
                            <button
                                key={method.label}
                                onClick={() => setSelectedMethod(method.label)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${selectedMethod === method.label
                                        ? "bg-purple-700 border-white text-white"
                                        : "bg-neutral-700 hover:bg-neutral-600 border-transparent"
                                    }`}
                            >
                                {method.icon}
                                <span>{method.label}</span>
                                {selectedMethod === method.label && (
                                    <FaCheckCircle className="text-green-300 ml-auto" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between gap-4 mt-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
                    >
                        Confirm Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
