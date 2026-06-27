import React from 'react';
import { ArrowUpDown } from 'lucide-react';

const FlightSort = ({ currentSort, onSortChange }) => {
  const options = [
    { value: '', label: 'Recommended' },
    { value: 'price_ASC', label: 'Price: Low to High' },
    { value: 'price_DESC', label: 'Price: High to Low' },
    { value: 'departureTime_ASC', label: 'Departure: Earliest' },
    { value: 'departureTime_DESC', label: 'Departure: Latest' }
  ];

  return (
    <div className="flex items-center space-x-2 bg-slate-900 border border-gray-800 rounded-2xl px-4 py-2 text-xs">
      <ArrowUpDown className="h-4 w-4 text-gray-500" />
      <span className="text-gray-400 font-bold uppercase tracking-wider">Sort by:</span>
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-slate-950 text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FlightSort;
