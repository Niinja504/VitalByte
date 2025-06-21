import { useState, useEffect } from 'react';
import swal from 'sweetalert';

export function useUsers() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  const cargarUsuarios = () => {
    fetch('http://localhost:4000/api/client')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error('Error al cargar usuarios:', err));
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter(user =>
    Object.values(user).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  const handleEliminar = (id) => {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este usuario.",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:4000/api/client/${id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(() => {
            swal("Usuario eliminado", { icon: "success" });
            setUsuarios(prev => prev.filter(user => user._id !== id));
          })
          .catch(err => {
            console.error(err);
            swal("Error al eliminar usuario", { icon: "error" });
          });
      }
    });
  };

  const handleEditar = (id) => {
    const usuario = usuarios.find(u => u._id === id);
    setUsuarioEditar(usuario);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setUsuarioEditar(null);
  };

  const actualizarLista = () => {
    cargarUsuarios();
  };

  return {
    usuariosFiltrados,
    busqueda,
    setBusqueda,
    modalVisible,
    usuarioEditar,
    handleEliminar,
    handleEditar,
    cerrarModal,
    actualizarLista
  };
}
