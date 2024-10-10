

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateCompany() {
  const [companyData, setCompanyData] = useState({ name: '', address: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setCompanyData({ ...companyData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role'); // Retrieve the role from localStorage

      if (!token) {
        toast.error('No token found, please log in again.');
        navigate('/');
        return;
      }

      await axios.post(`${process.env.REACT_APP_API_URL}/company`, companyData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Company created successfully!');

      // Navigate based on the user's role
      if (role === 'IT_ADMIN') {
        setTimeout(() => navigate('/admin'), 2000); // Admin role navigation
      } else {
        setTimeout(() => navigate('/user'), 2000); // Normal user role navigation
      }
    } catch (error) {
      toast.error(`Failed to create company: ${error.response ? error.response.data : error.message}`);
    }
  };

  const handleCancel = () => {
    setCompanyData({ name: '', address: '' }); // Reset input fields
    toast.info('Company creation canceled');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Create Company</h2>

        {/* Company Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
          <input
            type="text"
            name="name"
            value={companyData.name}
            placeholder="Company Name"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Company Address Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Company Address</label>
          <input
            type="text"
            name="address"
            value={companyData.address}
            placeholder="Company Address"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Toastify Container */}
      <ToastContainer />
    </div>
  );
}

export default CreateCompany;
