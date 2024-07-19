import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

jest.mock('./UserProfileAPI', () => ({
  getUserProfile: jest.fn().mockResolvedValue({
    name: "John Doe",
    facets: [
      { type: "personality", content: "Outgoing and friendly" },
      { type: "athleticism", content: "Enjoys running and swimming" },
      { type: "creativity", content: "Skilled in painting and writing" }
    ]
  })
}));

test('renders user profile', async () => {
  render(<UserProfile userId="123" />);
  
  expect(await screen.findByText(/John Doe's Profile/i)).toBeInTheDocument();
  expect(screen.getByText(/Outgoing and friendly/i)).toBeInTheDocument();
  expect(screen.getByText(/Enjoys running and swimming/i)).toBeInTheDocument();
  expect(screen.getByText(/Skilled in painting and writing/i)).toBeInTheDocument();
});