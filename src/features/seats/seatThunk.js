import { seatApi } from '../../api/seatApi';
import { seatsStart, seatsSuccess, seatsFailure, setHoldDetails, setTimer } from './seatSlice';

export const fetchSeatsThunk = (flightId) => async (dispatch) => {
  dispatch(seatsStart());
  try {
    const response = await seatApi.getSeats(flightId);
    dispatch(seatsSuccess(response.data || response));
  } catch (error) {
    dispatch(seatsFailure(error.message));
  }
};

export const holdSeatsThunk = (flightId, seatNumbers, userId) => async (dispatch) => {
  dispatch(seatsStart());
  try {
    const response = await seatApi.holdSeats(flightId, { seatNumbers, holdBy: userId.toString() });
    const seats = response.data || response;
    
    const holdUntil = seats[0]?.holdUntil || new Date(Date.now() + 2 * 60 * 1000).toISOString();
    dispatch(setHoldDetails({ holdUntil, holdBy: userId }));
    
    const timeRemaining = Math.max(0, Math.floor((new Date(holdUntil) - new Date()) / 1000));
    dispatch(setTimer(timeRemaining));
    
    const updatedSeats = await seatApi.getSeats(flightId);
    dispatch(seatsSuccess(updatedSeats.data || updatedSeats));
  } catch (error) {
    dispatch(seatsFailure(error.message));
    throw error;
  }
};

export const releaseSeatsThunk = (flightId, seatNumbers, userId) => async (dispatch) => {
  try {
    await seatApi.releaseSeats(flightId, { seatNumbers, holdBy: userId.toString() });
  } catch (error) {
    console.error("Failed to release seats:", error.message);
  }
};
