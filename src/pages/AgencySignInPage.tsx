import { SignIn } from '@clerk/clerk-react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AgencySignInPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-100 via-teal-200 to-teal-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      
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

      {/* Container for Logo + SignIn */}
      <div className="flex flex-col items-center w-full max-w-xs sm:max-w-sm lg:max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://ucarecdn.com/b24d846f-32fa-4621-b123-24188952b1bf/logoremovebgpreview.png"
            alt="Trawell Logo"
            className="h-32 w-32 sm:h-48 sm:w-48 lg:h-56 lg:w-56 mb-4"
          />
        </div>

        {/* Clerk SignIn Component */}
        <SignIn 
          routing="path" 
          path="/agency/sign-in"
          afterSignInUrl="/agency/home" // Redirect to the agency home page after sign-in
          appearance={{
            elements: {
              rootBox: "px-0 pb-0",
              card: "shadow-none p-0 bg-transparent",
              navbar: "hidden",
              header: "hidden",
              footer: "hidden",
              dividerRow: "hidden",
              socialButtonsBlockButton:
                "py-3 text-sm sm:text-base bg-white border border-white/30 backdrop-blur-md text-gray-800 rounded-xl mb-3",
              formButtonPrimary:
                "py-3 text-sm sm:text-base bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl w-full hover:scale-105",
              phoneNumberInput: "block w-full",
              formFieldInput:
                "py-3 px-4 border border-white/40 bg-white/60 rounded-xl text-gray-900 placeholder-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500",
              identityPreviewBoxButton: "py-3 text-sm sm:text-base",
            },
          }}
        />
      </div>
    </div>
  );
}