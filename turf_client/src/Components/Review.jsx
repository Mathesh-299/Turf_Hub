import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import API from "../api/api";

const Review = () => {
    const [form, setForm] = useState({ Name: "", Rating: 0, Comment: "" });
    const [error, setError] = useState("");
    const [ids, setIds] = useState({
        userId: "",
        turfId: ""
    });
    const navigate = useNavigate();
    const location = useLocation();
    const turf = location.state;
    const token = localStorage.getItem("token");
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setIds((prev) => ({ ...prev, userId: user.id }));
        }
        if (turf) {
            setIds((prev) => ({ ...prev, turfId: turf }));
        }
    }, [turf]);
    const handleSubmit = async (e) => {
        const { Name, Rating, Comment } = form;
        e.preventDefault();
        if (!Name || !Rating || !Comment) {
            setError("Please fill out all fields including Rating.");
            return;
        }
        console.log(ids.turfId + " " + ids.userId)
        try {
            const response = await API.post(`/reviews/postReview/${ids.turfId}/${ids.userId}`, form, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(response);
            setError("");
            // onSubmit(form);
            setForm({ Name: "", Rating: 0, Comment: "" });
            navigate(-1);
        } catch (e) {
            console.log(e);
            toast.error("Something went wrong")
        }
    };

    return (
        <div className="pt-36 bg-black/50 overflow-y-auto h-screen">
            <div className="max-w-lg mx-auto p-6 bg-white/50 rounded-xl shadow-2xl border border-gray-100">
                <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Share Your Experience</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-4 py-2 border rounded-lg text-sm text-green-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                        value={form.Name}
                        onChange={(e) => setForm({ ...form, Name: e.target.value })}
                    />

                    <div>
                        <p className="text-sm text-gray-600 mb-2">Rate this turf:</p>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((val) => (
                                <Star
                                    key={val}
                                    onClick={() => setForm({ ...form, Rating: val })}
                                    className={`w-6 h-6 cursor-pointer transition-transform hover:scale-110 ${form.Rating >= val
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-white"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    <textarea
                        rows={4}
                        placeholder="Write your review here..."
                        className="w-full border px-4 py-2 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        value={form.Comment}
                        onChange={(e) => setForm({ ...form, Comment: e.target.value })}
                    ></textarea>

                    {error && (
                        <p className="text-red-500 text-sm font-medium text-center">{error}</p>
                    )}

                    <div className="flex flex-col items-center gap-3">
                        <button
                            type="submit"
                            className="w-fit px-2 bg-white hover:bg-blue-700 text-blue-500 hover:text-white font-bold py-2 rounded-lg transition"
                        >
                            Submit Review
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setForm({ Name: "", Rating: 0, Comment: "" });
                                setError("");
                            }}
                            className="text-lg text-red-500 hover:underline font-bold"
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Review;
