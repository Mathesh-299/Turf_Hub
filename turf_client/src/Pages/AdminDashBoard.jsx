import { useEffect, useState } from "react";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";
import AdminSidebar from './Adminsidebar';

const AdminDashboard = () => {
    const [turfs, setTurfs] = useState([]);
    const [filteredTurfs, setFilteredTurfs] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [users, setUsers] = useState([]);
    // const [query, setQuery] = useState([]);/

    const fetchTurfs = async () => {
        try {
            const response = await API.get("/ground/getGround", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTurfs(response.data.turfs);
            setFilteredTurfs(response.data.turfs);
        } catch {
            toast.error("Failed to fetch turfs");
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await API.get("/users/getUserCount", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data.users);
        } catch (error) {
            console.log(error);
        }
    };

    

    const handleEdit = (turf) => {
        navigate("/editTurf", { state: turf });
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/ground/deleteGround/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Turf deleted");
            fetchTurfs();
        } catch {
            toast.error("Delete failed");
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
        const filtered = turfs.filter(turf =>
            turf.name.toLowerCase().includes(value) ||
            turf.location.toLowerCase().includes(value)
        );
        setFilteredTurfs(filtered);
    };

    const CountofOwner = () => users.filter(user => user.role === 'owner').length;
    const usersCount = () => users.filter(user => user.role === 'user').length;
    const totalEarnings = turfs.reduce((acc, turf) => acc + turf.price, 0);

    useEffect(() => {
        fetchTurfs();
        fetchUsers();
        // fetchQuerys();
    }, []);

    return (
        <div className="flex pt-20">
            <AdminSidebar />

            <div className="flex-1 min-h-screen pt-10 px-4 pb-16 bg-gradient-to-br from-gray-100 to-green-50">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                        <h1 className="text-3xl font-bold text-green-800">Admin Dashboard</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl shadow">
                            <h2 className="text-sm text-gray-600">Total Turfs</h2>
                            <p className="text-2xl font-semibold text-green-700">{turfs.length}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow">
                            <h2 className="text-sm text-gray-600">Total Pricing (₹)</h2>
                            <p className="text-2xl font-semibold text-green-700">{totalEarnings}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow">
                            <h2 className="text-sm text-gray-600">Owner Count</h2>
                            <p className="text-2xl font-semibold text-green-700">{CountofOwner()}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow">
                            <h2 className="text-sm text-gray-600">User Count</h2>
                            <p className="text-2xl font-semibold text-green-700">{usersCount()}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <FaSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by name or location"
                            value={search}
                            onChange={handleSearch}
                            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    {filteredTurfs.length === 0 ? (
                        <p className="text-center text-gray-500">No turfs found.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTurfs.map((turf) => (
                                <div key={turf._id} className="bg-white p-4 rounded-xl shadow-md">
                                    <img
                                        src={turf.image ? `https://turf-hub.onrender.com/${turf.image}` : "/placeholder.png"}
                                        alt={turf.name}
                                        className="w-full h-72 object-cover border-b"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/placeholder.png";
                                        }}
                                    />
                                    <h2 className="text-lg font-semibold text-green-800 mt-2">{turf.name}</h2>
                                    <p className="text-sm text-gray-600">📍 {turf.location}</p>
                                    <p className="text-sm text-gray-600">🏷 ₹{turf.price}</p>
                                    <p className="text-sm text-gray-600">🕒 Slots: {turf.slots.join(", ")}</p>
                                    <div className="flex justify-end gap-3 mt-4 text-sm text-green-700">
                                        <button onClick={() => handleEdit(turf)} className="hover:text-blue-600 flex items-center gap-1">
                                            <FaEdit /> Edit
                                        </button>
                                        <button onClick={() => handleDelete(turf._id)} className="hover:text-red-600 flex items-center gap-1">
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
