import React, { useState } from 'react';
import ConfirmRidePopUp from './ConfirmRidePopUp';

const VehiclePanel = ({ distance, onClose }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showConfirmRide, setShowConfirmRide] = useState(false);

  const rideInfo = {
    _id: 'ride123',
    user: {
      fullname: {
        firstname: 'Divyansh'
      }
    },
    pickup: 'Bennett University',
    destination: 'FRI Dehradun',
    fare: 120 + (selectedVehicle === 'SUV' ? 50 : selectedVehicle === 'Sedan' ? 30 : 10)
  };

  const handleVehicleSelect = (vehicleType) => {
    setSelectedVehicle(vehicleType);
    setShowConfirmRide(true);
  };

  return (
    <div className='absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-md p-5'>
      {!showConfirmRide ? (
        <>
          <h3 className='text-xl font-semibold mb-4'>Select a Cab</h3>
          <div className='flex flex-col gap-4'>
            <button onClick={() => handleVehicleSelect('Hatchback')} className='p-4 bg-gray-200 rounded-lg'>Hatchback - ₹{120 + 10}</button>
            <button onClick={() => handleVehicleSelect('Sedan')} className='p-4 bg-gray-200 rounded-lg'>Sedan - ₹{120 + 30}</button>
            <button onClick={() => handleVehicleSelect('SUV')} className='p-4 bg-gray-200 rounded-lg'>SUV - ₹{120 + 50}</button>
          </div>
        </>
      ) : (
        <ConfirmRidePopUp
          ride={rideInfo}
          setRidePopupPanel={onClose}
          setConfirmRidePopupPanel={setShowConfirmRide}
        />
      )}
    </div>
  );
};

export default VehiclePanel;
