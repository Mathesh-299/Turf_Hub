import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admindash from "./adminside/Admindash";
import BookingDetailsPage from "./adminside/BookingDetailsPage";
import Managesing from "./adminside/Managesing";
import Paymentdetailspage from "./adminside/Paymentdetailspage";
import User from "./adminside/Uers";
import AdminPanel from "./content/AdminPanel";
import About from "./page/About";
import AdminLogin from "./page/AdminLogin";
import AdminRegister from "./page/AdminRegister";
import Contact from "./page/Contact";
import GroundBooking from "./page/GroundBooking";
import Groundpage from "./page/Groundpage";
import Home from "./page/Home";
import Login from "./page/Login";
import Main from "./page/Main";
import Register from "./page/Register";
import UserLogin from "./page/userlogin";
import Sports from "./sports/Sports";


const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if the user is logged in (e.g., by checking localStorage for a token)
        const storedUser = localStorage.getItem('adminToken');
        if (storedUser) {
            setUser(true); // or parse the user information if needed
        }
    }, []);

    const handleLogin = (userData) => {
        localStorage.setItem('adminToken', userData.token);
        setUser(true); // Set user state to logged in
    };

    // const handleLogout = () => {
    //     // Clear the user data (e.g., token) from localStorage
    //     localStorage.removeItem('adminToken');
    //     setUser(null); // Update the state to reflect that the user is logged out
    // };

    return (
        <div>
            <Router>
                {/* <Navbar user={user} onLogout={handleLogout} /> */}
                <div >
                    <ToastContainer position="top-right" autoClose={3000} />
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/sports" element={<Sports />} />
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/userlogin" element={<UserLogin onLogin={handleLogin} />} />
                        <Route path="/adminlogin" element={<AdminLogin onLogin={handleLogin} />} />
                        <Route path="/adminregister" element={<AdminRegister />} />
                        <Route path="/groundpage" element={<Groundpage />} />

                        <Route path="/main" element={<Main />} />
                        <Route path="/ground" element={<GroundBooking />} />
                        <Route path="/adminside" element={<AdminPanel />} >
                            <Route index element={<Admindash />} />
                            <Route path="users" element={<User />} />
                            <Route path="manage" element={<Managesing />} />
                            <Route path="payments" element={<Paymentdetailspage />} />
                            <Route path="bookings" element={<BookingDetailsPage />} />
                        </Route>
                    </Routes>
                </div>
                {/* Other components */}
            </Router>
        </div>
    );
};

export default App;
