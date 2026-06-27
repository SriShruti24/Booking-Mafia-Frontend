import React from 'react';
import { ShieldAlert } from 'lucide-react';

const FlightFilters = () => {
  return (
    <div className="glass-panel rounded-3xl p-6 hidden lg:block w-72 h-fit space-y-6">
      <h3 className="font-display font-bold text-lg text-white">Travel Guard</h3>
      <div className="flex items-start space-x-3 text-xs text-gray-400 bg-accent/5 rounded-2xl p-4 border border-accent/20">
        <ShieldAlert className="h-5 w-5 text-accent shrink-0 animate-pulse" />
        <p className="leading-relaxed">
          Booking Mafia guarantees locked-in fares and real-time seat reservation guarantees under high concurrent booking demands.
        </p>
      </div>
    </div>
  );
};

export default FlightFilters;
