import React, { useEffect, useState } from 'react';
import api from '../services/axios';
import '../styles/StatsPage.css';

const StatsPage = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('feedback-stats/');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load stats');
      }
    };

    fetchStats();
  }, []);

  if (error) return <div className="error-msg">{error}</div>;
  if (!stats) return <div className="loading-msg">Loading stats...</div>;

  return (
    <div className="stats-page">
      <h2>📈 Feedback Statistics</h2>

      <div className="stats-card">
        <h3>Total Feedback: <span>{stats.total}</span></h3>
      </div>

      <div className="stats-grid">
        <div className="stats-section">
          <h4>📁 By Category</h4>
          <ul>
            {Object.entries(stats.category).map(([cat, count]) => (
              <li key={cat}>{cat}: <strong>{count}</strong></li>
            ))}
          </ul>
        </div>

        <div className="stats-section">
          <h4>🔧 By Type</h4>
          <ul>
            {Object.entries(stats.type).map(([type, count]) => (
              <li key={type}>{type}: <strong>{count}</strong></li>
            ))}
          </ul>
        </div>

        <div className="stats-section">
          <h4>😊 By Sentiment</h4>
          <ul>
            {Object.entries(stats.sentiment).map(([s, count]) => (
              <li key={s}>{s}: <strong>{count}</strong></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
