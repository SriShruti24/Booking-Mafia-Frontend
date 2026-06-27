import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center px-6 py-20 text-center space-y-6">
      <div className="text-accent">
        <Plane className="h-16 w-16 rotate-45 transform mx-auto opacity-50" />
      </div>
      <h2 className="font-display font-black text-4xl text-white">404 - Page Not Found</h2>
      <p className="text-gray-450 text-sm max-w-sm mx-auto leading-relaxed">
        The destination you are trying to reach does not exist in our flight routes catalog.
      </p>
      <Link
        to="/"
        className="bg-accent hover:bg-accent-hover text-primary font-black text-xs uppercase tracking-wider rounded-full px-8 py-3.5 shadow-md flex items-center space-x-1.5 transition-all hover:scale-105"
      >
        <Compass className="h-4 w-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
