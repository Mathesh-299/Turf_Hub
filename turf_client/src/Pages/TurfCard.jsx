import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";

const TurfContactCard = ({ turf, ownerName }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
        >
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Contact</h2>

            <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                <FaPhone className="text-green-600" />
                <span>{turf?.contactNumber || "+91 98765 43210"}</span>
            </div>

            <div className="flex items-start gap-2 text-sm text-gray-700 mb-2">
                <FaMapMarkerAlt className="text-green-600 mt-0.5" />
                <span>
                    {turf?.address || "Address not available"}
                </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-700">
                <FaUser className="text-green-600" />
                <span>{ownerName || "Owner unknown"}</span>
            </div>
        </motion.div>
    );
};

export default TurfContactCard;
