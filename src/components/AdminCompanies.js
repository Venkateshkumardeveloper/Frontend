
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminCompanies() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/companies`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompanies(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/'); // Redirect to login if token is invalid
        } else {
          toast.error('Failed to fetch companies.');
        }
      }
    };
    fetchCompanies();
  }, [navigate]);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.REACT_APP_API_URL}/company/approve/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanies(companies.map(company => company._id === id ? { ...company, status: 'approved' } : company));
      toast.success('Company approved successfully!');
    } catch (error) {
      toast.error('Failed to approve company.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/company/edit/${id}`); // Navigate to the edit page with company ID
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/company/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanies(companies.filter(company => company._id !== id)); // Remove deleted company from state
      toast.success('Company deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete company.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Company Listing</h2>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 border">Company Name</th>
            <th className="py-2 border">Company Address</th> {/* New column for address */}
            <th className="py-2 border">Status</th>
            <th className="py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company._id}>
              <td className="border px-4 py-2">{company.name}</td>
              <td className="border px-4 py-2">{company.address}</td> {/* Display address */}
              <td className="border px-4 py-2">{company.status}</td>
              <td className="border px-4 py-2">
                {company.status === 'unapproved' && (
                  <button onClick={() => handleApprove(company._id)} className="bg-green-500 text-white px-2 py-1 rounded">
                    Approve
                  </button>
                )}
                <button onClick={() => handleEdit(company._id)} className="bg-yellow-500 text-white px-2 py-1 rounded ml-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(company._id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Toastify Container */}
      <ToastContainer />
    </div>
  );
}

export default AdminCompanies;
