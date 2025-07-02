import { useEffect, useState } from "react";
import {
    FaClock,
    FaEdit,
    FaMapMarkerAlt,
    FaPlus,
    FaRupeeSign,
    FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";
import AdminSidebar from "./Adminsidebar";

const districts = [
    "Chennai", "Coimbatore", "Cuddalore", "Dindigul", "Erode", "Kanchipuram",
    "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Ramanathapuram",
    "Salem", "Sivagangai", "Thanjavur", "Theni", "Thoothukudi",
    "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Vellore", "Virudhunagar"
];

const Ground = () => {
    const navigate = useNavigate();
    const [turfs, setTurfs] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("All");
    const [showForm, setShowForm] = useState(false);
    const [edit, setEdit] = useState(false);
    const [turfId, setTurfId] = useState(null);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        price: "",
        slots: [],
        image: null,
    });

    const fetchData = async () => {
        try {
            const response = await API.get("/ground/getGround");
            setTurfs(response.data.turfs);
        } catch (error) {
            toast.error("Failed to fetch turfs");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredTurfs = selectedDistrict === "All"
        ? turfs
        : turfs.filter(turf => turf.location === selectedDistrict);

    const openForm = (turf = null) => {
        if (turf) {
            setEdit(true);
            setFormData({ ...turf, image: null });
            setTurfId(turf._id);
        } else {
            setEdit(false);
            setFormData({ name: "", location: "", price: "", slots: [], image: null });
            setTurfId(null);
        }
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setFormData({ name: "", location: "", price: "", slots: [], image: null });
    };

    const createFormData = () => {
        const form = new FormData();
        form.append("name", formData.name);
        form.append("location", formData.location);
        form.append("price", formData.price);
        formData.slots.forEach(slot => form.append("slots", slot));
        if (formData.image) {
            form.append("image", formData.image);
        }
        return form;
    };

    const addNewTurf = async (id) => {
        try {
            const form = createFormData();
            await API.post(`/ground/addGround/${id}`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchData();
            toast.success("Turf added successfully");
            closeForm();
        } catch (error) {
            toast.error("Failed to add turf");
        }
    };

    const updateTurf = async () => {
        try {
            const form = createFormData();
            await API.put(`/ground/updateGround/${turfId}`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchData();
            toast.success("Turf updated successfully");
            closeForm();
        } catch (error) {
            toast.error("Failed to update turf");
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (edit) {
            await updateTurf();
        } else {
            await addNewTurf(user.id);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this turf?")) {
            try {
                await API.delete(`/ground/deleteGround/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                fetchData();
                toast.success("Turf deleted successfully");
            } catch (error) {
                toast.error("Failed to delete turf");
            }
        }
    };

    const handleBookNow = (id) => {
        // console.log(localStorage.getItem("isLoggedIn"))
        if (localStorage.getItem("isLoggedIn") === "false") {
            toast.warn("Please login to book a turf.");
            navigate("/login");
        } else {
            navigate("/turfParticular", { state: id });
        }
    };

    return (
        <div className="flex pt-20">
            {user.role === "admin" && <AdminSidebar />}
            <div className="flex-1 min-h-screen pt-24 px-4 pb-10 bg-gradient-to-r from-gray-100 to-green-50">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-6">
                        Available Turf Grounds
                    </h1>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
                        <select
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            className="w-full sm:w-1/3 px-4 py-2 border rounded shadow text-sm"
                        >
                            <option value="All">All Districts</option>
                            {districts.map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>

                        {(user.role === "admin" || user.role === "owner") && (
                            <button
                                onClick={() => openForm()}
                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
                            >
                                <FaPlus /> Add Turf
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTurfs.length > 0 ? (
                            filteredTurfs.map((turf) => (
                                <div
                                    key={turf._id}
                                    className="bg-white rounded-xl shadow hover:shadow-lg transition-transform duration-200 hover:scale-[1.02]"
                                >
                                    <img
                                        src={`http://localhost:8000/${turf.image}`}
                                        alt={turf.name}
                                        className="w-full h-48 object-cover object-center rounded-t-xl"
                                        onError={(e) => {
                                            e.target.src = "/placeholder.png";
                                        }}
                                    />
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold text-green-700">
                                            {turf.name}
                                        </h2>
                                        <p className="flex items-center text-sm text-gray-600 mt-1">
                                            <FaMapMarkerAlt className="mr-1" /> {turf.location}
                                        </p>
                                        <p className="flex items-center text-sm text-gray-700 mt-1">
                                            <FaRupeeSign className="mr-1" /> {turf.price} / Hour
                                        </p>
                                        <div className="mt-2">
                                            <p className="text-xs text-gray-500 font-medium">Available Slots:</p>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {turf.slots.map((slot, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1"
                                                    >
                                                        <FaClock className="text-[10px]" /> {slot}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleBookNow(turf._id)}
                                            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm"
                                        >
                                            Book Now
                                        </button>

                                        {(user.role === "admin" || user.role === "owner") &&
                                            (turf.ownerId === user.id || user.role === "admin") && (
                                                <div className="flex justify-end gap-2 mt-3">
                                                    <button
                                                        onClick={() => openForm(turf)}
                                                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                                    >
                                                        <FaEdit /> Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(turf._id)}
                                                        className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                                                    >
                                                        <FaTrash /> Delete
                                                    </button>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center col-span-full text-gray-500">
                                No turfs available for this district.
                            </p>
                        )}
                    </div>

                    {showForm && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                                <button
                                    onClick={closeForm}
                                    className="absolute top-2 right-3 text-red-600 text-xl"
                                >
                                    &times;
                                </button>
                                <h2 className="text-xl font-semibold mb-4 text-green-700">
                                    {edit ? "Edit Turf" : "Add Turf"}
                                </h2>
                                <form onSubmit={handleFormSubmit} className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Turf Name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        className="w-full border rounded px-3 py-2 text-sm"
                                        required
                                    />
                                    <select
                                        value={formData.location}
                                        onChange={(e) =>
                                            setFormData({ ...formData, location: e.target.value })
                                        }
                                        className="w-full border rounded px-3 py-2 text-sm"
                                        required
                                    >
                                        <option value="">Select District</option>
                                        {districts.map((d) => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        placeholder="Price per Hour"
                                        value={formData.price}
                                        onChange={(e) =>
                                            setFormData({ ...formData, price: e.target.value })
                                        }
                                        className="w-full border rounded px-3 py-2 text-sm"
                                        required
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setFormData({ ...formData, image: e.target.files[0] })
                                        }
                                        className="w-full border rounded px-3 py-2 text-sm"
                                    />
                                    <div className="flex flex-wrap gap-2">
                                        {["Morning", "Afternoon", "Evening", "Night"].map((slot) => (
                                            <label
                                                key={slot}
                                                className="flex items-center gap-1 text-xs"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={formData.slots.includes(slot)}
                                                    onChange={() =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            slots: prev.slots.includes(slot)
                                                                ? prev.slots.filter((s) => s !== slot)
                                                                : [...prev.slots, slot],
                                                        }))
                                                    }
                                                />
                                                {slot}
                                            </label>
                                        ))}
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm"
                                    >
                                        {edit ? "Update Turf" : "Add Turf"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Ground;
