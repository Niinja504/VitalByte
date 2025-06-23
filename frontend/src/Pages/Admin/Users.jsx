import React from 'react';
import '../style/Admin/users.css';
import '../style/Admin/ProductTable.css';
import EditUserModal from '../../components/Modales/EditUserModal';
import { useUsers } from '../../hooks/pages/useUsers';
import { useSuccessModal } from '../../components/SuccessModal';

const Users = () => {
  const {
    usuariosFiltrados,
    busqueda,
    setBusqueda,
    modalVisible,
    usuarioEditar,
    handleEliminar,
    handleEditar,
    cerrarModal,
    actualizarLista
  } = useUsers();

  const { showSuccess } = useSuccessModal();

  const handleEliminarUsuario = (id) => {
    handleEliminar(id);
    showSuccess('¡Usuario eliminado!');
  };

  return (
    <div className="users-container">
      <p className="titulo">Usuarios</p>
      <p className="descripcion">Administra aquí los clientes registrados en la plataforma.</p>
      <input
        type="text"
        placeholder="🔍 Buscar"
        className="buscador"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <div className="tabla-contenedor">
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Fecha de nacimiento</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map(user => (
              <tr key={user._id}>
                <td>{user.fullname}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.birth}</td>
                <td>{user.phone}</td>
                <td>
                  <button className="btn-editar" onClick={() => handleEditar(user._id)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => handleEliminarUsuario(user._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditUserModal
        isVisible={modalVisible}
        onClose={cerrarModal}
        userToEdit={usuarioEditar}
        onUserUpdated={actualizarLista}
      />
    </div>
  );
};

export default Users;
