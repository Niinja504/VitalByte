import React from 'react';
import Modal from './Modal.jsx';
import { useEditUserModal } from '../../hooks/components/useEditUserModal';
import '../style/EditUserModalCustom.css';

const EditUserModal = ({ isVisible, onClose, userToEdit, onUserUpdated }) => {
  const {
    form,
    error,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit
  } = useEditUserModal(userToEdit, onUserUpdated, onClose);

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <h2>Editar Usuario</h2>
      <form onSubmit={handleSubmit} noValidate>
        <input type="text" name="fullname" placeholder="Nombre completo" value={form.fullname} onChange={handleChange} required />
        <input type="text" name="username" placeholder="Usuario" value={form.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo" value={form.email} onChange={handleChange} required />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Dejar vacío para no cambiar contraseña"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <button type="button" onClick={() => setShowPassword(v => !v)} className="edit-user-modal-btn-show">
          {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        </button>
        <input type="date" name="birth" value={form.birth} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} required />
        {error && <p className="error">{error}</p>}
        <div className="edit-user-modal-btns">
          <button type="submit">Guardar cambios</button>
          <button type="button" onClick={onClose} className="edit-user-modal-btn-cancel">Cancelar</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUserModal;
