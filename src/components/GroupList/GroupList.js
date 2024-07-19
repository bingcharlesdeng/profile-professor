// src/components/GroupList/GroupList.js

import React, { useState, useEffect } from 'react';
import { getAllGroups, getUserGroups, joinGroup, leaveGroup, searchGroups } from './GroupListAPI';
import './GroupList.css';

const GroupList = ({ userId }) => {
  const [allGroups, setAllGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGroups();
  }, [userId]);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const [allGroupsData, userGroupsData] = await Promise.all([
        getAllGroups(),
        getUserGroups(userId)
      ]);
      setAllGroups(allGroupsData);
      setUserGroups(userGroupsData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch groups');
      setLoading(false);
    }
  };

  const handleJoinGroup = async (groupId) => {
    try {
      await joinGroup(groupId, userId);
      fetchGroups(); // Refresh the lists
    } catch (err) {
      setError('Failed to join group');
    }
  };

  const handleLeaveGroup = async (groupId) => {
    try {
      await leaveGroup(groupId, userId);
      fetchGroups(); // Refresh the lists
    } catch (err) {
      setError('Failed to leave group');
    }
  };

  const handleSearch = async () => {
    try {
      const results = await searchGroups(searchTerm);
      setAllGroups(results);
    } catch (err) {
      setError('Failed to search groups');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="group-list">
      <h2>Your Groups</h2>
      <ul>
        {userGroups.map(group => (
          <li key={group.id}>
            {group.name}
            <button onClick={() => handleLeaveGroup(group.id)}>Leave</button>
          </li>
        ))}
      </ul>

      <h2>All Groups</h2>
      <div className="search-bar">
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search groups"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {allGroups.map(group => (
          <li key={group.id}>
            {group.name}
            {!userGroups.some(g => g.id === group.id) && (
              <button onClick={() => handleJoinGroup(group.id)}>Join</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;