
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditCompany = () => {
  const { id } = useParams(); // Get the company ID from the URL
  const [companyData, setCompanyData] = useState({ name: '', address: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/company/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched company data:", response.data); // Log the fetched data
        setCompanyData(response.data); // Set the fetched company data
      } catch (error) {
        console.error('Failed to fetch company data:', error);
        if (error.response && error.response.status === 401) {
          navigate('/'); // Redirect to login if token is invalid
        }
      }
    };
    fetchCompanyData();
  }, [id, navigate]);

  const handleChange = (e) => setCompanyData({ ...companyData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.REACT_APP_API_URL}/company/${id}`, companyData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Company updated successfully');
      navigate('/admin'); // Redirect to the admin companies page after successful update
    } catch (error) {
      console.error('Failed to update company:', error.response ? error.response.data : error.message);
    }
  };

  const handleCancel = () => {
    setCompanyData({ name: '', address: '' }); // Reset input fields
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Edit Company</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
          <input
            type="text"
            name="name"
            value={companyData.name} // Bind input value to state
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Company Address</label>
          <input
            type="text"
            name="address"
            value={companyData.address} // Bind input value to state
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
    </div>
  );
};

export default EditCompany;

