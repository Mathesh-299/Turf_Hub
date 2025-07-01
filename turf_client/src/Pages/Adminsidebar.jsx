import { useState } from "react";
import { FaGreaterThan, FaHome, FaLessThan, FaPlus, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className={`bg-gradient-to-tl from-gray-300 via-amber-700 to-gray-900 text-white h-[100vh] p-4 transition-all duration-300 flex flex-col ${open ? "w-64" : "w-16"}`}>
            <div className="flex justify-between items-center mb-6">
                <h1 className={`text-xl font-bold ${open ? "" : "hidden"}`}>Admin</h1>
                <button onClick={() => setOpen(!open)} className="focus:outline-none text-xl">
                    {open ? <FaLessThan /> : <FaGreaterThan />}
                </button>
            </div>
            <nav className="flex flex-col gap-4">
                <Link to="/adminPage" className="flex items-center gap-2 hover:bg-blue-600 p-2 rounded">
                    <FaHome />
                    {open && <span>Dashboard</span>}
                </Link>
                <Link to="/ground" className="flex items-center gap-2 hover:bg-blue-600 p-2 rounded">
                    <FaPlus />
                    {open && <span>Add Turf</span>}
                </Link>
                <Link to="/queries" className="flex items-center gap-2 hover:bg-blue-600 p-2 rounded">
                    <FaQuestionCircle />
                    {open && <span>Queries</span>}
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 hover:bg-blue-600 p-2 rounded mt-auto">
                    <FaSignOutAlt />
                    {open && <span>Logout</span>}
                </button>
            </nav>
        </div>
    );
};

export default AdminSidebar;
