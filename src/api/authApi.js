import axiosClient from './axios';

export const authApi = {
  signup: (data) => axiosClient.post('/api/v1/user/signup', data),
  signin: (data) => axiosClient.post('/api/v1/user/signin', data),
  getMe: () => axiosClient.get('/api/v1/user/me'),
};
