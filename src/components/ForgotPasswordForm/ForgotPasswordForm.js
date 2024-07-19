// src/components/ForgotPasswordForm/ForgotPasswordForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgotPasswordAsync } from '../../store/slices/userSlice';
import './ForgotPasswordForm.css';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(forgotPasswordAsync(email));
  };

  return (
    <form onSubmit={handleSubmit} className="forgot-password-form">
      <h2>Forgot Password</h2>
      {error && <div className="error-message">{error}</div>}
      {status === 'succeeded' && (
        <div className="success-message">
          Password reset link has been sent to your email.
        </div>
      )}
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
      </button>
      <div className="form-footer">
        <Link to="/login">Back to Login</Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;