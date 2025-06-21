import React from 'react';
import '../components/style/EmployeeCard.css'; 
import { useEmployeeCard } from '../hooks/components/useEmployeeCard';

const EmployeeCard = ({ employee, onUpdate }) => {
  const { alertVisible, handleUpdate } = useEmployeeCard(onUpdate, employee);

  return (
    <div className="employee-card">
      <h3>{employee.fullName}</h3>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Usuario:</strong> {employee.username}</p>
      <p><strong>Contraseña:</strong> {employee.password}</p>
      <p><strong>Fecha de nacimiento:</strong> {employee.birth}</p>
      <p><strong>Teléfono:</strong> {employee.phone}</p>
      <p><strong>Rol:</strong> {employee.role}</p>
      <button className="btn-actualizar" onClick={handleUpdate}>Actualizar</button>
      {alertVisible && <div className="alerta-exito">¡Empleado actualizado correctamente!</div>}
    </div>
  );
};

export default EmployeeCard;
