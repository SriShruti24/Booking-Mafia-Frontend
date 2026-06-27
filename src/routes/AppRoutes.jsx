import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

import Home from '../pages/Home/Home';
import SearchFlights from '../pages/SearchFlights/SearchFlights';
import FlightDetails from '../pages/FlightDetails/FlightDetails';
import SeatSelection from '../pages/SeatSelection/SeatSelection';
import PassengerDetails from '../pages/PassengerDetails/PassengerDetails';
import Payment from '../pages/Payment/Payment';
import BookingConfirmation from '../pages/BookingConfirmation/BookingConfirmation';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profile/Profile';
import NotFound from '../pages/NotFound/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Primary Flow Routes (wrapped in MainLayout) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchFlights />} />
        <Route path="/flights/:id" element={<FlightDetails />} />
        <Route path="/flights/:id/seats" element={<SeatSelection />} />
        <Route path="/flights/:id/passenger-details" element={<PassengerDetails />} />
        <Route path="/flights/:id/payment" element={<Payment />} />
        <Route path="/flights/:id/confirmation" element={<BookingConfirmation />} />

        {/* Dashboard Pages (Auth Protected) */}
        <Route element={<DashboardLayout />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Catch-all Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Authentication Pages (Auth Layout wrappers) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
