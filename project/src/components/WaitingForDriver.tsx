import React from 'react';

const WaitingForDriver = ({ setWaitingForDriver }) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold">Your driver is arriving</h3>
          <p className="text-gray-600">ETA: 5 mins</p>
        </div>
        <button 
          onClick={() => setWaitingForDriver(false)}
          className="text-red-500 font-medium"
        >
          Cancel
        </button>
      </div>

      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <img
          src="https://ucarecdn.com/c918d418-4d35-4260-a3bb-c5c8052d4e77/logoremovebgpreview.png"
          alt="Driver"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold">John Doe</h4>
          <p className="text-gray-600">KA 01 AB 1234</p>
          <p className="text-sm text-teal-600">Toyota Camry • White</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 bg-teal-50 p-3 rounded-lg">
          <i className="ri-phone-fill text-teal-600"></i>
          <span className="font-medium text-teal-600">Call</span>
        </button>
        <button className="flex items-center justify-center gap-2 bg-teal-50 p-3 rounded-lg">
          <i className="ri-message-2-fill text-teal-600"></i>
          <span className="font-medium text-teal-600">Message</span>
        </button>
      </div>
    </div>
  );
};

export default WaitingForDriver;