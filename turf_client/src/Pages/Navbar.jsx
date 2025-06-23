import { LogOut, Menu, User2Icon, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const routes = ['/', '/about', '/ground'];
    const pages = ['Home', 'About', 'Turf Ground'];
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("token");
        localStorage.removeItem("user")
        navigate("/");
        window.location.reload();
    }
    return (
        <div className="w-full bg-gradient-to-r from-black via-gray-900 to-black fixed top-0 shadow-xl z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6">
                {isLoggedIn && user && user.role === 'admin' ? (
                    <Link to="/adminPage" className="text-3xl font-extrabold text-transparent bg-clip-text bg-blue-500 border-b-2 border-l-2 border-gray-50 border-r-2 px-2 py-1.5 rounded-lg">
                        Turf Hub
                    </Link>
                ) : (
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-blue-500 border-b-2 border-l-2 border-gray-50 border-r-2 px-2 py-1.5 rounded-lg">
                        Turf Hub
                    </h1>
                )}

                <div className="hidden md:flex gap-6 items-center font-mono text-white">
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
                    {(isLoggedIn && token && token.length > 0) ? (
                        <button onClick={handleLogout} className="flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-red-700/30 text-red-300 border border-red-400 hover:bg-red-800/50 transition">
                            <LogOut />
                            <span>
                                Logout
                            </span>
                        </button>
                    ) :

                        (<Link to="/login" className="flex items-center gap-2 hover:text-blue-300 transition">
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
                    <div className="relative bg-gray-900/90 backdrop-blur-md rounded-2xl p-6 w-11/12 max-w-xs shadow-2xl text-white font-mono flex flex-col gap-4 pt-10 animate-scaleFade">
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="absolute top-3 right-3 text-white hover:text-red-400 transition"
                        >
                            <X size={24} />
                        </button>

                        {routes.map((path, i) => (
                            <Link to={path} key={path} onClick={() => setMenuOpen(false)}>
                                <div className={`py-2 px-4 rounded-md text-center transition-all font-semibold
                                    ${location.pathname === path
                                        ? 'bg-blue-700/30 text-blue-300 border border-blue-400'
                                        : 'hover:bg-gray-800 hover:text-blue-300'}
                                `}>
                                    {pages[i]}
                                </div>
                            </Link>
                        ))}
                        {(isLoggedIn && token && token.length > 0) ? (
                            <button onClick={handleLogout} className="flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-red-700/30 text-red-300 border border-red-400 hover:bg-red-800/50 transition">
                                <LogOut />
                                <span>
                                    Logout
                                </span>
                            </button>
                        ) :
                            (< Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-blue-700/30 text-blue-300 border border-blue-400 hover:bg-blue-800/50 transition"
                            >
                                <User2Icon />
                                <span>Login</span>
                            </Link>
                            )}
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default Navbar;
