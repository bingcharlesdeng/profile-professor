import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FeedbackForm from './FeedbackForm';

test('renders feedback form', () => {
  const mockSubmit = jest.fn();
  render(<FeedbackForm onSubmit={mockSubmit} />);
  
  expect(screen.getByPlaceholderText(/Enter your feedback here/i)).toBeInTheDocument();
  expect(screen.getByText(/Submit Feedback/i)).toBeInTheDocument();
});

test('submits feedback when form is submitted', () => {
  const mockSubmit = jest.fn();
  render(<FeedbackForm onSubmit={mockSubmit} />);
  
  fireEvent.change(screen.getByPlaceholderText(/Enter your feedback here/i), {
    target: { value: 'Great app!' },
  });
  fireEvent.click(screen.getByText(/Submit Feedback/i));

  expect(mockSubmit).toHaveBeenCalledWith({ feedback: 'Great app!', rating: 0 });
});