import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
    ArrowLeft,
    CheckCircle2,
    Clock,
    Edit2,
    Gamepad2,
    MapPin,
    IndianRupee,
    Star,
    Info,
    Activity,
    Navigation,
    ShieldCheck,
    Phone
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";
import TurfContactCard from "../Pages/TurfCard";

import { useTurfContext } from "../context/TurfContext";

// High-quality fallback image if turf has no image or image is broken
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1518605368461-1ee12db65c36?q=80&w=2070&auto=format&fit=crop";

const Turf = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setTurf: setContextTurf } = useTurfContext();
    
    // Robust local persistence for page refresh issues using localStorage
    const [turfId, setTurfId] = useState(() => {
        const passedId = location.state;
        if (passedId) {
            localStorage.setItem('cachedTurfId', passedId);
            return passedId;
        }
        return localStorage.getItem('cachedTurfId');
    });

    const [turf, setTurf] = useState(null);
    const [ownerName, setOwnerName] = useState('');
    const user = JSON.parse(localStorage.getItem("user"));
    const [reviews, setReviews] = useState({
        totalReviews: 0,
        averageRating: 0
    });

    useEffect(() => {
        const fetchTurfData = async (id) => {
            try {
                const response = await API.get(`/ground/getGroundId/${id}`);
                const turfData = response.data.turfValid;
                setTurf(turfData);
                setContextTurf(turfData); // Sycning to global Context API
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch turf details");
            }
        };
        if (turfId) fetchTurfData(turfId);
    }, [turfId, setContextTurf]);

    useEffect(() => {
        const fetchOwnerDetails = async () => {
            if (turf?.ownerId) {
                try {
                    const response = await API.get(`/ground/getOwnerId/${turf.ownerId}`);
                    setOwnerName(response.data.name);
                } catch (error) {
                    console.error("Owner info fetch failed", error);
                }
            }
        };
        fetchOwnerDetails();
    }, [turf?.ownerId]);

    const fetchOverAllRating = async () => {
        if (!turfId) return;
        try {
            const response = await API.get(`/reviews/overAllReviews/${turfId}`);
            setReviews(response.data);
        } catch (error) {
            console.error("Failed to fetch ratings", error);
        }
    }

    useEffect(() => {
        if (turfId) fetchOverAllRating();
    }, [turfId]);

    if (!turfId) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-slate-600" />
                </div>
                <p className="text-slate-400 text-lg font-medium">Turf coordinates lost.</p>
                <button 
                    onClick={() => navigate("/ground")} 
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-bold"
                >
                    Return to Arenas
                </button>
            </div>
        );
    }

    if (!turf) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Activity className="w-10 h-10 text-blue-500 animate-pulse" />
                    <p className="text-slate-400 font-medium">Loading Arena Profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 pt-24 px-4 sm:px-8 pb-16 relative">
            {/* Ambient Background Lights */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[150px]" />
                <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-600/10 blur-[150px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-5xl mx-auto z-10 relative flex flex-col gap-8"
            >
                {/* Visual Header Banner */}
                <div className="relative w-full h-80 md:h-[450px] rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] group border border-white/5">
                    <img
                        src={turf.image ? `https://turf-hub.onrender.com/${turf.image.replace(/\\/g, '/')}` : FALLBACK_IMAGE}
                        alt={turf.name || "Turf"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = FALLBACK_IMAGE;
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    <button
                        onClick={() => navigate('/ground')}
                        className="absolute top-6 left-6 bg-slate-900/60 hover:bg-slate-900 backdrop-blur-md border border-white/10 text-white p-3 rounded-full flex items-center gap-2 shadow-lg transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5 backdrop-blur-md">
                                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Arena
                                </span>
                                {reviews.totalReviews > 0 && (
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900/60 border border-white/10 rounded-full backdrop-blur-md text-sm text-white font-medium">
                                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                        {reviews.averageRating}
                                    </div>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight shadow-sm">
                                {turf.name}
                            </h1>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-2">
                                <p className="flex items-center text-slate-300 text-lg">
                                    <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                                    {turf.location}
                                </p>
                                {turf.contactNumber && (
                                    <p className="flex items-center text-slate-300 text-lg">
                                        <Phone className="w-5 h-5 mr-2 text-purple-400" />
                                        {turf.contactNumber}
                                    </p>
                                )}
                            </div>
                        </div>
                        
                        {(user?.role === "owner" && user?.id === turf?.ownerId) || user?.role === "admin" ? (
                            <button
                                onClick={() => navigate("/edit-turf", { state: turf })}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-95"
                            >
                                <Edit2 className="w-4 h-4" /> Edit Arena
                            </button>
                        ) : null}
                    </div>
                </div>

                {/* Info Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Highlights Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 rounded-3xl">
                                <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Standard Rate</p>
                                <div className="flex items-end gap-1 text-3xl font-bold text-white">
                                    <IndianRupee className="w-6 h-6 text-emerald-500 mb-1" />
                                    {turf.price || 500} <span className="text-lg text-slate-500 font-medium mb-1 line-through ml-2 mr-1">₹{(turf.price || 500) + 150}</span>
                                    <span className="text-sm text-slate-500 font-medium mb-1">/ hr</span>
                                </div>
                            </div>
                            <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 rounded-3xl">
                                <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">Status</p>
                                <div className="flex items-center gap-3 text-xl font-bold text-white mt-1">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
                                    Open for Booking
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Info className="w-5 h-5 text-blue-500" /> About the Arena
                            </h2>
                            <p className="text-slate-300 leading-relaxed font-light">
                                {turf.description || "Experience top-tier gameplay on our premium artificial grass turf. Perfect for 5-a-side and 7-a-side football, cricket, and specialized training sessions. Featuring anti-shock padding, high-visibility LED floodlights, and fully enclosed safety netting to keep the action intense and uninterrupted."}
                            </p>
                        </div>

                        {/* Amenities */}
                        <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Gamepad2 className="w-5 h-5 text-emerald-500" /> Included Amenities
                            </h2>
                            <ul className="grid grid-cols-2 gap-y-4 gap-x-6 text-slate-300">
                                {["Clean Washrooms", "Secure Parking", "Pro LED Lighting", "Premium Synthetic Grass", "Drinking Water", "Resting Dugouts"].map((item, id) => (
                                    <li key={id} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Rating CTA */}
                        <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 backdrop-blur-md border border-blue-500/20 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Played here recently?</h3>
                                <p className="text-slate-400 text-sm">Help the community by sharing your experience.</p>
                            </div>
                            <Link
                                to="/review"
                                state={turf._id}
                                className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition"
                            >
                                <Star className="w-4 h-4" /> Write a Review
                            </Link>
                        </div>
                    </div>

                    {/* Right Column - Booking & Slots */}
                    <div className="space-y-6">
                        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] sticky top-28 shadow-2xl">
                            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Booking Panel</h2>
                            
                            <div className="mb-8">
                                <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Available Slots Today</p>
                                <div className="flex flex-wrap gap-2">
                                    {Array.isArray(turf.slots) && turf.slots.length > 0 ? (
                                        turf.slots.map((slot, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-slate-800 border border-slate-700 hover:border-blue-500/50 text-slate-200 text-sm font-medium rounded-xl flex items-center gap-2 transition-colors cursor-default"
                                            >
                                                <Clock className="w-4 h-4 text-blue-400" />
                                                {slot}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-slate-500 italic bg-slate-800/50 px-4 py-2 rounded-lg">All slots currently booked</span>
                                    )}
                                </div>
                            </div>

                            <Link to="/booking" state={turf}>
                                <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black text-lg py-4 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all active:scale-98">
                                    Proceed to Book
                                </button>
                            </Link>

                            <div className="mt-4 text-center">
                                <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
                                    <ShieldCheck className="w-3.5 h-3.5" /> Secure payment gateway
                                </p>
                            </div>
                        </div>
                        
                        {/* Optional owner contact card injected below if it exists */}
                        <div className="opacity-90 hover:opacity-100 transition-opacity">
                            <TurfContactCard turf={turf} ownerName={ownerName} />
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default Turf;
