import React from 'react';

const VehiclePanel = ({ fare, setVehiclePanel, setConfirmRidePanel, selectVehicle }) => {
  return (
    <div className="p-4 rounded-2xl bg-white bg-opacity-90 backdrop-blur-md shadow-xl text-gray-800">
      <h5
        className="p-1 text-center w-full absolute top-2"
        onClick={() => setVehiclePanel(false)}
      >
        <i className="text-3xl text-teal-700 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-6 mt-10 text-center text-teal-800">
        Choose a Vehicle
      </h3>

      {/* Sedan */}
      <div
        onClick={() => {
          setConfirmRidePanel(true);
          selectVehicle('sedan');
        }}
        className="flex bg-white border border-gray-300 hover:border-teal-500 transition-all rounded-xl w-full p-4 items-center justify-between mb-3 shadow-sm"
      >
        <img className="h-10" src="https://ucarecdn.com/c918d418-4d35-4260-a3bb-c5c8052d4e77/logoremovebgpreview.png" alt="Sedan" />
        <div className="ml-3 w-1/2">
          <h4 className="font-medium text-base">Trawell Sedan <span className="text-gray-500"><i className="ri-user-3-fill"></i> 4</span></h4>
          <p className="text-sm text-gray-500">₹15/km</p>
        </div>
        <h2 className="text-lg font-semibold text-teal-700">₹{fare.sedan.toFixed(2)}</h2>
      </div>

      {/* SUV */}
      <div
        onClick={() => {
          setConfirmRidePanel(true);
          selectVehicle('suv');
        }}
        className="flex bg-white border border-gray-300 hover:border-teal-500 transition-all rounded-xl w-full p-4 items-center justify-between mb-3 shadow-sm"
      >
        <img className="h-10" src="https://ucarecdn.com/a9d814d5-1693-4178-9799-9d9a8318e139/ChatGPT_Image_Apr_6__2025__10_50_28_AMremovebgpreview.png" alt="SUV" />
        <div className="-ml-2 w-1/2">
          <h4 className="font-medium text-base">Trawell SUV <span className="text-gray-500"><i className="ri-user-3-fill"></i> 6</span></h4>
          <p className="text-sm text-gray-500">₹19/km</p>
        </div>
        <h2 className="text-lg font-semibold text-teal-700">₹{fare.suv.toFixed(2)}</h2>
      </div>

      {/* Hatchback */}
      <div
        onClick={() => {
          setConfirmRidePanel(true);
          selectVehicle('hatchback');
        }}
        className="flex bg-white border border-gray-300 hover:border-teal-500 transition-all rounded-xl w-full p-4 items-center justify-between mb-1 shadow-sm"
      >
        <img className="h-10" src="https://ucarecdn.com/8b2c07c4-b889-4afe-99eb-a7c79a9d23b4/ChatGPT_Image_Apr_6__2025__10_53_02_AMremovebgpreview.png" alt="Hatchback" />
        <div className="ml-3 w-1/2">
          <h4 className="font-medium text-base">Trawell Hatchback <span className="text-gray-500"><i className="ri-user-3-fill"></i> 4</span></h4>
          <p className="text-sm text-gray-500">₹12/km</p>
        </div>
        <h2 className="text-lg font-semibold text-teal-700">₹{fare.hatchback.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
