import { jwtDecode } from 'jwt-decode';
import commonAPI from './commonAPI';

export const login = async (credentials) => {
  console.log('Login attempt:', credentials);
  const response = await commonAPI.post('/api/auth/login', credentials);
  console.log('Login response:', response.data);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const signup = async (userData) => {
  console.log('Signup attempt:', userData);
  const response = await commonAPI.post('/api/auth/signup', userData);
  console.log('Signup response:', response.data);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const googleSignIn = async (credential) => {
    console.log('Google Sign-In attempt:', credential);
    try {
      const response = await commonAPI.post('/auth/google', { token: credential });
      console.log('Google Sign-In response:', response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Google Sign-In error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

export const logout = () => {
  console.log('Logging out');
  localStorage.removeItem('token');
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      console.log('Token expired, logging out');
      logout();
      return null;
    }
    console.log('Current user:', decodedToken);
    return decodedToken;
  }
  console.log('No current user');
  return null;
};

export const forgotPassword = async (email) => {
  console.log('Forgot password request:', email);
  const response = await commonAPI.post('/api/auth/forgot-password', { email });
  console.log('Forgot password response:', response.data);
  return response.data;
};

export const resetPassword = async (token, newPassword) => {
  console.log('Reset password attempt');
  const response = await commonAPI.post('/api/auth/reset-password', { token, newPassword });
  console.log('Reset password response:', response.data);
  return response.data;
};

export const refreshToken = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      console.log('Refreshing token');
      const response = await commonAPI.post('/api/auth/refresh-token', { token });
      console.log('Token refresh response:', response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
      return null;
    }
  }
  console.log('No token to refresh');
  return null;
};