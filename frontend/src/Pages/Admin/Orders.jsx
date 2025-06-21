import React from 'react';
import foto from '../../assets/Profile.png';
import '../style/Admin/Orders.css';
import OrderCard from '../../components/OrderCard';
import { useOrders } from '../../hooks/pages/useOrders';

const Orders = () => {
  const pedidos = [
    { id: 1, foto, nombre: 'Producto A', estado: 'Pendiente', fecha: '2025-05-20', total: 150.00 },
    { id: 2, foto, nombre: 'Producto B', estado: 'Activo', fecha: '2025-05-21', total: 230.50 },
    { id: 3, foto, nombre: 'Producto C', estado: 'Finalizado', fecha: '2025-05-22', total: 89.99 },
    { id: 4, foto, nombre: 'Producto D', estado: 'Activo', fecha: '2025-05-23', total: 120.00 },
    { id: 5, foto, nombre: 'Producto E', estado: 'Activo', fecha: '2025-05-24', total: 300.50 },
    { id: 6, foto, nombre: 'Producto F', estado: 'Pendiente', fecha: '2025-05-25', total: 59.99 },
  ];

  const {
    filtroEstado,
    setFiltroEstado,
    filtroOrden,
    setFiltroOrden,
    busqueda,
    setBusqueda,
    pedidosFiltrados
  } = useOrders(pedidos);

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1 className='txt'>Pedidos</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-bar"
          />
          <select
            className="order-filter-select"
            value={filtroOrden}
            onChange={(e) => setFiltroOrden(e.target.value)}
          >
            <option value="">Ordenar</option>
            <option value="fecha">Por fecha (más reciente)</option>
            <option value="usuario-az">Nombre A-Z</option>
            <option value="usuario-za">Nombre Z-A</option>
          </select>
          <select
            className="order-filter-select"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="">Estado</option>
            <option value="pendiente">Pendientes</option>
            <option value="activo">Activos</option>
            <option value="finalizado">Finalizados</option>
          </select>
        </div>
      </div>
      <div className="orders-list">
        {pedidosFiltrados.map(p => (
          <OrderCard
            key={p.id + p.fecha}
            foto={p.foto}
            nombre={p.nombre}
            estado={p.estado}
            fecha={p.fecha}
            total={p.total}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
