import React from 'react';

interface VehiclePanelProps {
  fare: {
    sedan: number;
    suv: number;
    hatchback: number;
  };
  setVehiclePanel: (value: boolean) => void;
  selectVehicle: (vehicleType: "sedan" | "suv" | "hatchback") => void; // Updated type
}

const VehiclePanel: React.FC<VehiclePanelProps> = ({ fare, setVehiclePanel, selectVehicle }) => {
  const handleVehicleSelect = (vehicleType: "sedan" | "suv" | "hatchback") => {
    selectVehicle(vehicleType); // Notify parent about the selected vehicle
    setVehiclePanel(false); // Close the panel
  };

  return (
    <div className="bg-white w-full max-w-lg mx-auto p-6 rounded-lg shadow-lg z-50">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Choose a Vehicle</h2>
      <div className="space-y-4">
        {/* Sedan Option */}
        <div
          onClick={() => handleVehicleSelect('sedan')}
          className="flex items-center justify-between p-4 border rounded-lg shadow hover:bg-teal-50 cursor-pointer transition-all"
        >
          <div className="flex items-center space-x-4">
            <img src="/assets/sedan.png" alt="Sedan" className="w-12 h-12" />
            <div>
              <h3 className="text-lg font-medium text-gray-800">Trawell Sedan</h3>
              <p className="text-sm text-gray-600">₹15/km</p>
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-800">₹{fare.sedan.toFixed(2)}</p>
        </div>

        {/* SUV Option */}
        <div
          onClick={() => handleVehicleSelect('suv')}
          className="flex items-center justify-between p-4 border rounded-lg shadow hover:bg-teal-50 cursor-pointer transition-all"
        >
          <div className="flex items-center space-x-4">
            <img src="/assets/suv.png" alt="SUV" className="w-12 h-12" />
            <div>
              <h3 className="text-lg font-medium text-gray-800">Trawell SUV</h3>
              <p className="text-sm text-gray-600">₹19/km</p>
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-800">₹{fare.suv.toFixed(2)}</p>
        </div>

        {/* Hatchback Option */}
        <div
          onClick={() => handleVehicleSelect('hatchback')}
          className="flex items-center justify-between p-4 border rounded-lg shadow hover:bg-teal-50 cursor-pointer transition-all"
        >
          <div className="flex items-center space-x-4">
            <img src="/assets/hatchback.png" alt="Hatchback" className="w-12 h-12" />
            <div>
              <h3 className="text-lg font-medium text-gray-800">Trawell Hatchback</h3>
              <p className="text-sm text-gray-600">₹12/km</p>
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-800">₹{fare.hatchback.toFixed(2)}</p>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setVehiclePanel(false)}
        className="mt-6 w-full py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-all"
      >
        Cancel
      </button>
    </div>
  );
};

export default VehiclePanel;