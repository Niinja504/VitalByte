import React from 'react';
import Modal from './Modal';
import { useVerifyEmailModal } from '../../hooks/components/useVerifyEmailModal';

const VerifyEmailModal = ({ isVisible, onClose, onSuccess, email, password }) => {
  const {
    code,
    setCode,
    error,
    success,
    handleSubmit
  } = useVerifyEmailModal(email, password, onSuccess, onClose);

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <h2>Verifica tu correo</h2>
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="Código de verificación"
            value={code}
            onChange={e => setCode(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">¡Correo verificado exitosamente!</div>}
        <button type="submit" className="modal-button">Verificar</button>
      </form>
    </Modal>
  );
};

export default VerifyEmailModal;
