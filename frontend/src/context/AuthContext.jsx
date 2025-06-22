import React, { createContext, useContext, useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(() => localStorage.getItem('userType'));
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    localStorage.setItem('userType', userType || '');
    localStorage.setItem('isAuthenticated', isAuthenticated);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [userType, isAuthenticated, user]);

  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (res.ok && data.userType && data.user) {
        const normalizedType = data.userType.toLowerCase();
        setUserType(normalizedType);
        setIsAuthenticated(true);
        setUser(data.user);
        return normalizedType;
      } else {
        setUserType(null);
        setIsAuthenticated(false);
        setUser(null);
        return null;
      }
    } catch (err) {
      setUserType(null);
      setIsAuthenticated(false);
      setUser(null);
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
      return res.ok;
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
    setUser(null);
    localStorage.removeItem('userType');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      userType,
      isAuthenticated,
      login,
      register,
      logout,
      showPassword,
      setShowPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
