import { seatApi } from '../../api/seatApi';
import {
  seatsStart, seatsSuccess, seatsFailure, seatsRefresh,
  setHoldDetails, setTimer, clearSelectedSeats
} from './seatSlice';

// Initial fetch with loading indicator (first load only)
export const fetchSeatsThunk = (flightId) => async (dispatch) => {
  dispatch(seatsStart());
  try {
    const response = await seatApi.getSeats(flightId);
    dispatch(seatsSuccess(response.data || response));
  } catch (error) {
    dispatch(seatsFailure(error.message));
  }
};

// Silent background poll — does NOT set loading=true, so the UI (button, panels)
// is never disabled or re-rendered disruptively every 2 seconds.
export const pollSeatsThunk = (flightId) => async (dispatch) => {
  try {
    const response = await seatApi.getSeats(flightId);
    dispatch(seatsRefresh(response.data || response));
  } catch {
    // Silently ignore poll errors — next tick will retry automatically
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

    // Immediately mark loading done with the returned held seat data.
    // The 2-second poll will pick up the HOLD status for other users' views.
    dispatch(seatsSuccess(seats));

  } catch (error) {
    // On CONFLICT (seat taken by another user at the same moment):
    // 1. Mark hold as failed (loading=false)
    // 2. Deselect all chosen seats — they may now be taken
    // 3. Immediately fire a fresh seat poll so the map shows the HOLD indicator
    //    instead of waiting up to 2 seconds for the next scheduled poll.
    const isConflict = error.conflict ||
      (error.message && error.message.toLowerCase().includes('not available'));

    dispatch(seatsFailure(error.message));

    if (isConflict) {
      // Clear the user's selection — the seat they chose is now held by someone else
      dispatch(clearSelectedSeats());
      // Fetch fresh seat data immediately so the map turns amber without delay
      try {
        const fresh = await seatApi.getSeats(flightId);
        dispatch(seatsRefresh(fresh.data || fresh));
      } catch {
        // Ignore — the 2s poll will pick it up
      }
    }

    throw error; // Re-throw so SeatSelection can display the error message
  }
};

export const releaseSeatsThunk = (flightId, seatNumbers, userId) => async (dispatch) => {
  try {
    await seatApi.releaseSeats(flightId, { seatNumbers, holdBy: userId.toString() });
  } catch (error) {
    console.error('Failed to release seats:', error.message);
  }
};
