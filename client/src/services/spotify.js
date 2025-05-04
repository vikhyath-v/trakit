import axios from 'axios';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true
});

// Get the login URL from the backend
export const getLoginUrl = async () => {
  try {
    const response = await apiClient.get('/login-url');
    return response.data.loginUrl;
  } catch (error) {
    console.error('Error getting login URL:', error);
    throw error;
  }
};

// Exchange code for access token
export const authenticateWithCode = async (code) => {
  try {
    const response = await apiClient.get(`/callback?code=${code}`);
    return response.data;
  } catch (error) {
    console.error('Error authenticating with code:', error);
    throw error;
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Get top artists
export const getTopArtists = async (timeRange = 'short_term', limit = 5) => {
  try {
    const response = await apiClient.get(`/top-artists?time_range=${timeRange}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top artists:', error);
    throw error;
  }
};

// Get top tracks
export const getTopTracks = async (timeRange = 'short_term', limit = 5) => {
  try {
    const response = await apiClient.get(`/top-tracks?time_range=${timeRange}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    throw error;
  }
};

// Check authentication status
export const checkAuthStatus = async () => {
  try {
    const response = await apiClient.get('/auth-status');
    return response.data.authenticated;
  } catch (error) {
    console.error('Error checking auth status:', error);
    return false;
  }
};

// Refresh token
export const refreshToken = async () => {
  try {
    const response = await apiClient.get('/refresh-token');
    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return false;
  }
}; 