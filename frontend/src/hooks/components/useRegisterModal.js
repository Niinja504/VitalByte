import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

export function useRegisterModal() {
    const [form, setForm] = useState({
        nombre: '',
        usuario: '',
        correo: '',
        password: '',
        confirmPassword: '',
        nacimiento: '',
        telefono: ''
    });
    const { register } = useAuth();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [pendingRegister, setPendingRegister] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'telefono') {
            let raw = value.replace(/[^0-9]/g, '');
            if (raw.length > 8) raw = raw.slice(0, 8);
            if (raw.length > 4) {
                raw = raw.slice(0, 4) + '-' + raw.slice(4);
            }
            setForm({ ...form, [name]: raw });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.nombre || !form.usuario || !form.correo || !form.password || !form.confirmPassword || !form.nacimiento || !form.telefono) {
            setError('Todos los campos son obligatorios.');
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.correo)) {
            setError('Correo electrónico inválido.');
            return;
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(form.nacimiento)) {
            setError('Fecha de nacimiento inválida.');
            return;
        }
        if (!/^\d{8}$/.test(form.telefono.replace(/-/g, ''))) {
            setError('El teléfono debe tener 8 dígitos.');
            return;
        }
        setError('');
        const userData = {
            fullname: form.nombre,
            username: form.usuario,
            email: form.correo,
            password: form.password,
            birth: form.nacimiento,
            phone: form.telefono.replace(/-/g, ''),
        };
        const ok = await register(userData);
        if (ok) {
            setSuccess(true);
            setError('');
        } else {
            setError('Error al registrar usuario.');
        }
    };

    return {
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
    };
}
