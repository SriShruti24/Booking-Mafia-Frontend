import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  selectAllFlights,
  selectSelectedFlight,
  selectFlightFilters,
  selectFlightSort,
  selectFlightsLoading,
  selectFlightsError,
} from '../features/flights/flightsSelectors';
import {
  fetchFlightsThunk,
  fetchFlightByIdThunk,
} from '../features/flights/flightsThunk';
import { setFilters, setSort, clearSelectedFlight } from '../features/flights/flightsSlice';

export const useFlights = () => {
  const dispatch = useDispatch();

  const flights = useSelector(selectAllFlights);
  const selectedFlight = useSelector(selectSelectedFlight);
  const filters = useSelector(selectFlightFilters);
  const sort = useSelector(selectFlightSort);
  const loading = useSelector(selectFlightsLoading);
  const error = useSelector(selectFlightsError);

  const fetchFlights = useCallback((f = filters, s = sort) => dispatch(fetchFlightsThunk(f, s)), [dispatch, filters, sort]);
  const fetchFlightById = useCallback((id) => dispatch(fetchFlightByIdThunk(id)), [dispatch]);
  const updateFilters = useCallback((newFilters) => dispatch(setFilters(newFilters)), [dispatch]);
  const updateSort = useCallback((newSort) => dispatch(setSort(newSort)), [dispatch]);
  const resetSelectedFlight = useCallback(() => dispatch(clearSelectedFlight()), [dispatch]);

  return {
    flights,
    selectedFlight,
    filters,
    sort,
    loading,
    error,
    fetchFlights,
    fetchFlightById,
    updateFilters,
    updateSort,
    resetSelectedFlight,
  };
};
