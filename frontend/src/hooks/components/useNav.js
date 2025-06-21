import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

export function useNav() {
    const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
    const { isAuthenticated } = useAuth();

    const ToggleSubmenu = () => {
        setIsSubmenuVisible(!isSubmenuVisible);
    };

    const getActiveClass = (path) => {
        if ((window.location.pathname === '/' && path === '/Home') || window.location.pathname === path) {
            return 'active';
        }
        return '';
    };

    return {
        isSubmenuVisible,
        ToggleSubmenu,
        getActiveClass,
        isAuthenticated
    };
}
