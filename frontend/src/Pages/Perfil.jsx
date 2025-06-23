import React from 'react';
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
                  <input className="info-value" name="fullname" value={user.fullname} onChange={handleInputChange} placeholder="Nombre" />
                </div>
                <div className="info-row">
                  <span className="info-label">Correo:</span>
                  <input className="info-value" name="email" value={user.email} onChange={handleInputChange} placeholder="Correo electrónico" />
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
                  <input className="info-value" name="phone" type="tel" value={user.phone} onChange={handleInputChange} />
                </div>
                <div className="info-row" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button
                    className="edit-button"
                    onClick={handleEditProfile}
                    disabled={!isUserChanged}
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