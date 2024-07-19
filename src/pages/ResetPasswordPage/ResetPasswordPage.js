// src/pages/ResetPasswordPage/ResetPasswordPage.js
import React from 'react';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  return (
    <div className="reset-password-page">
      <h1>Reset Your Password</h1>
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;