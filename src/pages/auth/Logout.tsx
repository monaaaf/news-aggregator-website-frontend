import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth.tsx';

export function Logout() {
    const { logout } = useAuth();

    useEffect(() => {
        logout();
        document.location.reload();
    }, [logout]);

    return <Navigate to="/" />;
}
