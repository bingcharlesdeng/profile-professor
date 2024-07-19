// src/pages/SignupPage/SignupPage.js
import React from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';
import './SignupPage.css';

const SignupPage = () => {
  return (
    <div className="signup-page">
      <h1>Join ProfileProfessor</h1>
      <SignupForm />
    </div>
  );
};

export default SignupPage;