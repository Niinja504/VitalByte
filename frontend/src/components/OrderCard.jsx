import React from 'react';
import '../components/style/OrderCard.css'; 
import { useOrderCard } from '../hooks/components/useOrderCard';

const OrderCard = ({ foto, nombre, estado, fecha, total }) => {
  const { getEstadoClass } = useOrderCard(estado);

  return (
    <div className={`order-card ${getEstadoClass()}`}>
      <div className="order-photo">
        <img src={foto} alt="Producto" />
      </div>

      <div className="order-info">
        <p><strong>Nombre:</strong> {nombre}</p>
        <p><strong>Estado:</strong> {estado}</p>
        <p><strong>Fecha:</strong> {fecha}</p>
        <p><strong>Total:</strong> ${total.toFixed(2)}</p>
      </div>

      <div className="order-action">
        <button className="info-btn">Más info</button>
      </div>
    </div>
  );
};

export default OrderCard;


