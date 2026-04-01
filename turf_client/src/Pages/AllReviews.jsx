import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, Search, Star, SortAsc, SortDesc, MessageSquareQuote } from "lucide-react";
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
        if (!turfId) {
            toast.error("Turf not found");
            navigate("/ground");
            return;
        }

        const fetchReviews = async () => {
            try {
                const response = await API.get(`/reviews/getReviews/${turfId}`);
                // Sort by highest rating default
                const fetchedReviews = response.data.ratings || [];
                setReviews(fetchedReviews.sort((a, b) => b.Rating - a.Rating));
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch reviews");
                setError("Something went wrong fetching reviews.");
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [turfId, navigate]);

    const handleSortToggle = () => {
        setSortAsc((prev) => !prev);
        setReviews((prev) =>
            [...prev].sort((a, b) => (!sortAsc ? a.Rating - b.Rating : b.Rating - a.Rating))
        );
    };

    const filteredReviews = reviews.filter((review) =>
        review.Comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const averageRating = reviews.length > 0 
        ? (reviews.reduce((acc, rev) => acc + rev.Rating, 0) / reviews.length).toFixed(1)
        : 0;

    if (!turfId) return null;

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors shrink-0"
                            title="Go Back"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                                <MessageSquareQuote className="w-6 h-6 text-blue-600" />
                                Customer Reviews
                            </h1>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center text-yellow-500">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="font-bold text-slate-800 ml-1">{averageRating}</span>
                                </div>
                                <span className="text-sm text-slate-500 font-medium">
                                    • {reviews.length} total review{reviews.length !== 1 && 's'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                        <div className="relative group flex-1 sm:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search reviews..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all outline-none text-sm font-medium"
                            />
                        </div>
                        <button
                            onClick={handleSortToggle}
                            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl transition-all text-sm font-semibold shadow-sm shrink-0"
                        >
                            {sortAsc ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                            {sortAsc ? "Lowest first" : "Highest first"}
                        </button>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        <p className="mt-4 text-slate-500 font-medium">Loading reviews...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-center font-medium border border-red-100">
                        {error}
                    </div>
                ) : reviews.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm"
                    >
                        <MessageSquareQuote className="w-12 h-12 text-slate-300 mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No Reviews Yet</h3>
                        <p className="text-slate-500">Be the first to share your experience!</p>
                    </motion.div>
                ) : filteredReviews.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-lg font-medium text-slate-600">No reviews match your search "{searchQuery}"</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatePresence>
                            {filteredReviews.map((review, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.05, duration: 0.3 }}
                                    key={review._id || index}
                                    className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group flex flex-col h-full"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                                                {review.Name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">{review.Name}</h3>
                                                <div className="flex items-center gap-0.5 mt-0.5">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`w-3.5 h-3.5 ${
                                                                star <= review.Rating
                                                                    ? "fill-yellow-400 text-yellow-400"
                                                                    : "fill-slate-100 text-slate-200"
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 group-hover:bg-blue-50/30 group-hover:border-blue-100 transition-colors">
                                        <p className="text-slate-700 leading-relaxed text-sm">
                                            "{review.Comment}"
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllReviews;
