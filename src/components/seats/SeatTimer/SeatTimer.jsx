import React from 'react';
import { Timer } from 'lucide-react';

const SeatTimer = ({ seconds }) => {
  if (seconds === null || seconds <= 0) return null;

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

  return (
    <div className="flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-2.5 rounded-full font-display font-black text-sm tracking-wide shadow-md">
      <Timer className="h-4 w-4 animate-pulse" />
      <span>Session Expires: <span className="underline">{formattedTime}</span></span>
    </div>
  );
};

export default SeatTimer;
