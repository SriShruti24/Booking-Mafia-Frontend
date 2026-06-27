import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import { Contact } from 'lucide-react';

const PassengerForm = ({ seatNumbers, onSubmit, loading }) => {
  const [passengers, setPassengers] = useState(
    seatNumbers.map(seatNumber => ({
      seatNumber,
      name: '',
      gender: 'MALE',
      age: ''
    }))
  );

  const handleInputChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(passengers);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {passengers.map((passenger, index) => (
        <div key={passenger.seatNumber} className="glass-panel rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-800 pb-3">
            <Contact className="h-5 w-5 text-accent" />
            <h4 className="font-bold text-white">Passenger for Seat {passenger.seatNumber}</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Name */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold text-gray-400">Full Name</label>
              <input
                type="text"
                required
                value={passenger.name}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                placeholder="e.g. John Doe"
                className="glass-input rounded-2xl px-4 py-2.5 text-sm font-semibold focus:outline-none"
              />
            </div>

            {/* Age */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold text-gray-400">Age</label>
              <input
                type="number"
                required
                min="1"
                max="120"
                value={passenger.age}
                onChange={(e) => handleInputChange(index, 'age', e.target.value)}
                placeholder="e.g. 28"
                className="glass-input rounded-2xl px-4 py-2.5 text-sm font-semibold focus:outline-none"
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold text-gray-400">Gender</label>
              <select
                value={passenger.gender}
                onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                className="glass-input rounded-2xl px-4 py-2.5 text-sm font-semibold focus:outline-none cursor-pointer"
              >
                <option value="MALE" className="bg-slate-950">Male</option>
                <option value="FEMALE" className="bg-slate-950">Female</option>
                <option value="OTHER" className="bg-slate-950">Other</option>
              </select>
            </div>
          </div>
        </div>
      ))}

      <Button type="submit" disabled={loading} className="w-full py-4" variant="primary">
        {loading ? 'Processing Details...' : 'Confirm Passengers & Go to Payment'}
      </Button>
    </form>
  );
};

export default PassengerForm;
