// src/api/axios.js
import axios from 'axios';

// Function to get JWT token from cookies or localStorage
const getAuthToken = () => {
  // Check if the token is stored in cookies or localStorage
  return localStorage.getItem('token') || document.cookie.split('=')[1]; // Adjust according to your storage method
};

// Create an axios instance
const instance = axios.create({
  baseURL: 'http://localhost:8000/api',  // Set your base URL here
  withCredentials: true,  // Ensure cookies are sent with the request
});

// Attach the JWT token to the headers if it exists
instance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;  // Add the token to headers
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
