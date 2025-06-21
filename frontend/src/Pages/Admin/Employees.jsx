import React from 'react';
import RegisterEmployeeModal from '../../components/Modales/RegisterEmployeeModal.jsx';
import '../style/Admin/Employees.css';
import Title from '../../components/Title.jsx';
import { useEmployees } from '../../hooks/pages/useEmployees';

const Employees = () => {
  const {
    showRegister,
    setShowRegister,
    empleados,
    empleadoEdit,
    setEmpleadoEdit,
    eliminarEmpleado,
    handleCloseModal,
    handleSuccess
  } = useEmployees();

  return (
    <div className="employees-container">
      <div className="header-container">
        <div className="header-info">
          <Title texto="Empleados" />
          <p className="txt">Administra aquí los empleados de la empresa.</p>
        </div>
        <button
          onClick={() => {
            setEmpleadoEdit(null);
            setShowRegister(true);
          }}
          className="modal-btn"
        >
          Registrar nuevo empleado
        </button>
      </div>
      <RegisterEmployeeModal
        isVisible={showRegister}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        employeeToEdit={empleadoEdit}
      />
      <div className="tabla-contenedor">
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Contraseña</th>
              <th>FechaNac</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map(emp => (
              <tr key={emp._id}>
                <td>{emp.fullName}</td>
                <td>{emp.username}</td>
                <td>{emp.email}</td>
                <td>********</td>
                <td>{emp.birth}</td>
                <td>{emp.phone}</td>
                <td>{emp.role}</td>
                <td>{emp.direction}</td>
                <td>
                  <button
                    className="btn-editar"
                    onClick={() => {
                      setEmpleadoEdit(emp);
                      setShowRegister(true);
                    }}
                  >Editar</button>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarEmpleado(emp._id)}
                  >Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
