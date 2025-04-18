import { SignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export default function SignInPage() {
  const navigate = useNavigate(); // Hook to navigate between routes

  return (
    <div className="h-screen w-full bg-gradient-to-br from-teal-400 via-emerald-400 to-green-300 flex items-center justify-center px-4 relative">
      
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')} // Navigate to the home page
        className="absolute top-6 left-6 bg-gradient-to-r from-teal-500 to-green-400 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:from-teal-600 hover:to-green-500 hover:shadow-xl transition-all duration-300 ease-in-out"
      >
        ← Back to Home
      </button>

      {/* Container for Logo + SignIn */}
      <div className="flex flex-col items-center w-full max-w-sm bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
        {/* Logo and App Name */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://ucarecdn.com/b24d846f-32fa-4621-b123-24188952b1bf/logoremovebgpreview.png"
            alt="Trawell Logo"
            className="h-16 w-16 drop-shadow-md"
          />
          <span className="text-2xl font-bold text-teal-700 mt-4 tracking-wide drop-shadow-sm">Trawell</span>
        </div>

        {/* Clerk SignIn Component */}
        <SignIn 
          routing="path" 
          path="/user/sign-in" 
          afterSignInUrl="/selection" // Ensure this is correct
          appearance={{
            elements: {
              rootBox: "px-0 pb-0",
              card: "shadow-none p-0 bg-transparent",
              navbar: "hidden",
              header: "hidden",
              footer: "hidden",
              dividerRow: "hidden",
              socialButtonsBlockButton:
                "py-3 text-base bg-white border border-white/30 backdrop-blur-md text-gray-800 rounded-xl mb-3 hover:bg-gray-100 transition-all duration-300",
              formButtonPrimary:
                "py-3 text-base bg-gradient-to-r from-teal-500 to-green-400 text-white font-semibold rounded-xl w-full hover:from-teal-600 hover:to-green-500 transition-all duration-300",
              phoneNumberInput: "block w-full",
              formFieldInput:
                "py-3 px-4 border border-gray-300 bg-white rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500",
              identityPreviewBoxButton: "py-3 text-base",
            },
          }}
        />
      </div>
    </div>
  );
}