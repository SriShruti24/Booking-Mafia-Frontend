export const selectAllFlights = (state) => state.flights.flights;
export const selectSelectedFlight = (state) => state.flights.selectedFlight;
export const selectFlightFilters = (state) => state.flights.filters;
export const selectFlightSort = (state) => state.flights.sort;
export const selectFlightsLoading = (state) => state.flights.loading;
export const selectFlightsError = (state) => state.flights.error;
