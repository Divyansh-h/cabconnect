// main.jsx
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';

import { ClerkProvider } from '@clerk/clerk-react';
import { ClerkLoaded, ClerkLoading } from '@clerk/clerk-react';

import CaptainContext from './context/CapatainContext.jsx';
import UserContext from './context/UserContext.jsx';
import SocketProvider from './context/SocketContext.jsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <ClerkLoading>
                <div>Loading Clerk...</div>
            </ClerkLoading>
            <ClerkLoaded>
                <BrowserRouter>
                    <UserContext>
                        <CaptainContext>
                            <SocketProvider>
                                <App />
                            </SocketProvider>
                        </CaptainContext>
                    </UserContext>
                </BrowserRouter>
            </ClerkLoaded>
        </ClerkProvider>
    </StrictMode>
);
