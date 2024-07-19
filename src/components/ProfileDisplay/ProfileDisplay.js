import React from 'react';
import './ProfileDisplay.css';

const ProfileDisplay = ({ profile }) => {
  return (
    <div className="profile-info">
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Bio:</strong> {profile.bio}</p>
    </div>
  );
};

export default ProfileDisplay;