import { useState } from 'react';

export function useOrders(pedidos) {
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroOrden, setFiltroOrden] = useState('');
  const [busqueda, setBusqueda] = useState('');

  let pedidosFiltrados = pedidos.filter(p => {
    const estadoCoincide = filtroEstado ? p.estado.toLowerCase() === filtroEstado : true;
    const nombreCoincide = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return estadoCoincide && nombreCoincide;
  });
  pedidosFiltrados = pedidosFiltrados.sort((a, b) => {
    if (filtroOrden === 'fecha') return new Date(b.fecha) - new Date(a.fecha);
    if (filtroOrden === 'usuario-az') return a.nombre.localeCompare(b.nombre);
    if (filtroOrden === 'usuario-za') return b.nombre.localeCompare(a.nombre);
    return 0;
  });

  return {
    filtroEstado,
    setFiltroEstado,
    filtroOrden,
    setFiltroOrden,
    busqueda,
    setBusqueda,
    pedidosFiltrados
  };
}
