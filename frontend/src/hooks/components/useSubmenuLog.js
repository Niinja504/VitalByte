import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export function useSubmenuLog() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const handleLogout = (e) => {
        e.preventDefault();
        setShowLogoutModal(true);
    };
    const confirmLogout = () => {
        logout();
        navigate('/');
    };
    const cancelLogout = () => setShowLogoutModal(false);
    return {
        showLogoutModal,
        handleLogout,
        confirmLogout,
        cancelLogout
    };
}
