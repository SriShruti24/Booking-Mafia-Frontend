import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSeats } from '../../hooks/useSeats';
import { useAuth } from '../../hooks/useAuth';
import { useFlights } from '../../hooks/useFlights';
import SeatMap from '../../components/seats/SeatMap/SeatMap';
import SeatLegend from '../../components/seats/SeatLegend/SeatLegend';
import SeatTimer from '../../components/seats/SeatTimer/SeatTimer';
import SelectedSeatsPanel from '../../components/seats/SelectedSeatsPanel/SelectedSeatsPanel';
import Loader from '../../components/common/Loader/Loader';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const SeatSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { selectedFlight, fetchFlightById } = useFlights();
  const {
    seats,
    selectedSeatNumbers,
    timerSeconds,
    loading,
    error,
    fetchSeats,
    selectSeat,
    holdSelectedSeats,
    resetSeatSelection,
  } = useSeats(id);

  useEffect(() => {
    fetchSeats();
    if (!selectedFlight) {
      fetchFlightById(id);
    }
    // Clean up selection list on route change
    return () => resetSeatSelection();
  }, [id, fetchSeats, fetchFlightById, selectedFlight, resetSeatSelection]);

  const handleSeatClick = (seatNumber) => {
    selectSeat(seatNumber);
  };

  const handleHoldClick = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/flights/${id}/seats` } });
      return;
    }

    try {
      await holdSelectedSeats(user.id);
      navigate(`/flights/${id}/passenger-details`);
    } catch (err) {
      // Error handled by hook or display standard warning
    }
  };

  const selectedSeatObjects = seats.filter(s => selectedSeatNumbers.includes(s.seatNumber));

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex-grow flex flex-col space-y-8 animate-in fade-in duration-300">
      {/* Back button & timer row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link to={`/flights/${id}`} className="inline-flex items-center space-x-1.5 text-xs text-gray-500 hover:text-white transition-colors font-bold uppercase tracking-wider">
          <ArrowLeft className="h-4 w-4" />
          <span>Flight details</span>
        </Link>
        <SeatTimer seconds={timerSeconds} />
      </div>

      {/* Header */}
      <div className="space-y-1">
        <h2 className="font-display font-black text-3xl md:text-4xl text-white">Select Your Cabin Seats</h2>
        <p className="text-gray-400 text-sm">
          Click available seats to select. Prices auto-adjust based on class multipliers (Window, Aisle, Exit-Rows).
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold rounded-2xl p-4 flex justify-between items-center">
          <span>{error}</span>
          <button onClick={fetchSeats} className="text-accent underline text-xs font-bold flex items-center space-x-1 cursor-pointer">
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Seat selection map column */}
        <div className="lg:col-span-2 flex flex-col items-center space-y-6">
          {seats.length === 0 && loading ? (
            <div className="py-20 flex justify-center w-full">
              <Loader message="Constructing aircraft seat layout map..." />
            </div>
          ) : (
            <>
              <SeatMap
                seats={seats}
                selectedSeatNumbers={selectedSeatNumbers}
                onSeatClick={handleSeatClick}
                currentUserId={user?.id}
              />
              <SeatLegend />
            </>
          )}
        </div>

        {/* Selected Seats summary & Checkout panel column */}
        <div>
          <SelectedSeatsPanel
            selectedSeats={selectedSeatObjects}
            basePrice={selectedFlight?.price || 100}
            onHoldClick={handleHoldClick}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
