import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flights: [],
  selectedFlight: null,
  filters: {
    trips: '',
    price: '',
    travellers: 1,
    tripDate: '',
  },
  sort: '',
  loading: false,
  error: null,
};

const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    flightsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    flightsSuccess: (state, action) => {
      state.loading = false;
      state.flights = action.payload;
    },
    flightDetailSuccess: (state, action) => {
      state.loading = false;
      state.selectedFlight = action.payload;
    },
    flightsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    clearSelectedFlight: (state) => {
      state.selectedFlight = null;
    }
  },
});

export const {
  flightsStart,
  flightsSuccess,
  flightDetailSuccess,
  flightsFailure,
  setFilters,
  setSort,
  clearSelectedFlight
} = flightsSlice.actions;
export default flightsSlice.reducer;
