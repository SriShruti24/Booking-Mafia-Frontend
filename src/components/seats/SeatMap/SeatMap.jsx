import React from 'react';
import { Armchair } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatCurrency';

const CLASS_STYLES = {
  FIRST_CLASS:      { available: 'bg-violet-500 hover:bg-violet-400 text-white border-violet-600',     badge: 'bg-violet-900/80 text-violet-200' },
  BUSINESS:         { available: 'bg-indigo-500 hover:bg-indigo-400 text-white border-indigo-600',     badge: 'bg-indigo-900/80 text-indigo-200' },
  PREMIUM_ECONOMY:  { available: 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-amber-500',    badge: 'bg-amber-900/80 text-amber-200' },
  ECONOMY:          { available: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-600', badge: 'bg-emerald-900/80 text-emerald-200' },
};

const SeatMap = ({ seats, selectedSeatNumbers, onSeatClick, currentUserId, basePrice }) => {
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

  const getSeatPrice = (seat) => {
    if (!basePrice) return null;
    return Math.round(basePrice * parseFloat(seat.fareMultiplier));
  };

  const getSeatColorClasses = (seat) => {
    const isSelected = selectedSeatNumbers.includes(seat.seatNumber);
    if (isSelected) {
      return 'bg-cyan-500 text-slate-950 border-cyan-300 ring-4 ring-cyan-500/35 scale-105';
    }

    const classStyle = CLASS_STYLES[seat.seatClass] || CLASS_STYLES.ECONOMY;

    switch (seat.status) {
      case 'AVAILABLE':
        return `${classStyle.available} hover:scale-105`;
      case 'HOLD':
        if (seat.holdBy === currentUserId?.toString()) {
          return 'bg-amber-500 text-slate-950 border-amber-600 ring-2 ring-amber-500/50';
        }
        return 'bg-slate-700/60 border-slate-700 text-slate-400 cursor-not-allowed opacity-50';
      case 'BOOKED':
        return 'bg-rose-900/40 border-rose-800 text-rose-400 cursor-not-allowed opacity-40';
      case 'BLOCKED':
      default:
        return 'bg-slate-800 border-slate-700 text-slate-600 cursor-not-allowed opacity-25';
    }
  };

  const renderSeat = (seat) => {
    if (!seat) return <div key={Math.random()} className="w-10 h-14 md:w-12 md:h-16" />;

    const isSelectable = seat.status === 'AVAILABLE' ||
                         (seat.status === 'HOLD' && seat.holdBy === currentUserId?.toString()) ||
                         selectedSeatNumbers.includes(seat.seatNumber);

    const seatPrice = getSeatPrice(seat);
    const isAvailableOrSelected = seat.status === 'AVAILABLE' || selectedSeatNumbers.includes(seat.seatNumber);

    const tooltipText = seatPrice
      ? `Seat ${seat.seatNumber} — ${seat.seatClass.replace('_', ' ')} / ${seat.seatType.replace('_', ' ')} — ${formatCurrency(seatPrice)} — ${seat.status}`
      : `Seat ${seat.seatNumber} — ${seat.seatClass} / ${seat.seatType} — ×${seat.fareMultiplier} — ${seat.status}`;

    return (
      <button
        key={seat.id}
        type="button"
        disabled={!isSelectable && !selectedSeatNumbers.includes(seat.seatNumber)}
        onClick={() => onSeatClick(seat.seatNumber)}
        title={tooltipText}
        className={`w-10 h-14 md:w-12 md:h-16 rounded-xl flex flex-col items-center justify-center border font-display transition-all cursor-pointer select-none relative ${getSeatColorClasses(seat)}`}
      >
        <Armchair className="h-4 w-4 md:h-5 md:w-5 shrink-0" />
        <span className="text-[8px] font-black mt-0.5 leading-none">{seat.seatNumber}</span>
        {isAvailableOrSelected && seatPrice && (
          <span className="text-[7px] font-bold leading-none mt-0.5 opacity-80">
            {formatCurrency(seatPrice)}
          </span>
        )}
      </button>
    );
  };

  // Build class legend rows from actual seat data
  const classSummary = {};
  seats.forEach(s => {
    if (!classSummary[s.seatClass]) {
      classSummary[s.seatClass] = parseFloat(s.fareMultiplier);
    } else {
      // keep the base (lowest) multiplier for the class label
      if (parseFloat(s.fareMultiplier) < classSummary[s.seatClass]) {
        classSummary[s.seatClass] = parseFloat(s.fareMultiplier);
      }
    }
  });

  return (
    <div className="flex flex-col items-center bg-slate-950 rounded-3xl p-6 border border-gray-800 shadow-inner max-h-[620px] overflow-y-auto custom-scrollbar w-full">
      {/* Front indicator */}
      <div className="w-full max-w-xs bg-slate-900 border-b border-gray-700 text-center py-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase rounded-t-xl mb-6">
        ✈ Front of Aircraft (Cockpit)
      </div>

      {/* Class color key */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 w-full">
        {Object.entries(CLASS_STYLES).map(([cls, style]) => {
          const price = basePrice && classSummary[cls]
            ? formatCurrency(Math.round(basePrice * classSummary[cls])) + '+'
            : null;
          return (
            <div key={cls} className="flex items-center space-x-1.5">
              <div className={`w-4 h-4 rounded border ${style.available.split(' ')[0]} ${style.available.split(' ')[3]}`} />
              <span className="text-[10px] font-bold text-gray-400 capitalize">
                {cls.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                {price && <span className="text-gray-600 ml-1">({price})</span>}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2.5 w-full max-w-sm">
        {rowNumbers.map(rowNum => {
          const rowData = rowsMap[rowNum];
          return (
            <div key={rowNum} className="flex items-center justify-between gap-1 md:gap-2">
              {/* Left group */}
              <div className="flex gap-1 md:gap-1.5">
                {columnsLeft.map(col => renderSeat(rowData[col]))}
              </div>

              {/* Aisle number */}
              <div className="w-6 md:w-8 h-8 flex items-center justify-center text-[10px] font-black text-gray-600">
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
