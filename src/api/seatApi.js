import axiosClient from './axios';

export const seatApi = {
  getSeats: (flightId) => axiosClient.get(`/flightsService/api/v1/flights/${flightId}/seats`),
  holdSeats: (flightId, data) => axiosClient.post(`/flightsService/api/v1/flights/${flightId}/seats/hold`, data),
  releaseSeats: (flightId, data) => axiosClient.post(`/flightsService/api/v1/flights/${flightId}/seats/release`, data),
  confirmSeats: (flightId, data) => axiosClient.post(`/flightsService/api/v1/flights/${flightId}/seats/confirm`, data),
};
