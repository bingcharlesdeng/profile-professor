import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './store';
import { UserProvider } from './contexts/UserContext';
import Layout from './Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import GroupsPage from './pages/GroupsPage/GroupsPage';
import FeedbackPage from './pages/FeedbackPage/FeedbackPage';
import PrivacySettingsPage from './pages/PrivacySettingsPage/PrivacySettingsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  useEffect(() => {
    console.log('App component mounted');
    console.log('Google Client ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID);
  }, []);

  if (!process.env.REACT_APP_GOOGLE_CLIENT_ID) {
    console.error('Google Client ID is not set in environment variables');
    return <div>Error: Google Client ID is not configured</div>;
  }

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <UserProvider>
          <ErrorBoundary>
            <Router>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                  <Route path="/groups" element={<ProtectedRoute><GroupsPage /></ProtectedRoute>} />
                  <Route path="/feedback" element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>} />
                  <Route path="/privacy" element={<ProtectedRoute><PrivacySettingsPage /></ProtectedRoute>} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                </Route>
              </Routes>
            </Router>
          </ErrorBoundary>
        </UserProvider>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;