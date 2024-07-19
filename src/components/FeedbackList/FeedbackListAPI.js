// src/components/FeedbackList/FeedbackList.js

import React from 'react';
import PropTypes from 'prop-types';
import './FeedbackList.css';

const FeedbackList = ({ feedbacks }) => {
  if (!feedbacks || feedbacks.length === 0) {
    return <p>No feedback available.</p>;
  }

  return (
    <div className="feedback-list">
      <h2>Previous Feedback</h2>
      {feedbacks.map((feedback) => (
        <div key={feedback.id} className="feedback-item">
          <p><strong>Category:</strong> {feedback.category}</p>
          <p>{feedback.content}</p>
          <p className="feedback-date">Submitted on: {new Date(feedback.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

FeedbackList.propTypes = {
  feedbacks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FeedbackList;