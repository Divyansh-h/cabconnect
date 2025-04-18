import React, { useRef } from 'react';
import gsap from 'gsap';

const VehiclePanel = ({ fare, setVehiclePanel, setConfirmRidePanel, selectVehicle }) => {
  const panelRef = useRef();

  const animateAndSelect = (vehicleType) => {
    gsap.to(panelRef.current, {
      y: '-100%',
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => {
        selectVehicle(vehicleType);
        setConfirmRidePanel(true);
      }
    });
  };

  return (
    <div
      ref={panelRef}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 rounded-t-2xl bg-white bg-opacity-90 backdrop-blur-md shadow-xl text-gray-800 max-h-[90vh] overflow-y-auto"
    >
      {/* Close Arrow */}
      <h5
        className="p-1 text-center w-full absolute top-2"
        onClick={() => setVehiclePanel(false)}
      >
        <i className="text-3xl text-teal-700 ri-arrow-down-wide-line"></i>
      </h5>

      {/* Title */}
      <h3 className="text-2xl font-semibold mb-6 mt-10 text-center text-teal-800">
        Choose a Vehicle
      </h3>

      {/* Sedan */}
      <div
        onClick={() => animateAndSelect('sedan')}
        className="flex bg-white border border-gray-300 hover:border-teal-500 transition-all rounded-xl w-full p-4 items-center justify-between mb-3 shadow-sm cursor-pointer"
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
        onClick={() => animateAndSelect('suv')}
        className="flex bg-white border border-gray-300 hover:border-teal-500 transition-all rounded-xl w-full p-4 items-center justify-between mb-3 shadow-sm cursor-pointer"
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
        onClick={() => animateAndSelect('hatchback')}
        className="flex bg-white border border-gray-300 hover:border-teal-500 transition-all rounded-xl w-full p-4 items-center justify-between mb-1 shadow-sm cursor-pointer"
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
