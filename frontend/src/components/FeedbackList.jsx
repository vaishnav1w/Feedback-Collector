import React, { useEffect, useState } from 'react';
import { getFeedbacks } from '../services/api';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filterSentiment, setFilterSentiment] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      const res = await getFeedbacks();
      setFeedbacks(res.data);
    };
    fetchData();
  }, []);

  const filteredFeedbacks = feedbacks.filter(item => {
    return (
      filterSentiment === 'all' || item.sentiment.toLowerCase() === filterSentiment
    );
  });

  return (
    <div>
      <h2>Submitted Feedback</h2>

      <div style={{ marginBottom: '10px' }}>
        <label>Filter by Sentiment: </label>
        <select onChange={(e) => setFilterSentiment(e.target.value)}>
          <option value="all">All</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
          <option value="neutral">Neutral</option>
        </select>
      </div>

      {filteredFeedbacks.length === 0 ? (
        <p>No feedbacks found.</p>
      ) : (
        <ul>
          {filteredFeedbacks.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong> ({item.category}) - {item.message}
              <span
                style={{
                  marginLeft: '10px',
                  color:
                    item.sentiment === 'negative'
                      ? 'red'
                      : item.sentiment === 'positive'
                      ? 'green'
                      : 'gray',
                }}
              >
                [{item.sentiment}]
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedbackList;
