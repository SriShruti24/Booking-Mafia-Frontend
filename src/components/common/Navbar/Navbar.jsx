import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { Plane, User, LogOut, Compass } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-panel sticky top-0 z-50 px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <Link to="/" className="flex items-center space-x-2 text-white font-display font-black text-2xl tracking-wider">
          <Plane className="h-7 w-7 text-accent rotate-45 transform" />
          <span>BOOKING <span className="text-accent font-light">MAFIA</span></span>
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6 text-sm text-gray-300">
          <Link to="/search" className="flex items-center space-x-1.5 bg-accent/10 text-accent hover:bg-accent hover:text-slate-950 transition-all border border-accent/25 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider cursor-pointer">
            <Compass className="h-3.5 w-3.5" />
            <span>Explore Flights</span>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4 border-l border-gray-700 pl-4">
              <Link to="/profile" className="flex items-center space-x-2 bg-primary-light hover:bg-slate-800 border border-gray-700 text-white rounded-full px-4 py-2 transition-colors">
                <User className="h-4 w-4 text-accent" />
                <span className="font-semibold text-xs">{user?.email?.split('@')[0] || 'My Profile'}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors font-medium cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4 border-l border-gray-700 pl-4">
              <Link to="/login" className="hover:text-white transition-colors font-medium">
                Log In
              </Link>
              <Link to="/register" className="bg-accent hover:bg-accent-hover text-primary font-bold text-xs rounded-full px-5 py-2.5 shadow-md shadow-emerald-500/20 transition-all hover:scale-105">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
