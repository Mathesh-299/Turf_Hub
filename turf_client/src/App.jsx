import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Login from "./Auth/Login"
import Register from "./Auth/Register"
import AdminPage from "./Components/AdminPage"
import Booking from "./Components/Booking"
import Queries from "./Components/Queries"
import Review from "./Components/Review"
import Turf from "./Components/Turf"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import Ground from "./Pages/Ground"
import Home from "./Pages/Home"
import Navbar from "./Pages/Navbar"
const App = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <>
            <ToastContainer position="top-right" autoClose={2000} />
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/ground" element={<Ground />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/queries" element={<Queries />} />
                    <Route path="/review" element={<Review />} />
                    {
                        isLoggedIn && user && user.role === "admin" && (
                            <Route path="/adminPage" element={<AdminPage />} />
                        )
                    }
                    {
                        isLoggedIn && user && (
                            <Route path="/turfParticular" element={<Turf />} />
                        )
                    }
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App