// src/components/UserProfile/UserProfileAPI.js

import commonAPI from '../../services/commonAPI';

export const getUserProfile = async (userId) => {
  try {
    const response = await commonAPI.get(`/profiles/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await commonAPI.put(`/profiles/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const getUserFacets = async (userId) => {
  try {
    const response = await commonAPI.get(`/profiles/${userId}/facets`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user facets:', error);
    throw error;
  }
};

export const updateUserFacet = async (userId, facetId, facetData) => {
  try {
    const response = await commonAPI.put(`/profiles/${userId}/facets/${facetId}`, facetData);
    return response.data;
  } catch (error) {
    console.error('Error updating user facet:', error);
    throw error;
  }
};

export const addUserFacet = async (userId, facetData) => {
  try {
    const response = await commonAPI.post(`/profiles/${userId}/facets`, facetData);
    return response.data;
  } catch (error) {
    console.error('Error adding user facet:', error);
    throw error;
  }
};

export const deleteUserFacet = async (userId, facetId) => {
  try {
    const response = await commonAPI.delete(`/profiles/${userId}/facets/${facetId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user facet:', error);
    throw error;
  }
};