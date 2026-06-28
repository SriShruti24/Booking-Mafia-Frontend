import axiosClient from './axios';

export const seatApi = {
  // Add ?_t= timestamp to bust browser cache — without this, GET /seats returns
  // 304 Not Modified and polling never sees updated seat statuses from other users.
  getSeats: (flightId) => axiosClient.get(
    `/flightsService/api/v1/flights/${flightId}/seats?_t=${Date.now()}`,
    { headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' } }
  ),
  holdSeats: (flightId, data) => axiosClient.post(`/flightsService/api/v1/flights/${flightId}/seats/hold`, data),
  releaseSeats: (flightId, data) => axiosClient.post(`/flightsService/api/v1/flights/${flightId}/seats/release`, data),
  confirmSeats: (flightId, data) => axiosClient.post(`/flightsService/api/v1/flights/${flightId}/seats/confirm`, data),
};
