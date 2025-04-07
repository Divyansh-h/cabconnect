import React from 'react';

const LookingForDriver = ({ pickup, destination, fare, vehicleType }) => {
  return (
    <div className="text-center p-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-500 mx-auto mb-4"></div>
      <h3 className="text-xl font-semibold mb-2">Looking for nearby drivers</h3>
      <p className="text-gray-600">Please wait while we connect you with a driver</p>
      
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <i className="ri-map-pin-user-fill text-teal-500"></i>
          <div className="text-left">
            <p className="text-sm text-gray-500">Pickup</p>
            <p className="font-medium">{pickup}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <i className="ri-map-pin-2-fill text-teal-500"></i>
          <div className="text-left">
            <p className="text-sm text-gray-500">Destination</p>
            <p className="font-medium">{destination}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Estimated fare: ₹{fare[vehicleType]}
      </div>
    </div>
  );
};

export default LookingForDriver;