import React, { useEffect, useState } from 'react';
import { getFeedbacks } from '../services/api';
import '../styles/Admin.css';

const AdminFeedbackList = () => {
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

  const filteredFeedbacks =
    filter === 'all' ? feedbacks : feedbacks.filter((fb) => fb.sentiment === filter);

  if (loading) return <p style={{ color: '#fff' }}>Loading feedbacks...</p>;

  return (
    <div>
      <h2 style={{ color: '#fff' }}>📋 Filter Feedbacks</h2>

      {/* 🎛 Sentiment Filter Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setFilter('all')}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            fontWeight: '600',
            background: '#ffffff',
            color: '#000000',
            border: 'none',
            cursor: 'pointer',
            boxShadow: filter === 'all' ? '0 0 8px rgba(255,255,255,0.8)' : '',
            transition: '0.3s ease',
          }}
        >
          ALL
        </button>
        <button
          onClick={() => setFilter('positive')}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            fontWeight: '600',
            background: '#28a745',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: filter === 'positive' ? '0 0 8px #28a745aa' : '',
            transition: '0.3s ease',
          }}
        >
          POSITIVE
        </button>
        <button
          onClick={() => setFilter('neutral')}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            fontWeight: '600',
            background: '#fd7e14',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: filter === 'neutral' ? '0 0 8px #fd7e14aa' : '',
            transition: '0.3s ease',
          }}
        >
          NEUTRAL
        </button>
        <button
          onClick={() => setFilter('negative')}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            fontWeight: '600',
            background: '#dc3545',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: filter === 'negative' ? '0 0 8px #dc3545aa' : '',
            transition: '0.3s ease',
          }}
        >
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

export default AdminFeedbackList;
