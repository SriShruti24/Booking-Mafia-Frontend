import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import flightsReducer from '../features/flights/flightsSlice';
import seatsReducer from '../features/seats/seatSlice';
import bookingReducer from '../features/booking/bookingSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  flights: flightsReducer,
  seats: seatsReducer,
  booking: bookingReducer,
});

export default rootReducer;
