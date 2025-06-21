import React from 'react';
import Modal from './Modal.jsx';
import { FaUser, FaEnvelope, FaLock, FaBirthdayCake, FaPhone, FaUserTie, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRegisterEmployeeModal } from '../../hooks/components/useRegisterEmployeeModal';
import '../style/RegisterEmployeeModalCustom.css';

const RegisterEmployeeModal = ({ isVisible, onClose, onSuccess, employeeToEdit }) => {
  const {
    form,
    showPassword,
    setShowPassword,
    error,
    handleChange,
    handleSubmit
  } = useRegisterEmployeeModal(employeeToEdit, onSuccess, onClose);

  if (!isVisible) return null;

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <h2>{employeeToEdit ? 'Actualizar Empleado' : 'Registrar Empleado'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FaUser className="input-icon" />
          <input type="text" name="fullName" placeholder="Nombre completo" value={form.fullName} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input type="email" name="email" placeholder="Correo" value={form.email} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <FaUser className="input-icon" />
          <input type="text" name="username" placeholder="Usuario" value={form.username} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder={employeeToEdit ? "Dejar vacío para no cambiar contraseña" : "Contraseña"}
            value={form.password}
            onChange={handleChange}
            required={!employeeToEdit}
            autoComplete="new-password"
          />
          <span
            className="register-employee-modal-eye-icon"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="input-group">
          <FaBirthdayCake className="input-icon" />
          <input type="date" name="birth" value={form.birth} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <FaPhone className="input-icon" />
          <input type="tel" name="phone" placeholder="Teléfono (8 dígitos)" value={form.phone} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <FaUserTie className="input-icon" />
          <input type="text" name="role" placeholder="Rol" value={form.role} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <FaUser className="input-icon" />
          <input type="text" name="direction" placeholder="Dirección" value={form.direction} onChange={handleChange} required />
        </div>

        {error && <div className="modal-error">{error}</div>}

        <button type="submit" className="modal-btn">{employeeToEdit ? 'Actualizar' : 'Registrar'}</button>
      </form>
    </Modal>
  );
};

export default RegisterEmployeeModal;
