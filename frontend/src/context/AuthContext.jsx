import React, { createContext, useContext, useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(() => localStorage.getItem('userType'));
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    localStorage.setItem('userType', userType || '');
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [userType, isAuthenticated]);

  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.userType) {
        // Normalize admin userType to lowercase for consistency
        const normalizedType = data.userType.toLowerCase();
        setUserType(normalizedType);
        setIsAuthenticated(true);
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: 'Has iniciado sesión correctamente.',
          timer: 2000,
          showConfirmButton: false
        });
        return normalizedType;
      } else {
        setUserType(null);
        setIsAuthenticated(false);
        return null;
      }
    } catch (err) {
      setUserType(null);
      setIsAuthenticated(false);
      return null;
    }
  };

  const register = async (userData) => {
    try {
      const res = await fetch('http://localhost:4000/api/registerClient', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Tu cuenta ha sido creada correctamente.',
          timer: 2000,
          showConfirmButton: false
        });
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const logout = async () => {
    await fetch('http://localhost:4000/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUserType(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userType');
    localStorage.removeItem('isAuthenticated');
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente.',
      timer: 2000,
      showConfirmButton: false
    });
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  return (
    <AuthContext.Provider value={{ userType, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


