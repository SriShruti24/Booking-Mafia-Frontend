import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSeats } from '../../hooks/useSeats';
import { useAuth } from '../../hooks/useAuth';
import { useBooking } from '../../hooks/useBooking';
import { useFlights } from '../../hooks/useFlights';
import PassengerForm from '../../components/booking/PassengerForm/PassengerForm';
import BookingSummary from '../../components/booking/BookingSummary/BookingSummary';
import Loader from '../../components/common/Loader/Loader';
import { ArrowLeft } from 'lucide-react';

const PassengerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { selectedFlight } = useFlights();
  const { selectedSeatNumbers, timerSeconds, seats } = useSeats(id);
  const { createBooking, loading, error, currentBooking } = useBooking();

  useEffect(() => {
    // If no seats are selected/held, redirect back to seat selection
    if (selectedSeatNumbers.length === 0) {
      navigate(`/flights/${id}/seats`);
    }
  }, [id, selectedSeatNumbers, navigate]);

  const handlePassengerSubmit = async (passengers) => {
    try {
      // Create database booking (will transition seats from HOLD/AVAILABLE under transactional validation)
      await createBooking(id, selectedSeatNumbers, user.id);
    } catch (err) {
      // Error handled by hook, display alert
    }
  };

  useEffect(() => {
    if (currentBooking) {
      // Proceed to checkout payment once booking is initiated in backend
      navigate(`/flights/${id}/payment`);
    }
  }, [currentBooking, id, navigate]);

  const selectedSeatObjects = seats.filter(s => selectedSeatNumbers.includes(s.seatNumber));
  // Fallback if flight data is fetching
  const basePrice = selectedFlight?.price || 100;
  const totalCost = selectedSeatObjects.reduce((acc, s) => acc + Math.round(basePrice * parseFloat(s.fareMultiplier)), 0);

  if (loading && !currentBooking) {
    return <Loader fullScreen message="Locking seat records & initiating booking transaction..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex-grow flex flex-col space-y-8 animate-in fade-in duration-300">
      {/* Back button & timer */}
      <div className="flex justify-between items-center">
        <Link to={`/flights/${id}/seats`} className="inline-flex items-center space-x-1.5 text-xs text-gray-500 hover:text-white transition-colors font-bold uppercase tracking-wider">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Seats</span>
        </Link>
        {timerSeconds !== null && (
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-2 rounded-full font-display font-bold text-xs tracking-wide">
            Hold expires in: {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60 < 10 ? '0' : '') + (timerSeconds % 60)}
          </div>
        )}
      </div>

      {/* Header */}
      <div className="space-y-1">
        <h2 className="font-display font-black text-3xl md:text-4xl text-white">Passenger Details</h2>
        <p className="text-gray-400 text-sm">
          Please input traveller details below. Ensure names match passport/ID profiles.
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold rounded-2xl p-4">
          {error}
        </div>
      )}

      {/* Content layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Passenger Forms */}
        <div className="lg:col-span-2">
          <PassengerForm
            seatNumbers={selectedSeatNumbers}
            onSubmit={handlePassengerSubmit}
            loading={loading}
          />
        </div>

        {/* Side Journey details */}
        <div>
          {selectedFlight && (
            <BookingSummary
              flight={selectedFlight}
              seatNumbers={selectedSeatNumbers}
              totalCost={totalCost}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PassengerDetails;
