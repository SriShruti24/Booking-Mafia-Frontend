import React from 'react';
import { Armchair } from 'lucide-react';

const SeatMap = ({ seats, selectedSeatNumbers, onSeatClick, holdDetails, currentUserId }) => {
  // Group seats by row number
  const rowsMap = {};
  seats.forEach(seat => {
    const match = seat.seatNumber.match(/^(\d+)([A-F])$/);
    if (match) {
      const rowNum = parseInt(match[1]);
      const colLetter = match[2];
      if (!rowsMap[rowNum]) rowsMap[rowNum] = {};
      rowsMap[rowNum][colLetter] = seat;
    }
  });

  const rowNumbers = Object.keys(rowsMap).sort((a, b) => parseInt(a) - parseInt(b));
  const columnsLeft = ['A', 'B', 'C'];
  const columnsRight = ['D', 'E', 'F'];

  const getSeatColor = (seat) => {
    const isSelected = selectedSeatNumbers.includes(seat.seatNumber);
    if (isSelected) {
      return 'bg-cyan-500 text-slate-950 border-cyan-300 ring-4 ring-cyan-500/35 scale-105';
    }

    switch (seat.status) {
      case 'AVAILABLE':
        return 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-600 hover:scale-105';
      case 'HOLD':
        // If held by current user, render distinctively
        if (seat.holdBy === currentUserId?.toString()) {
          return 'bg-amber-500 text-slate-950 border-amber-600 ring-2 ring-amber-500/50';
        }
        return 'bg-amber-700/60 border-amber-800 text-amber-300 cursor-not-allowed opacity-60';
      case 'BOOKED':
        return 'bg-rose-500 border-rose-600 text-slate-950 cursor-not-allowed opacity-40';
      case 'BLOCKED':
      default:
        return 'bg-slate-700 border-slate-800 text-slate-400 cursor-not-allowed opacity-30';
    }
  };

  const renderSeat = (seat) => {
    if (!seat) return <div key={Math.random()} className="w-8 h-8 md:w-10 md:h-10"></div>;

    const isSelectable = seat.status === 'AVAILABLE' || 
                         (seat.status === 'HOLD' && seat.holdBy === currentUserId?.toString()) ||
                         selectedSeatNumbers.includes(seat.seatNumber);

    return (
      <button
        key={seat.id}
        type="button"
        disabled={!isSelectable && !selectedSeatNumbers.includes(seat.seatNumber)}
        onClick={() => onSeatClick(seat.seatNumber)}
        title={`Seat: ${seat.seatNumber} | Class: ${seat.seatClass} | Type: ${seat.seatType} | Mult: ${seat.fareMultiplier}x | Status: ${seat.status}`}
        className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex flex-col items-center justify-center border font-display text-xs font-black transition-all cursor-pointer select-none ${getSeatColor(seat)}`}
      >
        <Armchair className="h-3.5 w-3.5 md:h-4.5 md:w-4.5" />
        <span className="text-[9px] mt-0.5">{seat.seatNumber}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center bg-slate-950 rounded-3xl p-6 border border-gray-800 shadow-inner max-h-[550px] overflow-y-auto custom-scrollbar">
      {/* Front indicator */}
      <div className="w-full max-w-xs bg-slate-900 border-b border-gray-700 text-center py-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase rounded-t-xl mb-8">
        Front of Aircraft (Cockpit)
      </div>

      <div className="flex flex-col gap-3.5 w-full max-w-sm">
        {rowNumbers.map(rowNum => {
          const rowData = rowsMap[rowNum];
          return (
            <div key={rowNum} className="flex items-center justify-between gap-1 md:gap-2">
              {/* Left group */}
              <div className="flex gap-1 md:gap-1.5">
                {columnsLeft.map(col => renderSeat(rowData[col]))}
              </div>

              {/* Aisle */}
              <div className="w-6 md:w-8 h-8 md:h-10 flex items-center justify-center text-xs font-black text-gray-600">
                {rowNum}
              </div>

              {/* Right group */}
              <div className="flex gap-1 md:gap-1.5">
                {columnsRight.map(col => renderSeat(rowData[col]))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeatMap;
