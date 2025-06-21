import { useState, useEffect } from 'react';
import swal from 'sweetalert';

export function useEditUserModal(userToEdit, onUserUpdated, onClose) {
  const [form, setForm] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    birth: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userToEdit) {
      setForm({
        fullname: userToEdit.fullname || '',
        username: userToEdit.username || '',
        email: userToEdit.email || '',
        password: '',
        birth: userToEdit.birth ? new Date(userToEdit.birth).toISOString().split('T')[0] : '',
        phone: userToEdit.phone || ''
      });
      setError('');
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullname || !form.username || !form.email || !form.birth || !form.phone) {
      setError('Todos los campos excepto contraseña son obligatorios.');
      return;
    }
    try {
      const updateData = { ...form };
      if (!updateData.password) delete updateData.password;
      const res = await fetch(`http://localhost:4000/api/client/${userToEdit._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      const data = await res.json();
      if (res.ok) {
        swal("¡Éxito!", "Usuario actualizado exitosamente.", "success");
        onUserUpdated();
        onClose();
      } else {
        setError(data.message || 'Error al actualizar usuario.');
      }
    } catch (err) {
      setError('Error al actualizar usuario.');
    }
  };

  return {
    form,
    error,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit
  };
}
