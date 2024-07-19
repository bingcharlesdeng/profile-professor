// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import groupsReducer from './slices/groupSlice';
import feedbackReducer from './slices/feedbackSlice';
import privacySettingsReducer from './slices/privacySettingSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    groups: groupsReducer,
    feedback: feedbackReducer,
    privacySettings: privacySettingsReducer,
  },
});