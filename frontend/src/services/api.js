import axios from 'axios';

// Create Axios instance with default configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 second timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle different error types with user-friendly messages
    if (error.code === 'ECONNABORTED') {
      error.userMessage = 'Request timed out. Please try again.';
    } else if (!error.response) {
      error.userMessage = 'Network error. Please check your internet connection.';
    } else if (error.response.status === 401) {
      // Token expired or invalid - clear storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      error.userMessage = 'Session expired. Please login again.';
    } else if (error.response.status === 403) {
      error.userMessage = 'You do not have permission to perform this action.';
    } else if (error.response.status === 404) {
      error.userMessage = error.response.data?.error || 'The requested resource was not found.';
    } else if (error.response.status === 500) {
      error.userMessage = 'Server error. Please try again later.';
    } else {
      error.userMessage = error.response.data?.error || 'Something went wrong. Please try again.';
    }
    
    return Promise.reject(error);
  }
);

export default api;