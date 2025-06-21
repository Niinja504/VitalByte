import React from 'react';
import perfilImage from '../assets/Perfil.png';
import './style/Perfil.css';
import Pedido from '../components/Pedido';
import { usePerfil } from '../hooks/pages/usePerfil';

function Perfil() {
  const {
    activeView,
    setActiveView,
    pedidosPendientes,
    pedidosEntregados
  } = usePerfil();

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
                  <input className="info-value" placeholder="Nombre" />
                </div>
                <div className="info-row">
                  <span className="info-label">Correo:</span>
                  <input className="info-value" placeholder="Correo electrónico" />
                </div>
                <div className="info-row">
                  <span className="info-label">Usuario:</span>
                  <input className="info-value" placeholder="Usuario" />
                </div>
                <div className="info-row">
                  <span className="info-label">Fecha de nacimiento:</span>
                  <input className="info-value" type="date" placeholder="" />
                </div>
                <div className="info-row">
                  <span className="info-label">Teléfono:</span>
                  <input className="info-value" type="tel" />
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