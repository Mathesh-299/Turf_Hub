import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, LoaderCircle, Lock, Mail, Phone, User, Activity, ArrowRight, ShieldCheck, Zap, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });
    const [buttonSubmit, setButtonSubmit] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    // Real-time Validation Checks
    const isValidName = form.name.trim().length >= 3;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const isValidPhoneNumber = /^[0-9]{10}$/.test(form.phone);
    const isStrongPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(form.password);

    // Password Criteria tracking
    const passwordCriteria = [
        { label: "8+ characters", met: form.password.length >= 8 },
        { label: "1 uppercase", met: /[A-Z]/.test(form.password) },
        { label: "1 number", met: /\d/.test(form.password) },
        { label: "1 special char", met: /[@$!%*?&]/.test(form.password) },
    ];
    const passwordStrengthCounter = passwordCriteria.filter(c => c.met).length;

    // Derived color for strength meter
    const getStrengthColor = () => {
        if (passwordStrengthCounter === 0) return "bg-slate-300 dark:bg-slate-700";
        if (passwordStrengthCounter <= 2) return "bg-red-500";
        if (passwordStrengthCounter === 3) return "bg-amber-400";
        return "bg-emerald-500";
    };

    const getStrengthText = () => {
        if (form.password.length === 0) return "";
        if (passwordStrengthCounter <= 2) return "Weak";
        if (passwordStrengthCounter === 3) return "Good";
        return "Strong";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isValidName || !isValidEmail || !isValidPhoneNumber || !isStrongPassword) {
            toast.error("Please fill all fields correctly before submitting.");
            return;
        }

        setButtonSubmit(true);
        try {
            const response = await API.post("/users/register", form);
            if (response.status === 201) {
                toast.success(`Welcome to Turf Hub, ${form.name}!`);
                setForm({ name: "", email: "", phone: "", password: "" });
                setTimeout(() => navigate("/login"), 1500);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setButtonSubmit(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors duration-500">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/20">
                        <Activity className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] animate-pulse">Initializing Interface</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden font-sans selection:bg-blue-500/30 transition-colors duration-500">
            {/* Ambient Background Lights */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 dark:bg-blue-600/10 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/5 dark:bg-indigo-600/10 blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
            </div>

            <div className="w-full max-w-[1100px] z-10 grid lg:grid-cols-2 gap-0 bg-white dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-[4rem] shadow-2xl overflow-hidden min-h-[700px]">
                
                {/* Left Side - Value Proposition */}
                <div className="hidden lg:flex flex-col justify-between p-16 bg-slate-50/50 dark:bg-gradient-to-br dark:from-blue-600/10 dark:to-indigo-900/20 shadow-inner">
                    <div className="relative">
                        <Link to="/" className="inline-flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-blue-600 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-widest uppercase">Turf Hub</span>
                        </Link>
                        
                        <div className="mt-20 space-y-8">
                            <h2 className="text-5xl font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tighter">
                                Start your <br />
                                <span className="text-blue-600 dark:text-blue-400">winning streak.</span>
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg font-bold leading-relaxed max-w-sm uppercase tracking-tight opacity-80">
                                Join the ultimate sports ecosystem. Book arenas, connect, and elevate your performance.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[
                            { icon: <Zap className="w-6 h-6 text-amber-500" />, text: "Zero booking fees" },
                            { icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />, text: "100% verified arenas" },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 text-slate-600 dark:text-slate-300 font-black uppercase tracking-widest text-xs">
                                <div className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                                    {item.icon}
                                </div>
                                {item.text}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="p-10 md:p-16 flex flex-col justify-center">
                    <div className="lg:hidden flex items-center justify-center gap-4 mb-12">
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-blue-600 flex items-center justify-center shadow-xl">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-widest">Turf Hub</span>
                    </div>

                    <motion.div variants={containerVariants} initial="hidden" animate="show">
                        <motion.div variants={itemVariants} className="mb-10 text-center lg:text-left">
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">Create Account</h1>
                            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">Enter your details to register instantly.</p>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            <div className="grid sm:grid-cols-2 gap-6">
                                {/* Full Name Field */}
                                <motion.div variants={itemVariants} className="relative group">
                                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 pl-1">Full Name</label>
                                    <div className="relative flex items-center">
                                        <div className={`absolute left-5 transition-colors ${focusedField === 'name' ? 'text-blue-500' : 'text-slate-400'}`}>
                                            <User className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className={`w-full bg-slate-50 dark:bg-slate-950/80 border ${isValidName ? 'border-emerald-500/50' : 'border-slate-200 dark:border-slate-800'} text-slate-900 dark:text-white pl-12 pr-12 py-4.5 rounded-[20px] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700`}
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField(null)}
                                        />
                                        {isValidName && (
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-5 text-emerald-500">
                                                <CheckCircle2 className="w-5 h-5" />
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Phone Field */}
                                <motion.div variants={itemVariants} className="relative group">
                                    <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 pl-1">Phone Number</label>
                                    <div className="relative flex items-center">
                                        <div className={`absolute left-5 transition-colors ${focusedField === 'phone' ? 'text-blue-500' : 'text-slate-400'}`}>
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="tel"
                                            placeholder="1234567890"
                                            className={`w-full bg-slate-50 dark:bg-slate-950/80 border ${isValidPhoneNumber && form.phone.length > 0 ? 'border-emerald-500/50' : 'border-slate-200 dark:border-slate-800'} text-slate-900 dark:text-white pl-12 pr-12 py-4.5 rounded-[20px] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700`}
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            onFocus={() => setFocusedField('phone')}
                                            onBlur={() => setFocusedField(null)}
                                        />
                                        {isValidPhoneNumber && form.phone.length > 0 && (
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-5 text-emerald-500">
                                                <CheckCircle2 className="w-5 h-5" />
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Email Field */}
                            <motion.div variants={itemVariants} className="relative group">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 pl-1">Email Address</label>
                                <div className="relative flex items-center">
                                    <div className={`absolute left-5 transition-colors ${focusedField === 'email' ? 'text-blue-500' : 'text-slate-400'}`}>
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="email@example.com"
                                        className={`w-full bg-slate-50 dark:bg-slate-950/80 border ${isValidEmail && form.email.length > 0 ? 'border-emerald-500/50' : 'border-slate-200 dark:border-slate-800'} text-slate-900 dark:text-white pl-12 pr-12 py-4.5 rounded-[20px] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700`}
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                    {isValidEmail && form.email.length > 0 && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-5 text-emerald-500">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Password Field */}
                            <motion.div variants={itemVariants} className="flex flex-col gap-3">
                                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0 pl-1">Secure Password</label>
                                <div className="relative">
                                    <div className="relative flex items-center">
                                        <div className={`absolute left-5 transition-colors ${focusedField === 'password' ? 'text-blue-500' : 'text-slate-400'}`}>
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className={`w-full bg-slate-50 dark:bg-slate-950/80 border ${isStrongPassword && form.password.length > 0 ? 'border-emerald-500/50' : 'border-slate-200 dark:border-slate-800'} text-slate-900 dark:text-white pl-12 pr-14 py-4.5 rounded-[20px] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700`}
                                            value={form.password}
                                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                                            onFocus={() => setFocusedField('password')}
                                            onBlur={() => setFocusedField(null)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-5 text-slate-400 hover:text-blue-500 transition-colors p-1"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {(focusedField === 'password' || form.password.length > 0) && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }} 
                                            animate={{ opacity: 1, height: "auto" }} 
                                            exit={{ opacity: 0, height: 0 }}
                                            className="px-2 pt-2"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex gap-2 flex-1 mr-6">
                                                    {[...Array(4)].map((_, i) => (
                                                        <div 
                                                            key={i} 
                                                            className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${i < passwordStrengthCounter ? getStrengthColor() : "bg-slate-200 dark:bg-slate-800"}`} 
                                                        />
                                                    ))}
                                                </div>
                                                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-500 ${getStrengthColor().replace('bg-', 'text-')}`}>
                                                    {getStrengthText()}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                                                {passwordCriteria.map((c, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <CheckCircle2 className={`w-4 h-4 transition-colors duration-500 ${c.met ? "text-emerald-500" : "text-slate-300 dark:text-slate-700"}`} />
                                                        <span className={`text-[10px] uppercase font-black tracking-tight transition-colors duration-500 ${c.met ? "text-slate-600 dark:text-slate-300" : "text-slate-400 dark:text-slate-600"}`}>{c.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            <motion.div variants={itemVariants} className="pt-8">
                                <button
                                    type="submit"
                                    disabled={buttonSubmit || !isValidName || !isValidEmail || !isValidPhoneNumber || !isStrongPassword}
                                    className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 group active:scale-95 disabled:opacity-50 disabled:grayscale uppercase tracking-widest text-sm"
                                >
                                    {buttonSubmit ? (
                                        <>
                                            <LoaderCircle className="w-5 h-5 animate-spin" />
                                            Architecting...
                                        </>
                                    ) : (
                                        <>
                                            Register Account
                                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        </form>

                        <motion.div variants={itemVariants} className="mt-10 text-center">
                            <p className="text-slate-500 dark:text-slate-600 uppercase font-black tracking-[0.2em] text-[10px]">
                                Already joined?{" "}
                                <Link to="/login" className="text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors ml-1">
                                    Sign in
                                </Link>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Register;
