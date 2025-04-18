import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TripSummary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tripDetails, selectedVehicle } = location.state || {};

  console.log('Trip Details:', tripDetails); // Debugging log

  if (!tripDetails || !selectedVehicle) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-emerald-400 to-green-300">
        <div className="text-center">
          <p className="text-gray-800 text-lg font-semibold mb-4">
            No trip details available. Please go back and try again.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-teal-500 text-white rounded-lg shadow-lg hover:bg-teal-600 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-gradient-to-br from-teal-100 via-teal-200 to-teal-100 flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-bold text-white mb-8 drop-shadow-lg">Trip Summary</h1>

      {/* Trip Details */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-xl mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Trip Details</h2>
        <p className="text-gray-600 mb-2">
          <strong>Trip Type:</strong> {tripDetails.tripType}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Source:</strong> {tripDetails.source}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Destination:</strong> {tripDetails.destination}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Date & Time:</strong> {tripDetails.dateTime}
        </p>
      </div>

      {/* Selected Vehicle */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-xl mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Selected Vehicle</h2>
        <div className="flex items-center space-x-4">
          <img
            src={`/assets/${selectedVehicle}.png`}
            alt={selectedVehicle}
            className="w-20 h-20 drop-shadow-lg"
          />
          <p className="text-gray-600 text-lg">
            <strong>Vehicle:</strong> {selectedVehicle}
          </p>
        </div>
      </div>

      {/* Payment Gateway */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-xl mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Payment</h2>
        <p className="text-gray-600 mb-4 text-lg">
          <strong>Total Fare:</strong> ₹{tripDetails.fare.toFixed(2)}
        </p>
        <button
          onClick={() => {
            alert('Payment successful! Your trip is confirmed.');
            navigate('/');
          }}
          className="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:from-teal-500 hover:to-teal-400 transition-all"
        >
          Proceed to Pay
        </button>
      </div>

      {/* Cancel Ride Button */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-xl">
        <button
          onClick={() => {
            const confirmCancel = window.confirm(
              'Are you sure you want to cancel this ride?'
            );
            if (confirmCancel) {
              alert('Your ride has been canceled.');
              navigate('/selection'); // Navigate back to the Selection Page
            }
          }}
          className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-all"
        >
          Cancel Ride
        </button>
      </div>
    </div>
  );
};

export default TripSummary;