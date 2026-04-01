import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, ShieldCheck, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from '../api/api';
import { useAuthContext } from "../context/AuthContext";

const Contact = () => {
    const { isLoggedIn, token } = useAuthContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        Message: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { Email, Name, Message } = formData;
        
        if (!Email.trim() || !Name.trim() || !Message.trim()) {
            toast.warning("Please fill out all fields before sending.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await API.post("/contactUs/postQuery", formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (response.status === 200 || response.status === 201) {
                toast.success("Message sent successfully! We'll be in touch.");
                setFormData({ Name: "", Email: "", Message: "" });
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again later.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactMethods = [
        {
            icon: Phone,
            title: "Phone Support",
            detail: "+91 98765 43210",
            sub: "Mon-Fri from 8am to 8pm",
            color: "text-blue-500 dark:text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            icon: Mail,
            title: "Email Assistance",
            detail: "support@turfhub.com",
            sub: "We'll respond within 24 hours",
            color: "text-emerald-500 dark:text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            icon: MapPin,
            title: "Headquarters",
            detail: "Chennai, Tamil Nadu, India",
            sub: "Come say hello at our office",
            color: "text-purple-500 dark:text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-200 pt-28 pb-20 px-4 relative overflow-hidden selection:bg-blue-500/30 transition-colors duration-500">
            {/* Ambient Background Lights */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/5 dark:bg-blue-600/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/5 dark:bg-purple-600/10 blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-16 space-y-4 max-w-2xl mx-auto"
                >
                    <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
                        <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                        Get in <span className="text-blue-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:to-emerald-400">Touch</span>
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">
                        Have a question about booking an arena or want to partner with us?
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Left Side - Contact Info Cards */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 flex flex-col gap-4"
                    >
                        {contactMethods.map((method, idx) => {
                            const Icon = method.icon;
                            return (
                                <div 
                                    key={idx}
                                    className={`relative overflow-hidden p-6 rounded-[2.5rem] border ${method.border} bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl group hover:bg-white dark:hover:bg-slate-800/60 transition-all duration-300 shadow-sm hover:shadow-xl`}
                                >
                                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full ${method.bg} -mx-8 -my-8 blur-2xl opacity-30 group-hover:opacity-100 transition-opacity`} />
                                    
                                    <div className="relative z-10 flex items-start gap-5">
                                        <div className={`shrink-0 p-4 rounded-2xl ${method.bg} border ${method.border}`}>
                                            <Icon className={`w-6 h-6 ${method.color}`} />
                                        </div>
                                        <div>
                                            <h3 className="text-slate-900 dark:text-white font-black text-lg mb-1 uppercase tracking-tight">{method.title}</h3>
                                            <p className="text-slate-600 dark:text-slate-300 font-bold mb-1">{method.detail}</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{method.sub}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>

                    {/* Right Side - Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-3"
                    >
                        <div className="bg-white dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200 dark:border-white/5 p-8 sm:p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 opacity-50" />
                            
                            <div className="mb-8">
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Send us a message</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">Our team will get back to you within 24 hours.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] pl-1">Name</label>
                                        <input
                                            type="text"
                                            name="Name"
                                            value={formData.Name}
                                            onChange={handleInputChange}
                                            placeholder="Your Name"
                                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] pl-1">Email</label>
                                        <input
                                            type="email"
                                            name="Email"
                                            value={formData.Email}
                                            onChange={handleInputChange}
                                            placeholder="email@example.com"
                                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] pl-1">Message</label>
                                    <textarea
                                        name="Message"
                                        rows="5"
                                        value={formData.Message}
                                        onChange={handleInputChange}
                                        placeholder="How can we help you today?"
                                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700 resize-none"
                                    ></textarea>
                                </div>

                                <div className="pt-2">
                                    {isLoggedIn ? (
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-5 px-10 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:pointer-events-none uppercase tracking-widest text-sm"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    ) : (
                                        <div className="bg-blue-500/5 dark:bg-red-500/10 border-2 border-blue-500/10 dark:border-red-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                                            <div className="flex items-center gap-4 text-blue-600 dark:text-red-400">
                                                <ShieldCheck className="w-6 h-6 shrink-0" />
                                                <p className="text-sm font-black uppercase tracking-tight">Authentication required to send messages.</p>
                                            </div>
                                            <Link 
                                                to="/login"
                                                className="whitespace-nowrap bg-blue-600 dark:bg-red-500 hover:bg-blue-700 dark:hover:bg-red-400 text-white text-sm font-black py-3 px-8 rounded-xl transition-colors shadow-lg uppercase tracking-widest"
                                            >
                                                Sign In First
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
