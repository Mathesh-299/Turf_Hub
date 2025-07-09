import { ArrowLeft, Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import API from "../api/api";

const Review = () => {
    const [form, setForm] = useState({ Name: "", Rating: 0, Comment: "" });
    const [hoverRating, setHoverRating] = useState(0);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [ids, setIds] = useState({ userId: "", turfId: "" });

    const navigate = useNavigate();
    const location = useLocation();
    const turf = location.state;
    const token = localStorage.getItem("token");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setIds((prev) => ({ ...prev, userId: user.id }));
        } else {
            toast.error("Please login to post a review.");
            navigate("/login");
        }

        if (turf) {
            setIds((prev) => ({ ...prev, turfId: turf }));
        }
    }, [turf, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { Name, Rating, Comment } = form;

        if (!Name || !Rating || !Comment) {
            setError("Please fill out all fields and provide a rating.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await API.post(
                `/reviews/postReview/${ids.turfId}/${ids.userId}`,
                form,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(response.data);
            toast.success("Review submitted successfully!");
            setForm({ Name: "", Rating: 0, Comment: "" });
            navigate(-1);
        } catch (err) {
            console.log(err);
            toast.error("Failed to submit review. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen overflow-y-auto">
            <div className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
                    Share Your Experience
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-4 py-3 border rounded-lg text-base text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                        value={form.Name}
                        onChange={(e) => setForm({ ...form, Name: e.target.value })}
                    />

                    <div>
                        <p className="text-sm text-gray-600 mb-2">Rate this turf:</p>
                        <div className="flex gap-2 items-center">
                            {[1, 2, 3, 4, 5].map((val) => (
                                <Star
                                    key={val}
                                    onMouseEnter={() => setHoverRating(val)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setForm({ ...form, Rating: val })}
                                    className={`w-8 h-8 cursor-pointer transition-transform hover:scale-125 ${(hoverRating || form.Rating) >= val
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-400"
                                        }`}
                                />
                            ))}
                            {form.Rating > 0 && (
                                <span className="ml-3 text-sm text-gray-700">
                                    {form.Rating} Star{form.Rating > 1 && "s"}
                                </span>
                            )}
                        </div>
                    </div>

                    <textarea
                        rows={4}
                        placeholder="Write your review..."
                        className="w-full border px-4 py-3 rounded-lg text-base text-black focus:outline-none focus:ring-2 focus:ring-purple-600"
                        value={form.Comment}
                        onChange={(e) => setForm({ ...form, Comment: e.target.value })}
                    ></textarea>

                    {error && (
                        <p className="text-red-500 text-sm font-medium text-center">
                            {error}
                        </p>
                    )}

                    <div className="flex flex-col items-center gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-fit px-5 py-2 rounded-lg font-bold transition 
                            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-800 text-white"}`}
                        >
                            {loading ? "Submitting..." : "Submit Review"}
                        </button>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setForm({ Name: "", Rating: 0, Comment: "" });
                                    setError("");
                                }}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-red-300 text-red-600 font-semibold bg-red-50 hover:bg-red-100 hover:shadow transition duration-200 active:scale-95"
                            >
                                <Trash2 size={18} className="text-red-500" />
                                Clear
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-blue-300 text-blue-600 font-semibold bg-blue-50 hover:bg-blue-100 hover:shadow transition duration-200 active:scale-95"
                            >
                                <ArrowLeft size={18} className="text-blue-500" />
                                Go Back
                            </button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Review;
