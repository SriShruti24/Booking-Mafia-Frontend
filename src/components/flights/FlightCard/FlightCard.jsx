import React from 'react';
import { formatTime, formatDate } from '../../../utils/formatDate';
import { formatCurrency } from '../../../utils/formatCurrency';
import { ArrowRight, Plane, Armchair } from 'lucide-react';
import Button from '../../common/Button/Button';

const FlightCard = ({ flight, onSelect }) => {
  const durationMs = new Date(flight.arrivalTime) - new Date(flight.departureTime);
  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMins = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="glass-card w-full rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
      {/* Route & Times */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-6 w-full">
        {/* Departure */}
        <div className="text-center md:text-left">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{formatDate(flight.departureTime)}</p>
          <h4 className="text-3xl font-display font-bold text-white mt-1">{formatTime(flight.departureTime)}</h4>
          <p className="text-sm font-semibold text-accent mt-1">{flight.departureAirportId}</p>
        </div>

        {/* Path Indicator */}
        <div className="flex-1 flex flex-col items-center max-w-xs w-full px-4">
          <span className="text-xs font-semibold text-gray-500">{durationHours}h {durationMins}m</span>
          <div className="w-full flex items-center justify-between relative mt-2">
            <div className="absolute top-1/2 left-0 right-0 border-t-2 border-dashed border-gray-700 -translate-y-1/2"></div>
            <div className="h-3 w-3 bg-accent rounded-full relative z-10"></div>
            <Plane className="h-5 w-5 text-accent rotate-90 transform relative z-10 bg-slate-950 px-0.5" />
            <div className="h-3 w-3 bg-accent rounded-full relative z-10"></div>
          </div>
          <span className="text-xs font-bold text-gray-500 mt-2">Direct Flight</span>
        </div>

        {/* Arrival */}
        <div className="text-center md:text-right">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{formatDate(flight.arrivalTime)}</p>
          <h4 className="text-3xl font-display font-bold text-white mt-1">{formatTime(flight.arrivalTime)}</h4>
          <p className="text-sm font-semibold text-accent mt-1">{flight.arrivalAirportId}</p>
        </div>
      </div>

      {/* Pricing & Aircraft Details */}
      <div className="flex flex-col items-center md:items-end justify-center min-w-[200px] border-t md:border-t-0 md:border-l border-gray-800 pt-6 md:pt-0 md:pl-6 w-full md:w-auto">
        <p className="text-xs text-gray-400 font-semibold flex items-center space-x-1">
          <Armchair className="h-3.5 w-3.5 text-gray-500" />
          <span>Flight: {flight.flightNumber}</span>
        </p>
        <div className="mt-3 flex items-baseline space-x-1">
          <span className="text-xs font-bold text-gray-500">Base Fare:</span>
          <h3 className="text-3xl font-display font-black text-white">{formatCurrency(flight.price)}</h3>
        </div>
        <Button onClick={() => onSelect(flight.id)} variant="primary" className="mt-4 w-full md:w-auto px-6 py-2.5 flex items-center justify-center space-x-2">
          <span>Book Seats</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FlightCard;
