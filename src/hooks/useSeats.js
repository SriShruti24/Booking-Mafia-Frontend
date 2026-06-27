import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import {
  selectAllSeats,
  selectSelectedSeatNumbers,
  selectSeatHoldDetails,
  selectSeatTimerSeconds,
  selectSeatsLoading,
  selectSeatsError,
} from '../features/seats/seatSelectors';
import {
  fetchSeatsThunk,
  holdSeatsThunk,
  releaseSeatsThunk,
} from '../features/seats/seatThunk';
import {
  toggleSeatSelection,
  clearSelectedSeats,
  clearHoldDetails,
  decrementTimer,
  updateSeatRealtime,
} from '../features/seats/seatSlice';
import { initiateSocket, disconnectSocket, subscribeToSeatUpdates } from '../socket/socket';

export const useSeats = (flightId) => {
  const dispatch = useDispatch();

  const seats = useSelector(selectAllSeats);
  const selectedSeatNumbers = useSelector(selectSelectedSeatNumbers);
  const holdDetails = useSelector(selectSeatHoldDetails);
  const timerSeconds = useSelector(selectSeatTimerSeconds);
  const loading = useSelector(selectSeatsLoading);
  const error = useSelector(selectSeatsError);

  const fetchSeats = useCallback(() => {
    if (flightId) dispatch(fetchSeatsThunk(flightId));
  }, [dispatch, flightId]);

  const selectSeat = useCallback((seatNumber) => {
    dispatch(toggleSeatSelection(seatNumber));
  }, [dispatch]);

  const resetSeatSelection = useCallback(() => {
    dispatch(clearSelectedSeats());
  }, [dispatch]);

  const holdSelectedSeats = useCallback((userId) => {
    if (flightId && selectedSeatNumbers.length > 0) {
      return dispatch(holdSeatsThunk(flightId, selectedSeatNumbers, userId));
    }
  }, [dispatch, flightId, selectedSeatNumbers]);

  const releaseHeldSeats = useCallback((userId) => {
    if (flightId && selectedSeatNumbers.length > 0) {
      dispatch(releaseSeatsThunk(flightId, selectedSeatNumbers, userId));
      dispatch(clearHoldDetails());
    }
  }, [dispatch, flightId, selectedSeatNumbers]);

  // Handle Realtime Socket Connection
  useEffect(() => {
    if (!flightId) return;

    initiateSocket(flightId);

    subscribeToSeatUpdates((update) => {
      dispatch(updateSeatRealtime(update));
    });

    return () => {
      disconnectSocket(flightId);
    };
  }, [dispatch, flightId]);

  // Handle Timer Countdown
  useEffect(() => {
    if (timerSeconds === null) return;
    if (timerSeconds <= 0) {
      dispatch(clearHoldDetails());
      return;
    }

    const interval = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, timerSeconds]);

  return {
    seats,
    selectedSeatNumbers,
    holdDetails,
    timerSeconds,
    loading,
    error,
    fetchSeats,
    selectSeat,
    resetSeatSelection,
    holdSelectedSeats,
    releaseHeldSeats,
  };
};
