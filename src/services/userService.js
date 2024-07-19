// src/services/userService.js
import commonAPI from './commonAPI';

export const getUserProfile = async (userId) => {
  try {
    const response = await commonAPI.get(`/users/${userId}/profile`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await commonAPI.put(`/users/${profileData.id}/profile`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};