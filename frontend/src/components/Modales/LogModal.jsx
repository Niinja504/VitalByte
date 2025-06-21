import React from 'react';
import Modal from './Modal.jsx';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLogModal } from '../../hooks/components/useLogModal';
import '../style/LogModalCustom.css';

const LogModal = ({ isVisible, onClose, onSwitchToRegister }) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        error,
        showPassword,
        setShowPassword,
        handleSubmit
    } = useLogModal(onClose);

    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="modal-form">
                <div className="input-group">
                    <FaEnvelope className="input-icon" />
                    <input
                        type="text"
                        placeholder="Correo electrónico o usuario"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaLock className="input-icon" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span
                        className="log-modal-eye-icon"
                        onClick={() => setShowPassword((v) => !v)}
                        tabIndex={-1}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                {error && <div className="modal-error">{error}</div>}
                <button type="submit" className="modal-btn">Entrar</button>
            </form>
            <p className="modal-switch-text">
                ¿No tienes cuenta?{' '}
                <span className="modal-switch-link" onClick={onSwitchToRegister}>
                    Regístrate aquí
                </span>
            </p>
        </Modal>
    );
};

export default LogModal;
