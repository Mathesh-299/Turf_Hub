import { Star } from "lucide-react";
import { useState } from "react";

const Review = ({ onSubmit }) => {
    const [form, setForm] = useState({ name: "", rating: 0, comment: "" });
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.rating || !form.comment.trim()) {
            setError("Please fill out all fields including rating.");
            return;
        }
        setError("");
        onSubmit(form);
        setForm({ name: "", rating: 0, comment: "" });
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-2xl border border-gray-100">
            <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Share Your Experience</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border rounded-lg text-sm text-green-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <div>
                    <p className="text-sm text-gray-600 mb-2">Rate this turf:</p>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((val) => (
                            <Star
                                key={val}
                                onClick={() => setForm({ ...form, rating: val })}
                                className={`w-6 h-6 cursor-pointer transition-transform hover:scale-110 ${form.rating >= val
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <textarea
                    rows={4}
                    placeholder="Write your review here..."
                    className="w-full border px-4 py-2 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                ></textarea>

                {error && (
                    <p className="text-red-500 text-sm font-medium text-center">{error}</p>
                )}

                <div className="flex justify-between items-center gap-3">
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Submit Review
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setForm({ name: "", rating: 0, comment: "" });
                            setError("");
                        }}
                        className="text-sm text-red-500 hover:underline"
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Review;
