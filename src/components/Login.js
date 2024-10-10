

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import Loader from './Loader'; // Import the Loader component
import { AiOutlineEye, AiFillEye } from 'react-icons/ai'; // Eye icons

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false); // State to manage loading
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate();

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting API call
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      localStorage.setItem('role', decoded.role);

      // Simulate loading time before navigating
      setTimeout(() => {
        if (decoded.role === 'IT_ADMIN') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
        setLoading(false); // Stop loading after navigating
      }, 3000); // Stops the loader after 3 seconds
    } catch (error) {
      setLoading(false); // Stop loading if there's an error
      toast.error('Invalid credentials. Please try again.'); // Show toast message for error
      console.error('Login failed', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-white-100 relative overflow-hidden">
      {loading ? ( // Show loader while loading
        <Loader />
      ) : (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 shadow-lg max-w-sm w-full">
            <div className="text-center mb-8">
              <h1 className="text-white text-4xl font-bold mb-2">Vision First</h1>
              <p className="text-gray-300">Login to your account</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-100 text-sm font-semibold mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  placeholder="user@example.com"
                  className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 text-gray-200 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="mb-6 relative">
                <label className="block text-gray-100 text-sm font-semibold mb-2">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'} // Toggle input type based on state
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="password"
                  className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 text-gray-200 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                {/* Eye icon to toggle password visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                  className="absolute right-4 top-10 focus:outline-none"
                >

                  {showPassword ? <AiFillEye className="text-gray-300" /> : < AiOutlineEye className="text-gray-300" />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Sign In
              </button>
            </form>

            <div className="text-center text-gray-100 mt-6">
              Don't have an account? <a href="/register" className="text-gray-200 hover:underline">Register for free</a>
            </div>
          </div>
        </div>
      )}
      {/* Toastify Container */}
      <ToastContainer />
    </div>
  );
}

export default Login;
