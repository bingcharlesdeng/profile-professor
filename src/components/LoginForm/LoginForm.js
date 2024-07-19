// src/components/LoginForm/LoginForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginAsync } from '../../store/slices/userSlice';
import './LoginForm.css';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginAsync(credentials));
    if (loginAsync.fulfilled.match(resultAction)) {
      navigate('/profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Logging in...' : 'Log In'}
      </button>
      <div className="form-footer">
        <Link to="/forgot-password">Forgot Password?</Link>
        <Link to="/signup">Don't have an account? Sign up</Link>
      </div>
    </form>
  );
};

export default LoginForm;