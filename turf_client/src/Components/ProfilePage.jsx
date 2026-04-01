import { AnimatePresence, motion } from 'framer-motion';
import { 
    Mail, 
    Calendar, 
    Shield, 
    Activity, 
    Settings, 
    ChevronRight,
    MapPin,
    Clock,
    UserCircle,
    ArrowRight
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../api/api';
import profileCover from '../assets/img/profile_cover.png';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [userData, setUserData] = useState({});
    const location = useLocation();
    const id = location.state;
    const token = localStorage.getItem("token");

    const fetchUserData = async () => {
        try {
            const response = await API.get(`/user/profilePage/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) fetchUserData();
    }, [id]);

    const tabs = [
        { id: 'overview', label: 'Overview', icon: UserCircle },
        { id: 'bookings', label: 'Bookings', icon: Calendar },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500 overflow-x-hidden">
            {/* Hero Section */}
            <div className="relative h-[45vh] lg:h-[55vh] overflow-hidden group">
                <motion.div 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <img 
                        src={profileCover} 
                        alt="Profile Cover" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/40 to-transparent dark:from-slate-950 dark:via-slate-950/40 dark:to-transparent" />
                </motion.div>

                <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-8">
                        <motion.div 
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="relative"
                        >
                            <div className="w-40 h-40 lg:w-56 lg:h-56 rounded-[40px] border-8 border-white dark:border-slate-950 shadow-2xl overflow-hidden bg-white">
                                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-6xl font-black">
                                    {userData.name?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 rounded-2xl border-4 border-white dark:border-slate-950 flex items-center justify-center shadow-lg">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="flex-1 pb-4"
                        >
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-900 dark:text-white">
                                    {userData.name}
                                </h1>
                                <span className="px-4 py-1.5 bg-blue-500 text-white text-sm font-bold rounded-full shadow-lg shadow-blue-500/20">
                                    PRO MEMBER
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-6 text-slate-600 dark:text-slate-300 font-bold">
                                <span className="flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-blue-500" />
                                    {userData.email}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-blue-500" />
                                    Active Player
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
                <div className="flex items-center gap-2 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl rounded-[32px] border border-slate-200 dark:border-white/10 shadow-2xl w-fit">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-8 py-4 rounded-[24px] text-sm font-black transition-all duration-300 ${
                                activeTab === tab.id 
                                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' 
                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                            }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span className="uppercase tracking-widest">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        >
                            {/* Stats Side */}
                            <div className="space-y-6">
                                {[
                                    { label: 'Total Bookings', val: '24', icon: Calendar, col: 'blue' },
                                    { label: 'Fav Sport', val: 'Football', icon: Activity, col: 'emerald' },
                                    { label: 'Rank', val: 'Elite', icon: Shield, col: 'amber' }
                                ].map((s, i) => (
                                    <div key={i} className="bg-white dark:bg-white/5 backdrop-blur-xl p-8 rounded-[40px] border border-slate-200 dark:border-white/10 group hover:border-blue-500/30 transition-all shadow-sm">
                                        <div className={`w-14 h-14 bg-${s.col}-500/10 rounded-2xl flex items-center justify-center text-${s.col}-500 mb-6 group-hover:scale-110 transition-transform`}>
                                            <s.icon className="w-7 h-7" />
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-500 font-bold text-sm uppercase tracking-widest mb-1">{s.label}</p>
                                        <p className="text-3xl font-black text-slate-900 dark:text-white">{s.val}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Bio/Info Main */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white dark:bg-white/5 backdrop-blur-xl p-10 rounded-[48px] border border-slate-200 dark:border-white/10 shadow-sm">
                                    <h3 className="text-3xl font-black mb-8 flex items-center gap-4 text-slate-900 dark:text-white">
                                        <div className="w-2 h-10 bg-blue-600 rounded-full" />
                                        Player Profile
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        {[
                                            { label: 'Full Name', val: userData.name },
                                            { label: 'Email', val: userData.email },
                                            { label: 'Phone', val: userData.phone || 'Not provided' },
                                            { label: 'Location', val: 'Coimbatore, India' },
                                        ].map((item, i) => (
                                            <div key={i} className="space-y-2">
                                                <p className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-tighter">{item.label}</p>
                                                <p className="text-xl font-black text-slate-700 dark:text-slate-200">{item.val}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[48px] p-12 text-white relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-white/20 transition-all duration-700" />
                                    <h3 className="text-4xl font-black mb-6 leading-tight">Ready for your next<br/>big game?</h3>
                                    <p className="text-blue-100 font-bold mb-8 text-lg max-w-md">Book premium turfs around you and experience the game like never before.</p>
                                    <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-3">
                                        Book Now <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'bookings' && (
                        <motion.div
                            key="bookings"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="bg-white dark:bg-white/5 backdrop-blur-xl p-10 rounded-[48px] border border-slate-200 dark:border-white/10 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white">Recent Activities</h3>
                                <button className="text-blue-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                    VIEW ALL <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <div className="space-y-6">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="group flex flex-col md:flex-row items-center gap-8 p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 hover:border-blue-500/30 transition-all">
                                        <div className="w-full md:w-48 h-32 rounded-2xl bg-slate-200 dark:bg-slate-800 overflow-hidden flex items-center justify-center text-slate-500 dark:text-slate-600 font-black">
                                            TURF PREVIEW
                                        </div>
                                        <div className="flex-1 text-center md:text-left">
                                            <p className="text-blue-500 font-black text-xs uppercase tracking-widest mb-1">Football • 7-a-side</p>
                                            <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Kickoff Arena Coimbatore</h4>
                                            <p className="text-slate-500 dark:text-slate-400 font-bold flex items-center justify-center md:justify-start gap-2">
                                                <Calendar className="w-4 h-4" /> Today, 07:00 PM
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-center md:items-end gap-2">
                                            <span className="px-5 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full font-black text-xs border border-emerald-500/20">CONFIRMED</span>
                                            <p className="text-2xl font-black text-slate-900 dark:text-white">₹1,200</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default ProfilePage;
