// pages/IntermediatePage.jsx
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IntermediatePage = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            // e.g., check user role, fetch backend data, then redirect
            setTimeout(() => {
                navigate('/home');
            }, 1500);
        }
    }, [user, navigate]);

    return (
        <div className="flex justify-center items-center h-screen text-2xl font-bold">
            Welcome {user?.firstName}! Redirecting...
        </div>
    );
};

export default IntermediatePage;
