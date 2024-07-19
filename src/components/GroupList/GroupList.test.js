import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GroupList from './GroupList';

jest.mock('./GroupListAPI', () => ({
  getGroups: jest.fn().mockResolvedValue([
    { id: 1, name: "Tech Enthusiasts", isMember: false },
    { id: 2, name: "Fitness Lovers", isMember: true },
    { id: 3, name: "Book Club", isMember: false }
  ]),
  createGroup: jest.fn().mockResolvedValue({ id: 4, name: "New Group", isMember: true }),
  joinGroup: jest.fn().mockResolvedValue({ success: true }),
  leaveGroup: jest.fn().mockResolvedValue({ success: true })
}));

test('renders group list', async () => {
  render(<GroupList />);
  
  expect(await screen.findByText(/Tech Enthusiasts/i)).toBeInTheDocument();
  expect(screen.getByText(/Fitness Lovers/i)).toBeInTheDocument();
  expect(screen.getByText(/Book Club/i)).toBeInTheDocument();
});

test('creates new group', async () => {
  render(<GroupList />);
  
  fireEvent.change(screen.getByPlaceholderText(/New group name/i), {
    target: { value: 'New Group' },
  });
  fireEvent.click(screen.getByText(/Create Group/i));

  expect(await screen.findByText(/New Group/i)).toBeInTheDocument();
});