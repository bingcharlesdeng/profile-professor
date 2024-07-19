// src/components/GroupList/GroupListAPI.js

import commonAPI from '../../services/commonAPI';

export const getAllGroups = async () => {
  try {
    const response = await commonAPI.get('/groups');
    return response.data;
  } catch (error) {
    console.error('Error fetching all groups:', error);
    throw error;
  }
};

export const getUserGroups = async (userId) => {
  try {
    const response = await commonAPI.get(`/groups/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user groups:', error);
    throw error;
  }
};

export const createGroup = async (groupData) => {
  try {
    const response = await commonAPI.post('/groups', groupData);
    return response.data;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
};

export const joinGroup = async (groupId, userId) => {
  try {
    const response = await commonAPI.post(`/groups/${groupId}/join`, { userId });
    return response.data;
  } catch (error) {
    console.error('Error joining group:', error);
    throw error;
  }
};

export const leaveGroup = async (groupId, userId) => {
  try {
    const response = await commonAPI.post(`/groups/${groupId}/leave`, { userId });
    return response.data;
  } catch (error) {
    console.error('Error leaving group:', error);
    throw error;
  }
};

export const searchGroups = async (searchTerm) => {
  try {
    const response = await commonAPI.get(`/groups/search`, { params: { q: searchTerm } });
    return response.data;
  } catch (error) {
    console.error('Error searching groups:', error);
    throw error;
  }
};