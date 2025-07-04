import React, { useEffect, useState } from 'react';
import { getFeedbacks } from '../services/api';

const FeedbackStats = () => {
  const [counts, setCounts] = useState({ bug: 0, feature: 0, general: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await getFeedbacks();
      const categoryCount = { bug: 0, feature: 0, general: 0 };
      res.data.forEach(item => {
        categoryCount[item.category] += 1;
      });
      setCounts(categoryCount);
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h3>Feedback Statistics</h3>
      <p>Bug: {counts.bug}</p>
      <p>Feature Requests: {counts.feature}</p>
      <p>General: {counts.general}</p>
    </div>
  );
};

export default FeedbackStats;