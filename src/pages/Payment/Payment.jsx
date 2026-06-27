import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../../hooks/useBooking';
import { useAuth } from '../../hooks/useAuth';
import { useFlights } from '../../hooks/useFlights';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../../components/common/Button/Button';
import Loader from '../../components/common/Loader/Loader';
import { CreditCard, ShieldCheck, KeyRound, AlertTriangle } from 'lucide-react';

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedFlight } = useFlights();
  const {
    currentBooking,
    idempotencyKey,
    loading,
    error,
    paymentSuccess,
    makePayment,
    resetBookingState
  } = useBooking();

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  useEffect(() => {
    // If no active booking, return to flights list
    if (!currentBooking) {
      navigate('/search');
    }
  }, [currentBooking, navigate]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!currentBooking) return;
    
    try {
      await makePayment(
        currentBooking.id,
        currentBooking.totalCost,
        user.id,
        idempotencyKey
      );
    } catch (err) {
      // Error handled by hook
    }
  };

  useEffect(() => {
    if (paymentSuccess) {
      navigate(`/flights/${id}/confirmation`);
    }
  }, [paymentSuccess, id, navigate]);

  if (loading && !paymentSuccess) {
    return <Loader fullScreen message="Contacting payment processing gateway..." />;
  }

  const getSeatNumbersStr = () => {
    if (!currentBooking?.seatNumbers) return '';
    const parsed = typeof currentBooking.seatNumbers === 'string'
      ? JSON.parse(currentBooking.seatNumbers)
      : currentBooking.seatNumbers;
    return Array.isArray(parsed) ? parsed.join(", ") : '';
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 w-full flex-grow flex flex-col space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="font-display font-black text-3xl md:text-4xl text-white">Payment Portal</h2>
        <p className="text-gray-400 text-sm">
          Review your ticket charge summary and complete payment using a credit card.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold rounded-2xl p-4 flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cost Summary card */}
        <div className="glass-panel rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <h3 className="font-display font-bold text-lg text-white border-b border-gray-800 pb-3">Booking Invoice</h3>
            
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold uppercase text-xs">Invoice Ref:</span>
                <span className="font-semibold text-white">#BM-{currentBooking?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold uppercase text-xs">Flight:</span>
                <span className="font-semibold text-white">{selectedFlight?.flightNumber || 'Scheduled'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold uppercase text-xs">Cabin Seats:</span>
                <span className="font-bold text-accent">{getSeatNumbersStr()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold uppercase text-xs">Base Price:</span>
                <span>{formatCurrency(selectedFlight?.price || 100)} x {currentBooking?.noOfSeats || 1}</span>
              </div>
            </div>

            <div className="border-t border-gray-850 pt-4 flex justify-between items-baseline">
              <span className="font-bold text-gray-400 text-sm">Total Billing Amount:</span>
              <h3 className="font-display font-black text-3xl text-accent">{formatCurrency(currentBooking?.totalCost || 0)}</h3>
            </div>
          </div>

          {/* Idempotency Key visualization */}
          <div className="bg-slate-900/60 border border-gray-800 rounded-2xl p-4 text-xs space-y-2">
            <p className="font-bold text-gray-500 uppercase tracking-widest flex items-center space-x-1">
              <KeyRound className="h-4 w-4 text-accent" />
              <span>Idempotency Lock</span>
            </p>
            <p className="text-[10px] text-gray-600 leading-normal">
              A unique transaction signature is generated for this session to prevent double-charging on network retries.
            </p>
            <code className="block bg-slate-950 p-2 rounded-md font-mono text-[9px] text-accent select-all overflow-x-auto">
              {idempotencyKey || 'N/A'}
            </code>
          </div>
        </div>

        {/* Credit Card Payment form */}
        <div className="glass-panel rounded-3xl p-6 shadow-2xl space-y-6">
          <h3 className="font-display font-bold text-lg text-white border-b border-gray-800 pb-3 flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-accent" />
            <span>Credit Card Information</span>
          </h3>

          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            {/* Name */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold text-gray-400">Cardholder Name</label>
              <input
                type="text"
                required
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="e.g. John Doe"
                className="glass-input rounded-2xl px-4 py-2.5 text-sm font-semibold focus:outline-none"
              />
            </div>

            {/* Card Number */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold text-gray-400">Card Number</label>
              <input
                type="text"
                required
                maxLength="16"
                pattern="\d{16}"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="16-digit card number"
                className="glass-input rounded-2xl px-4 py-2.5 text-sm font-semibold focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Expiry */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold text-gray-400">Expiry Date</label>
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  maxLength="5"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="glass-input rounded-2xl px-4 py-2.5 text-sm font-semibold focus:outline-none"
                />
              </div>

              {/* CVV */}
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold text-gray-400">CVV</label>
                <input
                  type="password"
                  required
                  maxLength="3"
                  pattern="\d{3}"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                  placeholder="3 digits"
                  className="glass-input rounded-2xl px-4 py-2.5 text-sm font-semibold focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button type="submit" className="w-full py-3.5" variant="primary">
                Pay Now
              </Button>
              
              <div className="flex items-center justify-center space-x-1 text-[10px] text-gray-500">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                <span>SSL Encrypted Checkout Payments</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
