// src/pages/FeedbackPage/FeedbackPage.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeedbackAsync, submitFeedbackAsync } from '../../store/slices/feedbackSlice';
import FeedbackForm from '../../components/FeedbackForm/FeedbackForm';
import FeedbackList from '../../components/FeedbackList/FeedbackList';
import { useUser } from '../../contexts/UserContext';
import './FeedbackPage.css';

const FeedbackPage = () => {
  const dispatch = useDispatch();
  const { feedbackList, status, error } = useSelector(state => state.feedback);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      dispatch(fetchFeedbackAsync(user.id));
    }
  }, [dispatch, user]);

  const handleSubmitFeedback = async (feedbackData) => {
    await dispatch(submitFeedbackAsync({ ...feedbackData, userId: user.id }));
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="feedback-page">
      <h1>Feedback</h1>
      <FeedbackForm onSubmit={handleSubmitFeedback} />
      <FeedbackList feedbacks={feedbackList} />
    </div>
  );
};

export default FeedbackPage;