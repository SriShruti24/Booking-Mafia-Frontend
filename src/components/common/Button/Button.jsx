import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false }) => {
  const baseStyle = 'px-6 py-3 rounded-full font-bold text-sm tracking-wide transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
  const variants = {
    primary: 'bg-accent hover:bg-accent-hover text-primary shadow-md hover:scale-105 active:scale-95',
    secondary: 'bg-primary-light border border-gray-700 hover:border-gray-500 text-white',
    danger: 'bg-red-600 hover:bg-red-500 text-white shadow-md active:scale-95 hover:scale-105',
    glass: 'bg-slate-800/50 backdrop-blur-sm border border-white/10 hover:bg-slate-700/50 text-white'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
