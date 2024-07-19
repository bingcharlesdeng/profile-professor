// src/store/slices/feedbackSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submitFeedback, getFeedbackForUser } from '../../services/feedbackService';

export const submitFeedbackAsync = createAsyncThunk(
  'feedback/submitFeedback',
  async (feedbackData, { rejectWithValue }) => {
    try {
      const response = await submitFeedback(feedbackData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFeedbackAsync = createAsyncThunk(
  'feedback/fetchFeedback',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getFeedbackForUser(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    feedbackList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitFeedbackAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitFeedbackAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.feedbackList.push(action.payload);
      })
      .addCase(submitFeedbackAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchFeedbackAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeedbackAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.feedbackList = action.payload;
      })
      .addCase(fetchFeedbackAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default feedbackSlice.reducer;