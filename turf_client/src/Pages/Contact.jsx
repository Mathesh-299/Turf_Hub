import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        Message: "",

    })
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.Email.trim().length === 0 || formData.Name.trim().length === 0 || formData.Message.trim().length === 0) {
            alert("Fill the all details");
            return;
        }
        console.log(formData);
        setFormData({
            Name: "",
            Email: "",
            Message: "",
        })
    }
    return (
        <div className="min-h-screen pt-24 px-6 bg-gradient-to-b from-white to-gray-100 text-gray-800">
            <div className="max-w-5xl mx-auto space-y-16 text-center">
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-400 to-blue-600 drop-shadow-md">
                        Contact Us
                    </h1>
                    <p className="text-lg text-gray-700">
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
                    <form className="bg-white max-w-xl mx-auto p-8 rounded-2xl shadow-lg space-y-6 border"
                    onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold text-blue-600 mb-2">Send Us a Message</h2>
                        <input
                            type="text"
                            placeholder="Your Name"
                            name="Name"
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            // required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            name='Email'
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            // required
                        />
                        <textarea
                            placeholder="Your Message"
                            rows="4"
                            name='Message'
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            // required
                        ></textarea>
                        <button
                            type="submit"
                            
                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-red-500 text-white font-semibold rounded-md hover:opacity-90 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
