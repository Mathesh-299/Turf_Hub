import { LogOut, LucideUserCircle, Menu, User2Icon, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // ✅ new state
    const navigate = useNavigate();
    const routes = ['/', '/about', '/ground'];
    const pages = ['Home', 'About', 'Turf Ground'];

    const user = JSON.parse(localStorage.getItem("user")) || {};
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logout successfully");
        navigate("/");
        window.location.reload();
    };

    return (
        <div className="w-full bg-gradient-to-r from-black via-gray-900 to-black fixed top-0 shadow-xl z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-6">
                {isLoggedIn && user?.role === 'admin' ? (
                    <Link to="/adminPage" className="text-3xl font-extrabold text-transparent bg-clip-text bg-blue-500 border-b-2 border-l-2 border-gray-50 border-r-2 px-2 py-1.5 rounded-lg">
                        Turf Hub
                    </Link>
                ) : (
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-blue-500 border-b-2 border-l-2 border-gray-50 border-r-2 px-2 py-1.5 rounded-lg">
                        Turf Hub
                    </h1>
                )}

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 items-center font-mono text-white relative">
                    {routes.map((path, i) => (
                        <Link to={path} key={path}>
                            <button className={`px-5 py-2 rounded-xl font-semibold transition duration-300
                                hover:bg-white/10 hover:text-blue-300
                                ${location.pathname === path
                                    ? 'border-b-2 border-gray-200 text-blue-300 bg-gray-800'
                                    : 'text-white'}
                            `}>
                                {pages[i]}
                            </button>
                        </Link>
                    ))}

                    {isLoggedIn && token && user ? (
                        <div className="relative">
                            <div
                                className="flex items-center gap-2 cursor-pointer hover:text-green-400"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <LucideUserCircle className="text-3xl text-white" />
                                <span className="text-white text-base font-medium">Profile</span>
                            </div>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-64 bg-neutral-900 text-white rounded-xl shadow-lg p-4 z-50">
                                    <div className="text-center border-b pb-3 mb-3">
                                        <LucideUserCircle className="mx-auto text-blue-700 text-4xl mb-1" />
                                        <p className="font-bold text-lg">{user?.name}</p>
                                        <p className="text-sm text-gray-600">{user?.email}</p>
                                        <p className="text-xs text-gray-500">{user?.role}</p>
                                    </div>

                                    <div
                                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100  hover:text-black cursor-pointer"
                                        onClick={() => {
                                            navigate("/profilePage", { state: user?.id });
                                            setIsDropdownOpen(false); 
                                        }}
                                    >
                                        <LucideUserCircle size={18} />
                                        <span className="text-sm font-bold">Profile Settings</span>
                                    </div>

                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsDropdownOpen(false);
                                        }}
                                        className="mt-3 flex items-center gap-2 px-3 py-2 rounded-md text-red-600 hover:bg-red-100 w-full"
                                    >
                                        <LogOut size={18} />
                                        <span className="text-sm font-medium">Sign out</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center gap-2 hover:text-blue-300 transition">
                            <User2Icon />
                            <span>Login</span>
                        </Link>
                    )}
                </div>

                <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {menuOpen && (
                <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center md:hidden">
                    <div className="relative bg-red-400/90 backdrop-blur-md rounded-2xl p-6 w-11/12 max-w-xs shadow-2xl text-white font-sans flex flex-col gap-6 pt-12">
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="absolute top-4 right-4 text-white hover:text-red-400 transition"
                        >
                            <X size={26} />
                        </button>

                        <div className="flex flex-col gap-3">
                            {routes.map((path, i) => (
                                <Link to={path} key={path} onClick={() => setMenuOpen(false)}>
                                    <div className={`py-2 px-4 rounded-lg text-center transition-all font-semibold
                                        ${location.pathname === path
                                            ? 'bg-blue-700/40 text-blue-300 border border-blue-500'
                                            : 'hover:bg-gray-800 hover:text-blue-300'}`}>
                                        {pages[i]}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {isLoggedIn && token && user ? (
                            <div className="w-full text-white space-y-4">
                                <div className="bg-white text-black rounded-xl p-4 text-center shadow-lg">
                                    <div className="flex flex-col items-center gap-1">
                                        <LucideUserCircle className="text-4xl text-blue-700" />
                                        <p className="text-lg font-semibold">{user?.name}</p>
                                        <p className="text-sm text-gray-600">{user?.email}</p>
                                    </div>
                                </div>

                                <div
                                    className="bg-white text-black rounded-lg p-3 flex items-center justify-center gap-2 font-medium hover:bg-gray-100 transition"
                                    onClick={() => {
                                        navigate("/profilePage", { state: user?.id });
                                        setMenuOpen(false);
                                    }}
                                >
                                    <LucideUserCircle size={18} />
                                    Profile Settings
                                </div>

                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMenuOpen(false);
                                    }}
                                    className="w-full text-center bg-white text-red-600 rounded-lg p-3 flex items-center justify-center gap-2 font-medium hover:bg-red-100 transition"
                                >
                                    <LogOut size={18} />
                                    Sign out
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-blue-700/30 text-blue-300 border border-blue-500 hover:bg-blue-800/40 transition"
                            >
                                <User2Icon />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
