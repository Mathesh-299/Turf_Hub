import { useEffect, useState } from "react";
import { 
    MessageSquare, 
    Trash2, 
    Mail, 
    User, 
    ChevronDown, 
    Calendar, 
    Search,
    Inbox,
    Clock,
    Filter,
    CheckCircle,
    MoreVertical,
    ArrowUpRight
} from "lucide-react";
import { toast } from "react-toastify";
import API from "../api/api";
import AdminSidebar from "../Pages/Adminsidebar";
import { motion, AnimatePresence } from "framer-motion";

const Queries = () => {
    const [expandedId, setExpandedId] = useState(null);
    const [queries, setQueries] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem("token");

    const fetchQueries = async () => {
        setIsLoading(true);
        try {
            const response = await API.get("/contactUs/getQuery", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setQueries(response.data.queries || []);
        } catch (error) {
            console.log(error);
            // Don't toast error if it's 404 (just means no queries)
            if (error.response?.status !== 404) {
                toast.error("Failed to fetch queries.");
            } else {
                setQueries([]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleDelete = async (id) => {
        try {
            const deleteResponse = await API.delete(`/contactUs/deleteQuery/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (deleteResponse.status === 200) {
                setQueries(prev => prev.filter(q => q._id !== id));
                toast.success("Query deleted successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete query");
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const response = await API.patch(`/contactUs/updateStatus/${id}`, { status: newStatus }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                setQueries(prev => prev.map(q => q._id === id ? { ...q, status: newStatus } : q));
                toast.success(`Marked as ${newStatus}`);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update status");
        }
    };

    useEffect(() => {
        fetchQueries();
    }, []);

    const filteredQueries = (queries || []).filter(q => 
        (q.Name || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
        (q.Email || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Dynamic Calculations
    const stats = {
        total: queries.length,
        newToday: queries.filter(q => {
            if (!q.createdAt) return false;
            const createdDate = new Date(q.createdAt).toDateString();
            const today = new Date().toDateString();
            return createdDate === today;
        }).length,
        closed: queries.filter(q => q.status === 'resolved').length
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 text-slate-900 dark:text-slate-100 overflow-x-hidden transition-colors duration-500">
            <AdminSidebar />
            <main className="flex-1 w-full max-w-full overflow-hidden p-6 lg:p-10">
                <div className="max-w-7xl mx-auto space-y-10">
                    {/* Header Section */}
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }} 
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-2"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-600 rounded-2xl shadow-xl shadow-blue-500/20">
                                    <Inbox className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-slate-400">
                                    Query Inbox
                                </h1>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-lg">Manage user inquiries and support tickets with efficiency.</p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 20 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            className="flex flex-col md:flex-row gap-4 items-center"
                        >
                            <div className="relative group w-full md:w-96">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search name or email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-2xl shadow-xl dark:shadow-2xl backdrop-blur-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all outline-none font-semibold placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                />
                            </div>
                            <button onClick={fetchQueries} className="flex items-center gap-2 px-6 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/10 transition-all">
                                <Filter size={18} />
                                <span className="font-bold">Refresh</span>
                            </button>
                        </motion.div>
                    </div>

                    {/* Dashboard Overview Cards */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {[
                            { label: "Total Queries", value: stats.total, color: "blue", icon: MessageSquare },
                            { label: "New Today", value: stats.newToday, color: "emerald", icon: Clock },
                            { label: "Resolved", value: stats.closed, color: "purple", icon: CheckCircle },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 flex items-center justify-between group hover:border-blue-500/20 transition-all shadow-sm dark:shadow-none">
                                <div className="space-y-1">
                                    <p className="text-slate-400 dark:text-slate-500 font-bold text-sm uppercase tracking-wider">{stat.label}</p>
                                    <p className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                                </div>
                                <div className={`p-4 bg-${stat.color}-500/10 rounded-2xl text-${stat.color}-500 group-hover:scale-110 transition-transform`}>
                                    <stat.icon size={28} />
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Content Section */}
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-40 gap-4">
                            <motion.div 
                                animate={{ rotate: 360 }} 
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full"
                            />
                            <p className="text-slate-400 dark:text-slate-500 font-bold animate-pulse">Loading inquiries...</p>
                        </div>
                    ) : queries.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }} 
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-32 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 border-dashed rounded-[40px] text-center"
                        >
                            <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mb-8">
                                <Inbox className="w-12 h-12 text-blue-500" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-3">Your Inbox is Empty</h3>
                            <p className="text-slate-500 dark:text-slate-500 max-w-sm font-medium">When users send inquiries via contact forms, they'll appear here beautifully organized.</p>
                        </motion.div>
                    ) : (
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            <AnimatePresence>
                                {filteredQueries.map((query, idx) => (
                                    <motion.div 
                                        key={query._id} 
                                        variants={itemVariants}
                                        layout
                                        className={`relative group bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.08] backdrop-blur-3xl rounded-[32px] border border-slate-200 dark:border-white/10 overflow-hidden transition-all duration-500 shadow-sm dark:shadow-none ${expandedId === query._id ? 'ring-4 ring-blue-500/20 border-blue-500/30 md:col-span-2 shadow-xl' : ''}`}
                                    >
                                        <div className="p-8">
                                            {/* Top Row: Avatar & Metadata */}
                                            <div className="flex justify-between items-start mb-6 gap-4">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500">
                                                        {query.Name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-3">
                                                            <h2 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                                                                {query.Name}
                                                            </h2>
                                                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter border ${
                                                                query.status === 'resolved' 
                                                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                                                                : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                                                            }`}>
                                                                {query.status || 'pending'}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-3">
                                                            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-bold text-sm bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full border border-slate-200 dark:border-white/5">
                                                                <Mail size={14} className="text-blue-500" />
                                                                {query.Email}
                                                            </span>
                                                            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-bold text-sm bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 text-blue-600 dark:text-blue-400">
                                                                <Clock size={14} />
                                                                {query.createdAt ? new Date(query.createdAt).toLocaleDateString() : 'N/A'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {query.status !== 'resolved' && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleStatusUpdate(query._id, 'resolved');
                                                            }}
                                                            className="p-3 text-emerald-500 hover:bg-emerald-500/10 rounded-2xl transition-all"
                                                            title="Mark as Resolved"
                                                        >
                                                            <CheckCircle className="w-6 h-6" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(query._id);
                                                        }}
                                                        className="p-3 text-slate-400 dark:text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                                                        title="Delete Query"
                                                    >
                                                        <Trash2 className="w-6 h-6" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Message Section */}
                                            <div className="relative space-y-4">
                                                <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-slate-100 dark:border-white/5">
                                                    <p className={`text-slate-600 dark:text-slate-300 font-medium leading-relaxed ${expandedId === query._id ? '' : 'line-clamp-2 text-lg'}`}>
                                                        {query.Message}
                                                    </p>
                                                </div>

                                                <button 
                                                    onClick={() => toggleExpand(query._id)}
                                                    className="flex items-center gap-2 text-blue-600 dark:text-blue-500 font-black text-sm hover:gap-3 transition-all uppercase tracking-widest"
                                                >
                                                    {expandedId === query._id ? "Close Details" : "Read Full Inquiry"}
                                                    <ArrowUpRight size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Status Glow Bar */}
                                        <div className={`absolute top-0 bottom-0 left-0 w-1 transition-all ${idx % 2 === 0 ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]' : 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]'}`} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Queries;

