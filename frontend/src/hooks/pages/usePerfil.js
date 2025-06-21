import { useState, useEffect } from 'react';
import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

export function usePerfil() {
  const [activeView, setActiveView] = useState('perfil');
  const [orders, setOrders] = useState([]);
  // const { user } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:3000/api/orders')
      .then(res => {
        // setOrders(res.data.filter(order => order.client_id._id === user._id));
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
