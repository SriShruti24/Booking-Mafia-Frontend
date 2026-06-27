import React from 'react';
import ProtectedRoute from '../components/common/ProtectedRoute/ProtectedRoute';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-6 py-10 w-full flex-grow flex flex-col">
        <Outlet />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
