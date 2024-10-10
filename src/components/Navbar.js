import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    navigate('/'); // Redirect to login after logout
  };

  const handleNavigateToCompanies = () => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    const role = localStorage.getItem('role'); // Get user role from local storage
  
    if (!token) {
      alert('No token found, please log in again.'); // Handle missing token
      navigate('/'); // Redirect to login page
      return;
    }
  
    if (role === 'IT_ADMIN') {
      navigate('/admin'); // Navigate to admin companies if admin
    } else {
      navigate('/user'); // Navigate to user companies if normal user
    }
  };
  

  const handleNavigateToCreateCompany = () => {
    navigate('/create-company'); // Navigate to create company page
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <div className="text-lg font-bold">Company Management</div>
      <div className="space-x-4">
        <button
          onClick={handleNavigateToCompanies}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
        >
          Companies
        </button>
        <button
          onClick={handleNavigateToCreateCompany}
          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded"
        >
          Create Company
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
