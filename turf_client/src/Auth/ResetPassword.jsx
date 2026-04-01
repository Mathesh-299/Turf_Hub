import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Confetti from "react-confetti";
import { Activity, ArrowRight, CheckCircle2, Eye, EyeOff, LoaderCircle, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", newPassword: "" });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);

    // Real-time Validations
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const isStrongPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(form.newPassword);

    // Password Tracker
    const passwordCriteria = [
        { label: "8+ characters", met: form.newPassword.length >= 8 },
        { label: "1 uppercase", met: /[A-Z]/.test(form.newPassword) },
        { label: "1 number", met: /\d/.test(form.newPassword) },
        { label: "1 special char", met: /[@$!%*?&]/.test(form.newPassword) },
    ];

    const handleResetPassword = async (e) => {
        e.preventDefault();
        
        if (!isValidEmail || !isStrongPassword) {
            toast.error("Please ensure your email is correct and your new password meets all criteria.");
            return;
        }

        setLoading(true);
        try {
            const response = await API.patch("/users/resetPassword", {
                email: form.email,
                newPassword: form.newPassword,
            });
            
            if (response.status === 200) {
                toast.success("Password reset successfully! You can now login.");
                setShowConfetti(true);
                setForm({ email: "", newPassword: "" });
                
                setTimeout(() => {
                    setShowConfetti(false);
                    navigate("/login");
                }, 2500);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
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

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden font-sans selection:bg-blue-500/30 transition-colors duration-500">
            {showConfetti && <Confetti recycle={false} numberOfPieces={400} colors={['#3b82f6', '#10b981', '#ffffff']} />}
            
            {/* Ambient Background Lights */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 dark:bg-blue-600/10 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600/5 dark:bg-emerald-600/10 blur-[120px]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: "spring", damping: 20 }}
                className="w-full max-w-[550px] z-10 bg-white dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-[3.5rem] shadow-2xl overflow-hidden"
            >
                <div className="p-10 md:p-16 flex flex-col justify-center relative">
                    {/* Top decoration line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

                    <div className="flex items-center justify-center gap-4 mb-10">
                        <div className="w-14 h-14 rounded-2xl bg-slate-900 dark:bg-blue-600 flex items-center justify-center shadow-xl">
                            <Activity className="w-7 h-7 text-white" />
                        </div>
                    </div>

                    <motion.div variants={containerVariants} initial="hidden" animate="show">
                        <motion.div variants={itemVariants} className="text-center mb-10">
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight leading-none">Recover Securely</h1>
                            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">Enter your account details to reset access</p>
                        </motion.div>

                        <form onSubmit={handleResetPassword} className="space-y-6">
                            {/* Email Field */}
                            <motion.div variants={itemVariants} className="relative group space-y-2">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 pl-1">Account Email</label>
                                <div className="relative flex items-center">
                                    <div className={`absolute left-5 transition-colors ${focusedField === 'email' ? 'text-blue-500' : 'text-slate-400'}`}>
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="email@example.com"
                                        className={`w-full bg-slate-50 dark:bg-slate-950/80 border ${isValidEmail && form.email.length > 0 ? 'border-emerald-500/50' : 'border-slate-200 dark:border-slate-800'} text-slate-900 dark:text-white pl-12 pr-12 py-4.5 rounded-[20px] outline-none focus:border-blue-500 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-800 font-bold`}
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        disabled={loading}
                                        required
                                    />
                                    {isValidEmail && form.email.length > 0 && (
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-5 text-emerald-500">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Password Field */}
                            <motion.div variants={itemVariants} className="relative group flex flex-col gap-3 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 pl-1">New Secure Password</label>
                                <div className="relative">
                                    <div className="relative flex items-center">
                                        <div className={`absolute left-5 transition-colors ${focusedField === 'password' ? 'text-blue-500' : 'text-slate-400'}`}>
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className={`w-full bg-slate-50 dark:bg-slate-950/80 border ${isStrongPassword && form.newPassword.length > 0 ? 'border-emerald-500/50' : 'border-slate-200 dark:border-slate-800'} text-slate-900 dark:text-white pl-12 pr-14 py-4.5 rounded-[20px] outline-none focus:border-blue-500 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-800 font-bold`}
                                            value={form.newPassword}
                                            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                                            onFocus={() => setFocusedField('password')}
                                            onBlur={() => setFocusedField(null)}
                                            disabled={loading}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-5 text-slate-400 hover:text-blue-500 transition-colors p-1"
                                            disabled={loading}
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Password Constraints HUD */}
                                <AnimatePresence>
                                    {(focusedField === 'password' || form.newPassword.length > 0) && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }} 
                                            animate={{ opacity: 1, height: "auto" }} 
                                            exit={{ opacity: 0, height: 0 }}
                                            className="px-2 pt-2"
                                        >
                                            <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                                                {passwordCriteria.map((c, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <CheckCircle2 className={`w-4 h-4 transition-all duration-500 ${c.met ? "text-emerald-500 scale-110" : "text-slate-300 dark:text-slate-700"}`} />
                                                        <span className={`text-[10px] font-black uppercase tracking-tight transition-colors duration-500 ${c.met ? "text-slate-600 dark:text-slate-300" : "text-slate-400 dark:text-slate-600"}`}>{c.label}</span>
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
                                    disabled={loading || !isValidEmail || !isStrongPassword}
                                    className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-[20px] shadow-2xl transition-all flex items-center justify-center gap-3 group active:scale-[0.98] disabled:opacity-50 disabled:grayscale uppercase tracking-widest text-sm"
                                >
                                    {loading ? (
                                        <>
                                            <LoaderCircle className="w-6 h-6 animate-spin" />
                                            Encrypting...
                                        </>
                                    ) : (
                                        <>
                                            Confirm Reset
                                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        </form>

                        <motion.div variants={itemVariants} className="mt-10 text-center">
                            <Link to="/login" className="text-slate-400 dark:text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-center gap-3">
                                <ArrowRight className="w-4 h-4 rotate-180" /> Back to Authorization
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ResetPassword;
