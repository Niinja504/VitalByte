import React, { useState } from "react";
import useRecoverPassword from "../../hooks/usePasswordRecovery";
import "../../components/Modales/Styles/RecoverPassword.css"
import Swal from "sweetalert2";
import Modal from "./Modal";
import { useSuccessModal } from '../SuccessModal';

const RecoverPasswordModal = ({ isVisible, onClose }) => {
  const { enviarCorreo, verificarCodigo, resetPassword, loading } = useRecoverPassword();
  const { showSuccess } = useSuccessModal();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const ok = await enviarCorreo(email);
    if (ok) setStep(2);
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    const valid = await verificarCodigo(code);
    if (valid) setStep(3);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }
    const ok = await resetPassword(password);
    if (ok) {
      showSuccess('¡Contraseña actualizada correctamente!');
      onClose();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2>Recuperar Contraseña</h2>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Enviando..." : "Enviar código"}
              </button>
            </form>
          </>
        );
      case 2:
        return (
          <>
            <h2>Verifica tu código</h2>
            <p>Revisa tu correo. Si no lo ves, verifica la bandeja de spam o que esté bien escrito.</p>
            <form onSubmit={handleCodeSubmit}>
              <input
                type="text"
                placeholder="Código de 6 dígitos"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Verificando..." : "Verificar código"}
              </button>
            </form>
          </>
        );
      case 3:
        return (
          <>
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirmar contraseña"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Procesando..." : "Cambiar contraseña"}
              </button>
            </form>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className="recover-modal-container">
        {renderStep()}
      </div>
    </Modal>
  );
};

export default RecoverPasswordModal;
