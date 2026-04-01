import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Activity, ArrowRight, Calendar, Mail, MapPin, PhoneCall, Shield, Star, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";

// 3D Interactive Card Component
const TiltCard = ({ children, className, gradient }) => {
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    
    // Smooth spring physics for rotation
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);
    
    // Map mouse position (0 to 1) to rotation angles (-15deg to 15deg)
    const rotateX = useTransform(y, [0, 1], [12, -12]);
    const rotateY = useTransform(x, [0, 1], [-12, 12]);
    // Parallax effect for the inner glow/shadow
    const shadowX = useTransform(x, [0, 1], [-20, 20]);
    const shadowY = useTransform(y, [0, 1], [-20, 20]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const posX = (e.clientX - rect.left) / rect.width;
        const posY = (e.clientY - rect.top) / rect.height;
        mouseX.set(posX);
        mouseY.set(posY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    return (
        <div style={{ perspective: 1200 }} className="w-full">
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`relative rounded-[2.5rem] border border-slate-200 dark:border-white/10 overflow-hidden transition-colors duration-500 ${className}`}
            >
                {/* Dynamic Background Glow mapped to mouse */}
                <motion.div 
                    style={{ x: shadowX, y: shadowY }}
                    className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 dark:opacity-20 blur-3xl`}
                />
                
                {/* 3D Content Container */}
                <div style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }} className="relative z-10 w-full h-full p-8 md:p-10">
                    {children}
                </div>
                
                <div className="absolute inset-0 bg-slate-50/10 dark:bg-slate-900/40 pointer-events-none" />
            </motion.div>
        </div>
    );
};

const About = () => {
    const values = [
        {
            icon: <Users className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
            title: "Community Driven",
            desc: "Connecting thousands of sports enthusiasts across the nation through one seamless, unified platform.",
            gradient: "from-blue-600 to-indigo-600"
        },
        {
            icon: <Calendar className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />,
            title: "Real-Time Booking",
            desc: "Eliminating double-bookings with an intelligent, split-second synchronized availability engine.",
            gradient: "from-emerald-600 to-teal-600"
        },
        {
            icon: <Trophy className="w-10 h-10 text-amber-600 dark:text-amber-400" />,
            title: "Premium Venues",
            desc: "Rigorous quality checks ensure you only play on FIFA-approved synthetics and pro-grade arenas.",
            gradient: "from-amber-600 to-orange-600"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 overflow-hidden font-sans selection:bg-blue-500/30 transition-colors duration-500">
            {/* Immersive 3D Background */}
            <div className="fixed inset-0 z-0 pointer-events-none perspective-[2000px]">
                {/* Rotating abstract grid/floor */}
                <motion.div 
                    animate={{ rotateZ: 360 }}
                    transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"
                />
                <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-blue-600/5 dark:bg-blue-600/20 blur-[150px] mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full bg-emerald-600/5 dark:bg-emerald-600/10 blur-[150px] mix-blend-screen" />
            </div>

            <div className="relative z-10 pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    
                    {/* Hero Section */}
                    <div className="flex flex-col items-center text-center space-y-8 mb-32">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <span className="inline-block py-2 px-6 rounded-full bg-blue-600/10 dark:bg-white/5 border border-blue-500/20 dark:border-white/10 text-blue-600 dark:text-emerald-400 font-black tracking-widest text-xs uppercase mb-6 shadow-sm">
                                Redefining Sports Tech
                            </span>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:via-slate-200 dark:to-slate-500 tracking-tight leading-tight">
                                Our Mission to <br className="hidden md:block"/>
                                <span className="text-blue-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">Elevate the Game.</span>
                            </h1>
                        </motion.div>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 1 }}
                            className="max-w-3xl text-lg md:text-2xl text-slate-500 dark:text-slate-400 font-bold leading-relaxed"
                        >
                            Turf Hub isn't just a booking tool. It's an entire ecosystem designed to remove the friction between you and the pitch. Real-time sync, secure payments, and premium locations.
                        </motion.p>
                    </div>

                    {/* 3D Value Proposition Grid */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-32">
                        {values.map((val, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: idx * 0.2, duration: 0.6 }}
                            >
                                <TiltCard className="bg-white dark:bg-slate-900/50 backdrop-blur-md h-full shadow-xl dark:shadow-none" gradient={val.gradient}>
                                    <div style={{ transform: "translateZ(30px)" }} className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-8 shadow-sm">
                                        {val.icon}
                                    </div>
                                    <h2 style={{ transform: "translateZ(40px)" }} className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">
                                        {val.title}
                                    </h2>
                                    <p style={{ transform: "translateZ(20px)" }} className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                                        {val.desc}
                                    </p>
                                    
                                    {/* Decorative 3D elements */}
                                    <div style={{ transform: "translateZ(60px)" }} className="absolute -bottom-4 -right-4 text-[10rem] opacity-[0.03] font-black pointer-events-none select-none">
                                        0{idx + 1}
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>

                    {/* Grand Stand Section */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-[3.5rem] p-1 md:p-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mb-32 shadow-2xl overflow-hidden group"
                    >
                        {/* Animated gradient border effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-emerald-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-xl" />
                        
                        <div className="relative bg-white dark:bg-slate-950/90 backdrop-blur-3xl rounded-[3.4rem] p-10 md:p-20 flex flex-col items-center text-center overflow-hidden">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[300px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
                            
                            <Shield className="w-16 h-16 text-blue-600 dark:text-indigo-400 mb-8 drop-shadow-[0_0_15px_rgba(37,99,235,0.3)]" />
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Built for the Players.</h2>
                            <p className="max-w-2xl text-xl text-slate-600 dark:text-slate-300 font-bold mb-12">
                                For over a year, we've refined our algorithms to ensure the fastest checkout speed, zero hidden fees, and absolute reliability. When it's game time, we've got your back.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
                                <Link to="/ground" className="px-10 py-5 rounded-2xl bg-blue-600 text-white font-black text-lg hover:scale-105 transition-transform shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3 uppercase tracking-widest">
                                    Browse Venues <ArrowRight className="w-6 h-6" />
                                </Link>
                                <Link to="/contact" className="px-10 py-5 rounded-2xl border-2 border-slate-200 dark:border-white/20 text-slate-900 dark:text-white font-black text-lg hover:bg-slate-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-3 backdrop-blur-md uppercase tracking-widest">
                                    Contact Team
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Next Gen Footer */}
            <footer className="relative border-t border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 pt-16 pb-8 overflow-hidden z-20 transition-colors duration-500">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.05),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.1),transparent_50%)] pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 relative flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Turf Hub</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-500 max-w-xs mb-2 font-bold uppercase tracking-tighter text-xs">Architecting the future of sports accessibility.</p>
                        <p className="text-blue-600 dark:text-slate-600 text-sm font-black uppercase tracking-widest">Crafted by Mathesh.</p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-6 text-slate-400">
                        <div className="flex flex-wrap justify-center gap-8">
                            <a href="tel:+919876543210" className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-white transition-colors group">
                                <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors border border-slate-200 dark:border-white/5">
                                    <PhoneCall className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                                </div>
                                <span className="font-bold text-slate-900 dark:text-slate-300">+91 98765 43210</span>
                            </a>
                            <a href="mailto:support@turfhub.com" className="flex items-center gap-3 hover:text-emerald-600 dark:hover:text-white transition-colors group">
                                <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 transition-colors border border-slate-200 dark:border-white/5">
                                    <Mail className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                                </div>
                                <span className="font-bold text-slate-900 dark:text-slate-300">support@turfhub.com</span>
                            </a>
                        </div>
                        <p className="text-slate-400 dark:text-slate-700 text-[10px] font-black uppercase tracking-widest mt-4">© {new Date().getFullYear()} Turf Hub Networks Pvt Ltd.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default About;
