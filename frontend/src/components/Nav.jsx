import React from 'react';
import './style/Nav.css';
import logo from '../assets/logovitalBytes.webp';
import Submenu1 from './submenu1.jsx';
import { useNav } from '../hooks/components/useNav';
import SubmenuLog from './submenulog.jsx';
import { Link } from 'react-router-dom';

const Nav = () => {
    const {
        isSubmenuVisible,
        ToggleSubmenu,
        getActiveClass,
        isAuthenticated
    } = useNav();

    return (
        <div className="div">
            <nav>
                <div className="logo-titulo-row">
                    <img src={logo} className="logo" alt="Vital Bytes Logo" />
                    <h1 className="titulo">Vital Bytes</h1>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/Home" className={getActiveClass('/Home')}>Inicio</a>
                    </li>
                    <li>
                        <a href="/Catalogo" className={getActiveClass('/Catalogo')}>Catalogo</a>
                    </li>
                    <li>
                        <a href="/Contacto" className={getActiveClass('/Contacto')}>Contacto</a>
                    </li>
                </ul>
                <div className="MiPerfil" onClick={ToggleSubmenu}>
                    <div className="perfil-content">
                        <i className="fa-solid fa-circle-user user-pic"></i>
                        <span className="perfil-span">Mi perfil</span>
                        <i className={`fa-solid fa-chevron-right arrow-right${isSubmenuVisible ? ' active' : ''} perfil-arrow`} id="arrow-right"></i>
                    </div>
                    <div className={`submenu${isSubmenuVisible ? ' active' : ''}`} id="submenu">
                        {isAuthenticated ? <SubmenuLog /> : <Submenu1 />}
                    </div>
                </div>
                <Link to="/Cart" className="cart-btn" aria-label="Carrito de compras">
                    <i className="fa-solid fa-cart-shopping cart-icon"></i>
                </Link>
            </nav>
        </div>
    );
};

export default Nav;