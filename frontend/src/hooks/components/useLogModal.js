import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

export function useLogModal(onClose) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userType = await login(email, password);
        if (!userType) {
            setError('Credenciales incorrectas');
        } else {
            setError('');
            onClose();
        }
    };

    useEffect(() => {
        // Redirección si es admin
        // ...existing code...
    }, []);

    return {
        email,
        setEmail,
        password,
        setPassword,
        error,
        showPassword,
        setShowPassword,
        handleSubmit
    };
}
