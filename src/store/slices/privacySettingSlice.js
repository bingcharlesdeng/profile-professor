import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPrivacySettings = createAsyncThunk(
  'privacySettings/fetchPrivacySettings',
  async (userId) => {
    const response = await axios.get(`/api/privacy-settings/${userId}`);
    return response.data;
  }
);

export const updatePrivacySettings = createAsyncThunk(
  'privacySettings/updatePrivacySettings',
  async ({ userId, settings }) => {
    const response = await axios.put(`/api/privacy-settings/${userId}`, settings);
    return response.data;
  }
);

const privacySettingsSlice = createSlice({
  name: 'privacySettings',
  initialState: {
    settings: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrivacySettings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPrivacySettings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.settings = action.payload;
      })
      .addCase(fetchPrivacySettings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updatePrivacySettings.fulfilled, (state, action) => {
        state.settings = action.payload;
      });
  },
});

export default privacySettingsSlice.reducer;