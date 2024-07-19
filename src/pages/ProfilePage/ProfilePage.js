// src/pages/ProfilePage/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, updateUserProfileAsync } from '../../store/slices/userSlice';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import ProfileDisplay from '../../components/ProfileDisplay/ProfileDisplay';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
import './ProfilePage.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { currentUser, profile, status, error } = useSelector(state => state.user);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentUser && !profile) {
      dispatch(fetchUserProfile(currentUser.id));
    }
  }, [dispatch, currentUser, profile]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleProfileUpdate = async (updatedProfile) => {
    await dispatch(updateUserProfileAsync(updatedProfile));
    setIsEditing(false);
  };

  if (status === 'loading') return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!profile) return <ErrorMessage message="No profile data available." />;

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      {isEditing ? (
        <ProfileForm 
          initialData={profile} 
          onSubmit={handleProfileUpdate} 
          onCancel={handleEditToggle}
        />
      ) : (
        <>
          <ProfileDisplay profile={profile} />
          <button onClick={handleEditToggle} className="edit-button">Edit Profile</button>
        </>
      )}
    </div>
  );
};

export default ProfilePage;