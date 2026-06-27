import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlights } from '../../hooks/useFlights';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import FlightList from '../../components/flights/FlightList/FlightList';
import FlightFilters from '../../components/flights/FlightFilters/FlightFilters';
import FlightSort from '../../components/flights/FlightSort/FlightSort';
import Loader from '../../components/common/Loader/Loader';

const SearchFlights = () => {
  const navigate = useNavigate();
  const {
    flights,
    filters,
    sort,
    loading,
    error,
    fetchFlights,
    updateFilters,
    updateSort,
  } = useFlights();

  useEffect(() => {
    // Initial fetch of flights when entering page
    fetchFlights(filters, sort);
  }, [filters, sort, fetchFlights]);

  const handleSearchSubmit = (newFilters) => {
    updateFilters(newFilters);
  };

  const handleSortChange = (newSort) => {
    updateSort(newSort);
  };

  const handleSelectFlight = (flightId) => {
    navigate(`/flights/${flightId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex-grow flex flex-col space-y-8">
      {/* Page Title */}
      <div className="space-y-1">
        <h2 className="font-display font-black text-3xl md:text-4xl text-white">Find Your Next Destination</h2>
        <p className="text-gray-400 text-sm">Enter routes and date parameters to view all scheduled flights.</p>
      </div>

      {/* Search Header */}
      <SearchBar onSearch={handleSearchSubmit} initialFilters={filters} />

      {/* Content Container */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Side filter panel */}
        <FlightFilters />

        {/* List catalog */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Available Flights: {flights.length}
            </span>
            <FlightSort currentSort={sort} onSortChange={handleSortChange} />
          </div>

          {loading ? (
            <div className="py-20 flex justify-center w-full">
              <Loader message="Searching for scheduled flights..." />
            </div>
          ) : error ? (
            <div className="glass-panel w-full rounded-3xl p-10 text-center border-rose-500/20 text-rose-400">
              <p className="font-bold">Error loading flights</p>
              <p className="text-xs text-gray-500 mt-2">{error}</p>
            </div>
          ) : (
            <FlightList flights={flights} onSelectFlight={handleSelectFlight} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFlights;
