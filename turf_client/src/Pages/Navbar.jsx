import { LogOut, LucideUserCircle, Menu, User2Icon, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const routes = ['/', '/about', '/ground'];
    const pages = ['Home', 'About', 'Turf Ground'];
    const navigate = useNavigate();
    const user = useMemo(() => JSON.parse(localStorage.getItem("user")));
    const isLoggedIn = useMemo(() => localStorage.getItem("isLoggedIn") === "true");
    const token = useMemo(() => localStorage.getItem("token"));
    // console.log(user.id);
    const handleLogout = () => {
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("token");
        localStorage.removeItem("user")
        toast.success("Logout successfully")
        navigate("/");
        window.location.reload();
    }
    return (
        <div className="w-full bg-gradient-to-r from-black via-gray-900 to-black fixed top-0 shadow-xl z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center h-20 px-6">
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
                        <>
                            <Link to="/profilePage" state={user?.id}>
                                <div className="flex items-center gap-2 cursor-pointer group">
                                    <LucideUserCircle className="text-3xl text-white group-hover:text-green-400 transition duration-200" />
                                    <span className="text-white group-hover:text-green-400 text-base font-medium">Profile</span>
                                </div>
                            </Link>
                            <button onClick={handleLogout} className="flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-red-700/30 text-red-300 border border-red-400 hover:bg-red-800/50 transition">
                                <LogOut />
                                <span>
                                    Logout
                                </span>
                            </button>
                        </>
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
                                            : 'hover:bg-gray-800 hover:text-blue-300'}
                    `}>
                                        {pages[i]}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {(isLoggedIn && token && token.length > 0 && user) ? (
                            <>
                                <Link to="/profilePage" state={user?.id} onClick={() => setMenuOpen(false)}>
                                    <div className="flex justify-center items-center gap-3 px3 py-1 rounded-lg hover:bg-gray-800 hover:text-green-400 transition cursor-pointer">
                                        <LucideUserCircle className="text-2xl" />
                                        <span className="text-base font-medium">Profile</span>
                                    </div>
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMenuOpen(false);
                                    }}
                                    className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-red-700/30 text-red-300 border border-white hover:bg-red-800/40 transition"
                                >
                                    <LogOut className='text-white' />
                                    <span className='text-white'>Logout</span>
                                </button>
                            </>
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
            )
            }
        </div >
    );
};

export default Navbar;
