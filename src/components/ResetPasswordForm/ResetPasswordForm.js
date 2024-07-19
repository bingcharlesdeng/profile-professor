// src/components/ResetPasswordForm/ResetPasswordForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPasswordAsync } from '../../store/slices/userSlice';
import './ResetPasswordForm.css';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { status, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    const resultAction = await dispatch(resetPasswordAsync({ token, newPassword: password }));
    if (resetPasswordAsync.fulfilled.match(resultAction)) {
      navigate('/login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reset-password-form">
      <h2>Reset Password</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Resetting...' : 'Reset Password'}
      </button>
    </form>
  );
};

export default ResetPasswordForm;