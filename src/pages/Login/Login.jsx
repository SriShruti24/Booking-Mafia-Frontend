import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validatePassword } from '../../utils/validation';
import Button from '../../components/common/Button/Button';
import { Mail, Lock, Plane, AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const from = location.state?.from || '/profile';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!validateEmail(email)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setValidationError('Password must be at least 6 characters long.');
      return;
    }

    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      // Handled in auth state
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-8 shadow-2xl space-y-6 w-full animate-in fade-in zoom-in-95 duration-200">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-2xl text-accent mb-2">
          <Plane className="h-8 w-8 rotate-45" />
        </div>
        <h2 className="font-display font-black text-2xl text-white uppercase tracking-wider">Sign In</h2>
        <p className="text-xs text-gray-500 font-semibold">Access your Booking Mafia flight profiles</p>
      </div>

      {(validationError || error) && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-2xl p-4 flex items-start space-x-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{validationError || error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-bold text-gray-400">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. user@gmail.com"
              className="glass-input w-full rounded-2xl pl-11 pr-4 py-2.5 text-sm font-semibold focus:outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-bold text-gray-400">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="glass-input w-full rounded-2xl pl-11 pr-4 py-2.5 text-sm font-semibold focus:outline-none"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 mt-2"
          variant="primary"
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </Button>
      </form>

      {/* Footer link */}
      <p className="text-center text-xs text-gray-500 font-semibold">
        Don't have an account?{' '}
        <Link to="/register" className="text-accent underline hover:text-emerald-350 transition-colors">
          Register now
        </Link>
      </p>
    </div>
  );
};

export default Login;
