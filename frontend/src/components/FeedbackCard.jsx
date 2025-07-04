

import React from 'react';

const FeedbackCard = ({ feedback }) => {
  
  const cardStyle = {
    border: feedback.sentiment === 'negative' ? '2px solid red' : '1px solid #ccc',
    backgroundColor: feedback.sentiment === 'negative' ? '#ffe6e6' : '#fff',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
  };

  return (
    <div style={cardStyle}>
      <h4>{feedback.name} ({feedback.type} - {feedback.category})</h4>
      <p>{feedback.message}</p>
      <small>Sentiment: {feedback.sentiment}</small>
    </div>
  );
};

export default FeedbackCard;
