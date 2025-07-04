import React, { useEffect, useState } from 'react';
import { getFeedbacks } from '../services/api';
import '../styles/SentimentPage.css';

const SentimentPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFeedbacks();
        if (Array.isArray(res)) {
          setFeedbacks(res); // ✅ direct array
        } else {
          console.error('Unexpected response:', res);
          setFeedbacks([]);
        }
      } catch (err) {
        console.error('Failed to fetch feedbacks:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderGroup = (title, sentimentType, colorClass) => {
    const filtered = feedbacks?.filter((fb) => fb.sentiment === sentimentType) || [];

    return (
      <div className={`sentiment-card ${colorClass}`} key={sentimentType}>
        <h3>{title} ({filtered.length})</h3>
        {filtered.length === 0 ? (
          <p>No {sentimentType} feedback.</p>
        ) : (
          <ul>
            {filtered.map((fb) => (
              <li key={fb.id}>
                <strong>{fb.name}</strong> ({fb.type}, {fb.category})<br />
                <em>{fb.message}</em>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  if (loading) return <p className="loading-msg">Loading feedback...</p>;

  return (
    <div className="sentiment-page">
      <h2>📊 Feedback by Sentiment</h2>
      <div className="sentiment-grid">
        {renderGroup('✅ Positive Feedback', 'positive', 'positive')}
        {renderGroup('😐 Neutral Feedback', 'neutral', 'neutral')}
        {renderGroup('❌ Negative Feedback', 'negative', 'negative')}
      </div>
    </div>
  );
};

export default SentimentPage;
