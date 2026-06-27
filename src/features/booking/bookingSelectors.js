export const selectCurrentBooking = (state) => state.booking.currentBooking;
export const selectUserBookings = (state) => state.booking.userBookings;
export const selectIdempotencyKey = (state) => state.booking.idempotencyKey;
export const selectBookingLoading = (state) => state.booking.loading;
export const selectBookingError = (state) => state.booking.error;
export const selectPaymentSuccess = (state) => state.booking.paymentSuccess;
