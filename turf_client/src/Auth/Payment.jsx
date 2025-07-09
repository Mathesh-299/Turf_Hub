import { useEffect, useState } from "react";
import {
    FaCheckCircle,
    FaCreditCard,
    FaGoogle,
    FaMoneyBillWave,
    FaMoneyCheckAlt,
    FaPhone,
    FaRupeeSign
} from "react-icons/fa";
import { LuWallet } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import API from "../api/api";

const Payment = () => {
    const { state } = useLocation();
    const { bookingData, turf } = state || {};
    const price = bookingData?.totalPrice || "0";
    const [data, setData] = useState({})
    const [turfValue, setTurfValue] = useState({});
    const [ids, setIds] = useState({
        turfId: "",
        userId: ""
    })
    // console.log(price)
    useEffect(() => {
        if (bookingData) setData(bookingData);
        if (turf) {
            setTurfValue(turf);
            setIds(prev => ({ ...prev, turfId: turf._id }));
        }
        const userValue = JSON.parse(localStorage.getItem("user"));
        if (userValue) {
            setIds(prev => ({ ...prev, userId: userValue.id }))
        }
    }, [bookingData, turf])


    const [selectedMethod, setSelectedMethod] = useState(null);
    const [selectedUPI, setSelectedUPI] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    // console.log(userValue.id);
    const handleConfirm = async () => {
        if (!selectedMethod) {
            toast.error("Please select a payment method.");
            return;
        }
        if (selectedMethod === "UPI" && !selectedUPI) {
            toast.error("Please select a UPI option.");
            return;
        }
        if (!ids.turfId || !ids.userId) {
            toast.error("Booking data incomplete. Please try again.");
            return;
        }
        const paymentLoad = {
            ...data,
            Amount: price,
            paymentMethod: selectedMethod,
            paymentOption: selectedUPI,
            status: "Booked"
        };
        console.log(paymentLoad)
        try {
            const response = await API.post(`/booking/bookTurf/${ids.turfId}/${ids.userId}`, paymentLoad, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(response)
            if (response.status === 200 || response.status === 201) {
                toast.success("Successfully Booked");
            }
            setTimeout(() => {
                navigate(-1);
            }, 2000);
        } catch (error) {
            toast.error("Booking Failed");
            setTimeout(() => {
                navigate("/booking");
            }, 2000)
            console.log(error);
        }
    };

    const paymentOptions = [
        { label: "UPI", icon: <FaRupeeSign /> },
        { label: "Credit / Debit Card", icon: <FaCreditCard /> },
        { label: "Cash on Arrival", icon: <FaMoneyBillWave /> },
    ];

    const upiOptions = [
        { label: "GPay", icon: <FaGoogle /> },
        { label: "PhonePe", icon: <FaPhone /> },
        { label: "Paytm", icon: <FaMoneyCheckAlt /> },
        { label: "Super Money", icon: <LuWallet /> }
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
                                onClick={() => {
                                    setSelectedMethod(method.label);
                                    if (method.label !== "UPI") {
                                        setSelectedUPI(null);
                                    }
                                }}
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

                {selectedMethod === "UPI" && (
                    <div>
                        <h3 className="font-semibold mt-4 mb-2">Select UPI Option</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                            {upiOptions.map((upi) => (
                                <button
                                    key={upi.label}
                                    onClick={() => setSelectedUPI(upi.label)}
                                    className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg border transition ${selectedUPI === upi.label
                                        ? "bg-blue-700 border-white text-white"
                                        : "bg-neutral-700 hover:bg-neutral-600 border-transparent"
                                        }`}
                                >
                                    {upi.icon}
                                    <span className="text-sm">{upi.label}</span>
                                    {selectedUPI === upi.label && (
                                        <FaCheckCircle className="text-green-300" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

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
// what is error