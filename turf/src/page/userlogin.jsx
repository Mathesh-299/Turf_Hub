import axios from 'axios';
import { useRef, useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const loginFormRef = useRef();
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      toast.success("Login Successful! Welcome back.");
      console.log("Login Successful");
      navigate('/'); 
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
        toast.error(error.response.data.message); // Show error toast
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-gray-500 to-red-500">
      <div className="flex flex-col-reverse md:flex-row items-center bg-white shadow-xl rounded-lg overflow-hidden md:w-3/4 lg:w-1/2">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-8 bg-gradient-to-tr from-blue-600 to-teal-500 flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-sm text-gray-200 mb-8 text-center">
            Enter your credentials to access your account and explore amazing features.
          </p>
          <Link
            to="/register"
            className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-full shadow hover:bg-gray-100 transition duration-300"
          >
            Create an Account
          </Link>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login to Your Account
          </h2>
          <form ref={loginFormRef} onSubmit={handleSubmit} className="space-y-6">
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
              <div className="relative">
                <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                  <FaLock className="text-gray-400 mx-3" />
                  <input
                    type={passwordVisible ? "text" : "password"} // Toggle between text and password
                    id="password"
                    name="password"
                    className="flex-grow p-3 bg-transparent focus:outline-none text-gray-700"
                    placeholder="Enter your password"
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Show/Hide Password Icon */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {passwordVisible ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
                </button>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:opacity-90 transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <a
              href="#"
              className="text-sm text-blue-600 hover:underline hover:text-blue-700"
            >
              Forgot Password?
            </a>
          </div>
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

export default Login;
