import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useBooking } from '../../hooks/useBooking';
import ProfileCard from '../../components/profile/ProfileCard/ProfileCard';
import BookingHistory from '../../components/profile/BookingHistory/BookingHistory';
import Loader from '../../components/common/Loader/Loader';

const Profile = () => {
  const { user } = useAuth();
  const { userBookings, loading, error, fetchUserBookings, cancelBooking } = useBooking();

  useEffect(() => {
    if (user?.id) {
      fetchUserBookings(user.id);
    }
  }, [user?.id, fetchUserBookings]);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking? This will release your reserved seats back to the public pool.")) {
      await cancelBooking(bookingId, user.id);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 w-full">
      {/* Profile Header Card */}
      <ProfileCard user={user} />

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold rounded-2xl p-4">
          {error}
        </div>
      )}

      {/* History */}
      {loading && userBookings.length === 0 ? (
        <div className="py-16 flex justify-center w-full">
          <Loader message="Fetching your booking invoices..." />
        </div>
      ) : (
        <BookingHistory
          bookings={userBookings}
          onCancel={handleCancelBooking}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Profile;
