import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/api";
import Phone from "../assets/img/Login.jpg";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [Submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        const { email, password } = form;
        if (!email.trim() || !password.trim()) {
            toast.warning("Please fill in all fields.");
            setSubmit(false);
            return;
        }
        try {
            const response = await API.post('/users/login', form);
            if (response?.status === 200 || response?.status === 201) {
                toast.success("Successfully logged in");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("user", JSON.stringify(response.data.user));
                setTimeout(() => {
                    setForm({ email: "", password: "" });
                    navigate("/");
                }, 1000);
            }
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
        } finally {
            setSubmit(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
            <img
                src={Phone}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-3xl p-8 shadow-2xl"
            >
                <div className="mb-6 text-center">
                    <h2 className="text-4xl font-bold tracking-tight">Welcome Back 👋</h2>
                    <p className="text-sm text-gray-300 mt-1">Login to your Turf Hub account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <Mail className="absolute top-3 left-3 text-blue-400" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 bg-white/80 text-gray-900 placeholder-gray-500 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute top-3 left-3 text-blue-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-10 py-3 bg-white/80 text-gray-900 placeholder-gray-500 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-3 right-3 text-blue-600 hover:text-blue-800 transition"
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={Submit}
                        className={`w-full py-3 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold transition-all duration-300 disabled:opacity-60 shadow-md hover:shadow-lg`}
                    >
                        {Submit ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-300 mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-400 hover:underline font-medium">
                        Register here
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
