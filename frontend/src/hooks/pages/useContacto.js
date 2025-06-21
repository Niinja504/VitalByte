import { useState } from 'react';

export function useContacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
  };

  return {
    formData,
    handleChange,
    handleSubmit
  };
}
