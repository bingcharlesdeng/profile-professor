import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from './UserProfileAPI';

function UserProfile({ userId }) {
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getUserProfile(userId).then(setProfileData);
  }, [userId]);

  const handleSave = (updatedData) => {
    updateUserProfile(userId, updatedData).then(() => {
      setProfileData(updatedData);
      setEditMode(false);
    });
  };

  if (!profileData) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <h2>{profileData.name}'s Profile</h2>
      {profileData.facets.map((facet, index) => (
        <div key={index} className="profile-facet">
          <h3>{facet.type}</h3>
          {editMode ? (
            <input
              value={facet.content}
              onChange={(e) => {
                const updatedFacets = [...profileData.facets];
                updatedFacets[index].content = e.target.value;
                setProfileData({ ...profileData, facets: updatedFacets });
              }}
            />
          ) : (
            <p>{facet.content}</p>
          )}
        </div>
      ))}
      <button onClick={() => editMode ? handleSave(profileData) : setEditMode(true)}>
        {editMode ? 'Save' : 'Edit Profile'}
      </button>
    </div>
  );
}

export default UserProfile;