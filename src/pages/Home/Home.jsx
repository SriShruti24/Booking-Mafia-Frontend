import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Compass, Sparkles, ShieldCheck, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center px-6 py-20 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-4xl text-center space-y-8 animate-in fade-in zoom-in duration-500">
        {/* Sparkle badge */}
        <div className="inline-flex items-center space-x-1 bg-accent/15 border border-accent/25 text-accent text-xs font-black uppercase tracking-widest rounded-full px-5 py-2">
          <Sparkles className="h-3.5 w-3.5" />
          <span>The Ultimate Seat Hold Experience</span>
        </div>

        {/* Hero title */}
        <h1 className="font-display font-black text-5xl md:text-7xl leading-tight text-white tracking-tight">
          Fly Direct, Claim Your Seat with <span className="text-accent">Booking Mafia</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 font-semibold text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          The only platform offering microsecond seat-holding locks, real-time interactive mapping, and premium seat type choices for concurrent passengers.
        </p>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/search"
            className="bg-accent hover:bg-accent-hover text-primary font-black text-sm tracking-wide rounded-full px-8 py-4 shadow-lg shadow-emerald-500/25 flex items-center space-x-2 transition-all hover:scale-105 active:scale-95"
          >
            <Compass className="h-4 w-4" />
            <span>Book Tickets Now</span>
          </Link>
          <Link
            to="/login"
            className="bg-primary-light border border-gray-700 hover:border-gray-500 text-white font-bold text-sm rounded-full px-8 py-4 transition-colors"
          >
            Manage Trips
          </Link>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-3xl mx-auto text-left">
          <div className="glass-card rounded-2xl p-5 space-y-2">
            <Zap className="h-6 w-6 text-accent" />
            <h4 className="font-bold text-white text-sm">Concurrent Seat Holds</h4>
            <p className="text-xs text-gray-500 leading-normal">Our system uses row-level database locking to secure seat allocations for 2 minutes instantaneously.</p>
          </div>
          <div className="glass-card rounded-2xl p-5 space-y-2">
            <ShieldCheck className="h-6 w-6 text-accent" />
            <h4 className="font-bold text-white text-sm">Real-time Layout updates</h4>
            <p className="text-xs text-gray-500 leading-normal">Receive WebSocket-based seat maps showing held, booked, and available cabins immediately.</p>
          </div>
          <div className="glass-card rounded-2xl p-5 space-y-2">
            <Plane className="h-6 w-6 text-accent" />
            <h4 className="font-bold text-white text-sm">Premium Multipliers</h4>
            <p className="text-xs text-gray-500 leading-normal">Premium class adjustments automatically computed for window, aisle, or extra legroom options.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
