import axios from "axios";
import { useRef, useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaTimes, FaUserCircle } from "react-icons/fa"; // Import eye icons
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const registerFormRef = useRef();
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/users"; // Make sure this is correct
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data: res } = await axios.post(url, data, config);

      // Handle success
      console.log("Server Response:", res.message);
      // Show success toast notification
      toast.success("Registration Successful! Please login to continue.");
      // Redirect to login page after showing the toast
      setTimeout(() => {
        navigate("/userlogin");
      }, 3000); // Wait for 3 seconds before navigating
    } catch (error) {
      // Improved error handling
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message || "Something went wrong!");
      } else {
        setError("An unexpected error occurred. Please try again later.");
        console.error("Unexpected Error:", error);
      }
    }
  };

  const handleClose = () => navigate("/login");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the password visibility
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-gray-500 to-red-500">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-xl rounded-lg overflow-hidden md:w-3/4 lg:w-1/2">
        {/* Right Section with Close Button */}
        <div className="relative w-full md:w-1/2 p-8">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
          >
            <FaTimes className="w-5 h-5" />
          </button>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Your Account
          </h2>
          <form ref={registerFormRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-gray-600 text-sm mb-2">
                Full Name
              </label>
              <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                <FaUserCircle className="text-gray-400 mx-3" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="flex-grow p-3 bg-transparent focus:outline-none text-gray-700"
                  placeholder="Enter your full name"
                  value={data.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-gray-600 text-sm mb-2">
                Email Address
              </label>
              <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                <FaEnvelope className="text-gray-400 mx-3" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="flex-grow p-3 bg-transparent focus:outline-none text-gray-700"
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-gray-600 text-sm mb-2">
                Password
              </label>
              <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                <FaLock className="text-gray-400 mx-3" />
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type based on state
                  id="password"
                  name="password"
                  className="flex-grow p-3 bg-transparent focus:outline-none text-gray-700"
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={handleChange}
                  required
                />
                {/* Show/Hide password icon */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 mx-3"
                >
                  {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:opacity-90 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>

        {/* Left Section */}
        <div className="w-full md:w-1/2 p-8 bg-gradient-to-tr from-blue-600 to-teal-500 flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome to Our Platform!</h2>
          <p className="text-sm text-gray-200 mb-8 text-center">
            Create your account to join our amazing community and explore all features.
          </p>
          <p className="text-center text-sm text-gray-200">
            Already have an account?{" "}
            <Link
              to="/userlogin"
              className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-full shadow hover:bg-gray-100 transition duration-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* ToastContainer to display toast notifications */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </div>
  );
};

export default Register;
