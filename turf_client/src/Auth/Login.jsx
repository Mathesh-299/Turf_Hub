import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";
import Phone from "../assets/img/Login.jpg";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { login } = useAuthContext();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { email, password } = form;
        if (!email.trim() || !password.trim()) {
            toast.warning("Please fill in all fields.");
            return;
        }
        
        setIsSubmitting(true);
        try {
            const response = await API.post('/users/login', form);
            if (response?.status === 200 || response?.status === 201) {
                toast.success("Successfully logged in!");
                login(response.data.user, response.data.token);
                setTimeout(() => {
                    setForm({ email: "", password: "" });
                    navigate("/");
                }, 1000);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
                        <Activity className="w-10 h-10 text-white animate-pulse" />
                    </div>
                    <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs animate-pulse">Loading experience</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 font-sans selection:bg-blue-500/30 transition-colors duration-500">
            {/* Left Side - Image/Branding (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 border-r border-slate-200 dark:border-white/5">
                <motion.div 
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={Phone}
                        alt="Turf Hub Background"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-40"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent mix-blend-multiply"></div>
                </motion.div>
                
                <div className="relative z-10 flex flex-col justify-end p-20 w-full text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                                <Activity className="w-7 h-7 text-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tight uppercase">Turf Hub</span>
                        </div>
                        <h1 className="text-6xl font-black tracking-tight mb-6 leading-tight">
                            Your Game.<br/>
                            <span className="text-blue-400">Our Ground.</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-md font-bold leading-relaxed">
                            Join the premier community of sports enthusiasts. Book world-class turfs seamlessly and elevate your performance.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative overflow-hidden">
                {/* Background ambient lights for right side */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-600/5 dark:bg-purple-600/10 blur-[120px] pointer-events-none" />

                <div className="w-full max-w-md relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, type: "spring", damping: 20 }}
                        className="bg-white dark:bg-slate-900/40 backdrop-blur-3xl p-10 sm:p-12 rounded-[3rem] shadow-2xl dark:shadow-none border border-slate-200 dark:border-white/5"
                    >
                        <div className="mb-12 lg:text-left text-center">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                                className="w-20 h-20 bg-slate-900 dark:bg-white rounded-3xl flex items-center justify-center mb-8 mx-auto lg:hidden shadow-2xl"
                            >
                                <Activity className="w-10 h-10 text-blue-500" />
                            </motion.div>
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Welcome Back</h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-2 font-bold uppercase tracking-widest text-[10px]">Access your elite athlete profile</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-3"
                            >
                                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] pl-1">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="you@domain.com"
                                        value={form.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-5 py-4.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-[20px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                        required
                                    />
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-3"
                            >
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] pl-1">Password</label>
                                    <Link to="/forgot-password" size="sm" className="text-[10px] font-black text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors uppercase tracking-widest">
                                        Forgot?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="••••••••"
                                        value={form.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-12 pr-14 py-4.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-[20px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-blue-500 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group relative w-full flex items-center justify-center gap-3 py-5 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl transition-all duration-300 disabled:opacity-70 disabled:pointer-events-none shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 uppercase tracking-widest text-sm"
                                >
                                    {isSubmitting ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-current/30 border-t-current"></div>
                                    ) : (
                                        <>
                                            Sign In
                                            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        </form>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-12 pt-8 border-t border-slate-100 dark:border-white/5 text-center"
                        >
                            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                                New to the arena?{" "}
                                <Link to="/register" className="text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Join now
                                </Link>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Login;
