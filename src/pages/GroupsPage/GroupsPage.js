// src/pages/GroupsPage/GroupsPage.js

import React from 'react';
import GroupList from '../../components/GroupList/GroupList';
import { useUser } from '../../contexts/UserContext'; // Assuming you have a UserContext

const GroupsPage = () => {
  const { user } = useUser();

  return (
    <div className="groups-page">
      <h1>Groups</h1>
      <GroupList userId={user.id} />
    </div>
  );
};

export default GroupsPage;