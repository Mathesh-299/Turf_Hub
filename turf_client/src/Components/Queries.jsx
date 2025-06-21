import { Mail, MessageCircle, Trash2 } from "lucide-react";
import { useState } from "react";

const initialQueries = [
    {
        id: 1,
        name: "Mathesh M",
        email: "mathesh@example.com",
        message:
            "What are the available slots for Madurai turf? I’d like to book between 4PM to 6PM if possible. Also, is there lighting available during night slots?",
        date: "2025-06-21",
    },
    {
        id: 2,
        name: "John Doe",
        email: "john@example.com",
        message: "Is there parking available at the Chennai turf?",
        date: "2025-06-20",
    },
    {
        id: 3,
        name: "Priya S",
        email: "priya@example.com",
        message:
            "Can I book for a whole day? I want to conduct a sports tournament and need full day access.",
        date: "2025-06-18",
    },
];

const Queries = () => {
    const [queries, setQueries] = useState(initialQueries);
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this query?")) {
            setQueries((prev) => prev.filter((query) => query.id !== id));
        }
    };

    return (
        <div className="min-h-screen px-4 pt-24 pb-12 bg-gradient-to-br from-sky-100 via-emerald-50 to-yellow-100">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">User Queries</h2>
            <div className="max-w-6xl mx-auto grid gap-6">
                {queries.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">No queries available.</p>
                ) : (
                    queries.map((query) => {
                        const isExpanded = expandedId === query.id;
                        const messagePreview =
                            query.message.length > 100 ? `${query.message.slice(0, 100)}...` : query.message;

                        return (
                            <div
                                key={query.id}
                                className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 relative"
                            >
                                <button
                                    onClick={() => handleDelete(query.id)}
                                    className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                                    title="Delete query"
                                >
                                    <Trash2 size={20} />
                                </button>

                                <div className="flex flex-col sm:flex-row justify-between gap-4">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                                            {query.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">{query.name}</h3>
                                            <p className="text-sm text-gray-600 flex items-center gap-1">
                                                <Mail size={14} className="text-green-500" />
                                                {query.email}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500">{new Date(query.date).toLocaleDateString()}</p>
                                </div>

                                <div className="mt-4 text-gray-700 text-sm leading-relaxed">
                                    <MessageCircle className="inline-block mr-1 mb-1 text-yellow-600" size={16} />
                                    {isExpanded ? query.message : messagePreview}
                                    {query.message.length > 100 && (
                                        <button
                                            onClick={() => toggleExpand(query.id)}
                                            className="ml-2 text-blue-600 hover:underline text-xs"
                                        >
                                            {isExpanded ? "Show Less" : "Read More"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Queries;
