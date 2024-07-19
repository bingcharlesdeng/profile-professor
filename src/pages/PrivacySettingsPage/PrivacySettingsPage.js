import React from 'react';
import PrivacySettings from '../../components/PrivacySettings/PrivacySettings';

function PrivacySettingsPage() {
  return (
    <div>
      <h1>Privacy Settings</h1>
      <PrivacySettings userId="current-user-id" />
    </div>
  );
}

export default PrivacySettingsPage;