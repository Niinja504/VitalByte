import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePerfil() {
  const [activeView, setActiveView] = useState('perfil');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/orders')
      .then(res => {
        setOrders(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const pedidosPendientes = orders.filter(o => o.state === 'Pendiente');
  const pedidosEntregados = orders.filter(o => o.state === 'Finalizado');

  return {
    activeView,
    setActiveView,
    orders,
    pedidosPendientes,
    pedidosEntregados
  };
}
