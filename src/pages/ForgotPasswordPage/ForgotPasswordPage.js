// src/pages/ForgotPasswordPage/ForgotPasswordPage.js
import React from 'react';
import ForgotPasswordForm from '../../components/ForgotPasswordForm/ForgotPasswordForm';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  return (
    <div className="forgot-password-page">
      <h1>Forgot Your Password?</h1>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;