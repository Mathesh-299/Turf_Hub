import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gray-900 text-white fixed top-0 w-full shadow-lg z-50 transition-all duration-300">
            <div className="container mx-auto flex justify-between items-center py-5 px-8">
                <Link to="/" className="text-4xl font-extrabold">
                    <span className="text-red-500">Turf</span>
                    <span className="text-yellow-500">Hub</span>
                </Link>

                <div className="hidden md:flex items-center space-x-10">
                    <NavLink to="/" className="text-lg font-semibold hover:text-green-400 transition duration-300">Home</NavLink>
                    <NavLink to="/about" className="text-lg font-semibold hover:text-green-400 transition duration-300">About</NavLink>
                    <NavLink to="/contact" className="text-lg font-semibold hover:text-green-400 transition duration-300">Contact</NavLink>
                    <NavLink to="/sports" className="text-lg font-semibold hover:text-green-400 transition duration-300">Booking</NavLink>
                    <Link to="/login">
                        <FaUserCircle className="text-4xl transition duration-300 hover:text-green-400" />
                    </Link>
                </div>

                <button onClick={toggleMenu} className="md:hidden text-4xl">
                    {isMenuOpen ? '✖' : '☰'}
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden flex flex-col items-center bg-gray-800 py-6 space-y-4 animate__animated animate__fadeIn animate__faster">
                    <NavLink to="/" className="text-xl font-semibold py-2 text-white hover:text-green-400" onClick={toggleMenu}>Home</NavLink>
                    <NavLink to="/about" className="text-xl font-semibold py-2 text-white hover:text-green-400" onClick={toggleMenu}>About</NavLink>
                    <NavLink to="/contact" className="text-xl font-semibold py-2 text-white hover:text-green-400" onClick={toggleMenu}>Contact</NavLink>
                    <NavLink to="/sports" className="text-xl font-semibold py-2 text-white hover:text-green-400" onClick={toggleMenu}>Booking</NavLink>
                    <Link to="/login" className="text-white mt-4 hover:text-green-400">
                        <FaUserCircle className="text-5xl transition duration-300" />
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
