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
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          <Link
            to="/search"
            className="bg-gradient-to-r from-accent to-cyan-400 hover:from-emerald-450 hover:to-cyan-300 text-slate-950 font-black text-base tracking-wide rounded-full px-10 py-5 shadow-2xl shadow-cyan-500/20 flex items-center space-x-3 transition-all hover:scale-105 active:scale-95 duration-300 cursor-pointer"
          >
            <Compass className="h-5 w-5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Explore Flights & Book Seats</span>
          </Link>
          <Link
            to="/login"
            className="bg-primary-light border border-gray-800 hover:border-gray-600 text-white font-bold text-sm rounded-full px-8 py-4.5 transition-colors cursor-pointer"
          >
            Manage Your Trips
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
