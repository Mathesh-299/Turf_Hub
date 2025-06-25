import { useEffect, useState } from "react";
import {
    FaArrowLeft,
    FaCheckCircle,
    FaClock,
    FaFutbol,
    FaMapMarkerAlt,
    FaPhone,
    FaRupeeSign
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";

const Turf = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const turfId = location.state;
    const [turf, setTurf] = useState(null);

    useEffect(() => {
        const fetchTurfData = async (id) => {
            try {
                const response = await API.get(`/ground/getGroundId/${id}`);
                setTurf(response.data.turfValid);
            } catch (error) {
                console.error(error);
            }
        };
        if (turfId) fetchTurfData(turfId);
    }, [turfId]);

    if (!turf) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
                <p className="text-gray-600 text-lg animate-pulse">Loading turf details...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 px-4 pb-16 bg-gradient-to-br from-green-100 to-white">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden relative">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-sm"
                >
                    <FaArrowLeft /> Back
                </button>

                <img
                    src={`http://localhost:8000/${turf.image}`}
                    alt={turf.name}
                    className="w-full h-72 object-cover border-b"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.png";
                    }}
                />

                <div className="p-6 sm:p-8 space-y-6">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-green-700 mb-1">{turf.name}</h1>
                        <p className="text-gray-600 text-sm flex items-center gap-2 mb-2">
                            <FaMapMarkerAlt className="text-red-500" /> {turf.location}
                        </p>
                        <p className="text-2xl font-semibold text-green-800 flex items-center gap-2">
                            <FaRupeeSign /> {turf.price} / Hour
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">Description</h2>
                        <p className="text-sm text-gray-600">
                            This turf is perfect for football, cricket, and group sports events.
                            It offers a clean environment, night lighting, and ample parking space.
                            Book in advance to ensure availability during peak hours.
                        </p>
                    </div>

                    {/* Facilities */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Facilities</h2>
                        <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Washroom</li>
                            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Parking</li>
                            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Night Lights</li>
                            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> 5-a-side Turf</li>
                        </ul>
                    </div>

                    {/* Available Slots */}
                    <div>
                        <h2 className="text-sm text-gray-700 font-medium mb-2">Available Slots:</h2>
                        <div className="flex flex-wrap gap-3">
                            {turf.slots.map((slot, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-1 bg-green-200 text-green-900 text-sm rounded-full flex items-center gap-2 shadow-sm"
                                >
                                    <FaClock className="text-xs" />
                                    {slot}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info (optional) */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">Contact</h2>
                        <p className="flex items-center gap-2 text-sm text-gray-700">
                            <FaPhone className="text-green-600" />
                            +91 98765 43210
                        </p>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2 text-sm mt-2 text-green-700">
                        <FaFutbol />
                        Status: <span className="font-medium">Open for Booking</span>
                    </div>

                    <button
                        onClick={() => navigate("/booking", { state: turf._id })}
                        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg text-lg shadow-md transition"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Turf;
