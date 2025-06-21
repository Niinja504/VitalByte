import React from 'react';
import './style/Nav.css';
import './style/submenu.css';
import './style/NavAdminCustom.css';
import logo from '../assets/logovitalBytes.webp';
import SubmenuLog from './submenulog.jsx';
import { useNavAdmin } from '../hooks/components/useNavAdmin';

const NavAdmin = () => {
    const {
        isSubmenuVisible,
        ToggleSubmenu,
        getActiveClass,
        handleAdminLinkClick
    } = useNavAdmin();

    return (
        <div className="div">
            <nav>
                <div className="logo-titulo-row">
                    <img src={logo} className="logo" alt="Vital Bytes Logo" />
                    <h1 className="titulo">Admin Panel</h1>
                </div>
                <ul className="flex space-x-4 admin-nav-list">
                    <li>
                        <a href="/Admin/Pedidos" className={getActiveClass('/Admin/Pedidos') + ' admin-nav-link'} onClick={handleAdminLinkClick}>Pedidos</a>
                    </li>
                    <li>
                        <a href="/Admin/Ventas" className={getActiveClass('/Admin/Ventas') + ' admin-nav-link'} onClick={handleAdminLinkClick}>Ventas</a>
                    </li>
                    <li>
                        <a href="/Admin/Productos" className={getActiveClass('/Admin/Productos') + ' admin-nav-link'} onClick={handleAdminLinkClick}>Productos</a>
                    </li>
                    <li>
                        <a href="/Admin/Clientes" className={getActiveClass('/Admin/Clientes') + ' admin-nav-link'} onClick={handleAdminLinkClick}>Clientes</a>
                    </li>
                    <li>
                        <a href="/Admin/Employees" className={getActiveClass('/Admin/Employees') + ' admin-nav-link'} onClick={handleAdminLinkClick}>Empleados</a>
                    </li>
                </ul>
                <div className="mi-perfil" onClick={ToggleSubmenu}>
                    <div className="mi-perfil-content">
                        <i className="fa-solid fa-circle-user user-pic"></i>
                        <span className="mi-perfil-span">Mi perfil</span>
                        <i className={`fa-solid fa-chevron-right arrow-right${isSubmenuVisible ? ' active' : ''} mi-perfil-arrow`} id="arrow-right"></i>
                    </div>
                    <div className={`submenu${isSubmenuVisible ? ' active' : ''}`} id="submenu">
                        <SubmenuLog />
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavAdmin;