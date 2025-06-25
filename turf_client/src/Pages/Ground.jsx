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

const districts = [
    "Chennai", "Coimbatore", "Cuddalore", "Dindigul", "Erode",
    "Kanchipuram", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal",
    "Ramanathapuram", "Salem", "Sivagangai", "Thanjavur", "Theni", "Thoothukudi",
    "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Vellore", "Virudhunagar"
];

const Ground = () => {
    const navigate = useNavigate();
    const [turfs, setTurfs] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("All");
    const [showForm, setShowForm] = useState(false);
    const [edit, setEdit] = useState(false);
    const [turfId, setTurfid] = useState(null);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        price: "",
        slots: [],
        image: null,
    });
    let toaster = false;
    const fetchData = async () => {
        try {
            const response = await API.get("/ground/getGround");
            setTurfs(response.data.turfs);
            if (!toaster) {
                toast.success("Fetched successfully");
                toaster = true;
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredTurfs =
        selectedDistrict === "All"
            ? turfs
            : turfs.filter((turf) => turf.location === selectedDistrict);

    const openForm = (turf = null) => {
        if (turf) {
            setEdit(true);
            setFormData({ ...turf, image: null });
            setTurfid(turf._id);
        } else {
            setTurfid(null);
            setFormData({ name: "", location: "", price: "", slots: [], image: null });
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
        formData.slots.forEach((slot) => form.append("slots", slot));
        if (formData.image) form.append("image", formData.image);
        return form;
    };

    const addNewTurf = async (id) => {
        try {
            const form = createFormData();
            await API.post(`/ground/addGround/${id}`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchData();
        } catch (error) {
            console.log(error);
        }
        closeForm();
    };

    const updateTurf = async (turfId) => {
        try {
            const form = createFormData();
            await API.put(`/ground/updateGround/${turfId}`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchData();
        } catch (error) {
            console.log(error);
        }
        closeForm();
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        edit ? await updateTurf(turfId) : await addNewTurf(user.id);
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/ground/deleteGround/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchData();
        } catch (error) {
            console.log(error);
        }
    };
    const isLoggedIn = localStorage.getItem("isLoggedIn")==="true";
    const handleBookNow = (id) => {
        if (!isLoggedIn) {
            toast.warn("Login first");
            navigate("/login");
            return;
        }
        console.log(id)
        navigate("/turfParticular", { state: id });
    };

    return (
        <div className="min-h-screen pt-24 px-4 pb-10 bg-gradient-to-b from-cyan-200 to-white/40">
            <h1 className="text-3xl font-bold text-center text-red-500 mb-4">
                Available Turf Grounds
            </h1>

            <div className="flex justify-between items-center max-w-6xl mx-auto mb-4">
                <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-1/2 px-4 py-2 border border-blue-300 rounded-lg text-sm shadow"
                >
                    <option value="All">All Districts</option>
                    {districts.map((district) => (
                        <option key={district} value={district}>
                            {district}
                        </option>
                    ))}
                </select>
                {(user.role === "admin" || user.role === "owner") && (
                    <button
                        onClick={() => openForm()}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
                    >
                        <FaPlus /> Add Turf
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTurfs.length > 0 ? (
                    filteredTurfs.map((turf, id) => (
                        <div
                            key={id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden relative"
                        >
                            <img
                                src={`http://localhost:8000/${turf.image}`}
                                alt={turf.name}
                                className="w-full h-[160px] object-cover bg-gray-100"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/placeholder.png";
                                }}
                            />


                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-green-700">{turf.name}</h2>
                                <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                                    <FaMapMarkerAlt className="text-red-500" />
                                    {turf.location}
                                </p>
                                <p className="text-sm text-gray-700 flex items-center gap-2 mt-1">
                                    <FaRupeeSign className="text-green-600" />
                                    {turf.price} / Hour
                                </p>
                                <div className="mt-2">
                                    <p className="text-xs text-gray-600 mb-1 font-medium">
                                        Available Slots:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {turf.slots.map((slot, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-0.5 bg-green-200 text-green-800 rounded-full text-xs font-semibold"
                                            >
                                                <FaClock className="inline-block mr-1 text-xs" />
                                                {slot}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleBookNow(turf._id)}
                                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium text-sm py-2 rounded-lg"
                                >
                                    Book Now
                                </button>

                                {(user.role === "admin" || user.role === "owner") && (
                                    <div className="flex justify-end gap-3 mt-3 text-sm text-green-800">
                                        <button
                                            onClick={() => openForm(turf)}
                                            className="hover:text-blue-600 flex items-center gap-1"
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(turf._id)}
                                            className="hover:text-red-600 flex items-center gap-1"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-600 font-medium">
                        No turfs available for this district.
                    </p>
                )}
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
                        <button
                            onClick={closeForm}
                            className="absolute top-2 right-3 text-red-500 hover:text-red-700 text-xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-green-700">
                            {edit ? "Edit Turf" : "Add Turf"}
                        </h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Turf Name"
                                className="w-full px-4 py-2 border rounded-lg"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                required
                            />
                            <select
                                value={formData.location}
                                onChange={(e) =>
                                    setFormData({ ...formData, location: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg"
                                required
                            >
                                <option value="">Select District</option>
                                {districts.map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Price per Hour"
                                className="w-full px-4 py-2 border rounded-lg"
                                value={formData.price}
                                onChange={(e) =>
                                    setFormData({ ...formData, price: e.target.value })
                                }
                                required
                            />
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full px-4 py-2 border rounded-lg"
                                onChange={(e) =>
                                    setFormData({ ...formData, image: e.target.files[0] })
                                }
                            />
                            <div className="flex flex-wrap gap-2">
                                {["Morning", "Afternoon", "Evening", "Night"].map((slot) => (
                                    <label key={slot} className="flex items-center gap-1 text-sm">
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
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                            >
                                {edit ? "Update Turf" : "Add Turf"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ground;
