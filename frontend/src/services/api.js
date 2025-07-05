// ✅ FILE: src/services/api.js
import axios from 'axios';

// ✅ Ensure base URL exists or fallback to localhost
const baseURL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
console.log('🔐 API Base URL:', baseURL);

const API = axios.create({
  baseURL: `${baseURL}/api/`,
});

// ✅ Attach token ONLY when required (skip for public routes like feedback submission)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');

  const isPublicPost =
    config.method === 'post' && config.url?.includes('feedbacks');

  if (!token && !isPublicPost) {
    console.warn('⚠️ No token — skipping auth for:', config.url);
    return config;
  }

  if (token && !isPublicPost) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => Promise.reject(error));

// ✅ Admin Login API
export const login = async (username, password) => {
  const res = await API.post('token/', { username, password });
  const { access } = res.data;
  localStorage.setItem('adminToken', access);
  return res.data;
};

// ✅ Feedback APIs
export const submitFeedback = (data) => API.post('feedbacks/', data);
export const getFeedbacks = async () => (await API.get('feedbacks/')).data;
export const fetchStats = () => API.get('feedback-stats/').then(res => res.data);
export const exportFeedbackCSV = () =>
  API.get('export-csv/', { responseType: 'blob' });

export default API;
