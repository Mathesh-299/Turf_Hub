import { motion } from "framer-motion";
import { useState } from "react";
import Confetti from "react-confetti";
import { toast } from "react-hot-toast";
import { FaArrowLeft, FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import API from "../api/api";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await API.get("/users/verifyUser", { params: { email } });
            if (response.status === 200) {
                toast.success("User verified! Enter your new password.");
                setStep(2);
            }
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || "User not found.";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await API.patch("/users/resetPassword", {
                email,
                newPassword,
            });
            if (response.status === 200) {
                toast.success("Password reset successfully!");
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 3000);
                setStep(1);
                setEmail("");
                setNewPassword("");
            }
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || "Error resetting password.";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-50 p-4 relative overflow-hidden">
            {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full max-w-md rounded-3xl p-8 bg-white/80 backdrop-blur-2xl shadow-2xl border border-white/40"
            >
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-tr from-blue-400 to-sky-500 opacity-20 blur-2xl"></div>

                <div className="relative z-10 flex flex-col gap-6">
                    <h1 className="text-2xl font-bold text-center text-slate-800">
                        {step === 1 ? "Verify Your Email" : "Reset Password"}
                    </h1>
                    <p className="text-center text-slate-500 text-sm">
                        {step === 1 ? "Enter your registered email to continue." : "Enter your new password below."}
                    </p>

                    <motion.form
                        onSubmit={step === 1 ? handleVerifyEmail : handleResetPassword}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col gap-5"
                    >
                        <div className="relative">
                            <FaEnvelope className="absolute top-4 left-4 text-slate-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={step === 2 || loading}
                                required
                                placeholder="Email"
                                className="pl-12 pr-4 py-3 w-full rounded-xl border border-slate-300 bg-white/90 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:bg-slate-100"
                            />
                        </div>

                        {step === 2 && (
                            <div className="relative">
                                <FaLock className="absolute top-4 left-4 text-slate-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    disabled={loading}
                                    required
                                    placeholder="New Password"
                                    className="pl-12 pr-12 py-3 w-full rounded-xl border border-slate-300 bg-white/90 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-3.5 right-4 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        )}

                        {error && (
                            <p className="text-center text-red-500 text-sm animate-pulse">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                            ) : step === 1 ? "Verify Email" : "Reset Password"}
                        </button>

                        {step === 2 && (
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                disabled={loading}
                                className="flex items-center justify-center gap-2 text-sm text-blue-600 hover:underline transition mt-2"
                            >
                                <FaArrowLeft /> Back to Email
                            </button>
                        )}
                    </motion.form>
                </div>
            </motion.div>
        </div>
    );
};

export default ResetPassword;
