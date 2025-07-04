import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css'; // ✅ External CSS

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.access);
        alert('✅ Login successful');
        navigate('/admin');
      } else {
        alert('❌ Login failed. Check username or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('🚨 Server error. Please try again later.');
    }
  };

  return (
    <div className="admin-login-container">
      <h2 className="admin-login-heading">🔐 Admin Login</h2>
      <form onSubmit={handleSubmit} className="admin-login-form">
        <input
          name="username"
          placeholder="👤 Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="🔒 Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
