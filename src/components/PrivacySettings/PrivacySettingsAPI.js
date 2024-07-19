// src/components/PrivacySettings/PrivacySettingsAPI.js

import commonAPI from '../../services/commonAPI';

export const getUserPrivacySettings = async (userId) => {
  try {
    const response = await commonAPI.get(`/users/${userId}/privacy-settings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user privacy settings:', error);
    throw error;
  }
};

export const updateUserPrivacySettings = async (userId, settingsData) => {
  try {
    const response = await commonAPI.put(`/users/${userId}/privacy-settings`, settingsData);
    return response.data;
  } catch (error) {
    console.error('Error updating user privacy settings:', error);
    throw error;
  }
};

export const getProfileVisibility = async (userId) => {
  try {
    const response = await commonAPI.get(`/users/${userId}/profile-visibility`);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile visibility:', error);
    throw error;
  }
};

export const updateProfileVisibility = async (userId, visibilityData) => {
  try {
    const response = await commonAPI.put(`/users/${userId}/profile-visibility`, visibilityData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile visibility:', error);
    throw error;
  }
};

export const getFacetVisibility = async (userId) => {
  try {
    const response = await commonAPI.get(`/users/${userId}/facet-visibility`);
    return response.data;
  } catch (error) {
    console.error('Error fetching facet visibility:', error);
    throw error;
  }
};

export const updateFacetVisibility = async (userId, facetId, visibilityData) => {
  try {
    const response = await commonAPI.put(`/users/${userId}/facet-visibility/${facetId}`, visibilityData);
    return response.data;
  } catch (error) {
    console.error('Error updating facet visibility:', error);
    throw error;
  }
};

export const getBlockedUsers = async (userId) => {
  try {
    const response = await commonAPI.get(`/users/${userId}/blocked-users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blocked users:', error);
    throw error;
  }
};

export const blockUser = async (userId, blockedUserId) => {
  try {
    const response = await commonAPI.post(`/users/${userId}/block-user`, { blockedUserId });
    return response.data;
  } catch (error) {
    console.error('Error blocking user:', error);
    throw error;
  }
};

export const unblockUser = async (userId, unblockedUserId) => {
  try {
    const response = await commonAPI.post(`/users/${userId}/unblock-user`, { unblockedUserId });
    return response.data;
  } catch (error) {
    console.error('Error unblocking user:', error);
    throw error;
  }
};

export const getDataExportRequest = async (userId) => {
  try {
    const response = await commonAPI.get(`/users/${userId}/data-export`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data export request:', error);
    throw error;
  }
};

export const requestDataExport = async (userId) => {
  try {
    const response = await commonAPI.post(`/users/${userId}/data-export`);
    return response.data;
  } catch (error) {
    console.error('Error requesting data export:', error);
    throw error;
  }
};