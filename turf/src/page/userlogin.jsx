import React, { useRef, useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom'; // Import NavLink for navigation
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../component/Navbar';

// Import your image for the left side
import loginImage from '../assets/img/messi.jpg';

const Login = () => {
  const loginFormRef = useRef();
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/auth";
      const { data: res } = await axios.post(url, data);
      if (!res.data.address) {  // Check if address is missing
        toast.error("You need to register first. Redirecting to Register page.");
        navigate('/register');  // Redirect to Register page
        return;
      }
      localStorage.setItem("token", res.data);
      toast.success("Login Successful! Welcome back.");
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='pt-8'>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-black/20">
        <div className="flex flex-col-reverse md:flex-row items-center bg-gradient-to-l from-blue-500 to-black/30  shadow-xl rounded-lg overflow-hidden md:w-3/4 lg:w-1/2">
          {/* Left Section - Sports Image */}
          <div className="w-full h-full md:w-1/2 p-8">
            <img src={loginImage} alt="Sports Illustration" className="w-full h-full object-cover rounded-lg shadow-md" />
          </div>

          {/* Right Section - Login Form */}
          <div className="w-full md:w-1/2 p-8 bg-gray-500 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Login to Your Sports Account
            </h2>
            <p className="text-center text-gray-600 mb-8 text-sm">
              Get in the game! Enter your credentials to join the team and explore all the sports activities.
            </p>
            <form ref={loginFormRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-gray-900 text-sm mb-2 font-bold">
                  Email Address
                </label>
                <div className="flex items-center bg-gray-100 rounded-lg shadow-md border-2 border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
                  <FaEnvelope className="text-gray-400 mx-3" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="flex-grow p-3 bg-transparent focus:outline-none text-gray-700 rounded-lg"
                    placeholder="Enter your email"
                    value={data.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-gray-900 text-sm mb-2 font-bold">
                  Password
                </label>
                <div className="relative">
                  <div className="flex items-center bg-gray-100 rounded-lg shadow-md border-2 border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
                    <FaLock className="text-gray-400 mx-3" />
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      className="flex-grow p-3 bg-transparent focus:outline-none text-gray-700 rounded-lg"
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

              {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-purple-500 text-white font-bold py-3 rounded-lg shadow-md hover:opacity-90 transition duration-300"
              >
                Login
              </button>
            </form>

            {/* Forgot Password */}
            <div className="text-center mt-4">
              <NavLink
                to="/register"  // Link to Register page
                className="text-lg text-black "
              >
                Don't have an account? 
                <span className='p-2 text-white font-bold hover:underline'>
                  Register here.
                </span>
              </NavLink>
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
    </div>
  );
};

export default Login;
