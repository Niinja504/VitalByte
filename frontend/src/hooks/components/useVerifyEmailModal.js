import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';

export function useVerifyEmailModal(email, password, onSuccess, onClose) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const res = await axios.post('http://localhost:4000/api/registerClient/verifyCodeEmail', {
        verificationCode: code
      }, { withCredentials: true });
      if (res.data.message && res.data.message.toLowerCase().includes('exitosamente')) {
        setSuccess(true);
        setTimeout(async () => {
          setSuccess(false);
          if (email && password) {
            await login(email, password);
          }
          onSuccess && onSuccess();
          onClose();
        }, 1500);
      } else {
        setError(res.data.message || 'Código incorrecto.');
      }
    } catch (err) {
      setError('Error al verificar el código.');
    }
  };

  return {
    code,
    setCode,
    error,
    success,
    handleSubmit
  };
}
