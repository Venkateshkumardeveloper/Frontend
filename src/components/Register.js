
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [formData, setFormData] = useState({ name: '', username: '', password: '', role: 'IT_USER_NORMAL', email: '', mobile: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.username || !formData.password || !formData.email || !formData.mobile) {
      toast.error("All fields are required.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/register`, formData);
      toast.success('User registered successfully');
    } catch (error) {
      console.error('Registration failed', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-white-100 relative overflow-auto">
      {/* Background and Glass Effect */}
      <div className="absolute inset-0 bg-blue-600 opacity-50  blur-xl p-6"></div>
      <div className="absolute bottom-0 left-0 w-full h-full flex items-center justify-center">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-5 shadow-lg max-w-sm w-full">
          <div className="text-center mb-5">
            <h1 className="text-white text-4xl font-bold mb-1">Vision First</h1>
            <p className="text-gray-300">Create your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-2">
              <label className="block text-gray-100 text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 text-gray-200 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Username */}
            <div className="mb-2">
              <label className="block text-gray-100 text-sm font-semibold mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="user@example.com"
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 text-gray-200 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <label className="block text-gray-100 text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 text-gray-200 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Role */}
            <div className="mb-2">
              <label className="block text-gray-100 text-sm font-semibold mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="IT_USER_NORMAL">Normal User</option>
                <option value="IT_ADMIN">Admin</option>
              </select>
            </div>

            {/* Email */}
            <div className="mb-2">
              <label className="block text-gray-100 text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 text-gray-200 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Mobile */}
            <div className="mb-4">
              <label className="block text-gray-100 text-sm font-semibold mb-2">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="123-456-7890"
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 text-gray-200 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
          </form>

          <div className="text-center text-gray-100 mt-4">
            Already have an account? <a href="/" className="text-gray-200 hover:underline">Sign in</a>
          </div>
        </div>
      </div>

      {/* Toastify Container for messages */}
      <ToastContainer />
    </div>
  );
}

export default Register;
