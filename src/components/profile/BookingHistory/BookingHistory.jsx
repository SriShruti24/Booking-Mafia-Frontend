import React from 'react';
import { formatDate } from '../../../utils/formatDate';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatPNR } from '../../../utils/formatPNR';
import { Ticket, Ban, CheckCircle2, Clock } from 'lucide-react';
import Button from '../../common/Button/Button';

const BookingHistory = ({ bookings, onCancel, loading }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'BOOKED':
        return <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Confirmed</span>;
      case 'CANCELLED':
        return <span className="text-rose-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><Ban className="h-3 w-3" /> Cancelled</span>;
      default:
        return <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</span>;
    }
  };

  const getSeatNumbersStr = (booking) => {
    if (!booking.seatNumbers) return 'N/A';
    try {
      const parsed = typeof booking.seatNumbers === 'string'
        ? JSON.parse(booking.seatNumbers)
        : booking.seatNumbers;
      return Array.isArray(parsed) ? parsed.join(', ') : 'N/A';
    } catch {
      return booking.seatNumbers.toString();
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-10 text-center text-gray-500 space-y-2">
        <Ticket className="h-10 w-10 mx-auto text-gray-700" />
        <p className="font-semibold text-sm">No bookings yet</p>
        <p className="text-xs text-gray-600">Your trips will appear here once booked.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <h3 className="font-display font-bold text-xl text-white">Your Trips</h3>

      <div className="flex flex-col gap-3">
        {bookings.map(booking => (
          <div key={booking.id} className="glass-card rounded-2xl px-5 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">

            {/* Left: PNR + details */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-mono font-black text-white text-base tracking-widest">{formatPNR(booking.id)}</span>
                {getStatusBadge(booking.status)}
              </div>
              <p className="text-xs text-gray-500">
                Seats: <span className="text-gray-300">{getSeatNumbersStr(booking)}</span>
                <span className="mx-2">·</span>
                {formatCurrency(booking.totalCost)}
                <span className="mx-2">·</span>
                {formatDate(booking.createdAt, true)}
              </p>
            </div>

            {/* Right: Cancel */}
            {booking.status !== 'CANCELLED' && (
              <Button
                onClick={() => onCancel(booking.id)}
                disabled={loading}
                variant="danger"
                className="px-4 py-2 text-xs flex items-center space-x-1.5 shrink-0"
              >
                <Ban className="h-3.5 w-3.5" />
                <span>Cancel</span>
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
