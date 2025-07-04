import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/'
});

export const submitFeedback = (data) => API.post('feedbacks/', data);
export const getFeedbacks = async () => {
  const res = await API.get('feedbacks/');
  return res.data; // ✅ Make sure you're returning only the actual data (an array)
};


// ✅ Add this function:
export const fetchStats = () => API.get('feedback-stats/').then(res => res.data);
