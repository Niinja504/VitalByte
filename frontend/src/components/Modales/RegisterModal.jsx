import React from 'react';
import Modal from './Modal.jsx';
import { FaUser, FaUserCircle, FaEnvelope, FaLock, FaBirthdayCake, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRegisterModal } from '../../hooks/components/useRegisterModal';
import VerifyEmailModal from './VerifyEmailModal.jsx';
import './Styles/Modal.css';
import '../style/RegisterModalCustom.css';

const RegisterModal = ({ isVisible, onClose, onSwitchToLogin }) => {
    const {
        form,
        error,
        success,
        showVerifyModal,
        setShowVerifyModal,
        pendingRegister,
        setPendingRegister,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        handleChange,
        handleSubmit
    } = useRegisterModal();

    return (
        <>
        <Modal isVisible={isVisible} onClose={onClose} customClass="register-modal-custom">
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit} className="modal-form">
                <div className="input-group">
                    <FaUser className="input-icon" />
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaUserCircle className="input-icon" />
                    <input
                        type="text"
                        name="usuario"
                        placeholder="Usuario"
                        value={form.usuario}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaEnvelope className="input-icon" />
                    <input
                        type="email"
                        name="correo"
                        placeholder="Correo Electrónico"
                        value={form.correo}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                    />
                </div>
                <div className="input-group">
                    <FaLock className="input-icon" />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <span
                        className="register-modal-eye-icon"
                        onClick={() => setShowPassword((v) => !v)}
                        tabIndex={-1}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <div className="input-group">
                    <FaLock className="input-icon" />
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirmar contraseña"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <span
                        className="register-modal-eye-icon"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        tabIndex={-1}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <div className="input-group">
                    <FaBirthdayCake className="input-icon" />
                    <input
                        type="date"
                        name="nacimiento"
                        placeholder="Fecha de Nacimiento"
                        value={form.nacimiento}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <FaPhone className="input-icon" />
                    <input
                        type="tel"
                        name="telefono"
                        placeholder="Teléfono"
                        value={form.telefono}
                        onChange={handleChange}
                        maxLength={9} // 8 dígitos + 1 guion
                        required
                    />
                </div>
                {error && <div className="modal-error">{error}</div>}
                {success && <div className="modal-success">¡Registro exitoso!</div>}
                <button type="submit" className="modal-btn">Registrarse</button>
            </form>
            <p className="modal-switch-text">
                ¿Ya tienes cuenta?{' '}
                <span className="modal-switch-link" onClick={onSwitchToLogin}>
                    Inicia sesión aquí
                </span>
            </p>
        </Modal>
        <VerifyEmailModal
            isVisible={showVerifyModal}
            onClose={() => setShowVerifyModal(false)}
            onSuccess={() => {
                setShowVerifyModal(false);
                setPendingRegister(null);
                onClose();
            }}
            email={form.correo}
            password={form.password}
        />
        </>
    );
};

export default RegisterModal;