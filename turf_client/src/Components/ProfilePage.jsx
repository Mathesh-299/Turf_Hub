import { CalendarDays, Loader2, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';
import API from '../api/api';

const ProfilePage = () => {
    const location = useLocation();
    const profileId = location.state;
    const token = localStorage.getItem("token");

    const [userData, setUserData] = useState(null);
    const [editEnable, setEditEnable] = useState(false);
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const [updateForm, setUpdateForm] = useState({
        name: "",
        lastName: "",
        phone: "",
        email: "",
        country: "",
        city: "",
        postalCode: ""
    });

    const handleChange = (e) => {
        setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const response = await API.patch(`/users/updateUserDetails/${profileId}`, updateForm, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200 || response.status === 202) {
                toast.success("Profile updated successfully!");
                setEditEnable(false);
                fetchUserData();
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile.");
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await API.get(`/users/getUserDetails/${profileId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = response.data.userDetails;
            setUserData(data);
            setUpdateForm({
                name: data.name || "",
                lastName: data.lastName || "",
                phone: data.phone || "",
                email: data.email || "",
                country: data.country || "",
                city: data.city || "",
                postalCode: data.postalCode || ""
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch user details.");
        } finally {
            setLoading(false);
        }
    };
    let toaster = false;
    const fetchBookings = async () => {
        try {
            const response = await API.get(`/booking/getUserBookings/${profileId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response)
            setBookings(response.data.booking || []);
        } catch (error) {
            console.error(error);
            if (!toaster) {
                toast.error("Failed to fetch bookings.");
                toaster = true;
            }
        }
    };

    useEffect(() => {
        if (profileId) {
            fetchUserData();
            fetchBookings();
        }
    }, [profileId, token]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-slate-50">
                <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-10 bg-gradient-to-b from-slate-50 to-slate-100">
            <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">

                <div className="bg-white/70 backdrop-blur rounded-3xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 border border-slate-200">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-semibold shadow-inner ring-4 ring-blue-300/30">
                        {userData.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="text-center md:text-left space-y-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                            {userData.name} {userData.lastName}
                        </h2>
                        <p className="text-slate-500 capitalize">{userData.role}</p>
                        <p className="text-slate-500">{userData.city}, {userData.country}</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-md p-6 space-y-5 border border-slate-200">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                        <h3 className="text-lg md:text-xl font-semibold text-slate-700">Personal Information</h3>
                        <button
                            onClick={() => setEditEnable(!editEnable)}
                            className="flex items-center gap-1 text-sm md:text-base bg-gradient-to-tr from-orange-500 to-orange-400 text-white px-4 py-1.5 rounded-full hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-orange-300"
                        >
                            <Pencil size={16} /> {editEnable ? "Close" : "Edit"}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-slate-700">
                        {[
                            { label: "First Name", value: userData.name },
                            { label: "Last Name", value: userData.lastName },
                            { label: "Email Address", value: userData.email },
                            { label: "Phone Number", value: userData.phone },
                            { label: "User Role", value: userData.role }
                        ].map((item, idx) => (
                            <div key={idx}>
                                <p className="text-sm text-slate-500">{item.label}</p>
                                <p className="font-medium break-words">{item.value || "-"}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-md p-6 space-y-5 border border-slate-200">
                    <h3 className="text-lg md:text-xl font-semibold text-slate-700 border-b pb-2 border-slate-200">Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-slate-700">
                        {[
                            { label: "Country", value: userData.country },
                            { label: "City", value: userData.city },
                            { label: "Postal Code", value: userData.postalCode }
                        ].map((item, idx) => (
                            <div key={idx}>
                                <p className="text-sm text-slate-500">{item.label}</p>
                                <p className="font-medium break-words">{item.value || "-"}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {editEnable && (
                    <div className="bg-white rounded-3xl shadow-md p-6 space-y-5 border border-slate-200 animate-fadeIn">
                        <h3 className="text-lg md:text-xl font-semibold text-slate-700 border-b pb-2 border-slate-200">Edit Profile</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {["name", "lastName", "email", "phone", "country", "city", "postalCode"].map((field) => (
                                <div key={field} className="flex flex-col gap-1">
                                    <label className="text-sm text-slate-500 capitalize">
                                        {field.replace(/([A-Z])/g, ' $1')}
                                    </label>
                                    <input
                                        type="text"
                                        name={field}
                                        value={updateForm[field]}
                                        onChange={handleChange}
                                        placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
                                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-slate-400 bg-white transition"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setEditEnable(false)}
                                className="px-4 py-2 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300 transition focus:outline-none focus:ring-2 focus:ring-slate-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 rounded-full bg-gradient-to-tr from-blue-600 to-blue-500 text-white hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-3xl shadow-md p-6 space-y-5 border border-slate-200">
                    <h3 className="text-lg md:text-xl font-semibold text-slate-700 border-b pb-2 border-slate-200 flex items-center gap-2">
                        <CalendarDays size={20} className="text-blue-500" /> My Bookings
                    </h3>
                    {bookings.length > 0 ? (
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                            {bookings.map((booking, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white/70 backdrop-blur p-3 rounded-lg space-y-1 shadow border border-slate-200 hover:bg-yellow-50 transition"
                                >
                                    <p className="font-semibold text-blue-700">
                                        {booking.turfId?.name} - ₹{booking.Amount} on {new Date(booking.date).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-neutral-900">Slots: {booking.timeRange}</p>
                                    <p className="text-sm text-neutral-500">Turf Price per Hr: {booking.turfId?.price}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-500 text-sm">No bookings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
