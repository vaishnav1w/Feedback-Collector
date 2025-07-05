// ✅ FILE: src/components/FeedbackForm.jsx
import React, { useState } from 'react';
import { submitFeedback } from '../services/api';
import '../styles/FeedbackForm.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'product',
    category: 'general',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📦 Data to submit:", formData);

    try {
      await submitFeedback(formData);
      alert('✅ Feedback submitted successfully!');
      setFormData({ name: '', email: '', type: 'product', category: 'general', message: '' });
    } catch (err) {
      console.error('❌ Submission Error:', err.response?.data || err.message);
      alert('❌ Error submitting feedback');
    }
  };

  return (
    <div className="feedback-wrapper">
      <div className="welcome-text">
        <h1>🎉 Welcome to Feedback Collector</h1>
        <p>We're glad you're here. Your feedback helps us grow!</p>
      </div>

      <div className="feedback-form-container">
        <h2 className="form-title">📝 Submit Your Feedback</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="product">Product</option>
            <option value="service">Service</option>
          </select>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="bug">Bug</option>
            <option value="feature">Feature Request</option>
            <option value="general">General</option>
          </select>
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Feedback" required />
          <button type="submit">🚀 Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;

