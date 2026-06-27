import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, DollarSign } from 'lucide-react';
import Button from '../Button/Button';

const SearchBar = ({ onSearch, initialFilters }) => {
  const [trips, setTrips] = useState(initialFilters?.trips || '');
  const [tripDate, setTripDate] = useState(initialFilters?.tripDate || '');
  const [travellers, setTravellers] = useState(initialFilters?.travellers || 1);
  const [price, setPrice] = useState(initialFilters?.price || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In our backend, query filters expect price parameter as min-max format (e.g. "0-500").
    const priceParam = price ? `0-${price}` : '';
    onSearch({ trips, tripDate, travellers, price: priceParam });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel w-full rounded-3xl p-6 shadow-2xl flex flex-col lg:flex-row gap-4 items-end">
      {/* Route */}
      <div className="flex-1 w-full flex flex-col space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1">
          <MapPin className="h-3 w-3 text-accent" />
          <span>Route (DEP-ARR)</span>
        </label>
        <input
          type="text"
          value={trips}
          onChange={(e) => setTrips(e.target.value.toUpperCase())}
          placeholder="e.g. DEP-ARR"
          className="glass-input w-full rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none"
        />
      </div>

      {/* Date */}
      <div className="w-full lg:w-48 flex flex-col space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1">
          <Calendar className="h-3 w-3 text-accent" />
          <span>Departure Date</span>
        </label>
        <input
          type="date"
          value={tripDate}
          onChange={(e) => setTripDate(e.target.value)}
          className="glass-input w-full rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none"
        />
      </div>

      {/* Travellers */}
      <div className="w-full lg:w-36 flex flex-col space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1">
          <Users className="h-3 w-3 text-accent" />
          <span>Passengers</span>
        </label>
        <input
          type="number"
          min="1"
          max="9"
          value={travellers}
          onChange={(e) => setTravellers(parseInt(e.target.value) || 1)}
          className="glass-input w-full rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none"
        />
      </div>

      {/* Max Price */}
      <div className="w-full lg:w-40 flex flex-col space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1">
          <DollarSign className="h-3 w-3 text-accent" />
          <span>Max Price (USD)</span>
        </label>
        <input
          type="number"
          placeholder="e.g. 500"
          value={price.includes('-') ? price.split('-')[1] : price}
          onChange={(e) => setPrice(e.target.value)}
          className="glass-input w-full rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none"
        />
      </div>

      {/* Search Button */}
      <Button type="submit" variant="primary" className="w-full lg:w-auto px-8 py-3.5 flex items-center justify-center space-x-2">
        <Search className="h-4 w-4" />
        <span>Search Flights</span>
      </Button>
    </form>
  );
};

export default SearchBar;
