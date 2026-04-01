import { AnimatePresence, motion } from 'framer-motion';
import { 
    LogOut, 
    User, 
    Menu, 
    X, 
    Activity, 
    ChevronDown, 
    Settings, 
    MapPin, 
    Info, 
    Home,
    Moon,
    Sun
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Arenas', path: '/ground' }
    ];

    const { isLoggedIn, user, token, logout } = useAuthContext();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
        setIsDropdownOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header 
            className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
                scrolled 
                    ? "bg-white/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-white/5 py-3 shadow-2xl backdrop-blur-2xl" 
                    : "bg-transparent py-6"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-10 flex justify-between items-center">
                {/* Logo */}
                <Link 
                    to={isLoggedIn && user?.role === 'admin' ? "/adminPage" : "/"} 
                    className="flex items-center gap-3 group"
                >
                    <div className="w-12 h-12 bg-slate-900 dark:bg-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-500 shadow-xl shadow-blue-500/10">
                        <Activity className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-black text-slate-900 dark:text-white tracking-widest uppercase hidden sm:block">Turf Hub</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-10">
                    <nav className="flex items-center gap-8">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link 
                                    to={item.path} 
                                    key={item.path}
                                    className="relative px-1 py-1"
                                >
                                    <span className={`text-sm font-black transition-all duration-300 uppercase tracking-widest ${
                                        isActive ? "text-blue-600 dark:text-white" : "text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white"
                                    }`}>
                                        {item.name}
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-1.5 left-0 right-0 h-1 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.8)]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Theme Toggle & Auth Section */}
                    <div className="flex items-center gap-6 border-l border-slate-200 dark:border-white/10 pl-8">
                        {/* Theme Toggle */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={toggleTheme}
                            className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-all border border-slate-200 dark:border-white/10 shadow-sm"
                        >
                            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                        </motion.button>

                        {isLoggedIn && token && user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-white/5 p-1.5 pr-4 rounded-2xl transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                                >
                                    <div className="w-10 h-10 bg-slate-900 dark:bg-blue-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all">
                                        <span className="text-sm font-black text-white uppercase">
                                            {user?.name?.charAt(0) || 'U'}
                                        </span>
                                    </div>
                                    <span className="text-sm font-black text-slate-900 dark:text-white max-w-[100px] truncate uppercase tracking-tight">
                                        {user?.name}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-500 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                            transition={{ duration: 0.3, type: "spring", damping: 20 }}
                                            className="absolute right-0 mt-4 w-72 bg-white dark:bg-slate-900/95 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-2xl overflow-hidden p-2"
                                        >
                                            <div className="p-5 border-b border-slate-100 dark:border-white/5">
                                                <p className="font-black text-slate-900 dark:text-white truncate uppercase tracking-tight">{user?.name}</p>
                                                <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate font-black mt-0.5 uppercase tracking-widest">{user?.email}</p>
                                                <div className="mt-4 flex">
                                                    <span className="px-3 py-1 bg-blue-600 text-[10px] font-black text-white rounded-full uppercase tracking-widest">
                                                        {user?.role || 'User'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-2 space-y-1">
                                                <button
                                                    onClick={() => navigate("/profilePage", { state: user?.id })}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black text-slate-600 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-all uppercase tracking-widest"
                                                >
                                                    <Settings className="w-4 h-4" />
                                                    Settings
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black text-red-500 hover:text-white hover:bg-red-500 rounded-2xl transition-all uppercase tracking-widest shadow-red-500/20"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link 
                                to="/login" 
                                className="flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl text-xs font-black transition-all shadow-xl hover:shadow-blue-600/20 hover:-translate-y-0.5 uppercase tracking-[0.1em]"
                            >
                                <User className="w-4 h-4" />
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Controls */}
                <div className="flex md:hidden items-center gap-4">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleTheme}
                        className="p-3 rounded-2xl bg-white dark:bg-white/5 text-slate-900 dark:text-white shadow-xl shadow-black/5"
                    >
                        {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                    </motion.button>
                    
                    <button 
                        onClick={() => setMenuOpen(!menuOpen)} 
                        className="p-3 bg-slate-900 text-white rounded-2xl shadow-xl z-50 relative active:scale-95 transition-all"
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-3xl md:hidden flex flex-col pt-32 px-10"
                    >
                        <nav className="flex flex-col gap-4">
                            {navItems.map((item, i) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.1 }}
                                        key={item.path}
                                    >
                                        <Link 
                                            to={item.path}
                                            className={`flex items-center p-6 rounded-3xl text-2xl font-black uppercase tracking-tighter transition-all ${
                                                isActive 
                                                    ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30' 
                                                    : 'text-slate-900 dark:text-white bg-slate-50 dark:bg-white/5 hover:bg-slate-100'
                                            }`}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </nav>

                        <div className="mt-auto pb-16 space-y-6">
                            {isLoggedIn && token && user ? (
                                <motion.div 
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center gap-5 bg-slate-50 dark:bg-white/5 p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-inner">
                                        <div className="w-14 h-14 bg-slate-900 dark:bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                                            <span className="text-2xl font-black text-white uppercase">
                                                {user?.name?.charAt(0) || 'U'}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-black text-xl text-slate-900 dark:text-white uppercase tracking-tight">{user?.name}</p>
                                            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{user?.email}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => navigate("/profilePage", { state: user?.id })}
                                            className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-white/5 text-slate-900 dark:text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-sm active:scale-95 transition-all"
                                        >
                                            <Settings className="w-6 h-6 text-blue-600" />
                                            Settings
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="flex flex-col items-center justify-center gap-3 p-6 bg-red-500/10 text-red-500 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-sm active:scale-95 transition-all"
                                        >
                                            <LogOut className="w-6 h-6" />
                                            Sign Out
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <Link
                                        to="/login"
                                        className="w-full flex flex-col items-center justify-center gap-4 p-8 bg-slate-900 text-white rounded-[2.5rem] font-black shadow-2xl uppercase tracking-widest"
                                    >
                                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                                            <User className="w-6 h-6" />
                                        </div>
                                        Join Turf Hub
                                    </Link>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
