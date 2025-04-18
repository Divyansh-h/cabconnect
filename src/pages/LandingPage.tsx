import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-teal-200 to-teal-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      
      {/* Logo */}
      <div className="mb-6 flex flex-col items-center">
        <img
          src="https://ucarecdn.com/b24d846f-32fa-4621-b123-24188952b1bf/logoremovebgpreview.png"
          alt="Trawell Logo"
          className="h-32 w-32 sm:h-48 sm:w-48 lg:h-64 lg:w-64 mb-4"
        />
      </div>

      {/* User Portal Options */}
      <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-8 sm:px-10 sm:py-12 text-center w-full max-w-xs sm:max-w-md lg:max-w-lg">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black-800 mb-4">
          Welcome to <span className="text-blue-600">Trawell</span>
        </h1>
        <p className="text-black text-sm sm:text-base lg:text-lg mb-6">
          Please choose an option below:
        </p>
        <div className="flex flex-col gap-4">
          <Link
            to="/user/sign-up"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
          >
            Sign Up
          </Link>
          <Link
            to="/user/sign-in"
            className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-500 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}