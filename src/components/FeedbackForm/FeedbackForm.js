// src/components/FeedbackForm/FeedbackForm.js

import React, { useState, useEffect, useCallback } from 'react';
import { getFeedbackCategories } from './FeedbackFormAPI';
import PropTypes from 'prop-types';
import './FeedbackForm.css';

const FeedbackForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    content: '',
    category: '',
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getFeedbackCategories();
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories. Please try again later.');
      console.error('Failed to fetch categories:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ content: '', category: '' });
  };

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select 
          id="category"
          name="category"
          value={formData.category} 
          onChange={handleInputChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="content">Feedback:</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          placeholder="Enter your feedback here"
          required
        />
      </div>
      <button type="submit" className="submit-button">Submit Feedback</button>
    </form>
  );
};

FeedbackForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FeedbackForm;