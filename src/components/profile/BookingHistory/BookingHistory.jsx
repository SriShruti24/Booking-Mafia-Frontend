import React from 'react';
import { formatDate } from '../../../utils/formatDate';
import { formatCurrency } from '../../../utils/formatCurrency';
import { Ticket, Calendar, Ban, CheckCircle2, Clock } from 'lucide-react';
import Button from '../../common/Button/Button';

const BookingHistory = ({ bookings, onCancel, loading }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'BOOKED':
        return (
          <span className="flex items-center space-x-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
            <CheckCircle2 className="h-3 w-3" />
            <span>Booked</span>
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="flex items-center space-x-1 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
            <Ban className="h-3 w-3" />
            <span>Cancelled</span>
          </span>
        );
      case 'INITIATED':
      case 'PENDING':
      default:
        return (
          <span className="flex items-center space-x-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
            <Clock className="h-3 w-3 animate-spin" />
            <span>Pending Payment</span>
          </span>
        );
    }
  };

  const getSeatNumbersStr = (booking) => {
    if (!booking.seatNumbers) return 'N/A';
    try {
      const parsed = typeof booking.seatNumbers === 'string'
        ? JSON.parse(booking.seatNumbers)
        : booking.seatNumbers;
      return Array.isArray(parsed) ? parsed.join(", ") : 'N/A';
    } catch (e) {
      return booking.seatNumbers.toString();
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-10 text-center text-gray-500 space-y-2">
        <Ticket className="h-10 w-10 mx-auto text-gray-700" />
        <p className="font-semibold text-sm">No trip bookings found</p>
        <p className="text-xs text-gray-650">Your ticket reservations will appear here once booked.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <h3 className="font-display font-bold text-xl text-white">Your Bookings & Trips</h3>
      
      <div className="flex flex-col gap-4">
        {bookings.map(booking => (
          <div key={booking.id} className="glass-card rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h4 className="font-display font-black text-lg text-white">Booking #{booking.id}</h4>
                {getStatusBadge(booking.status)}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1 text-xs text-gray-400">
                <p><span className="font-bold text-gray-600 uppercase">Flight ID:</span> {booking.flightId}</p>
                <p><span className="font-bold text-gray-600 uppercase">Seats:</span> {getSeatNumbersStr(booking)}</p>
                <p><span className="font-bold text-gray-600 uppercase">Cost:</span> {formatCurrency(booking.totalCost)}</p>
                <p className="flex items-center space-x-1">
                  <Calendar className="h-3.5 w-3.5 text-gray-500" />
                  <span>{formatDate(booking.createdAt, true)}</span>
                </p>
              </div>
            </div>

            {booking.status !== 'CANCELLED' && (
              <Button
                onClick={() => onCancel(booking.id)}
                disabled={loading}
                variant="danger"
                className="px-4 py-2 text-xs flex items-center space-x-1.5 shrink-0"
              >
                <Ban className="h-3.5 w-3.5" />
                <span>Cancel Booking</span>
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
