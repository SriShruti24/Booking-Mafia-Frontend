import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentBooking: null,
  userBookings: [],
  idempotencyKey: null,
  loading: false,
  error: null,
  paymentSuccess: false,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    bookingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    bookingSuccess: (state, action) => {
      state.loading = false;
      state.currentBooking = action.payload;
      state.paymentSuccess = false;
    },
    userBookingsSuccess: (state, action) => {
      state.loading = false;
      state.userBookings = action.payload;
    },
    bookingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    paymentSuccessAction: (state) => {
      state.loading = false;
      state.paymentSuccess = true;
      state.currentBooking = null; // Clear active booking after success
      state.idempotencyKey = null;
    },
    setIdempotencyKey: (state, action) => {
      state.idempotencyKey = action.payload;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
      state.idempotencyKey = null;
      state.paymentSuccess = false;
    }
  },
});

export const {
  bookingStart,
  bookingSuccess,
  userBookingsSuccess,
  bookingFailure,
  paymentSuccessAction,
  setIdempotencyKey,
  clearCurrentBooking
} = bookingSlice.actions;
export default bookingSlice.reducer;
