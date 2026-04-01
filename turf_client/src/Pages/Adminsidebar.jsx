import { useState } from "react";
import { ChevronLeft, ChevronRight, LayoutDashboard, PlusSquare, MessageSquare, LogOut, ShieldAlert } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AdminSidebar = () => {
    const [open, setOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };

    const navItems = [
        { name: "Dashboard", path: "/adminPage", icon: LayoutDashboard },
        { name: "Add Turf", path: "/ground", icon: PlusSquare },
        { name: "Queries", path: "/queries", icon: MessageSquare },
    ];

    return (
        <motion.div 
            animate={{ width: open ? 260 : 80 }}
            className="sticky top-20 h-[calc(100vh-5rem)] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 overflow-hidden hidden md:flex z-10 shadow-xl"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 mb-4 border-b border-slate-100 dark:border-white/5 relative h-16">
                <div className={`flex items-center gap-3 overflow-hidden ${open ? "opacity-100 w-full" : "opacity-0 w-0"} transition-all duration-300`}>
                    <div className="p-1.5 bg-blue-600 rounded-lg shadow-lg">
                        <ShieldAlert className="w-5 h-5 text-white shrink-0" />
                    </div>
                    <span className="font-bold text-lg text-slate-900 dark:text-white whitespace-nowrap tracking-tight">Portal</span>
                </div>
                <button 
                    onClick={() => setOpen(!open)} 
                    className={`p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors absolute ${open ? "right-4" : "left-1/2 -translate-x-1/2"} z-20`}
                >
                    {open ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-2 px-3 overflow-y-auto overflow-x-hidden scrollbar-hide">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link 
                            key={item.path} 
                            to={item.path} 
                            title={!open ? item.name : ""}
                            className={`flex items-center py-3 px-3 rounded-xl transition-all duration-200 overflow-hidden ${
                                isActive 
                                    ? "bg-blue-600 border border-blue-500 text-white shadow-[0_4px_12px_rgba(37,99,235,0.2)]" 
                                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-transparent"
                            }`}
                        >
                            <item.icon className="w-5 h-5 shrink-0" />
                            <span className={`font-medium whitespace-nowrap pl-3 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 hidden"}`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-white/5">
                <button 
                    onClick={handleLogout} 
                    title={!open ? "Logout" : ""}
                    className={`w-full flex items-center py-3 px-3 rounded-xl hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 text-slate-500 dark:text-slate-400 transition-all duration-200 overflow-hidden border border-transparent hover:border-red-500/20 group ${!open && "justify-center"}`}
                >
                    <LogOut className="w-5 h-5 shrink-0 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                    <span className={`font-medium whitespace-nowrap pl-3 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 hidden"}`}>
                        Logout
                    </span>
                </button>
            </div>
        </motion.div>
    );
};

export default AdminSidebar;
