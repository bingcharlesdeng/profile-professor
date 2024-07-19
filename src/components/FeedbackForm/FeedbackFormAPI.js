// src/components/FeedbackForm/FeedbackFormAPI.js

import commonAPI from '../../services/commonAPI';

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await commonAPI.post('/feedback', feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

export const getFeedbackCategories = async () => {
  try {
    const response = await commonAPI.get('/feedback/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback categories:', error);
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

export const updateFeedback = async (feedbackId, updatedData) => {
  try {
    const response = await commonAPI.put(`/feedback/${feedbackId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating feedback:', error);
    throw error;
  }
};

export const deleteFeedback = async (feedbackId) => {
  try {
    const response = await commonAPI.delete(`/feedback/${feedbackId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw error;
  }
};

export const getAIEnhancedFeedback = async (feedbackId) => {
  try {
    const response = await commonAPI.get(`/feedback/${feedbackId}/enhance`);
    return response.data;
  } catch (error) {
    console.error('Error getting AI-enhanced feedback:', error);
    throw error;
  }
};