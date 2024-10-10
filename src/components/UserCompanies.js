

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserCompanies() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/companies`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompanies(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Redirect to login if token is invalid
          navigate('/');
        }
      }
    };
    fetchCompanies();
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Companies</h2>
      
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-1 border ">Company Name</th>
            <th className="py-1 border">Company Address</th> {/* New column for address */}
            <th className="py-1 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company._id}>
              <td className="border px-4 py-2">{company.name}</td>
              <td className="border px-4 py-2">{company.address}</td> {/* Display address */}
              <td className="border px-4 py-2">{company.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserCompanies;
