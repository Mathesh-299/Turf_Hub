import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";

const TurfContactCard = ({ turf, ownerName }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-white/10 transition-colors duration-500"
        >
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded-full" />
                Contact Details
            </h2>

            <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 font-bold">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                        <FaPhone />
                    </div>
                    <span>{turf?.contactNumber || "+91 98765 43210"}</span>
                </div>

                <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 font-bold">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                        <FaMapMarkerAlt className="mt-0.5" />
                    </div>
                    <span className="leading-relaxed">
                        {turf?.address || turf?.location || "Address not available"}
                    </span>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 font-bold">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                        <FaUser />
                    </div>
                    <span>{ownerName || "Premium Partner"}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default TurfContactCard;
