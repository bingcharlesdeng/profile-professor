// src/components/Footer/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About ProfileProfessor</h4>
          <p>Discover yourself through the eyes of others.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/groups">Groups</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@profileprofessor.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ProfileProfessor. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;