import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Nav.css';
import './style/Submenu.css';
import logo from '../assets/logovitalBytes.webp';
import SubmenuLog from './submenulog.jsx';

const NavAdmin = () => {
    const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);
    const [isAdminView, setIsAdminView] = useState(true);
    const navigate = useNavigate();

    const ToggleSubmenu = () => {
        setIsSubmenuVisible(!isSubmenuVisible);
    };

    const getActiveClass = (path) => {
        // For exact match or subroutes (e.g., /Admin/Productos/123)
        return window.location.pathname === path || window.location.pathname.startsWith(path + '/') ? 'active' : '';
    };

    const handleAdminLinkClick = (event) => {
        event.preventDefault();
        const targetPath = event.currentTarget.getAttribute('href');
        navigate(targetPath);
    };

    return (
        <div className="div">
            <nav>
                <div className="logo-titulo-row">
                    <img src={logo} className="logo" alt="Vital Bytes Logo" />
                    <h1 className="titulo">Admin Panel</h1>
                </div>
                <ul className="flex space-x-4 admin-nav-list">
                    <li>
                        <a href="/Admin/Categorias" className={getActiveClass('/Admin/Categorias') + ' admin-nav-link'} onClick={handleAdminLinkClick}>Categorias</a>
                    </li>
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
                <div className="MiPerfil" style={{ position: 'relative', display: 'inline-block', marginLeft: 20 }} onClick={ToggleSubmenu}>
                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        <i className="fa-solid fa-circle-user user-pic"></i>
                        <span style={{ marginLeft: 8, color: '#914F1E', whiteSpace: 'nowrap' }}>Mi perfil</span>
                        <i className={`fa-solid fa-chevron-right arrow-right${isSubmenuVisible ? ' active' : ''}`} id="arrow-right" style={{ marginLeft: 8 }}></i>
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