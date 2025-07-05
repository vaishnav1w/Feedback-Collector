// src/pages/StatsPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchStats } from '../services/api';
import '../styles/StatsPage.css';

const StatsPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStats();
        setStats(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    loadStats();
  }, []);

  if (!stats) return <div className="loading">Loading stats...</div>;

  return (
    <div className="stats-container">
      <h1>📊 Feedback Summary</h1>

      <div className="stat-card total">
        <h2>Total Feedback</h2>
        <p>{stats.total}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card category">
          <h3>By Category</h3>
          <ul>
            {Object.entries(stats.category).map(([key, value]) => (
              <li key={key}>
                <strong>{key}</strong>: {value}
              </li>
            ))}
          </ul>
        </div>

        <div className="stat-card type">
          <h3>By Type</h3>
          <ul>
            {Object.entries(stats.type).map(([key, value]) => (
              <li key={key}>
                <strong>{key}</strong>: {value}
              </li>
            ))}
          </ul>
        </div>

        <div className="stat-card sentiment">
          <h3>By Sentiment</h3>
          <ul>
            {Object.entries(stats.sentiment).map(([key, value]) => (
              <li key={key}>
                <strong>{key}</strong>: {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
