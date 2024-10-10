
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdminCompanies from './components/AdminCompanies';
import UserCompanies from './components/UserCompanies';
import CreateCompany from './components/CreateCompany';
import EditCompany from './components/EditCompany';
import ProtectedRoute from './ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  const location = useLocation(); // Get the current location

  return (
    <div>
      {/* Render Navbar only on routes other than Login and Register */}
      {location.pathname !== '/' && location.pathname !== '/register' && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-company" element={<CreateCompany />} />
        <Route path="/user" element={<ProtectedRoute><UserCompanies /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminCompanies /></ProtectedRoute>} />
        <Route path="/company/edit/:id" element={<ProtectedRoute><EditCompany /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

// Wrap App with Router
const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
