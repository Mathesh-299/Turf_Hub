import { useEffect, useState } from "react";
import {
    FaArrowLeft,
    FaCheckCircle,
    FaClock,
    FaEdit,
    FaFutbol,
    FaMapMarkerAlt,
    FaRupeeSign,
    FaStar
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";
import TurfContactCard from "../Pages/TurfCard";

const Turf = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const turfId = location.state;
    const [turf, setTurf] = useState(null);
    const [ownerName, setOwnerName] = useState('');
    const user = JSON.parse(localStorage.getItem("user"));
    const [reviews, setReviews] = useState({
        totalReviews: "",
        averageRating: ""
    });
    useEffect(() => {
        const fetchTurfData = async (id) => {
            try {
                const response = await API.get(`/ground/getGroundId/${id}`);
                setTurf(response.data.turfValid);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch turf details");
            }
        };
        if (turfId) fetchTurfData(turfId);
    }, [turfId]);

    useEffect(() => {
        const fetchOwnerDetails = async () => {
            if (turf?.ownerId) {
                try {
                    const response = await API.get(`/ground/getOwnerId/${turf.ownerId}`);
                    setOwnerName(response.data.name);
                } catch (error) {
                    toast.error("Something went wrong fetching owner info");
                }
            }
        };
        fetchOwnerDetails();
    }, [turf?.ownerId]);
    const fetchOverAllRating = async () => {
        try {
            const response = await API.get(`/reviews/overAllReviews/${turfId}`);

            setReviews(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        // fetchRatings();
        fetchOverAllRating();
    }, []);
    console.log(reviews.totalReviews);
    console.log(reviews.averageRating);
    if (!turf) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
                <p className="text-gray-600 text-lg animate-pulse">Loading turf details...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 px-4 pb-16 bg-gray-200">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden relative">

                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 bg-green-100 hover:bg-white/50 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-sm"
                >
                    <FaArrowLeft /> Back
                </button>

                <img
                    src={turf.image ? `https://turf-hub.onrender.com/${turf.image}` : "/placeholder.png"}
                    alt={turf.name || "Turf Image"}
                    className="w-full h-72 object-cover border-b"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.png";
                    }}
                />
                <div className="p-6 sm:p-8 space-y-6">

                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-green-700 mb-1">{turf.name || "Turf Name"}</h1>
                            <p className="text-gray-600 text-sm flex items-center gap-2">
                                <FaMapMarkerAlt className="text-red-500" />
                                {turf.location || "Location not provided"}
                            </p>
                        </div>
                        {user?.role === "owner" && user?.id === turf?.ownerId && (
                            <button
                                onClick={() => navigate("/edit-turf", { state: turf })}
                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md flex items-center gap-1 shadow"
                            >
                                <FaEdit /> Edit
                            </button>
                        )}
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg shadow-sm w-fit">
                        <p className="text-xl font-semibold text-green-900 space-y-1">
                            <span className="flex items-center gap-2">
                                Weekdays: <FaRupeeSign /> {turf.price || 500} / Hour
                            </span>
                            <span className="flex items-center gap-2">
                                Weekends: <FaRupeeSign /> {(turf.price || 500) + 200} / Hour
                            </span>
                        </p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">Description</h2>
                        <p className="text-sm text-gray-600">
                            {turf.description || "This turf is perfect for football, cricket, and group sports events. It offers a clean environment, night lighting, and ample parking space. Book in advance to ensure availability during peak hours."}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Facilities</h2>
                        <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Washroom</li>
                            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Parking</li>
                            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Night Lights</li>
                            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> 5-a-side Turf</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-sm text-gray-700 font-medium mb-2">Available Slots:</h2>
                        <div className="flex flex-wrap gap-3">
                            {Array.isArray(turf.slots) && turf.slots.length > 0 ? (
                                turf.slots.map((slot, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-1 bg-green-200 text-green-900 text-sm rounded-full flex items-center gap-2 shadow-sm"
                                    >
                                        <FaClock className="text-xs" />
                                        {slot}
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm text-gray-500">No slots available</span>
                            )}
                        </div>
                    </div>

                    <TurfContactCard turf={turf} ownerName={ownerName} />

                    <div className="flex items-center gap-2 text-md text-green-700">
                        <FaFutbol />
                        Status: <span className="font-medium">Open for Booking</span>
                    </div>

                    <Link
                        to="/review"
                        state={turf._id}
                        className="flex items-center gap-1 text-md text-green-700 hover:text-green-800 transition font-bold"
                    >
                        {/* <button onClick={() => console.log(turf._id)}></button> */}
                        <FaStar />
                        <span>Add your experience</span>
                    </Link>

                    {reviews.totalReviews > 0 && (
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold text-green-700 mb-2">Overall Rating</h2>
                            <div className="bg-gray-50 p-4 rounded-xl shadow flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-2 text-green-700 text-xl font-semibold">
                                    <FaStar className="text-yellow-400" />
                                    {reviews.averageRating} / 5
                                </div>
                                <button
                                    onClick={() => navigate("/all-reviews", { state: turfId })}
                                    className="text-sm text-green-700 hover:text-green-800"
                                >
                                    Based on {reviews.totalReviews} {reviews.totalReviews === 1 ? "review" : "reviews"}
                                </button>

                            </div>
                        </div>
                    )}
                    <Link to="/booking" state={ turf }>
                        <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg text-lg shadow-md transition">
                            Book Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Turf;
