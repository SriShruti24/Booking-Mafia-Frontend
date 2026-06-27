import React from 'react';
import { User, Mail, Shield } from 'lucide-react';

const ProfileCard = ({ user }) => {
  return (
    <div className="glass-panel rounded-3xl p-6 shadow-xl flex items-center space-x-6 w-full animate-in fade-in duration-300">
      <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 text-accent shrink-0">
        <User className="h-12 w-12" />
      </div>
      <div className="space-y-1">
        <h3 className="font-display font-bold text-2xl text-white">Welcome Back</h3>
        <p className="text-sm font-semibold text-gray-400 flex items-center space-x-1.5">
          <Mail className="h-4 w-4 text-gray-500" />
          <span>{user?.email || 'N/A'}</span>
        </p>
        <p className="text-xs text-accent font-bold flex items-center space-x-1.5">
          <Shield className="h-3.5 w-3.5" />
          <span>Verified Account (Customer ID: #{user?.id || 'N/A'})</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
