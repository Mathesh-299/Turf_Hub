import { motion } from "framer-motion";
import { Eye, EyeOff, LoaderCircle, Lock, Mail, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";
import BgImage from "../assets/img/Security.jpg";

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
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isStrongPassword = (password) =>
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

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
            toast.error("Password must be 8+ characters, 1 uppercase, 1 number, 1 special char");
            return;
        }
        setButtonSubmit(true);
        try {
            const response = await API.post("/users/register", form);
            if (response.status === 201) {
                toast.success(`Registered as ${name}`);
                setForm({ name: "", email: "", phone: "", password: "" });
                setTimeout(() => navigate("/login"), 1500);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setButtonSubmit(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-800 to-black">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-400 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center pt-24 px-4 bg-black relative overflow-hidden">
            <img
                src={BgImage}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl"
            >
                <div className="mb-6 text-center">
                    <h2 className="text-4xl font-bold text-white tracking-tight">
                        Create Your <span className="text-green-400">Turf Hub</span> Account
                    </h2>
                    <p className="text-sm text-gray-300 mt-2">Join the Turf Hub community today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <User className="absolute top-3.5 left-4 text-green-400" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 text-green-900 border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute top-3.5 left-4 text-green-400" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 text-green-900 border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div className="relative">
                        <Phone className="absolute top-3.5 left-4 text-green-400" />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 text-green-900 border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute top-3.5 left-4 text-green-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full pl-12 pr-10 py-3 rounded-xl bg-white/80 text-green-900 border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-3.5 right-4 text-green-600 hover:text-green-800 transition"
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={buttonSubmit}
                        className="w-full py-3 bg-gradient-to-tr from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        {buttonSubmit ? (
                            <>
                                <LoaderCircle className="animate-spin" />
                                Registering...
                            </>
                        ) : (
                            "Register"
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-300 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-400 hover:underline font-semibold">
                        Login here
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
