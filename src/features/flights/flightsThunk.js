import { flightApi } from '../../api/flightApi';
import { flightsStart, flightsSuccess, flightDetailSuccess, flightsFailure } from './flightsSlice';

export const fetchFlightsThunk = (filters, sort) => async (dispatch) => {
  dispatch(flightsStart());
  try {
    const params = {};
    if (filters.trips) params.trips = filters.trips;
    if (filters.price) params.price = filters.price;
    if (filters.travellers) params.travellers = filters.travellers;
    if (filters.tripDate) params.tripDate = filters.tripDate;
    if (sort) params.sort = sort;

    const response = await flightApi.getAll(params);
    dispatch(flightsSuccess(response.data || response));
  } catch (error) {
    dispatch(flightsFailure(error.message));
  }
};

export const fetchFlightByIdThunk = (id) => async (dispatch) => {
  dispatch(flightsStart());
  try {
    const response = await flightApi.getById(id);
    dispatch(flightDetailSuccess(response.data || response));
  } catch (error) {
    dispatch(flightsFailure(error.message));
  }
};
