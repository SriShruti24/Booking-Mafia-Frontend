import React from 'react';

const Loader = ({ fullScreen, message = "Loading..." }) => {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      <p className="text-sm font-semibold text-gray-400">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-950">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
