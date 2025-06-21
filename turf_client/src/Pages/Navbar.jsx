import { Menu, User2Icon, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const routes = ['/', '/about',  '/ground'];
    const pages = ['Home', 'About', 'Turf Ground'];
    const isLoggedIn = false;
    const role = 'user';

    return (
        <div className="w-full bg-gradient-to-r from-black via-gray-900 to-black fixed top-0 shadow-xl z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6">
                {isLoggedIn && role === 'admin' ? (
                    <Link to="/" className="text-3xl font-extrabold text-transparent bg-clip-text bg-blue-500 border-b-2 border-l-2 border-gray-50 border-r-2 px-2 py-1.5 rounded-lg">
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

                    <Link to="/login" className="flex items-center gap-2 hover:text-blue-300 transition">
                        <User2Icon />
                        <span>Login</span>
                    </Link>
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

                        <Link
                            to="/login"
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-blue-700/30 text-blue-300 border border-blue-400 hover:bg-blue-800/50 transition"
                        >
                            <User2Icon />
                            <span>Login</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
