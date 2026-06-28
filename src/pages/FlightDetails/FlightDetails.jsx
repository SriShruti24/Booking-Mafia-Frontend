import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useFlights } from '../../hooks/useFlights';
import { formatTime, formatDate } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/formatCurrency';
import { Plane, Calendar, ArrowLeft, Armchair, ShieldCheck } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import Loader from '../../components/common/Loader/Loader';

const FlightDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedFlight, loading, error, fetchFlightById, resetSelectedFlight } = useFlights();

  useEffect(() => {
    fetchFlightById(id);
    return () => resetSelectedFlight();
  }, [id, fetchFlightById, resetSelectedFlight]);

  if (loading) {
    return <Loader fullScreen message="Loading flight routing details..." />;
  }

  if (error || !selectedFlight) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-slate-950 text-center">
        <h3 className="text-xl font-bold text-rose-400">Flight Not Found</h3>
        <p className="text-gray-500 text-sm mt-2">{error || "The flight details could not be loaded."}</p>
        <Link to="/search" className="text-accent underline mt-4 text-xs font-semibold">Back to Flights Search</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 w-full flex-grow flex flex-col space-y-8 animate-in fade-in duration-300">
      {/* Back button */}
      <div>
        <Link to="/search" className="inline-flex items-center space-x-1.5 text-xs text-gray-500 hover:text-white transition-colors font-bold uppercase tracking-wider">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Search</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="glass-panel rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="bg-accent/15 border border-accent/25 text-accent text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            Active Flight Route
          </span>
          <h2 className="font-display font-black text-4xl text-white mt-3">Flight {selectedFlight.flightNumber}</h2>
          <p className="text-xs text-gray-500">Boarding Gate: {selectedFlight.boardingGate || 'A1'}</p>
        </div>
        <div className="text-center md:text-right space-y-1">
          <p className="text-xs text-gray-500 font-bold uppercase">Economy Base Fare</p>
          <h3 className="font-display font-black text-4xl text-accent">{formatCurrency(selectedFlight.price)}</h3>
          <p className="text-[10px] text-gray-400">from / per passenger · varies by seat class</p>
        </div>
      </div>

      {/* Main details content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Departure, Flight and Arrival details */}
        <div className="md:col-span-2 glass-panel rounded-3xl p-6 space-y-6">
          <h3 className="font-display font-bold text-lg text-white">Route Schedule</h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-800 pb-6">
            <div className="text-center md:text-left">
              <h4 className="font-display font-black text-2xl text-white">{formatTime(selectedFlight.departureTime)}</h4>
              <p className="text-sm font-semibold text-accent mt-0.5">{selectedFlight.departureAirportId}</p>
              <p className="text-xs text-gray-500 mt-1">{formatDate(selectedFlight.departureTime)}</p>
            </div>
            
            <div className="flex flex-col items-center">
              <Plane className="h-5 w-5 text-accent rotate-90" />
              <div className="w-20 border-t border-dashed border-gray-700 mt-2"></div>
            </div>

            <div className="text-center md:text-right">
              <h4 className="font-display font-black text-2xl text-white">{formatTime(selectedFlight.arrivalTime)}</h4>
              <p className="text-sm font-semibold text-accent mt-0.5">{selectedFlight.arrivalAirportId}</p>
              <p className="text-xs text-gray-500 mt-1">{formatDate(selectedFlight.arrivalTime)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
            <div>
              <p className="font-bold text-gray-600 uppercase">Departure Airport</p>
              <p className="text-white font-semibold mt-1">{selectedFlight.departureAirport?.name || 'Main Airport'}</p>
              <p className="text-gray-500 mt-0.5">{selectedFlight.departureAirport?.address || 'City Center'}</p>
            </div>
            <div>
              <p className="font-bold text-gray-600 uppercase">Arrival Airport</p>
              <p className="text-white font-semibold mt-1">{selectedFlight.arrivalAirport?.name || 'Destination Airport'}</p>
              <p className="text-gray-500 mt-0.5">{selectedFlight.arrivalAirport?.address || 'City Center'}</p>
            </div>
          </div>
        </div>

        {/* Aircraft details */}
        <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-white">Aircraft</h3>
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <Armchair className="h-6 w-6 text-accent shrink-0" />
              <div>
                <p className="font-semibold text-white">Model: {selectedFlight.airplaneDetail?.modelNumber || 'A320'}</p>
                <p className="text-xs text-gray-500 mt-0.5">Capacity: {selectedFlight.airplaneDetail?.capacity || '60'} seats</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 border-t border-gray-800 pt-6">
            <div className="flex items-start space-x-2 text-[10px] text-gray-550 leading-relaxed">
              <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
              <p>Premium options for window, aisle, or exit-row seats can be configured in the next step.</p>
            </div>
            <Button
              onClick={() => navigate(`/flights/${id}/seats`)}
              className="w-full"
              variant="primary"
            >
              Select Cabin Seats
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
