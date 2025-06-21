import React from 'react';
import './style/submenu.css';
import LogoutConfirmModal from './LogoutConfirmModal.jsx';
import { useSubmenuLog } from '../hooks/components/useSubmenuLog';

const SubmenuLog = () => {
    const {
        showLogoutModal,
        handleLogout,
        confirmLogout,
        cancelLogout
    } = useSubmenuLog();
    return (
    <>
    <div className="bloque">
        <a href="/Perfil"><div className="userinfo">
        <i className="fa-solid fa-circle-user user-pic"></i>
        <h2>Mi perfil</h2>
        </div> </a>
        <hr />
    <a href="#" className="submenu-link" onClick={handleLogout}>
        <i className="fa-solid fa-right-from-bracket"></i>
        <p>Cerrar sesion</p>
        <i className="fa-solid fa-chevron-right arrow-right"></i>
    </a>
</div>
<LogoutConfirmModal isOpen={showLogoutModal} onConfirm={confirmLogout} onCancel={cancelLogout} />
</>
  );
};

export default SubmenuLog;