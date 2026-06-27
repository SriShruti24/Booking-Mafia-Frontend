import axiosClient from './axios';

export const bookingApi = {
  create: (data) => axiosClient.post('/bookingService/api/v1/bookings', data),
  makePayment: (data, idempotencyKey) => axiosClient.post('/bookingService/api/v1/bookings/payments', data, {
    headers: {
      'x-idempotency-key': idempotencyKey
    }
  }),
  getById: (id) => axiosClient.get(`/bookingService/api/v1/bookings/${id}`),
  getByUser: (userId) => axiosClient.get(`/bookingService/api/v1/bookings/user/${userId}`),
  cancel: (id) => axiosClient.post(`/bookingService/api/v1/bookings/${id}/cancel`),
};
