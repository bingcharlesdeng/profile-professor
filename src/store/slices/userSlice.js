import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, signup, logout, getCurrentUser, forgotPassword, resetPassword, googleSignIn } from '../../services/authService';
import { getUserProfile, updateUserProfile } from '../../services/userService';

export const loginAsync = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
  try {
    return await login(credentials);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const signupAsync = createAsyncThunk('user/signup', async (userData, { rejectWithValue }) => {
  try {
    return await signup(userData);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logoutAsync = createAsyncThunk('user/logout', async () => {
  logout();
});

export const forgotPasswordAsync = createAsyncThunk('user/forgotPassword', async (email, { rejectWithValue }) => {
  try {
    return await forgotPassword(email);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const resetPasswordAsync = createAsyncThunk('user/resetPassword', async ({ token, newPassword }, { rejectWithValue }) => {
  try {
    return await resetPassword(token, newPassword);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async (userId, { rejectWithValue }) => {
  try {
    return await getUserProfile(userId);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateUserProfileAsync = createAsyncThunk('user/updateUserProfile', async (profileData, { rejectWithValue }) => {
  try {
    return await updateUserProfile(profileData);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const googleSignInAsync = createAsyncThunk('user/googleSignIn', async (credential, { rejectWithValue }) => {
  try {
    return await googleSignIn(credential);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: getCurrentUser(),
    profile: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signupAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.currentUser = null;
        state.profile = null;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(forgotPasswordAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateUserProfileAsync.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'succeeded';
      })
      .addCase(googleSignInAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(googleSignInAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(googleSignInAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;