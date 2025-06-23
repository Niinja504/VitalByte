import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const emptyUser = {
  _id: '',
  fullname: '',
  email: '',
  username: '',
  birth: '',
  phone: ''
};

export function usePerfil() {
  const [activeView, setActiveView] = useState('perfil');
  const [orders, setOrders] = useState([]);
  const { isAuthenticated, user } = useAuth();
  const [userState, setUser] = useState(user ? { ...emptyUser, ...user } : emptyUser);
  const [originalUser, setOriginalUser] = useState(user ? { ...emptyUser, ...user } : emptyUser);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Obtener datos del usuario autenticado
    if (isAuthenticated) {
      axios.get('http://localhost:4000/api/client/me', { withCredentials: true })
        .then(res => {
          setUser({
            _id: res.data._id || '',
            fullname: res.data.fullname || '',
            email: res.data.email || '',
            username: res.data.username || '',
            birth: res.data.birth ? res.data.birth.slice(0, 10) : '',
            phone: res.data.phone || ''
          });
          setOriginalUser({
            _id: res.data._id || '',
            fullname: res.data.fullname || '',
            email: res.data.email || '',
            username: res.data.username || '',
            birth: res.data.birth ? res.data.birth.slice(0, 10) : '',
            phone: res.data.phone || ''
          });
        })
        .catch(err => console.error(err));
    }
    axios.get('http://localhost:4000/api/orders')
      .then(res => {
        setOrders(res.data);
      })
      .catch(err => console.error(err));
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
    setIsEditing(true);
  };

  const isUserChanged = originalUser && (
    userState.fullname !== originalUser.fullname ||
    userState.email !== originalUser.email ||
    userState.username !== originalUser.username ||
    userState.birth !== originalUser.birth ||
    userState.phone !== originalUser.phone
  );

  const pedidosPendientes = orders.filter(o => o.state === 'Pendiente');
  const pedidosEntregados = orders.filter(o => o.state === 'Finalizado');

  const handleEditProfile = async () => {
    try {
      // Se asume que el backend identifica al usuario autenticado por el token
      await axios.put('http://localhost:4000/api/client/' + originalUser._id, userState, { withCredentials: true });
      setOriginalUser({ ...userState });
      Swal.fire({
        icon: 'success',
        title: 'Perfil actualizado',
        text: 'Tu información se ha guardado correctamente.'
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el perfil.'
      });
    }
  };

  return {
    activeView,
    setActiveView,
    orders,
    pedidosPendientes,
    pedidosEntregados,
    user: userState,
    handleInputChange,
    isUserChanged,
    handleEditProfile
  };
}
