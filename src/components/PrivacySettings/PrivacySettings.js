// src/components/PrivacySettings/PrivacySettings.js

import React, { useState, useEffect } from 'react';
import { getUserPrivacySettings, updateUserPrivacySettings } from './PrivacySettingsAPI';

function PrivacySettings({ userId }) {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    loadPrivacySettings();
  }, [userId]);

  const loadPrivacySettings = async () => {
    try {
      const data = await getUserPrivacySettings(userId);
      setSettings(data);
    } catch (error) {
      console.error('Error loading privacy settings:', error);
    }
  };

  const handleToggle = async (setting) => {
    try {
      const updatedSettings = { ...settings, [setting]: !settings[setting] };
      await updateUserPrivacySettings(userId, updatedSettings);
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Error updating privacy settings:', error);
    }
  };

  if (!settings) return <div>Loading...</div>;

  return (
    <div className="privacy-settings">
      <h2>Privacy Settings</h2>
      {Object.entries(settings).map(([key, value]) => (
        <div key={key}>
          <label>
            <input
              type="checkbox"
              checked={value}
              onChange={() => handleToggle(key)}
            />
            {key.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + key.replace(/([A-Z])/g, ' $1').slice(1)}
          </label>
        </div>
      ))}
    </div>
  );
}

export default PrivacySettings;