// src/pages/HomePage/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import './HomePage.css';

const HomePage = () => {
  const { user } = useUser();

  return (
    <div className="home-page">
      <h1>Welcome to ProfileProfessor</h1>
      <p>Discover yourself through the eyes of others.</p>
      {user ? (
        <div className="user-actions">
          <Link to="/profile" className="btn btn-primary">View Your Profile</Link>
          <Link to="/feedback" className="btn btn-secondary">Give Feedback</Link>
        </div>
      ) : (
        <div className="guest-actions">
          <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          <Link to="/login" className="btn btn-secondary">Login</Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;