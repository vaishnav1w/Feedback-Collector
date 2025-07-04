import React, { useEffect, useState } from 'react';
import { getFeedbacks } from '../services/api';
import '../styles/FeedbackList.css';

const ListPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await getFeedbacks();

        // ✅ Defensive check
        if (Array.isArray(res)) {
          setFeedbacks(res);
        } else {
          console.error('Expected array, got:', res);
          setFeedbacks([]);
        }
      } catch (err) {
        console.error('Error fetching feedbacks:', err);
        setFeedbacks([]);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="feedback-list-container">
      <h2>📋 All Feedbacks</h2>
      <div className="feedback-list">
        {feedbacks.map((fb) => (
          <div key={fb.id} className={`feedback-card ${fb.sentiment}`}>
            <h3>{fb.name}</h3>
            <p><strong>Email:</strong> {fb.email}</p>
            <p><strong>Type:</strong> {fb.type}</p>
            <p><strong>Category:</strong> {fb.category}</p>
            <p><strong>Message:</strong> {fb.message}</p>
            <p><strong>Sentiment:</strong> {fb.sentiment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPage;
