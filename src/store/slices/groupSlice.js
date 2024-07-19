import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async () => {
    const response = await axios.get('/api/groups');
    return response.data;
  }
);

export const createGroup = createAsyncThunk(
  'groups/createGroup',
  async (groupData) => {
    const response = await axios.post('/api/groups', groupData);
    return response.data;
  }
);

const groupsSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload);
      });
  },
});

export default groupsSlice.reducer;