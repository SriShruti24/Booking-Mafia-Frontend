import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  seats: [],
  selectedSeatNumbers: [],
  holdDetails: null, // { holdUntil, holdBy }
  timerSeconds: null,
  loading: false,
  error: null,
};

const seatSlice = createSlice({
  name: 'seats',
  initialState,
  reducers: {
    seatsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    seatsSuccess: (state, action) => {
      state.loading = false;
      state.seats = action.payload;
    },
    seatsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    toggleSeatSelection: (state, action) => {
      const seatNumber = action.payload;
      const index = state.selectedSeatNumbers.indexOf(seatNumber);
      if (index > -1) {
        state.selectedSeatNumbers.splice(index, 1);
      } else {
        state.selectedSeatNumbers.push(seatNumber);
      }
    },
    clearSelectedSeats: (state) => {
      state.selectedSeatNumbers = [];
    },
    setHoldDetails: (state, action) => {
      state.holdDetails = action.payload;
    },
    clearHoldDetails: (state) => {
      state.holdDetails = null;
      state.timerSeconds = null;
    },
    setTimer: (state, action) => {
      state.timerSeconds = action.payload;
    },
    decrementTimer: (state) => {
      if (state.timerSeconds !== null && state.timerSeconds > 0) {
        state.timerSeconds -= 1;
      }
    }
  },
});

export const {
  seatsStart,
  seatsSuccess,
  seatsFailure,
  toggleSeatSelection,
  clearSelectedSeats,
  setHoldDetails,
  clearHoldDetails,
  setTimer,
  decrementTimer
} = seatSlice.actions;
export default seatSlice.reducer;
