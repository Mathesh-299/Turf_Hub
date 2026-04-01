import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
    Clock,
    MapPin,
    IndianRupee,
    Edit2,
    Trash2,
    Plus,
    X,
    Image as ImageIcon,
    Activity,
    Phone,
    Map
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";
import AdminSidebar from "./Adminsidebar";

const districts = [
    "Chennai", "Coimbatore", "Cuddalore", "Dindigul", "Erode", "Kanchipuram",
    "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Ramanathapuram",
    "Salem", "Sivagangai", "Thanjavur", "Theni", "Thoothukudi",
    "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Vellore", "Virudhunagar",
    "Bangalore"
];

const Ground = () => {
    const navigate = useNavigate();
    const [turfs, setTurfs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
        contactNumber: "",
    });

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await API.get("/ground/getGround");
            setTurfs(response.data.turfs);
        } catch (error) {
            toast.error("Failed to fetch turfs");
        } finally {
            setIsLoading(false);
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
            setFormData({ ...turf, image: null, contactNumber: turf.contactNumber || "" });
            setTurfId(turf._id);
        } else {
            setEdit(false);
            setFormData({ name: "", location: "", price: "", slots: [], image: null, contactNumber: "" });
            setTurfId(null);
        }
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setFormData({ name: "", location: "", price: "", slots: [], image: null, contactNumber: "" });
    };

    const createFormData = () => {
        const form = new FormData();
        form.append("name", formData.name);
        form.append("location", formData.location);
        form.append("price", formData.price);
        form.append("contactNumber", formData.contactNumber);
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
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (!isLoggedIn) {
            toast.warn("Please login to book a turf.");
            navigate("/login");
        } else {
            navigate("/turfParticular", { state: id });
        }
    };

    const SkeletonCard = () => (
        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden p-2 animate-pulse shadow-sm">
            <div className="w-full h-56 bg-slate-200 dark:bg-slate-800 rounded-2xl mb-4" />
            <div className="p-4 space-y-4">
                <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                <div className="space-y-2">
                    <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-md" />
                    <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-md" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen font-sans text-slate-900 dark:text-slate-200 selection:bg-blue-500/30 transition-colors duration-500">
            {user.role === "admin" && (
                <div className="z-50 relative">
                    <AdminSidebar />
                </div>
            )}
            
            <div className="flex-1 pt-24 px-4 sm:px-8 pb-16 relative w-full overflow-hidden">
                {/* Immersive Background Effects */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 dark:bg-blue-600/10 blur-[150px]" />
                    <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-600/5 dark:bg-emerald-600/10 blur-[150px]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12"
                    >
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-slate-400 tracking-tight mb-2">
                                Premium Arenas
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-sm">Discover and book the finest turfs globally.</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <div className="relative group min-w-[200px]">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                <select
                                    value={selectedDistrict}
                                    onChange={(e) => setSelectedDistrict(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-2xl text-slate-900 dark:text-white appearance-none focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 shadow-xl cursor-pointer transition-all font-bold"
                                >
                                    <option value="All">All Regions</option>
                                    {districts.map((d) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>

                            {(user.role === "admin" || user.role === "owner") && (
                                <button
                                    onClick={() => openForm()}
                                    className="flex items-center justify-center gap-2 bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black px-8 py-3.5 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 uppercase tracking-widest text-sm"
                                >
                                    <Plus className="w-5 h-5" /> Add Arena
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {/* Turfs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {isLoading ? (
                            Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
                        ) : filteredTurfs.length > 0 ? (
                            filteredTurfs.map((turf, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.05, type: "spring", stiffness: 100 }}
                                    key={turf._id}
                                    className="group bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-white/5 hover:border-blue-500/30 rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 block relative"
                                >
                                    {/* Action buttons (Owner/Admin) Absolute positioned */}
                                    {(user.role === "admin" || user.role === "owner") && (turf.ownerId === user.id || user.role === "admin") && (
                                        <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                            <button onClick={() => openForm(turf)} className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(turf._id)} className="p-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl shadow-lg transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}

                                    <div className="p-3 relative overflow-hidden">
                                        <img
                                            src={turf.image ? `https://turf-hub.onrender.com/${turf.image.replace(/\\/g, '/')}` : "/placeholder.png"}
                                            alt={turf.name}
                                            className="w-full h-56 object-cover object-center rounded-[24px] group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                                            onError={(e) => { e.target.src = "/placeholder.png"; }}
                                        />
                                        <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-xs font-black text-blue-600 dark:text-blue-400 shadow-xl border border-blue-500/10">
                                            {turf.location.toUpperCase()}
                                        </div>
                                    </div>

                                    <div className="p-6 pt-2">
                                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                                            {turf.name}
                                        </h2>
                                        
                                        <div className="space-y-3 mb-6">
                                            <p className="flex items-center text-sm text-slate-500 dark:text-slate-400 font-bold">
                                                <MapPin className="w-4 h-4 mr-2 text-blue-500 shrink-0" />
                                                <span className="truncate">{turf.location}</span>
                                            </p>
                                            <p className="flex items-center text-sm text-slate-500 dark:text-slate-400 font-bold">
                                                <IndianRupee className="w-4 h-4 mr-2 text-emerald-500 shrink-0" />
                                                <span className="font-black text-emerald-600 dark:text-emerald-400 text-lg">₹{turf.price}</span> / HR
                                            </p>
                                        </div>

                                        <div className="mb-8">
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-black mb-3">Operational Slots</p>
                                            <div className="flex flex-wrap gap-2">
                                                {turf.slots.slice(0, 3).map((slot, idx) => (
                                                    <span key={idx} className="text-[10px] font-black bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full flex items-center gap-1.5 uppercase">
                                                        <Clock className="w-3 h-3 text-blue-500" /> {slot}
                                                    </span>
                                                ))}
                                                {turf.slots.length > 3 && <span className="text-[10px] font-black text-slate-400">+{turf.slots.length - 3} MORE</span>}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleBookNow(turf._id)}
                                            className="w-full bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-black py-4 rounded-[18px] text-sm shadow-xl transition-all active:scale-95 z-20 relative uppercase tracking-widest"
                                        >
                                            Secure Slot
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-white dark:bg-slate-900/30 rounded-[48px] border-2 border-slate-200 dark:border-white/5 border-dashed">
                                <Activity className="w-20 h-20 text-slate-200 dark:text-slate-800 mb-6 animate-pulse" />
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">No Arenas Found</h3>
                                <p className="text-slate-500 dark:text-slate-400 max-w-sm font-bold uppercase tracking-widest text-xs">Try selecting a different region or search query.</p>
                            </div>
                        )}
                    </div>

                    {/* Highly Polished Form Modal */}
                    <AnimatePresence>
                        {showForm && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-xl flex items-center justify-center z-[100] p-4 font-sans"
                            >
                                <motion.div 
                                    initial={{ scale: 0.95, opacity: 0, y: 30 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.95, opacity: 0, y: 30 }}
                                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[40px] w-full max-w-lg shadow-[0_0_80px_rgba(0,0,0,0.15)] flex flex-col max-h-[90vh] overflow-hidden"
                                >
                                    <div className="shrink-0 px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900/80">
                                        <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                            {edit ? <Edit2 className="w-6 h-6 text-blue-600"/> : <Plus className="w-6 h-6 text-emerald-500"/>}
                                            {edit ? "Edit Arena" : "Add Arena"}
                                        </h2>
                                        <button onClick={closeForm} className="p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                                        <form onSubmit={handleFormSubmit} className="space-y-6">
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Arena Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Arena Beta..."
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-5 py-4 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors font-bold"
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Location</label>
                                                    <select
                                                        value={formData.location}
                                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-5 py-4 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors appearance-none font-bold"
                                                        required
                                                    >
                                                        <option value="" disabled>Select</option>
                                                        {districts.map((d) => (
                                                            <option key={d} value={d}>{d}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Price / Hr</label>
                                                    <div className="relative">
                                                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                                                        <input
                                                            type="number"
                                                            placeholder="0"
                                                            value={formData.price}
                                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white pl-10 pr-5 py-4 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors font-bold"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Contact Number</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                                                    <input
                                                        type="text"
                                                        placeholder="+91 98765 43210"
                                                        value={formData.contactNumber}
                                                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white pl-10 pr-5 py-4 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors font-bold"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Cover Image</label>
                                                <div className="relative group">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-400 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-blue-600 file:text-white hover:file:bg-blue-700 px-3 py-3 rounded-2xl transition-all cursor-pointer font-bold"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-widest">Operational Slots</label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {["Morning", "Afternoon", "Evening", "Night"].map((slot) => {
                                                        const isSelected = formData.slots.includes(slot);
                                                        return (
                                                            <label
                                                                key={slot}
                                                                className={`flex items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${isSelected ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:border-slate-200 dark:hover:border-slate-700'}`}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    className="hidden"
                                                                    checked={isSelected}
                                                                    onChange={() =>
                                                                        setFormData((prev) => ({
                                                                            ...prev,
                                                                            slots: prev.slots.includes(slot)
                                                                                ? prev.slots.filter((s) => s !== slot)
                                                                                : [...prev.slots, slot],
                                                                        }))
                                                                    }
                                                                />
                                                                <span className="font-black text-xs uppercase tracking-widest">{slot}</span>
                                                            </label>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            
                                            <div className="pt-4">
                                                <button
                                                    type="submit"
                                                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-5 rounded-2xl shadow-xl transition-all active:scale-95 uppercase tracking-[0.2em] text-sm"
                                                >
                                                    {edit ? "Save Changes" : "Deploy Arena"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Ground;
