// src/components/AdminFeedbackList.jsx
import React, { useEffect, useState } from 'react';
import { getFeedbacks } from '../services/api';
import '../styles/Admin.css';

const AdminFeedbackList = ({ searchTerm }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchData = async () => {
    try {
      const res = await getFeedbacks();
      setFeedbacks(res);
    } catch (err) {
      console.error('Failed to fetch feedbacks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('⚠️ Admin login required.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this feedback?')) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/feedbacks/${id}/`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 204) {
        setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
        alert('✅ Feedback deleted.');
      } else {
        alert('❌ Delete failed.');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Server error while deleting.');
    }
  };

  // ✅ Combine sentiment filter and search filter
  const filteredFeedbacks = feedbacks
    .filter((fb) => filter === 'all' || fb.sentiment === filter)
    .filter((fb) =>
      fb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.sentiment.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (loading) return <p style={{ color: '#fff' }}>Loading feedbacks...</p>;

  return (
    <div>
      <h2 style={{ color: '#fff' }}>📋 Filter Feedbacks</h2>

      {/* 🎛 Sentiment Filter Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button onClick={() => setFilter('all')} style={buttonStyle(filter === 'all', '#ffffff', '#000')}>
          ALL
        </button>
        <button onClick={() => setFilter('positive')} style={buttonStyle(filter === 'positive', '#28a745')}>
          POSITIVE
        </button>
        <button onClick={() => setFilter('neutral')} style={buttonStyle(filter === 'neutral', '#fd7e14')}>
          NEUTRAL
        </button>
        <button onClick={() => setFilter('negative')} style={buttonStyle(filter === 'negative', '#dc3545')}>
          NEGATIVE
        </button>
      </div>

      {/* 📋 Feedback List */}
      {filteredFeedbacks.length === 0 ? (
        <p style={{ color: '#ccc' }}>No feedback found.</p>
      ) : (
        <ul className="admin-feedback-list">
          {filteredFeedbacks.map((fb) => (
            <li key={fb.id} className="admin-feedback-card">
              <div>
                <strong>{fb.name}</strong> ({fb.type}, {fb.category})
                <p>{fb.message}</p>
                <span className={`sentiment-tag ${fb.sentiment}`}>
                  {fb.sentiment.toUpperCase()}
                </span>
              </div>
              <button className="admin-delete-btn" onClick={() => handleDelete(fb.id)}>
                🗑️ Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const buttonStyle = (isActive, bg, color = '#fff') => ({
  padding: '8px 14px',
  borderRadius: '8px',
  fontWeight: '600',
  background: bg,
  color: color,
  border: 'none',
  cursor: 'pointer',
  boxShadow: isActive ? `0 0 8px ${bg}aa` : '',
  transition: '0.3s ease',
});

export default AdminFeedbackList;
