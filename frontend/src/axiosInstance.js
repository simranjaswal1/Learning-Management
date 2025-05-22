// src/api/axios.js
import axios from 'axios';

// Helper to get token from localStorage or cookies (safer cookie parse)
const getAuthToken = () => {
  const tokenFromStorage = localStorage.getItem('token');
  if (tokenFromStorage) return tokenFromStorage;

  // Parse cookies for token (assuming cookie named 'token')
  const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
  return match ? match[2] : null;
};

// Dynamically set base URL based on environment
const baseURL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8000/api'
    : 'https://learning-management-pblg.onrender.com/api';

const instance = axios.create({
  baseURL,
  withCredentials: true, // to send cookies if backend uses sessions
});

instance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
