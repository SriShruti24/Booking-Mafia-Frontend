import React from 'react';
import FlightCard from '../FlightCard/FlightCard';

const FlightList = ({ flights, onSelectFlight }) => {
  if (flights.length === 0) {
    return (
      <div className="glass-panel w-full rounded-3xl p-12 text-center text-gray-400">
        <p className="text-lg font-semibold">No flights matching your search criteria were found.</p>
        <p className="text-sm text-gray-500 mt-2">Try adjusting your route, dates, or search filters.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      {flights.map(flight => (
        <FlightCard key={flight.id} flight={flight} onSelect={onSelectFlight} />
      ))}
    </div>
  );
};

export default FlightList;
