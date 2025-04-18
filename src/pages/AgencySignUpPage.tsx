import { SignUp } from '@clerk/clerk-react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AgencySignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-teal-200 to-teal-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      
      {/* Back to Home Button */}
      <div className="absolute top-6 left-4 sm:top-8 sm:left-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm sm:text-base font-semibold text-teal-800 hover:text-teal-500"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Logo */}
      <div className="mb-6 flex flex-col items-center">
        <img
          src="https://ucarecdn.com/b24d846f-32fa-4621-b123-24188952b1bf/logoremovebgpreview.png"
          alt="Trawell Logo"
          className="h-32 w-32 sm:h-48 sm:w-48 lg:h-56 lg:w-56 mb-4"
        />
      </div>

      {/* SignUp Box */}
      <div className="w-full max-w-xs sm:max-w-sm lg:max-w-lg bg-white bg-opacity-60 backdrop-blur-md rounded-2xl shadow-lg px-6 py-8 sm:px-10 sm:py-12 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-2">
          Agency Sign Up
        </h2>
        <p className="text-center text-gray-600 text-sm sm:text-base lg:text-lg mb-6">
          Manage your fleet and bookings with ease
        </p>

        {/* Clerk SignUp Component */}
        <div className="w-full">
          <SignUp 
            routing="path" 
            path="/agency/sign-up"
            afterSignUpUrl="/agency/home" // Redirect to the agency home page after sign-up
            appearance={{
              elements: {
                rootBox: "w-full px-0 pb-0",
                card: "shadow-none p-0 bg-transparent",
                navbar: "hidden",
                header: "hidden",
                footer: "hidden",
                dividerRow: "hidden",
                socialButtonsBlockButton: "py-3 text-sm sm:text-base bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 rounded-md mb-3",
                formButtonPrimary: "py-3 text-sm sm:text-base bg-teal-600 hover:bg-teal-500 text-white rounded-md w-full hover:scale-105",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}