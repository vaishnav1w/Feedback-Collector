// services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`,
});

export const submitFeedback = (data) => API.post('feedbacks/', data);

export const getFeedbacks = async () => {
  const res = await API.get('feedbacks/');
  return res.data;
};

export const fetchStats = () => API.get('feedback-stats/').then(res => res.data);
