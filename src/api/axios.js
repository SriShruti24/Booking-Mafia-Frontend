import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout — prevents hung requests locking the UI forever
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['x-access-token'] = token; // Support custom headers if gateway expects it
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const data = error.response?.data;
    const message = data?.message || data?.error?.explanation || 'Something went wrong';
    const err = new Error(message);
    // Preserve the conflict flag so holdSeatsThunk can handle race conditions
    if (data?.conflict) err.conflict = true;
    return Promise.reject(err);
  }
);

export default axiosClient;
