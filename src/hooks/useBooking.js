import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  selectCurrentBooking,
  selectUserBookings,
  selectIdempotencyKey,
  selectBookingLoading,
  selectBookingError,
  selectPaymentSuccess,
} from '../features/booking/bookingSelectors';
import {
  createBookingThunk,
  makePaymentThunk,
  fetchUserBookingsThunk,
  cancelBookingThunk,
} from '../features/booking/bookingThunk';
import { clearCurrentBooking } from '../features/booking/bookingSlice';

export const useBooking = () => {
  const dispatch = useDispatch();

  const currentBooking = useSelector(selectCurrentBooking);
  const userBookings = useSelector(selectUserBookings);
  const idempotencyKey = useSelector(selectIdempotencyKey);
  const loading = useSelector(selectBookingLoading);
  const error = useSelector(selectBookingError);
  const paymentSuccess = useSelector(selectPaymentSuccess);

  const createBooking = useCallback((flightId, seatNumbers, userId) => dispatch(createBookingThunk(flightId, seatNumbers, userId)), [dispatch]);
  const makePayment = useCallback((bookingId, totalCost, userId, key = idempotencyKey) => dispatch(makePaymentThunk(bookingId, totalCost, userId, key)), [dispatch, idempotencyKey]);
  const fetchUserBookings = useCallback((userId) => dispatch(fetchUserBookingsThunk(userId)), [dispatch]);
  const cancelBooking = useCallback((bookingId, userId) => dispatch(cancelBookingThunk(bookingId, userId)), [dispatch]);
  const resetBookingState = useCallback(() => dispatch(clearCurrentBooking()), [dispatch]);

  return {
    currentBooking,
    userBookings,
    idempotencyKey,
    loading,
    error,
    paymentSuccess,
    createBooking,
    makePayment,
    fetchUserBookings,
    cancelBooking,
    resetBookingState,
  };
};
