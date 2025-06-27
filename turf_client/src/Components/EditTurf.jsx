import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";

const EditTurf = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const turfData = location.state;

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    console.log(user);
    console.log(turfData)
    const [formData, setFormData] = useState({
        name: turfData?.name || "",
        location: turfData?.location || "",
        address: turfData?.address || "",
        contactNumber: turfData?.contactNumber || "",
        price: turfData?.price || 0,
        slots: turfData?.slots || [],
    });

    useEffect(() => {
        if (!turfData) {
            toast.error("No turf data provided!");
            navigate("/ground");
        }
    }, [turfData, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSlotToggle = (slot) => {
        setFormData((prev) => {
            const newSlots = prev.slots.includes(slot)
                ? prev.slots.filter((s) => s !== slot)
                : [...prev.slots, slot];
            return { ...prev, slots: newSlots };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }

        try {
            const response = await API.put(`/ground/editTurf/${turfData._id}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                toast.success("Turf updated successfully");
                navigate("/turfParticular", { state: turfData._id });
                console.log(response)
            } else {
                toast.error("Failed to update turf");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error while updating turf");
        }
    };

    const slotOptions = ["Morning", "Afternoon", "Evening", "Night"];

    return (
        <div className="min-h-screen pt-24 px-4 pb-16 bg-gradient-to-br from-green-100 to-white">
            <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <div className="flex flex-row justify-between">
                    <h2 className="text-2xl font-bold text-green-700 mb-6">Edit Turf</h2>
                    <FaTimes onClick={() => navigate('/turfParticular', { state: turfData._id })}
                        className="cursor-pointer text-gray-600 hover:text-red-500"
                        title="Close" />
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Turf Name"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Location"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Contact Number"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Slots:</label>
                        <div className="flex flex-wrap gap-2">
                            {slotOptions.map((slot) => (
                                <label key={slot} className="flex items-center gap-1 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={formData.slots.includes(slot)}
                                        onChange={() => handleSlotToggle(slot)}
                                    />
                                    {slot}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition duration-200"
                    >
                        Update Turf
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditTurf;
