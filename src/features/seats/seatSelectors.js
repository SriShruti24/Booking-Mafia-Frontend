export const selectAllSeats = (state) => state.seats.seats;
export const selectSelectedSeatNumbers = (state) => state.seats.selectedSeatNumbers;
export const selectSeatHoldDetails = (state) => state.seats.holdDetails;
export const selectSeatTimerSeconds = (state) => state.seats.timerSeconds;
export const selectSeatsLoading = (state) => state.seats.loading;
export const selectSeatsError = (state) => state.seats.error;
