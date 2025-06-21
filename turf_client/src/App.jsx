import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Auth/Login"
import Register from "./Auth/Register"
import Booking from "./Components/Booking"
import Queries from "./Components/Queries"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import Ground from "./Pages/Ground"
import Home from "./Pages/Home"
import Navbar from "./Pages/Navbar"
const App = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/ground" element={<Ground/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/queries" element={<Queries />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App