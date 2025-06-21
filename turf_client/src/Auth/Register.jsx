import { Lock, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Registered as ${form.name}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white/50 px-4">
            <div className="w-full max-w-xl bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 sm:p-10">
                <h2 className="text-4xl font-extrabold text-center text-green-900 mb-8">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <User className="absolute top-3.5 left-4 text-green-600" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            required
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
                            required
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
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 text-green-900 border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute top-3.5 left-4 text-green-600" />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 text-green-900 border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-xl shadow"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-sm text-green-800 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-green-700 font-bold hover:underline"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
