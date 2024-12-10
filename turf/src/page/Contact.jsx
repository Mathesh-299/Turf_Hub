import React, { useState } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaPen,
  FaPhoneAlt,
  FaUserCircle,
  FaWhatsapp,
} from "react-icons/fa";
import { TbX } from "react-icons/tb";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message || !phone) {
      toast.error("All fields are required.");
    } else if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
    } else {
      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="bg-red-500  text-white py-10 text-center shadow-lg">
        <h1 className="text-5xl font-extrabold tracking-tight">Contact Us</h1>
        <p className="mt-3 text-lg font-medium">
          We're here to help! Reach out for any queries or support.
        </p>
      </header>

      {/* Contact Information */}
      <section className="p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              Icon: FaPhoneAlt,
              title: "Call Us",
              description: "+91 98765 43210",
            },
            {
              Icon: FaEnvelope,
              title: "Email Us",
              description: "support@turfhub.com",
            },
            {
              Icon: FaMapMarkerAlt,
              title: "Visit Us",
              description: "123 Turfhub Lane, Chennai, Tamil Nadu, India",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 transform transition-transform duration-300"
            >
              <item.Icon className="text-red-500 text-5xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <p className="mt-2 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-200 py-8">
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              {
                placeholder: "Enter your name",
                value: name,
                setValue: setName,
                Icon: FaUserCircle,
              },
              {
                placeholder: "Enter your email",
                value: email,
                setValue: setEmail,
                Icon: FaEnvelope,
              },
              {
                placeholder: "Enter your phone number",
                value: phone,
                setValue: setPhone,
                Icon: FaPhoneAlt,
              },
            ].map((field, index) => (
              <div key={index} className="relative">
                <field.Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl" />
                <input
                  type="text"
                  placeholder={field.placeholder}
                  className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                />
              </div>
            ))}
            <div className="relative">
              <FaPen className="absolute left-4 top-4 text-gray-500 text-2xl" />
              <textarea
                rows="5"
                placeholder="Type your message here"
                className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-[50%] bg-red-500 text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity duration-300 mx-auto block"
            >
              Submit
            </button>
          </form>
        </div>
      </section>


      {/* Social Media */}
      <section className="py-6 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Follow Us</h2>
          <div className="flex justify-center space-x-8">
            {[
              {
                href: "https://facebook.com/turfhub",
                Icon: FaFacebook,
                color: "#1877F2", // Facebook blue
              },
              {
                href: "https://instagram.com/turfhub",
                Icon: FaInstagram,
                color: "#E1306C", // Instagram gradient pink
              },
              {
                href: "https://wa.me/+919876543210",
                Icon: FaWhatsapp,
                color: "#25D366", // WhatsApp green
              },
              {
                href: "https://x.com/turfhub",
                Icon: TbX,
                color: "#1DA1F2", // X (Twitter) blue
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transform transition-transform duration-300"
                style={{ color: social.color }} // Apply default brand color
              >
                <social.Icon className="text-4xl" />
              </a>
            ))}
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-lg font-medium">
            Designed with ❤️ for sports enthusiasts in Tamil Nadu.
          </p>
          <p className="text-sm">© 2024 Turfhub. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Toast Notifications */}
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar />
    </div>
  );
};

export default Contact;
