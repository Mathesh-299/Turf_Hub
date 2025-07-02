import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../api/api";
import AdminSidebar from "../Pages/Adminsidebar";

const Queries = () => {
    const [expandedId, setExpandedId] = useState(null);
    const [queries, setQueries] = useState([]);
    const token = localStorage.getItem("token");

    const fetchQueries = async () => {
        try {
            const response = await API.get("/contactUs/getQuery", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setQueries(response.data.queries);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch queries.");
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleDelete = async (id) => {
        try {
            const deleteResponse = await API.delete(`/contactUs/deleteQuery/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (deleteResponse.status === 200) {
                fetchQueries();
                toast.success("Deleted");
            }
            console.log(deleteResponse)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchQueries();
    }, []);

    return (
        <div className="flex pt-[5rem]">
            <AdminSidebar />
            <div className="flex-1 min-h-screen pt-24 px-4 pb-16 bg-gradient-to-br from-gray-100 to-green-50">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-green-800 mb-6">User Queries</h1>

                    {queries.length === 0 ? (
                        <p className="text-center text-gray-500">No queries found.</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {queries.map((query) => (
                                <div key={query._id} className="bg-white p-4 rounded-xl shadow">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-lg font-semibold text-green-700">{query.Name}</h2>
                                            <p className="text-sm text-gray-600">{query.Email}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => toggleExpand(query._id)}
                                                className="text-green-700 hover:text-green-900"
                                            >
                                                {expandedId === query._id ? <FaChevronUp /> : <FaChevronDown />}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(query._id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                    {expandedId === query._id && (
                                        <p className="mt-2 text-gray-700">{query.Message}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Queries;
