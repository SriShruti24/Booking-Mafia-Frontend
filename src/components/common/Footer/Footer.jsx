import React from 'react';
import { Plane } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary border-t border-gray-800 text-gray-500 py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2 text-white font-display font-black tracking-wider">
          <Plane className="h-5 w-5 text-accent rotate-45" />
          <span>BOOKING <span className="text-accent font-light">MAFIA</span></span>
        </div>
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} Booking Mafia Inc. Designed with premium microservice standards. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
