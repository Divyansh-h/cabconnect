import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-300 via-green-300 to-emerald-400 flex flex-col items-center justify-center px-4">
      
      {/* Logo at the top */}
      <div className="mb-6 flex flex-col items-center">
        <img
          src="https://ucarecdn.com/b24d846f-32fa-4621-b123-24188952b1bf/logoremovebgpreview.png"
          alt="Trawell Logo"
          className="h-12 w-12"
        />
        <span className="text-lg font-semibold text-white mt-2 drop-shadow">Trawell</span>
      </div>

      {/* Center Card */}
      <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-8 text-center w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Start with <span className="text-indigo-600">Trawell</span> 🚗
        </h1>
        <p className="text-gray-600 text-sm mb-6">Your journey starts here.</p>

        <div className="flex flex-col gap-3">
          <Link
            to="/sign-in"
            className="inline-flex justify-center items-center py-2 text-sm font-medium rounded-md bg-white text-indigo-600 border border-indigo-300 hover:bg-indigo-50 transition"
          >
            <LogIn className="w-4 h-4 mr-1" />
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="inline-flex justify-center items-center py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition"
          >
            <UserPlus className="w-4 h-4 mr-1" />
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
