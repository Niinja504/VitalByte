import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useNavAdmin() {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
  const [isAdminView, setIsAdminView] = useState(true);
  const navigate = useNavigate();

  const ToggleSubmenu = () => {
    setIsSubmenuVisible(!isSubmenuVisible);
  };

  const getActiveClass = (path) => {
    return window.location.pathname === path || window.location.pathname.startsWith(path + '/') ? 'active' : '';
  };

  const handleAdminLinkClick = (event) => {
    event.preventDefault();
    const targetPath = event.currentTarget.getAttribute('href');
    navigate(targetPath);
  };

  return {
    isSubmenuVisible,
    isAdminView,
    ToggleSubmenu,
    getActiveClass,
    handleAdminLinkClick
  };
}
