import React from 'react';
import { Armchair } from 'lucide-react';

const SeatLegend = () => {
  const statusItems = [
    { label: 'Selected by you', colorClass: 'bg-cyan-500 border-cyan-300 text-slate-950 ring-2 ring-cyan-400/30' },
    { label: 'Held by you',     colorClass: 'bg-amber-500 border-amber-600 text-slate-950' },
    { label: 'Held by other',   colorClass: 'bg-slate-700/60 border-slate-700 text-slate-400 opacity-60' },
    { label: 'Booked',          colorClass: 'bg-rose-900/40 border-rose-800 text-rose-400 opacity-60' },
    { label: 'Blocked',         colorClass: 'bg-slate-800 border-slate-700 text-slate-600 opacity-40' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 bg-slate-900 border border-gray-800 p-3 rounded-2xl w-full">
      <p className="w-full text-center text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">Seat Status Legend</p>
      {statusItems.map((item, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          <div className={`w-6 h-6 rounded-md flex items-center justify-center border ${item.colorClass}`}>
            <Armchair className="h-3 w-3" />
          </div>
          <span className="text-[10px] text-gray-400 font-semibold">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SeatLegend;
