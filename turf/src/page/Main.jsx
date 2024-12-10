import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user session (if stored in localStorage or sessionStorage)
        localStorage.removeItem("token");
        navigate('/userlogin');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-700 to-gray-900 text-white">
            <div className="text-center">
                <h1 className="text-4xl font-semibold mb-4">You have been logged out</h1>
                <p className="mb-8 text-lg">
                    Thank you for using our service. Click below to login again.
                </p>
                <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition duration-300"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
};

export default Main;