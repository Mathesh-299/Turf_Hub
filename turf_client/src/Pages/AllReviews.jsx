import { useEffect, useState } from "react";
import {
    FaArrowLeft,
    FaSearch,
    FaSortAmountDown,
    FaSortAmountUp,
    FaStar
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";

const AllReviews = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const turfId = location.state;
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortAsc, setSortAsc] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await API.get(`/reviews/getReviews/${turfId}`);
                setReviews(response.data.ratings || []);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch reviews");
                setError("Something went wrong fetching reviews.");
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [turfId]);

    const handleSortToggle = () => {
        setSortAsc(prev => !prev);
        setReviews(prev =>
            [...prev].sort((a, b) => sortAsc ? a.Rating - b.Rating : b.Rating - a.Rating)
        );
    };

    const filteredReviews = reviews.filter(review =>
        review.Comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="pt-6">

            <div className="min-h-screen pt-20 px-4 pb-10 bg-gradient-to-br from-green-50 to-white overflow-y-auto">
                <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6 relative border border-gray-200">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-4 left-4 bg-green-100 hover:bg-green-200 text-green-800 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm text-sm"
                    >
                        <FaArrowLeft /> Back
                    </button>

                    <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">All Reviews</h1>

                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : error ? (
                        <p className="text-red-500 text-center">{error}</p>
                    ) : reviews.length > 0 ? (
                        <>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
                                <button
                                    onClick={handleSortToggle}
                                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full transition self-center sm:self-auto"
                                >
                                    {sortAsc ? <FaSortAmountUp /> : <FaSortAmountDown />}
                                    Sort by {sortAsc ? "Lowest" : "Highest"} Rating
                                </button>

                                <div className="flex items-center border-2 border-gray-300 focus-within:border-black focus-within:scale-105 rounded-full px-3 py-1 bg-white w-full sm:w-auto">
                                    <FaSearch className="text-gray-500 mr-2" />
                                    <input
                                        type="text"
                                        placeholder="Search reviews..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="outline-none w-full bg-transparent text-sm "
                                    />
                                </div>
                            </div>

                            {filteredReviews.length > 0 ? (
                                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                                    {filteredReviews.map((review, index) => (
                                        <div
                                            key={index}
                                            className="bg-white/70 backdrop-blur p-4 rounded-xl shadow border border-gray-200 transition hover:scale-[1.02]"
                                        >
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold text-green-800 flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar
                                                            key={i}
                                                            className={i < review.Rating ? "text-yellow-400" : "text-gray-300"}
                                                            size={14}
                                                        />
                                                    ))}
                                                    <span className="ml-1 text-sm text-gray-700">
                                                        ({review.Rating}/5)
                                                    </span>
                                                </p>
                                                <p className="text-sm text-gray-500">{review.Name}</p>
                                            </div>
                                            <p className="text-sm text-gray-700 mt-1">{review.Comment}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600 text-center mt-4">
                                    No reviews match your search.
                                </p>
                            )}
                        </>
                    ) : (
                        <p className="text-gray-600 text-center">No reviews available for this turf yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllReviews;
