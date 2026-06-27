import React from 'react';
import { formatTime, formatDate } from '../../../utils/formatDate';
import { formatCurrency } from '../../../utils/formatCurrency';
import { Plane, Armchair } from 'lucide-react';

const BookingSummary = ({ flight, seatNumbers, totalCost }) => {
  return (
    <div className="glass-panel rounded-3xl p-6 shadow-2xl space-y-6">
      <h3 className="font-display font-bold text-xl text-white border-b border-gray-800 pb-3">Journey Details</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Plane className="h-5 w-5 text-accent" />
          <span className="font-bold text-white">Flight {flight.flightNumber}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 bg-slate-900/60 border border-gray-800 rounded-2xl p-4 text-xs">
          <div>
            <p className="text-gray-500 font-bold uppercase tracking-wider">Departure</p>
            <p className="font-bold text-white text-sm mt-1">{flight.departureAirportId}</p>
            <p className="text-gray-400 mt-0.5">{formatTime(flight.departureTime)} | {formatDate(flight.departureTime)}</p>
          </div>
          <div>
            <p className="text-gray-500 font-bold uppercase tracking-wider">Arrival</p>
            <p className="font-bold text-white text-sm mt-1">{flight.arrivalAirportId}</p>
            <p className="text-gray-400 mt-0.5">{formatTime(flight.arrivalTime)} | {formatDate(flight.arrivalTime)}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 border-t border-gray-800 pt-4">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center space-x-1">
          <Armchair className="h-4 w-4 text-accent" />
          <span>Selected Cabin Seats</span>
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {seatNumbers.map((seat, idx) => (
            <span key={idx} className="bg-primary-light border border-gray-700 text-white font-black text-xs px-3.5 py-1.5 rounded-full">
              {seat}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800 pt-4 flex justify-between items-center">
        <span className="font-bold text-gray-400 text-sm">Total Fare Due</span>
        <span className="font-display font-black text-2xl text-accent">{formatCurrency(totalCost)}</span>
      </div>
    </div>
  );
};

export default BookingSummary;
