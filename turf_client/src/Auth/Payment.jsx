import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
    CheckCircle2,
    CreditCard,
    Smartphone,
    Banknote,
    Building2,
    ShieldCheck,
    ArrowLeft,
    IndianRupee,
    BadgeCheck,
    Lock,
    QrCode,
    Clock,
    ChevronRight,
    ArrowRight,
    Activity,
    CreditCard as CardIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";
import { useTurfContext } from "../context/TurfContext";

const Payment = () => {
    const navigate = useNavigate();
    const { bookingData, currentTurf: turf, clearBooking } = useTurfContext();
    
    const [price, setPrice] = useState("0");
    const [ids, setIds] = useState({ turfId: "", userId: "" });
    const [step, setStep] = useState(1); // 1: Method Selection, 2: Method Details
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Detailed Payment State
    const [paymentDetails, setPaymentDetails] = useState({
        card: { number: "", name: "", expiry: "", cvc: "" },
        upi: null,
        bank: null
    });

    useEffect(() => {
        if (!bookingData) {
            toast.error("Booking session expired. Please restart your booking.");
            navigate("/ground");
            return;
        }
        setPrice(bookingData.totalPrice || "0");
        const userValue = JSON.parse(localStorage.getItem("user") || "{}");
        setIds({ turfId: turf?._id || "", userId: userValue?.id || "" });
    }, [bookingData, turf, navigate]);

    const handleConfirmPayment = async () => {
        if (!ids.turfId || !ids.userId) {
            toast.error("Critical identity error. Please re-login.");
            return;
        }

        setIsProcessing(true);
        const token = localStorage.getItem("token");

        const paymentPayload = {
            ...bookingData,
            Amount: price,
            paymentMethod: selectedMethod,
            paymentOption: paymentDetails.upi || paymentDetails.bank || "Direct",
            status: "Booked"
        };

        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating bank gateway
            const response = await API.post(`/booking/bookTurf/${ids.turfId}/${ids.userId}`, paymentPayload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200 || response.status === 201) {
                toast.success("Elite! Your arena has been successfully secured.");
                clearBooking();
                setTimeout(() => navigate("/profilePage"), 1500);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Transaction failed. Please try again.");
            setIsProcessing(false);
        }
    };

    const methods = [
        { id: "UPI", title: "Smart UPI", sub: "GPay, PhonePe, Paytm", icon: Smartphone, color: "blue" },
        { id: "CARD", title: "Card Shield", sub: "Visa, Mastercard, AMEX", icon: CreditCard, color: "slate" },
        { id: "NETBANKING", title: "Instant Bank", sub: "Direct Net Banking", icon: Building2, color: "emerald" },
        { id: "CASH", title: "Arena Pay", sub: "Confirm now, pay on arrival", icon: Banknote, color: "amber" }
    ];

    if (!bookingData) return null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-200 pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden transition-colors duration-500">
            {/* Ambient Background Lights */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-600/5 dark:bg-blue-600/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-emerald-600/5 dark:bg-emerald-600/10 blur-[150px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12">
                
                {/* Left Sidebar - Summary Card */}
                <div className="lg:col-span-4 space-y-6">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-3 text-slate-500 hover:text-blue-600 dark:hover:text-white transition-all font-black uppercase tracking-widest text-[10px]"
                    >
                        <ArrowLeft className="w-4 h-4" /> Cancel Checkout
                    </motion.button>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-slate-900/40 backdrop-blur-3xl p-10 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-[0.03] rounded-bl-full pointer-events-none" />
                        
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-slate-900 dark:bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                                <Activity className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Review Order</h1>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Elite Booking Experience</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="flex justify-between items-center p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Venue</p>
                                    <p className="font-black text-slate-900 dark:text-white uppercase truncate max-w-[120px]">{turf?.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Time</p>
                                    <p className="font-black text-slate-900 dark:text-white uppercase">{bookingData.session}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-5 border border-blue-500/10 dark:border-blue-500/20 rounded-3xl bg-blue-500/5 selection:bg-blue-500/20">
                                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                <div>
                                    <p className="font-black text-slate-900 dark:text-white uppercase text-sm tracking-tight">{bookingData.date}</p>
                                    <p className="text-[9px] font-black uppercase text-blue-600/60 tracking-widest">{bookingData.timeDuration || "Duration TBD"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5">
                            <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Total Estimated</p>
                            <div className="flex items-baseline gap-2">
                                <IndianRupee className="w-6 h-6 text-blue-600 dark:text-emerald-500" />
                                <span className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{price}</span>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-emerald-500/10 rounded-2xl flex items-center gap-3 border border-emerald-500/20">
                            <ShieldCheck className="w-5 h-5 text-emerald-500" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Military-Grade Encryption</span>
                        </div>
                    </motion.div>
                </div>

                {/* Right Sidebar - Dynamic Mechanism Container */}
                <div className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                className="space-y-8"
                            >
                                <div className="mb-10 text-center lg:text-left">
                                    <h2 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Payment Hub</h2>
                                    <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs mt-3">Elite payment infrastructure powered by Turf Hub</p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    {methods.map((method) => {
                                        const Icon = method.icon;
                                        return (
                                            <motion.button
                                                key={method.id}
                                                whileHover={{ y: -8, scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => {
                                                    setSelectedMethod(method.id);
                                                    if (method.id === "CASH") handleConfirmPayment();
                                                    else setStep(2);
                                                }}
                                                className="group relative flex flex-col items-start p-10 bg-white dark:bg-slate-900/40 backdrop-blur-3xl rounded-[3.5rem] border border-slate-200 dark:border-white/5 hover:border-blue-600/50 dark:hover:border-blue-500 shadow-xl transition-all duration-500 text-left overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 w-full h-1.5 bg-gradient-to-r from-transparent via-blue-600/20 to-transparent group-hover:from-blue-600 group-hover:via-indigo-500 group-hover:to-purple-500 transition-all duration-1000" />
                                                <div className="p-5 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-900 transition-all duration-500 mb-8">
                                                    <Icon className="w-10 h-10" />
                                                </div>
                                                <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-3">{method.title}</h3>
                                                <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{method.sub}</p>
                                                <div className="absolute bottom-12 right-12 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                                    <ChevronRight className="w-8 h-8 text-blue-600" />
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                className="space-y-8"
                            >
                                <motion.button
                                    whileHover={{ x: -10 }}
                                    onClick={() => setStep(1)}
                                    className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-[11px] mb-8 bg-blue-600/5 px-6 py-3 rounded-2xl border border-blue-500/10"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Change Strategy
                                </motion.button>

                                <div className="bg-white dark:bg-slate-900/60 backdrop-blur-3xl p-10 md:p-14 rounded-[4rem] border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
                                     <div className="absolute ring-1 ring-blue-600/10 inset-0 pointer-events-none rounded-[4rem]" />
                                    
                                    {selectedMethod === "CARD" && (
                                        <div className="space-y-10">
                                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                                <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Shield Payment</h2>
                                                <div className="flex gap-4">
                                                    <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                                                        <CardIcon className="w-6 h-6 text-blue-600" />
                                                        <span className="text-[10px] font-black text-slate-900 dark:text-white tracking-widest">SECURE SCAN</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="space-y-3">
                                                    <label className="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] pl-1">Cardholder Entity</label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="FULL NAME" 
                                                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white p-6 rounded-3xl font-black uppercase text-sm tracking-widest outline-none focus:border-blue-600 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-800"
                                                        value={paymentDetails.card.name}
                                                        onChange={(e) => setPaymentDetails({ ...paymentDetails, card: { ...paymentDetails.card, name: e.target.value }})}
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] pl-1">Identification Number</label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="•••• •••• •••• ••••" 
                                                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white p-6 rounded-3xl font-black text-xl tracking-[0.3em] outline-none focus:border-blue-600 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-800"
                                                        value={paymentDetails.card.number}
                                                        onChange={(e) => setPaymentDetails({ ...paymentDetails, card: { ...paymentDetails.card, number: e.target.value }})}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-3">
                                                        <label className="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] pl-1">Expiry Frame</label>
                                                        <input 
                                                            type="text" 
                                                            placeholder="MM/YY" 
                                                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white p-6 rounded-3xl font-black uppercase text-sm tracking-widest outline-none focus:border-blue-600 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-800"
                                                            value={paymentDetails.card.expiry}
                                                            onChange={(e) => setPaymentDetails({ ...paymentDetails, card: { ...paymentDetails.card, expiry: e.target.value }})}
                                                        />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[11px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] pl-1">Shield Code</label>
                                                        <input 
                                                            type="text" 
                                                            placeholder="CVV" 
                                                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white p-6 rounded-3xl font-black uppercase text-sm tracking-widest outline-none focus:border-blue-600 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-800"
                                                            value={paymentDetails.card.cvc}
                                                            onChange={(e) => setPaymentDetails({ ...paymentDetails, card: { ...paymentDetails.card, cvc: e.target.value }})}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {selectedMethod === "UPI" && (
                                        <div className="space-y-10">
                                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                                <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Smart UPI Flow</h2>
                                                <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-600 dark:text-emerald-400 flex items-center gap-3 border border-emerald-500/20">
                                                    <QrCode className="w-5 h-5" />
                                                    <span className="font-black uppercase text-[10px] tracking-widest">Scan Anywhere</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                                {[
                                                    { name: "Google Pay", id: "gpay" },
                                                    { name: "PhonePe", id: "phonepe" },
                                                    { name: "Paytm", id: "paytm" },
                                                    { name: "Amazon Pay", id: "amazon" }
                                                ].map((app) => (
                                                    <button
                                                        key={app.id}
                                                        onClick={() => setPaymentDetails({ ...paymentDetails, upi: app.name })}
                                                        className={`group flex flex-col items-center gap-4 p-8 rounded-[2.5rem] border-2 transition-all duration-500 ${
                                                            paymentDetails.upi === app.name 
                                                                ? "border-blue-600 bg-blue-600 text-white shadow-2xl scale-105" 
                                                                : "border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 hover:border-blue-600/30"
                                                        }`}
                                                    >
                                                        <div className={`w-14 h-14 rounded-2xl shadow-inner flex items-center justify-center p-3 transition-colors duration-500 ${paymentDetails.upi === app.name ? "bg-white/20" : "bg-white dark:bg-slate-800"}`}>
                                                            <Smartphone className={`w-8 h-8 ${paymentDetails.upi === app.name ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`} />
                                                        </div>
                                                        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${paymentDetails.upi === app.name ? "text-white" : "text-slate-500"}`}>{app.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                            
                                            <div className="flex items-center gap-6 bg-slate-50 dark:bg-white/5 p-8 rounded-3xl border-2 border-dashed border-slate-200 dark:border-white/10 group">
                                                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-500">
                                                    <QrCode className="w-8 h-8 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black uppercase text-slate-900 dark:text-white mb-1">Adaptive QR Intent</p>
                                                    <p className="text-[10px] font-black uppercase text-slate-500 leading-relaxed tracking-tight">System will automatically link the transaction to your selected app</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {selectedMethod === "NETBANKING" && (
                                        <div className="space-y-10">
                                            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Secure Vault</h2>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                {["HDFC Elite", "SBI Global", "ICICI Private", "Axis Priority", "Kotak Luxe"].map((bank) => (
                                                    <button
                                                        key={bank}
                                                        onClick={() => setPaymentDetails({ ...paymentDetails, bank: bank })}
                                                        className={`flex items-center justify-between p-8 rounded-3xl border-2 transition-all duration-500 ${
                                                            paymentDetails.bank === bank 
                                                                ? "border-emerald-600 bg-emerald-600/5 shadow-2xl scale-[1.02]" 
                                                                : "border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 hover:border-emerald-600/30"
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-6">
                                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${paymentDetails.bank === bank ? 'bg-emerald-600 text-white' : 'bg-slate-900/10 text-slate-500'}`}>
                                                                <Building2 className="w-5 h-5" />
                                                            </div>
                                                            <span className={`text-sm font-black uppercase tracking-tight ${paymentDetails.bank === bank ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}`}>{bank}</span>
                                                        </div>
                                                        <div className={`w-6 h-6 rounded-full border-4 transition-all ${paymentDetails.bank === bank ? 'border-emerald-600' : 'border-slate-200 dark:border-white/10'}`} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Hub */}
                                    <div className="mt-16">
                                        <button
                                            onClick={handleConfirmPayment}
                                            disabled={isProcessing || (selectedMethod === "CARD" && !paymentDetails.card.number) || (selectedMethod === "UPI" && !paymentDetails.upi) || (selectedMethod === "NETBANKING" && !paymentDetails.bank)}
                                            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-7 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-5 group disabled:opacity-30 disabled:grayscale uppercase tracking-[0.3em] text-sm hover:translate-y-[-4px]"
                                        >
                                            {isProcessing ? (
                                                <div className="w-7 h-7 border-4 border-current border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Authorize Payment <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                        <div className="mt-8 flex items-center justify-center gap-3 text-slate-400 dark:text-slate-500">
                                            <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                            <span className="text-[11px] font-black uppercase tracking-[0.2em]">Authorized Transaction Engine • Turf Hub Secure</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Payment;