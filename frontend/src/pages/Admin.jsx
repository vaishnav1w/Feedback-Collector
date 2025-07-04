// src/pages/Admin.jsx
import React, { useState } from 'react';
import AdminFeedbackList from '../components/AdminFeedbackList';
import '../styles/Admin.css';

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleDownloadCSV = async () => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      alert('⚠️ You must be logged in as admin to download the CSV.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/export/csv/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'feedback.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
      alert('❌ Download failed. Please login again.');
    }
  };

  return (
    <div className="admin-dark-container">
      <header className="admin-dark-header">
        <h1>📊 Admin Dashboard</h1>
        <p className="admin-dark-subtitle">Feedback insights and tools at your fingertips.</p>
      </header>

      <div className="admin-dark-toolbar">
        {/* 🔍 Search bar */}
        <input
          type="text"
          className="admin-dark-search"
          placeholder="Search feedback..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* ⬇️ Export Button */}
        <button className="admin-dark-btn" onClick={handleDownloadCSV}>
          ⬇️ Export Feedback as CSV
        </button>
      </div>

      <div className="admin-dark-list">
        <AdminFeedbackList searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Admin;
