// src/components/NavBar/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAsync } from '../../store/slices/userSlice';
import './NavBar.css';

const NavBar = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">ProfileProfessor</Link>
      </div>
      <ul className="navbar-nav">
        <li><Link to="/">Home</Link></li>
        {currentUser ? (
          <>
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/groups">Groups</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
            <li><Link to="/privacy">Privacy Settings</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;