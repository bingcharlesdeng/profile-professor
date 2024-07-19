// src/services/feedbackService.js
import commonAPI from './commonAPI';

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await commonAPI.post('/feedback', feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

export const getFeedbackForUser = async (userId) => {
  try {
    const response = await commonAPI.get(`/feedback/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback for user:', error);
    throw error;
  }
};