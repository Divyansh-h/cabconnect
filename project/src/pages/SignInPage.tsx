import { SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-300 via-green-300 to-emerald-400 flex flex-col items-center justify-center px-4">
      
      {/* Logo at top */}
      <div className="mb-6 flex flex-col items-center">
        <img
          src="https://ucarecdn.com/b24d846f-32fa-4621-b123-24188952b1bf/logoremovebgpreview.png"
          alt="Trawell Logo"
          className="h-12 w-12"
        />
        <span className="text-lg font-semibold text-white mt-2 drop-shadow">Trawell</span>
      </div>

      {/* Glassmorphism styled SignIn Box */}
      <div className="w-full max-w-md bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-lg px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">
          Sign in to access your account
        </p>

        <SignIn 
          routing="path" 
          path="/sign-in"
          appearance={{
            elements: {
              rootBox: "px-0 pb-0",
              card: "shadow-none p-0",
              navbar: "hidden",
              header: "hidden",
              footer: "hidden",
              dividerRow: "hidden",
              socialButtonsBlockButton: "py-3 text-base bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 rounded-md mb-2",
              formButtonPrimary: "py-3 text-base bg-teal-600 hover:bg-teal-500 text-white rounded-md w-full",
              phoneNumberInput: "block w-full",
              formFieldInput: "py-2.5 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500",
              identityPreviewBoxButton: "py-3 text-base"
            }
          }}
        />
      </div>
    </div>
  );
}
