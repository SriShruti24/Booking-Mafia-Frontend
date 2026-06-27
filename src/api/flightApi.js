import axiosClient from './axios';

export const flightApi = {
  getAll: (params) => axiosClient.get('/flightsService/api/v1/flights', { params }),
  getById: (id) => axiosClient.get(`/flightsService/api/v1/flights/${id}`),
};
