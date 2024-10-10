import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/" />;
  }
  
  return children;
};

export default ProtectedRoute;
