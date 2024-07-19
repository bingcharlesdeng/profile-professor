import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-page">
      <h1>Log In to ProfileProfessor</h1>
      <LoginForm />
      <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
    </div>
  );
};

export default LoginPage;