import React from "react";
import "./style/submenu.css";
import { useLogoutConfirmModal } from '../hooks/components/useLogoutConfirmModal';

const LogoutConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  useLogoutConfirmModal(isOpen, onConfirm, onCancel);
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onCancel}>&times;</button>
        <h2>¿Cerrar sesión?</h2>
        <p>¿Estás seguro de que deseas cerrar sesión?</p>
        <div className="logout-modal-btns">
          <button className="btn delete" onClick={onConfirm}>Cerrar sesión</button>
          <button className="btn edit" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;