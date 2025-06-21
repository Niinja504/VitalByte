import useDataEmployee from '../../hooks/useDataEmployee.jsx';

export function useEmployees() {
  const {
    showRegister,
    setShowRegister,
    empleados,
    empleadoEdit,
    setEmpleadoEdit,
    eliminarEmpleado,
    handleCloseModal,
    handleSuccess
  } = useDataEmployee();

  return {
    showRegister,
    setShowRegister,
    empleados,
    empleadoEdit,
    setEmpleadoEdit,
    eliminarEmpleado,
    handleCloseModal,
    handleSuccess
  };
}
