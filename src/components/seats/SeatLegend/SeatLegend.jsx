import React from 'react';
import { Armchair } from 'lucide-react';

const SeatLegend = () => {
  const legendItems = [
    { label: 'Available', colorClass: 'bg-emerald-500 border-emerald-600 text-slate-950' },
    { label: 'Selected', colorClass: 'bg-cyan-500 border-cyan-300 text-slate-950 ring-2 ring-cyan-500/20' },
    { label: 'Held', colorClass: 'bg-amber-700/60 border-amber-800 text-amber-300' },
    { label: 'Booked', colorClass: 'bg-rose-500/40 border-rose-600 text-rose-300' },
    { label: 'Blocked', colorClass: 'bg-slate-700 border-slate-800 text-slate-400' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 bg-slate-900 border border-gray-800 p-4 rounded-2xl w-full">
      {legendItems.map((item, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          <div className={`w-6 h-6 rounded-md flex items-center justify-center border text-[9px] font-bold ${item.colorClass}`}>
            <Armchair className="h-3 w-3" />
          </div>
          <span className="text-xs text-gray-400 font-semibold">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SeatLegend;
