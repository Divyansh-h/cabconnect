import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import LandingPage from './pages/LandingPage';
import SelectionPage from './pages/SelectionPage';
import TripSummary from './pages/TripSummary';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      appearance={{
        elements: {
          formButtonPrimary: "bg-teal-600 hover:bg-teal-500",
          socialButtonsProviderIcon: "w-5 h-5",
          socialButtons: "gap-2",
        }
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <>
                <SignedIn>
                  <SelectionPage />
                </SignedIn>
                <SignedOut>
                  <LandingPage />
                </SignedOut>
              </>
            } />
            <Route path="/user/sign-up/*" element={<SignUpPage />} />
            <Route path="/user/sign-in/*" element={<SignInPage />} />
            <Route
              path="/selection"
              element={
                <>
                  <SignedIn>
                    <SelectionPage />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/user/sign-in" replace />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/dashboard"
              element={
                <>
                  <SignedIn>
                    <Dashboard />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/user/sign-in" replace />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/trip-summary"
              element={
                <>
                  <SignedIn>
                    <TripSummary />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/user/sign-in" replace />
                  </SignedOut>
                </>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;