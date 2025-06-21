import React from 'react';
import './../style/Client/Contacto.css';
import { useContacto } from '../../hooks/pages/useContacto';


function Contacto() {
  const { formData, handleChange, handleSubmit } = useContacto();

  return (
    <div className="contacto">
      <div className="contacto-contenido">
        <div className="contacto-titulo">
          <h1 className="Contacto">Contacto</h1>
          <p>¿Tienes alguna pregunta? ¡Déjanos un mensaje!</p>
        </div>
  
        <form onSubmit={handleSubmit} className="formulario-contacto">
          <div className="campo fila">
            <label htmlFor="nombre" className="TXT">Nombre:</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
  
            <label htmlFor="apellidos" className="TXT">Apellidos:</label>
            <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} />
          </div>
  
          <div className="campo">
            <label htmlFor="correo" className="TXT">Correo:</label>
            <input type="email" name="correo" value={formData.correo} onChange={handleChange} />
          </div>
  
          <div className="campo">
            <label htmlFor="mensaje" className="TXT">Mensaje:</label>
            <textarea name="mensaje" value={formData.mensaje} onChange={handleChange}></textarea>
          </div>
  
          <button type="submit" className="BTT">Enviar</button>
        </form>
      </div>
    </div>
  );
  
}

export default Contacto;
