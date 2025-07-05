// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import FeedbackForm from './components/FeedbackForm';
import ListPage from './pages/ListPage';
import StatsPage from './pages/StatsPage';
import SentimentPage from './pages/SentimentPage';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import PrivateRoute from './components/PrivateRoute';
import { logout, isAuthenticated } from './utils/auth';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(isAuthenticated());
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <Router>
      <nav style={navBarStyle}>
        <div style={brandStyle}>💬 Feedback Collector</div>

        <div style={navLinksContainer}>
          <Link to="/" style={navLinkStyle}>Home</Link>
          <Link to="/feedbacks" style={navLinkStyle}>Feedbacks</Link>
          <Link to="/stats" style={navLinkStyle}>Stats</Link>
          <Link to="/sentiments" style={navLinkStyle}>Sentiments</Link>

          {!isLoggedIn && (
            <Link to="/admin-login" style={navLinkStyle}>Admin Login</Link>
          )}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              style={logoutBtnStyle}
              onMouseOver={(e) => e.target.style.background = '#c82333'}
              onMouseOut={(e) => e.target.style.background = '#dc3545'}
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/feedbacks" element={<PrivateRoute><ListPage /></PrivateRoute>} />
        <Route path="/stats" element={<PrivateRoute><StatsPage /></PrivateRoute>} />
        <Route path="/sentiments" element={<PrivateRoute><SentimentPage /></PrivateRoute>} />
        <Route path="/admin-login" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;

// ✅ Styles (re-add these if missing)
const navBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  background: 'linear-gradient(90deg, #141e30, #243b55)',
  boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
  position: 'sticky',
  top: 0,
  zIndex: 1000
};

const brandStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#ffffff'
};

const navLinksContainer = {
  display: 'flex',
  gap: '1rem'
};

const navLinkStyle = {
  color: '#ffffff',
  textDecoration: 'none',
  padding: '8px 14px',
  borderRadius: '6px',
  transition: 'background 0.3s ease',
  fontWeight: 'bold'
};

const logoutBtnStyle = {
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  padding: '8px 14px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background 0.3s ease'
};
