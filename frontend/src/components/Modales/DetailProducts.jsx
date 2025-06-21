import React from 'react';
import './Styles/Modal.css';
import { useProductModal } from '../../hooks/components/useProductModal';

function ProductModal({ product, onClose }) {
  useProductModal(product, onClose);
  if (!product) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <button onClick={onClose} className="close-button">Cerrar</button>
      </div>
    </div>
  );
}

export default ProductModal;
