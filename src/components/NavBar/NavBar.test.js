import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar';

test('renders navbar links', () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );
  
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/My Profile/i)).toBeInTheDocument();
  expect(screen.getByText(/Groups/i)).toBeInTheDocument();
  expect(screen.getByText(/Give Feedback/i)).toBeInTheDocument();
});