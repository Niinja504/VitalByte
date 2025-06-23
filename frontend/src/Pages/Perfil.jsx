import React, { useState } from 'react';
import perfilImage from '../assets/Perfil.png';
import './style/Perfil.css';
import Pedido from '../components/Pedido';
import { usePerfil } from '../hooks/pages/usePerfil';
import { useAuth } from '../context/AuthContext';

function Perfil() {
  const {
    activeView,
    setActiveView,
    pedidosPendientes,
    pedidosEntregados,
    user,
    handleInputChange,
    isUserChanged,
    handleEditProfile
  } = usePerfil();
  const { logout } = useAuth();

  // Estados para errores de validación
  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    phone: ''
  });

  // Validaciones personalizadas
  const validateField = (name, value) => {
    let error = '';
    if (name === 'fullname') {
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]*$/.test(value)) {
        error = 'Solo letras y espacios';
      }
    }
    if (name === 'email') {
      if (value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
        error = 'Correo inválido';
      }
    }
    if (name === 'phone') {
      if (!/^\d{0,4}-?\d{0,4}$/.test(value)) {
        error = 'Formato: 0000-0000';
      }
      if (value.length > 9) {
        error = 'Máximo 9 caracteres';
      }
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Handler extendido para validación
  const handleValidatedInputChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    // Solo permitir el cambio si es válido o vacío
    if (name === 'fullname' && value && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]*$/.test(value)) return;
    if (name === 'phone' && value && !/^\d{0,4}-?\d{0,4}$/.test(value)) return;
    handleInputChange(e);
  };

  const handleLogout = () => {
    // Mostrar confirmación antes de cerrar sesión
    import('sweetalert2').then(Swal => {
      Swal.default.fire({
        title: '¿Cerrar sesión?',
        text: '¿Estás seguro de que deseas cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#914F1E',
        cancelButtonColor: '#bdbdbd',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          logout();
        }
      });
    });
  };

  return (
    <div className="perfil">
      <img src={perfilImage} alt="Perfil" className="perfil-image" />
      <div className="main-content">
        <div className="sidebar">
          <button
            className={`sidebar-button ${activeView === 'perfil' ? 'active' : ''}`}
            onClick={() => setActiveView('perfil')}
          >
            Mi Perfil
          </button>
          <button
            className={`sidebar-button ${activeView === 'pendientes' ? 'active' : ''}`}
            onClick={() => setActiveView('pendientes')}
          >
            Pedidos Pendientes
          </button>
          <button
            className={`sidebar-button ${activeView === 'entregados' ? 'active' : ''}`}
            onClick={() => setActiveView('entregados')}
          >
            Pedidos Entregados
          </button>
        </div>
        <div className="content">
          {activeView === 'perfil' && (
            <div className="info-block">
              <div className="info-content">
                <div className="info-row">
                  <span className="info-label">Nombre:</span>
                  <div className="input-error-row">
                    <input
                      className="info-value"
                      name="fullname"
                      value={user.fullname}
                      onChange={handleValidatedInputChange}
                      placeholder="Nombre"
                      pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]*"
                      maxLength={40}
                      autoComplete="off"
                    />
                    {errors.fullname && <span className="input-error-msg">{errors.fullname}</span>}
                  </div>
                </div>
                <div className="info-row">
                  <span className="info-label">Correo:</span>
                  <div className="input-error-row">
                    <input
                      className="info-value"
                      name="email"
                      value={user.email}
                      onChange={handleValidatedInputChange}
                      placeholder="Correo electrónico"
                      type="email"
                      autoComplete="off"
                    />
                    {errors.email && <span className="input-error-msg">{errors.email}</span>}
                  </div>
                </div>
                <div className="info-row">
                  <span className="info-label">Usuario:</span>
                  <input className="info-value" name="username" value={user.username} onChange={handleInputChange} placeholder="Usuario" />
                </div>
                <div className="info-row">
                  <span className="info-label">Fecha de nacimiento:</span>
                  <input className="info-value" name="birth" type="date" value={user.birth} onChange={handleInputChange} placeholder="" />
                </div>
                <div className="info-row">
                  <span className="info-label">Teléfono:</span>
                  <div className="input-error-row">
                    <input
                      className="info-value"
                      name="phone"
                      type="text"
                      value={user.phone}
                      onChange={handleValidatedInputChange}
                      placeholder="0000-0000"
                      maxLength={9}
                      autoComplete="off"
                    />
                    {errors.phone && <span className="input-error-msg">{errors.phone}</span>}
                  </div>
                </div>
                <div className="info-row button-actions">
                  <button
                    className="edit-button"
                    onClick={handleEditProfile}
                    disabled={!isUserChanged || errors.fullname || errors.email || errors.phone}
                  >
                    Editar perfil
                  </button>
                  <button
                    className="logout-button"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeView === 'pendientes' && (
            <div>
              <h2>Pedidos Pendientes</h2>
              {pedidosPendientes.map((pedido, idx) => (
                <Pedido key={idx} fecha={pedido.fecha} total={pedido.total} cantidad={pedido.cantidad} />
              ))}
            </div>
          )}
          {activeView === 'entregados' && (
            <div>
              <h2>Pedidos Entregados</h2>
              {pedidosEntregados.map((pedido, idx) => (
                <Pedido key={idx} fecha={pedido.fecha} total={pedido.total} cantidad={pedido.cantidad} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Perfil;