import React from 'react';
import { formatCurrency } from '../../../utils/formatCurrency';
import { ShieldCheck, Armchair } from 'lucide-react';
import Button from '../../common/Button/Button';

const SelectedSeatsPanel = ({ selectedSeats, basePrice, onHoldClick, loading }) => {
  const getPremiumCost = (seat) => {
    return Math.round(basePrice * (parseFloat(seat.fareMultiplier) - 1));
  };

  const getSeatTotal = (seat) => {
    return Math.round(basePrice * parseFloat(seat.fareMultiplier));
  };

  const totalCost = selectedSeats.reduce((acc, seat) => acc + getSeatTotal(seat), 0);

  return (
    <div className="glass-panel rounded-3xl p-6 shadow-2xl flex flex-col justify-between h-full space-y-6">
      <div>
        <h3 className="font-display font-bold text-xl text-white border-b border-gray-800 pb-3">Selected Seats</h3>
        
        {selectedSeats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500 text-center space-y-2">
            <Armchair className="h-10 w-10 text-gray-700" />
            <p className="text-sm font-semibold">No seats selected yet</p>
            <p className="text-xs max-w-xs leading-relaxed text-gray-600">Select seats on the map to see pricing details and hold tickets.</p>
          </div>
        ) : (
          <div className="space-y-4 mt-4 max-h-[220px] overflow-y-auto pr-1">
            {selectedSeats.map(seat => (
              <div key={seat.id} className="flex justify-between items-center bg-slate-900/60 border border-gray-800 rounded-xl p-3 text-sm">
                <div>
                  <p className="font-black text-accent">{seat.seatNumber} <span className="text-[10px] text-gray-500 font-bold">({seat.seatClass})</span></p>
                  <p className="text-xs text-gray-500 mt-0.5">{seat.seatType} seat</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{formatCurrency(getSeatTotal(seat))}</p>
                  {parseFloat(seat.fareMultiplier) > 1 && (
                    <p className="text-[10px] text-accent font-semibold">+ {formatCurrency(getPremiumCost(seat))} premium</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedSeats.length > 0 && (
        <div className="border-t border-gray-800 pt-6 space-y-4">
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>Base Fare subtotal</span>
            <span className="font-semibold">{formatCurrency(basePrice * selectedSeats.length)}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>Class & Type premium</span>
            <span className="font-semibold text-accent">
              + {formatCurrency(totalCost - (basePrice * selectedSeats.length))}
            </span>
          </div>

          <div className="flex justify-between items-center border-t border-gray-850 pt-4">
            <span className="font-bold text-gray-400">Total Booking Cost</span>
            <span className="font-display font-black text-2xl text-white">{formatCurrency(totalCost)}</span>
          </div>

          <div className="flex items-start space-x-2 text-[10px] text-gray-500 leading-normal">
            <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
            <p>By locking these seats, they will be held for exactly 2 minutes for you to complete checkout and checkout transactions.</p>
          </div>

          <Button
            onClick={onHoldClick}
            disabled={loading}
            className="w-full py-3.5"
            variant="primary"
          >
            {loading ? 'Locking Seats...' : 'Lock Seats & Continue'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectedSeatsPanel;
