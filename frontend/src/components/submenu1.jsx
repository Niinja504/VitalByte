import React from 'react';
import './style/submenu.css';
import LogModal from './Modales/LogModal.jsx';
import RegisterModal from './Modales/RegisterModal.jsx';
import { useSubmenu1 } from '../hooks/components/useSubmenu1';

const Submenu1 = () => {
    const {
        isLoginModalVisible,
        isRegisterModalVisible,
        openLoginModal,
        closeLoginModal,
        openRegisterModal,
        closeRegisterModal
    } = useSubmenu1();

    return (
        <div className="bloque">
            <a href="#" className="submenu-link" onClick={openLoginModal}>
                <i className="fa-solid fa-right-to-bracket"></i>
                <p>Iniciar sesión</p>
                <i className="fa-solid fa-chevron-right arrow-right"></i>
            </a>
            <hr />
            <a href="#" className="submenu-link" onClick={openRegisterModal}>
                <i className="fa-regular fa-address-card"></i>
                <p>Registrarse</p>
                <i className="fa-solid fa-chevron-right arrow-right"></i>
            </a>
            <LogModal isVisible={isLoginModalVisible} onClose={closeLoginModal} onSwitchToRegister={openRegisterModal} />
            <RegisterModal isVisible={isRegisterModalVisible} onClose={closeRegisterModal} onSwitchToLogin={openLoginModal} />
        </div>
    );
};

export default Submenu1;