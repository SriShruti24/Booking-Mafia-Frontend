import { bookingApi } from '../../api/bookingApi';
import {
  bookingStart,
  bookingSuccess,
  userBookingsSuccess,
  bookingFailure,
  paymentSuccessAction,
  setIdempotencyKey
} from './bookingSlice';

export const createBookingThunk = (flightId, seatNumbers, userId) => async (dispatch) => {
  dispatch(bookingStart());
  try {
    const response = await bookingApi.create({ flightId, seatNumbers, userId });
    dispatch(bookingSuccess(response.data || response));
    
    // Generate an idempotency key for payment safety
    const key = `key_${flightId}_${Date.now()}`;
    dispatch(setIdempotencyKey(key));
  } catch (error) {
    dispatch(bookingFailure(error.message));
    throw error;
  }
};

export const makePaymentThunk = (bookingId, totalCost, userId, idempotencyKey) => async (dispatch) => {
  dispatch(bookingStart());
  try {
    await bookingApi.makePayment({ bookingId, totalCost, userId }, idempotencyKey);
    dispatch(paymentSuccessAction());
    // Re-fetch bookings so profile page immediately shows updated 'booked' status
    const response = await bookingApi.getByUser(userId);
    dispatch(userBookingsSuccess(response.data || response));
  } catch (error) {
    dispatch(bookingFailure(error.message));
    throw error;
  }
};

export const fetchUserBookingsThunk = (userId) => async (dispatch) => {
  dispatch(bookingStart());
  try {
    const response = await bookingApi.getByUser(userId);
    dispatch(userBookingsSuccess(response.data || response));
  } catch (error) {
    dispatch(bookingFailure(error.message));
  }
};

export const cancelBookingThunk = (bookingId, userId) => async (dispatch) => {
  dispatch(bookingStart());
  try {
    await bookingApi.cancel(bookingId);
    const response = await bookingApi.getByUser(userId);
    dispatch(userBookingsSuccess(response.data || response));
  } catch (error) {
    dispatch(bookingFailure(error.message));
  }
};
