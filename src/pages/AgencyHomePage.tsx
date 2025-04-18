import React from "react";

export default function AgencyHomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Agency Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        <button className="bg-teal-600 text-white py-4 px-6 rounded-lg shadow hover:bg-teal-500">
          Drivers
        </button>
        <button className="bg-teal-600 text-white py-4 px-6 rounded-lg shadow hover:bg-teal-500">
          Cars
        </button>
        <button className="bg-teal-600 text-white py-4 px-6 rounded-lg shadow hover:bg-teal-500">
          Active Bookings
        </button>
        <button className="bg-teal-600 text-white py-4 px-6 rounded-lg shadow hover:bg-teal-500">
          Requests
        </button>
        <button className="bg-teal-600 text-white py-4 px-6 rounded-lg shadow hover:bg-teal-500">
          Completed Rides
        </button>
      </div>
    </div>
  );
}