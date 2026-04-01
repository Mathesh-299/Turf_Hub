import { useEffect, useState } from "react";
import { Edit2, Search, Trash2, MapPin, Tag, Clock, Users, DollarSign, Activity, Map, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";
import AdminSidebar from './Adminsidebar';
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
    const [turfs, setTurfs] = useState([]);
    const [filteredTurfs, setFilteredTurfs] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [users, setUsers] = useState([]);

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
            toast.success("Turf deleted successfully");
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

    const ownerCount = users.filter(user => user.role === 'owner').length;
    const usersCount = users.filter(user => user.role === 'user').length;
    const totalEarnings = turfs.reduce((acc, turf) => acc + turf.price, 0);

    useEffect(() => {
        fetchTurfs();
        fetchUsers();
    }, []);

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };
    
    const itemMotion = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 transition-colors duration-500">
            <AdminSidebar />

            <main className="flex-1 w-full max-w-full overflow-hidden p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header Details */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-slate-900 dark:text-white">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <h1 className="text-3xl font-extrabold tracking-tight">System Overview</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Manage turfs, monitor revenue, and oversee platform users.</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative w-full md:w-80 group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by name or location..."
                                value={search}
                                onChange={handleSearch}
                                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl shadow-sm focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all outline-none font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600"
                            />
                        </motion.div>
                    </div>

                    {/* Stats Grid */}
                    <motion.div 
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
                    >
                        {[
                            { label: "Total Turfs", val: turfs.length, icon: Map, col: "orange" },
                            { label: "Total Pricing", val: `₹${totalEarnings.toLocaleString()}`, icon: DollarSign, col: "emerald" },
                            { label: "Owner Count", val: ownerCount, icon: Activity, col: "purple" },
                            { label: "User Count", val: usersCount, icon: Users, col: "blue" },
                        ].map((s, i) => (
                            <motion.div key={i} variants={itemMotion} className="bg-white dark:bg-white/5 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-white/10 flex items-center gap-4 hover:shadow-md dark:hover:border-blue-500/30 transition-all">
                                <div className={`p-4 bg-${s.col}-500/10 rounded-xl text-${s.col}-500`}>
                                    <s.icon className="w-7 h-7" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider">{s.label}</p>
                                    <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{s.val}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Turfs Listing */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-4">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4 mb-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Manage Turfs</h2>
                            <span className="text-sm font-black bg-blue-500/10 text-blue-600 dark:text-blue-400 py-1 px-4 rounded-full border border-blue-500/20">
                                {filteredTurfs.length} Location{filteredTurfs.length !== 1 && 's'} Found
                            </span>
                        </div>

                        {filteredTurfs.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 border-dashed rounded-3xl">
                                <Activity className="w-16 h-16 text-slate-200 dark:text-slate-800 mb-4 animate-pulse" />
                                <p className="text-lg font-bold text-slate-400">No turfs found matching "{search}"</p>
                            </div>
                        ) : (
                            <motion.div 
                                variants={container}
                                initial="hidden" 
                                animate="show" 
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            >
                                <AnimatePresence>
                                    {filteredTurfs.map((turf) => (
                                        <motion.div 
                                            key={turf._id} 
                                            variants={itemMotion}
                                            layout
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="bg-white dark:bg-white/5 rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col group hover:-translate-y-1"
                                        >
                                            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-900">
                                                <img
                                                    src={turf.image ? `https://turf-hub.onrender.com/${turf.image.replace(/\\/g, '/')}` : "/placeholder.png"}
                                                    alt={turf.name}
                                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-black text-emerald-600 dark:text-emerald-400 shadow-xl flex items-center gap-2 border border-emerald-500/20">
                                                    <Tag className="w-4 h-4" />
                                                    ₹{turf.price}
                                                </div>
                                            </div>
                                            
                                            <div className="p-6 flex-1 flex flex-col">
                                                <h3 className="text-xl font-black text-slate-900 dark:text-white truncate mb-2 group-hover:text-blue-600 transition-colors">{turf.name}</h3>
                                                
                                                <div className="space-y-3 mb-6">
                                                    <div className="flex items-start gap-3 text-slate-500 dark:text-slate-400">
                                                        <MapPin className="w-5 h-5 shrink-0 text-blue-500" />
                                                        <span className="text-sm font-bold line-clamp-1">{turf.location}</span>
                                                    </div>
                                                    <div className="flex items-start gap-3 text-slate-500 dark:text-slate-400">
                                                        <Clock className="w-5 h-5 shrink-0 text-blue-500" />
                                                        <span className="text-sm font-bold line-clamp-1">
                                                            {turf.slots.length} available slots
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-white/5">
                                                    <button 
                                                        onClick={() => handleEdit(turf)} 
                                                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-black text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors border border-transparent hover:border-blue-500/20"
                                                    >
                                                        <Edit2 className="w-4 h-4" /> Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(turf._id)} 
                                                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-black text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
