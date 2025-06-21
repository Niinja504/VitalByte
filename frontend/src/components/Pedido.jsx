import React from 'react';
import './style/Pedido.css';
import { usePedido } from '../hooks/components/usePedido';

const Pedido = ({ fecha, total, cantidad }) => {
  usePedido(fecha, total, cantidad);
  return (
    <div className="pedido">
      <p><strong>Fecha:</strong> {fecha}</p>
      <p><strong>Total:</strong> ${total.toFixed(2)}</p>
      <p><strong>Cantidad de productos:</strong> {cantidad}</p>
    </div>
  );
};

export default Pedido;