import { motion } from "framer-motion";
import { Eye, EyeOff, LoaderCircleIcon, Lock, Mail, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";
import BgImage from "../assets/img/Security.jpg"; // 📷 Use your image here

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });
    const [buttonSubmit, setButtonSubmit] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);


    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isStrongPassword = (password) => {
        const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, phone, password } = form;
        if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
            toast.error("Please fill all fields");
            return;
        }
        if (!isValidEmail(email)) {
            toast.error("Please enter a valid email");
            return;
        }

        if (!isStrongPassword(password)) {
            toast.error("Password must be 8+ characters, include 1 uppercase, 1 number, and 1 special char");
            return;
        }

        setButtonSubmit(true);
        try {
            const response = await API.post("/users/register", form);
            if (response.status === 201) {
                toast.success(`Registered as ${name}`);
                setForm({ name: "", email: "", phone: "", password: "" });
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setButtonSubmit(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-black relative">
            <div className="absolute inset-0 z-0">
                <img
                    src={BgImage}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-xl z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 sm:p-10 shadow-2xl"
            >
                <div className="mb-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-800">
                        Welcome to <span className="text-green-700">Turf Hub</span>
                    </h2>
                    <p className="text-lg text-gray-600 mt-2">Create your account below</p>
                </div>


                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <User className="absolute top-3.5 left-4 text-green-600" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 text-green-900 border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute top-3.5 left-4 text-green-600" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 text-green-900 border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div className="relative">
                        <Phone className="absolute top-3.5 left-4 text-green-600" />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 text-green-900 border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute top-3 left-3 text-green-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full pl-10 pr-10 py-3 bg-white/80 text-gray-900 placeholder-gray-500 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-3 right-3 text-green-600 hover:text-green-800 transition"
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-xl shadow flex items-center justify-center gap-2"
                        disabled={buttonSubmit}
                    >
                        {buttonSubmit ? (
                            <>
                                <LoaderCircleIcon className="animate-spin" />
                                <span>Registering...</span>
                            </>
                        ) : (
                            <span>Register</span>
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-green-800 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-green-700 font-bold text-xl hover:underline"
                    >
                        Login here
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
