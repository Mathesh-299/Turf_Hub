import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Moon, Sunrise, Sun, CloudSun, ArrowRight, CalendarDays, Info, ShieldCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";
import computeTimeRangeAndDuration from "../utils/computeTimeRangeAndDuration";
import { useTurfContext } from "../context/TurfContext";

function getLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getStartOfWeek(date) {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    d.setDate(d.getDate() - d.getDay());
    return d;
}

function formatSlotTime(h, m) {
    const mer = h >= 12 ? "PM" : "AM";
    h = h % 12 === 0 ? 12 : h % 12;
    return `${h}:${m.toString().padStart(2, "0")} ${mer}`;
}

const BookingTemplateDark = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentTurf, setTurf: setContextTurf, setBooking: setContextBooking } = useTurfContext();

    // Pull from navigation state, fallback to Global Context
    const turf = location.state || currentTurf;

    useEffect(() => {
        // Hydrate the Global Context if navigated directly from Turf.jsx
        if (location.state && (!currentTurf || currentTurf._id !== location.state._id)) {
            setContextTurf(location.state);
        }
    }, [location.state, currentTurf, setContextTurf]);

    const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [timeOfDay, setTimeOfDay] = useState("Evening");
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [bookedSlotStrings, setBookedSlotStrings] = useState([]);

    const turfPricePerHour = turf?.price ?? 0;
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const periods = [
        { label: "Twilight", icon: Moon, gradient: "from-indigo-600 to-purple-600" },
        { label: "Morning", icon: Sunrise, gradient: "from-orange-400 to-rose-400" },
        { label: "Noon", icon: Sun, gradient: "from-amber-400 to-orange-500" },
        { label: "Evening", icon: CloudSun, gradient: "from-blue-500 to-indigo-500" }
    ];

    const getDatesForWeek = () => [...Array(7)].map((_, i) => {
        const d = new Date(currentWeekStart);
        d.setDate(currentWeekStart.getDate() + i);
        return d;
    });

    const generateSlots = (period) => {
        let startHour = 0, endHour = 24;
        if (period === "Twilight") [startHour, endHour] = [0, 6];
        if (period === "Morning") [startHour, endHour] = [6, 12];
        if (period === "Noon") [startHour, endHour] = [12, 18];
        if (period === "Evening") [startHour, endHour] = [18, 24];

        const slots = [];
        for (let h = startHour; h < endHour; h++) {
            slots.push(formatSlotTime(h, 0));
            slots.push(formatSlotTime(h, 30));
        }
        return slots;
    };

    const parseTimeString = (str) => {
        const [time, mer] = str.trim().split(" ");
        let [h, m] = time.split(":").map(Number);
        if (mer.toUpperCase() === "PM" && h !== 12) h += 12;
        if (mer.toUpperCase() === "AM" && h === 12) h = 0;
        return h * 60 + m;
    };

    const fmtTime = (mins) => {
        let h = Math.floor(mins / 60);
        const m = mins % 60;
        const mer = h >= 12 ? "PM" : "AM";
        h = h % 12 === 0 ? 12 : h % 12;
        return `${h}:${m.toString().padStart(2, "0")} ${mer}`;
    };

    const expandBookedRanges = (ranges) => {
        const expanded = [];
        ranges.forEach(rangeStr => {
            const [startStr, endStr] = rangeStr.split(/\s*[-–—]\s*/).map(s => s.trim());
            let start = parseTimeString(startStr);
            const end = parseTimeString(endStr);
            while (start < end) {
                expanded.push(fmtTime(start));
                start += 30;
            }
        });
        return expanded;
    };

    const handlePrevWeek = () => {
        const prev = new Date(currentWeekStart);
        prev.setDate(prev.getDate() - 7);
        if (prev >= getStartOfWeek(new Date())) {
            setCurrentWeekStart(prev);
            setSelectedDate(prev);
            setSelectedSlots([]);
        }
    };

    const handleNextWeek = () => {
        const next = new Date(currentWeekStart);
        next.setDate(next.getDate() + 7);
        setCurrentWeekStart(next);
        setSelectedDate(next);
        setSelectedSlots([]);
    };

    const toggleSlot = (slot) => {
        const dateKey = `${getLocalDateString(selectedDate)}_${timeOfDay}_${slot}`;
        if (bookedSlotStrings.includes(dateKey)) return;
        
        setSelectedSlots(prev =>
            prev.includes(slot)
                ? prev.filter(s => s !== slot)
                : [...prev, slot].sort((a, b) => parseTimeString(a) - parseTimeString(b))
        );
    };

    const totalPrice = (selectedSlots.length * turfPricePerHour) / 2;

    const handleBookSubmit = () => {
        if (!selectedSlots.length) {
            toast.warn("Choose at least one time slot to proceed.");
            return;
        }
        const { timeRange, timeDuration } = computeTimeRangeAndDuration(selectedSlots, parseTimeString);
        const bookingPayload = {
            userName: user?.name,
            date: getLocalDateString(selectedDate),
            session: timeOfDay,
            timeRange,
            timeDuration,
            totalPrice: totalPrice
        };
        setContextBooking(bookingPayload); // Sync payload to Global Context API
        navigate("/paymentDetails"); // Removed memory state injection
    };

    const fetchAvailable = async () => {
        if (!turf?._id || !selectedDate || !timeOfDay) return;
        const dateStr = getLocalDateString(selectedDate);
        const token = localStorage.getItem("token");
        try {
            const response = await API.get(`/booking/getSlots/${turf._id}/${dateStr}/${timeOfDay}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const bookedSlotsData = response.data.bookedSlots || [];
            const expandedKeys = bookedSlotsData.flatMap(slot => {
                const times = expandBookedRanges([slot.timeRange]);
                return times.map(time => `${slot.date}_${slot.session}_${time}`);
            });
            const filteredKeys = expandedKeys.filter(key => key.startsWith(`${dateStr}_${timeOfDay}_`));
            setBookedSlotStrings(filteredKeys);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        fetchAvailable();
    }, [selectedDate, timeOfDay, turf?._id]);

    const slots = generateSlots(timeOfDay);

    if (!turf) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <CalendarDays className="w-8 h-8 text-slate-600" />
                </div>
                <p className="text-slate-400 text-lg font-medium">Booking context lost.</p>
                <button 
                    onClick={() => navigate("/ground")} 
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                >
                    Return to Arenas
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 font-sans selection:bg-blue-500/30 overflow-x-hidden relative flex flex-col">
            {/* Ambient Background Lights */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/10 blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-4xl mx-auto pt-28 px-4 pb-48 flex-grow"
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
                        Reserve <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">{turf.name}</span>
                    </h1>
                    <p className="text-slate-400 flex items-center justify-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        Secure Booking Process
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Date Selector */}
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <CalendarDays className="w-5 h-5 text-blue-500" /> Date Selection
                            </h2>
                            <span className="text-sm font-medium text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-white/5">
                                {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            <button 
                                onClick={handlePrevWeek} 
                                disabled={currentWeekStart <= getStartOfWeek(new Date())}
                                className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${currentWeekStart <= getStartOfWeek(new Date()) ? "bg-slate-800/30 text-slate-600 cursor-not-allowed border border-white/5" : "bg-slate-800 text-white hover:bg-slate-700 hover:scale-105 border border-white/10"}`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            
                            <div className="flex flex-1 justify-between gap-2 min-w-[500px]">
                                {getDatesForWeek().map(d => {
                                    const today = new Date(); today.setHours(0, 0, 0, 0);
                                    const past = d < today;
                                    const sel = d.toDateString() === selectedDate.toDateString();
                                    return (
                                        <button
                                            key={d.toISOString()}
                                            disabled={past}
                                            onClick={() => {
                                                if (!past) {
                                                    setSelectedDate(d);
                                                    setSelectedSlots([]);
                                                }
                                            }}
                                            className={`relative flex-1 flex flex-col items-center justify-center py-4 rounded-2xl border transition-all duration-300 overflow-hidden group
                                                ${sel 
                                                    ? "bg-blue-600/20 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]" 
                                                    : past 
                                                        ? "bg-slate-900/30 border-white/5 opacity-40 cursor-not-allowed" 
                                                        : "bg-slate-800/50 border-white/10 hover:bg-slate-700/50 hover:border-slate-600"
                                                }`}
                                        >
                                            {sel && <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-emerald-500/20" />}
                                            <span className={`text-xs uppercase tracking-wider font-semibold mb-1 relative z-10 ${sel ? "text-blue-300" : "text-slate-400"}`}>
                                                {d.toLocaleDateString("en-US", { weekday: "short" })}
                                            </span>
                                            <span className={`text-2xl font-black relative z-10 ${sel ? "text-white" : "text-slate-200"}`}>
                                                {d.getDate()}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            <button 
                                onClick={handleNextWeek}
                                className="shrink-0 w-12 h-12 rounded-full bg-slate-800 text-white hover:bg-slate-700 hover:scale-105 transition-all flex items-center justify-center border border-white/10"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Time Period Selector */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {periods.map(({ label, icon: Icon, gradient }) => {
                            const active = timeOfDay === label;
                            return (
                                <button 
                                    key={label} 
                                    onClick={() => { setTimeOfDay(label); setSelectedSlots([]); }}
                                    className={`relative p-[1px] rounded-2xl transition-all duration-300 ${active ? "scale-105 z-10" : "hover:scale-102"}`}
                                >
                                    {active && (
                                        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-md opacity-50`} />
                                    )}
                                    <div className={`relative flex items-center justify-center gap-3 w-full h-full py-4 rounded-2xl border transition-colors
                                        ${active 
                                            ? `bg-slate-900 border-transparent` 
                                            : `bg-slate-900/60 backdrop-blur-md border-white/10 hover:bg-slate-800 text-slate-400`
                                        }`}
                                    >
                                        <Icon className={`w-5 h-5 ${active ? "text-white" : ""}`} />
                                        <span className={`font-semibold ${active ? "text-white" : ""}`}>{label}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Slots Grid */}
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 lg:p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-30" />
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                            <Info className="w-5 h-5 text-indigo-400" /> Select Slots (30 min duration)
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4">
                            {slots.map(slot => {
                                const key = `${getLocalDateString(selectedDate)}_${timeOfDay}_${slot}`;
                                const isBooked = bookedSlotStrings.includes(key);
                                const isSelected = selectedSlots.includes(slot);
                                
                                return (
                                    <button 
                                        key={slot}
                                        disabled={isBooked}
                                        onClick={() => toggleSlot(slot)}
                                        className={`relative py-3 rounded-xl text-sm font-semibold transition-all overflow-hidden border
                                            ${isBooked
                                                ? "bg-slate-900/40 border-slate-800 text-slate-700 cursor-not-allowed"
                                                : isSelected
                                                    ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] scale-105 z-10"
                                                    : "bg-slate-800/80 border-white/5 text-slate-300 hover:bg-slate-700 hover:border-slate-500"
                                            }`}
                                    >
                                        {isBooked && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80">
                                                <span className="text-[10px] uppercase tracking-wider text-red-500/80 font-bold tracking-widest">Booked</span>
                                            </div>
                                        )}
                                        {slot}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Floating Checkout Bar */}
            <AnimatePresence>
                {selectedSlots.length > 0 && (
                    <motion.div 
                        initial={{ y: 150, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 150, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none"
                    >
                        <div className="max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex-1 w-full flex items-center gap-6">
                                <div className="hidden sm:flex w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 items-center justify-center">
                                    <span className="text-emerald-400 font-bold">{selectedSlots.length}</span>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm font-medium mb-1">Total Estimated Amount</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-3xl font-black text-white">₹ {totalPrice.toLocaleString()}</p>
                                        <p className="text-sm text-emerald-400 font-medium whitespace-nowrap hidden md:block">
                                            ({(selectedSlots.length * 30) / 60} hrs)
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <button 
                                onClick={handleBookSubmit}
                                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black text-lg px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                Checkout <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BookingTemplateDark;
