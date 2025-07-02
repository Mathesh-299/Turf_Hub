import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from '../api/api';
const Contact = () => {
    const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        Message: "",
    })
    const token = localStorage.getItem("token");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { Email, Name, Message } = formData;
        if (Email.length === 0 || Name.length === 0 || Message.length === 0) {
            console.log("fill the details");
            return;
        }
        try {
            const response = await API.post("/contactUs/postQuery", formData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(response.status)
            if (response.status === 200) {
                toast.success("Message sent successfully!");
                setFormData({ Name: "", Email: "", Message: "" });
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error(error);
        }


    }
    return (
        <div className="min-h-screen pt-24 px-6 bg-gradient-to-b pb-10 from-purple-600 via-black/50 to-purple-900 text-gray-800">
            <div className="max-w-5xl mx-auto space-y-16 text-center">
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-400 to-blue-600 drop-shadow-md">
                        Contact Us
                    </h1>
                    <p className="text-lg text-white">
                        We're always happy to hear from you. Whether you have questions, feedback, or a partnership proposal —
                        reach out anytime!
                    </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border hover:border-green-400 transition">
                        <Phone className="mx-auto text-green-500 w-8 h-8 mb-3" />
                        <h2 className="text-lg font-semibold text-gray-800">Phone</h2>
                        <p className="text-gray-600 text-sm">+91 98765 43210</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border hover:border-blue-400 transition">
                        <Mail className="mx-auto text-blue-500 w-8 h-8 mb-3" />
                        <h2 className="text-lg font-semibold text-gray-800">Email</h2>
                        <p className="text-gray-600 text-sm">support@turfhub.com</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border hover:border-red-400 transition">
                        <MapPin className="mx-auto text-red-500 w-8 h-8 mb-3" />
                        <h2 className="text-lg font-semibold text-gray-800">Location</h2>
                        <p className="text-gray-600 text-sm">Chennai, Tamil Nadu, India</p>
                    </div>
                </div>

                <div className="mt-12">
                    <form className="bg-white/10 max-w-xl mx-auto p-8 rounded-2xl shadow-lg space-y-6 border"
                        onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold text-blue-600 mb-2">Send Us a Message</h2>
                        <input
                            type="text"
                            placeholder="Your Name"
                            name="Name"
                            value={formData.Name}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            name='Email'
                            value={formData.Email}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-4 py-2  focus:bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // required
                        />
                        <textarea
                            placeholder="Your Message"
                            rows="4"
                            name='Message'
                            value={formData.Message}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-4 py-2  focus:bg-white
                            text-black focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        // required
                        ></textarea>

                        {isLoggedIn ?
                            <button
                                type="submit"

                                className="px-6 py-2 bg-black hover:bg-white hover:text-black hover:font-bold text-white font-semibold rounded-md hover:opacity-90 transition"
                            >
                                Send Message
                            </button>

                            :
                            <Link to="/login">
                                <p className="text-red-500 text-xl text-center font-bold border-2 border-gray-600 max-w-fit hover:scale-105 py-1 px-2 rounded-full bg-white hover:bg-red-500 hover:text-white">Oops! Please log in first</p>
                            </Link>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
