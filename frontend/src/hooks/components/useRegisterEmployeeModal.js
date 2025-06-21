import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export function useRegisterEmployeeModal(employeeToEdit, onSuccess, onClose) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    birth: '',
    phone: '',
    role: '',
    direction: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (employeeToEdit) {
      const formattedDate = employeeToEdit.birth
        ? new Date(employeeToEdit.birth).toISOString().split('T')[0]
        : '';
      setForm({
        fullName: employeeToEdit.fullName || '',
        email: employeeToEdit.email || '',
        username: employeeToEdit.username || '',
        password: '',
        birth: formattedDate,
        phone: employeeToEdit.phone || '',
        role: employeeToEdit.role || '',
        direction: employeeToEdit.direction || '',
      });
    } else {
      setForm({
        fullName: '',
        email: '',
        username: '',
        password: '',
        birth: '',
        phone: '',
        role: '',
        direction: ''
      });
    }
    setError('');
  }, [employeeToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.fullName || !form.email || !form.username ||
      (!employeeToEdit && !form.password) ||
      !form.birth || !form.phone || !form.role || !form.direction
    ) {
      setError('Todos los campos son obligatorios (excepto contraseña al editar).');
      return;
    }
    if (!/^\d{8}$/.test(form.phone.replace(/-/g, ''))) {
      setError('El teléfono debe tener 8 dígitos.');
      return;
    }
    try {
      if (employeeToEdit) {
        await axios.put(`http://localhost:4000/api/employee/${employeeToEdit._id}`, form);
        Swal.fire('¡Éxito!', 'Empleado actualizado correctamente.', 'success');
      } else {
        await axios.post('http://localhost:4000/api/employee', form);
        Swal.fire('¡Éxito!', 'Empleado registrado correctamente.', 'success');
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError('Error al registrar/actualizar empleado.');
    }
  };

  return {
    form,
    showPassword,
    setShowPassword,
    error,
    handleChange,
    handleSubmit
  };
}
