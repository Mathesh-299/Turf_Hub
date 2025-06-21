import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [Submit, setSubmit] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.email.trim().length === 0 || form.password.trim().length === 0) {
            alert("Fill all the fields");
            setSubmit(false);
            return;
        }
        setSubmit(true);
        alert(`Logging in as ${form.email}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white/20 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-xl overflow-hidden">
                <div className="bg-blue-600 text-white py-6 px-6">
                    <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
                    <p className="text-sm text-center mt-1">Login to your Turf Hub account</p>
                </div>

                <div className="p-8 space-y-6 bg-white">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative">
                            <Mail className="absolute top-3 left-3 text-blue-600" />
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                // required
                                className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm text-blue-800 border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute top-3 left-3 text-blue-600" />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Password"
                                // required
                                className="w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm text-blue-800 border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-3 right-3 text-blue-600"
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow"
                        // onClick={() => setSubmit(true)}
                        >
                            {Submit ? <span>Loading...</span> : <span>Login</span>}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-700 font-semibold hover:underline"
                        >
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
