import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Ticket, Plane, ArrowRight } from 'lucide-react';
import { useBooking } from '../../hooks/useBooking';
import Button from '../../components/common/Button/Button';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { paymentSuccess, resetBookingState } = useBooking();

  useEffect(() => {
    // If they refresh or try to view without checking out, redirect to profile
    return () => {
      // Clear payment success states so that user can perform next bookings
      resetBookingState();
    };
  }, [resetBookingState]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 w-full flex-grow flex flex-col justify-center items-center text-center space-y-8 animate-in fade-in duration-300">
      {/* Icon */}
      <div className="bg-emerald-500/10 border border-emerald-500/25 p-4 rounded-full text-emerald-400 relative">
        <CheckCircle2 className="h-16 w-16 animate-bounce" />
        <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl -z-10 animate-pulse"></div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h2 className="font-display font-black text-4xl text-white">Booking Confirmed!</h2>
        <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
          Your payment has been successfully authorized and seats have been allocated under your reservation.
        </p>
      </div>

      {/* Ticket Delivery Info box */}
      <div className="glass-panel rounded-3xl p-6 w-full max-w-md text-left space-y-4">
        <h4 className="font-bold text-white text-sm flex items-center space-x-2">
          <Ticket className="h-5 w-5 text-accent" />
          <span>Ticket Delivery Details</span>
        </h4>
        <p className="text-xs text-gray-400 leading-relaxed">
          An automated flight ticket showing confirmed seat numbers is being queued and sent via our RabbitMQ microservice notifications helper to your registered email profile address.
        </p>
        <div className="bg-slate-900 border border-gray-800 rounded-xl p-4 flex items-center space-x-3">
          <Plane className="h-5 w-5 text-accent rotate-45" />
          <div>
            <p className="text-xs font-bold text-white">Booking Mafia Express</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Please check your inbox or spam filters in a few minutes.</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
        <Link
          to="/profile"
          className="bg-accent hover:bg-accent-hover text-primary font-black text-xs uppercase tracking-wider rounded-full px-8 py-3.5 shadow-md transition-all hover:scale-105"
        >
          View Bookings Dashboard
        </Link>
        <Link
          to="/search"
          className="text-accent underline text-xs font-bold flex items-center space-x-1 hover:text-emerald-300 transition-colors cursor-pointer"
        >
          <span>Book another flight</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmation;
