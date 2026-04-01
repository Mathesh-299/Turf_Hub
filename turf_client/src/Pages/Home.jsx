import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, Clock, MapPin, PhoneCall, Shield, Star, Trophy, Users, Zap, CheckCircle2, Activity } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

const Home = () => {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    const features = [
        {
            icon: <Trophy className="w-8 h-8 text-blue-500" />,
            title: "Premium Turfs",
            description: "Experience state-of-the-art synthetic grass, FIFA-approved standards, and pro-level lighting for day and night play.",
            color: "from-blue-600 to-cyan-500"
        },
        {
            icon: <Zap className="w-8 h-8 text-amber-500" />,
            title: "Instant Booking",
            description: "No more waiting. Check real-time availability and secure your turf in less than 30 seconds with 100% confirmation.",
            color: "from-amber-500 to-orange-500"
        },
        {
            icon: <Shield className="w-8 h-8 text-emerald-500" />,
            title: "Secure Payments",
            description: "Seamless and secure transaction gateways. Pay via UPI, Cards, or Wallets with complete buyer protection.",
            color: "from-emerald-500 to-teal-500"
        }
    ];

    const stats = [
        { label: "Active Players", value: "10K+" },
        { label: "Premium Turfs", value: "50+" },
        { label: "Monthly Matches", value: "5,000+" },
        { label: "Partner Cities", value: "12" }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden font-sans selection:bg-blue-500/30 transition-colors duration-500">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 dark:bg-blue-600/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 dark:bg-indigo-600/20 blur-[120px]" />
            </div>

            {/* HERO SECTION */}
            <motion.section 
                style={{ y: yHero, opacity: opacityHero }}
                className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 px-6"
            >
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md mb-8 shadow-sm"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-300 tracking-wide">Now live in 12 cities across India</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-white dark:via-slate-200 dark:to-slate-500 mb-6 leading-tight"
                    >
                        Your Game.<br />
                        <span className="text-blue-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:to-indigo-500">Unleashed.</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium"
                    >
                        The ultimate destination for athletes. Discover top-tier turfs, book instantly, and elevate your gameplay with the most advanced sports infrastructure platform.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                    >
                        <button 
                            onClick={() => navigate('/ground')}
                            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 group active:scale-95"
                        >
                            Book a Turf
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button 
                            onClick={() => navigate('/about')}
                            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-2xl font-bold text-lg transition-all backdrop-blur-md flex items-center justify-center gap-2 active:scale-95 shadow-sm"
                        >
                            <Activity className="w-5 h-5 text-blue-500" />
                            Learn More
                        </button>
                    </motion.div>
                </div>
            </motion.section>

            {/* STATS STRIP */}
            <motion.section 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative z-10 px-6 py-10 border-y border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/5 backdrop-blur-xl"
            >
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-slate-200 dark:divide-white/5">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center px-4">
                            <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</h3>
                            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* FEATURES SECTION */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4"
                        >
                            Why Choose <span className="text-blue-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:to-indigo-500">Turf Hub?</span>
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium"
                        >
                            Built for performance, designed for convenience. We provide everything you need to focus on what matters: the game.
                        </motion.p>
                    </div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {features.map((feature, index) => (
                            <motion.div 
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className="group relative bg-white dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[32px] p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden shadow-sm"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-5 dark:opacity-20 blur-[50px] group-hover:opacity-40 transition-opacity duration-500`} />
                                
                                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="relative z-10 py-24 px-6 bg-slate-100/50 dark:bg-black/20">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-2 gap-16 items-center"
                    >
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                                Book your turf in <br />
                                <span className="text-emerald-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-emerald-400 dark:to-cyan-400">3 simple steps.</span>
                            </h2>
                            <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 font-medium">
                                Stop making phone calls and dealing with double bookings. Our intelligent platform handles everything smoothly.
                            </p>

                            <div className="space-y-8">
                                {[
                                    { icon: <MapPin className="w-6 h-6" />, title: "Find a Location", desc: "Browse high-quality arenas near you with verified reviews." },
                                    { icon: <Calendar className="w-6 h-6" />, title: "Select a Slot", desc: "Pick your preferred date and time from real-time availability." },
                                    { icon: <CheckCircle2 className="w-6 h-6" />, title: "Confirm & Play", desc: "Pay securely online and grab your gear. You're ready to win." }
                                ].map((step, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.2 }}
                                        className="flex gap-4"
                                    >
                                        <div className="w-14 h-14 shrink-0 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shadow-sm">
                                            {step.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black text-slate-900 dark:text-white mb-1">{step.title}</h4>
                                            <p className="text-slate-500 dark:text-slate-400 font-medium">{step.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-emerald-600/10 dark:from-blue-600/30 dark:to-emerald-600/30 blur-[80px] rounded-full" />
                            <div className="relative bg-white dark:bg-slate-800/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[40px] p-8 shadow-2xl overflow-hidden">
                                {/* Mock UI inside phone/browser frame */}
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                    </div>
                                    <div className="h-6 w-32 bg-slate-100 dark:bg-white/5 rounded-full" />
                                </div>
                                <div className="space-y-4">
                                    <div className="h-40 bg-slate-50 dark:bg-slate-700/50 rounded-2xl animate-pulse" />
                                    <div className="flex justify-between items-center">
                                        <div className="h-6 w-32 bg-slate-50 dark:bg-slate-700/50 rounded-lg" />
                                        <div className="flex gap-1">
                                            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />)}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-3">
                                        {[1,2,3,4].map(i => <div key={i} className="h-10 bg-slate-50 dark:bg-slate-700/50 rounded-lg animate-pulse" />)}
                                    </div>
                                    <div className="h-14 bg-blue-600 rounded-2xl mt-4 shadow-lg shadow-blue-500/20" />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA & FOOTER */}
            <section className="relative z-10 pt-24 pb-8 px-6 border-t border-slate-200 dark:border-white/5">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-[48px] p-10 md:p-16 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10 leading-tight">Ready to hit the field?</h2>
                        <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10 font-medium">
                            Join thousands of players taking advantage of zero booking fees and instant confirmations today.
                        </p>
                        <button 
                            onClick={() => navigate('/register')}
                            className="bg-white text-blue-600 hover:bg-slate-50 px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-black/20 transition-transform hover:scale-105 active:scale-95 relative z-10 uppercase tracking-widest"
                        >
                            Create Free Account
                        </button>
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-sm font-medium">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-black text-slate-900 dark:text-white text-2xl tracking-tight">Turf Hub</span>
                    </div>
                    <div className="flex items-center gap-8">
                        <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">Support</Link>
                        <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
                        <Link to="/ground" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Turfs</Link>
                    </div>
                    <p className="font-bold">© {new Date().getFullYear()} Turf Hub. Designed for athletes.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
