import { useState } from "react";
import { FaCalendarAlt, FaClock, FaMoneyBillWave } from "react-icons/fa";

const slotOptions = ["Morning", "Afternoon", "Evening", "Night"];
const slotPrices = {
    Morning: 500,
    Afternoon: 700,
    Evening: 1000,
    Night: 800,
};

const Booking = () => {
    const [formData, setFormData] = useState({
        date: "",
        slot: "",
        paymentMode: "Cash",
    });

    const getDayOfWeek = (dateStr) => new Date(dateStr).getDay();

    const calculateTotalAmount = () => {
        const basePrice = formData.slot ? slotPrices[formData.slot] : 0;
        const day = getDayOfWeek(formData.date);
        return day === 0 || day === 6 ? basePrice + 200 : basePrice;
    };

    const totalAmount = calculateTotalAmount();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Booking Details:", { ...formData, totalAmount });
        alert("Booking confirmed!");
    };

    const handleCancel = () => {
        setFormData({ date: "", slot: "", paymentMode: "Cash" });
        alert("Booking cancelled.");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-20 px-6">
            <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Book Your Turf</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Date */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Date</label>
                        <div className="flex items-center border rounded px-3 py-2">
                            <FaCalendarAlt className="mr-2 text-gray-500" />
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full outline-none"
                            />
                        </div>
                    </div>

                    {/* Slot */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Slot</label>
                        <div className="flex items-center border rounded px-3 py-2">
                            <FaClock className="mr-2 text-gray-500" />
                            <select
                                name="slot"
                                value={formData.slot}
                                onChange={handleChange}
                                required
                                className="w-full outline-none bg-transparent"
                            >
                                <option value="">Select a slot</option>
                                {slotOptions.map((slot) => (
                                    <option key={slot} value={slot}>
                                        {slot}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Total Amount */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Total Amount</label>
                        <div className="flex items-center border rounded px-3 py-2 bg-gray-100">
                            <FaMoneyBillWave className="mr-2 text-green-600" />
                            <span className="text-green-800 font-bold">₹ {totalAmount}</span>
                        </div>
                        {formData.date && (getDayOfWeek(formData.date) === 0 || getDayOfWeek(formData.date) === 6) && (
                            <p className="text-sm text-red-600 mt-1">Note: ₹200 extra for weekend bookings</p>
                        )}
                    </div>

                    {/* Payment Mode */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Payment Mode</label>
                        <select
                            name="paymentMode"
                            value={formData.paymentMode}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="Cash">Cash</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between gap-4">
                        <button
                            type="submit"
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
                        >
                            Confirm Booking
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold"
                        >
                            Clear Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Booking;
