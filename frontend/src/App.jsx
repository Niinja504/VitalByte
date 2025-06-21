import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx'; 
import Nav from './components/Nav.jsx';
import NavAdmin from './components/NavAdmin.jsx';
import Home from './Pages/Client/Home.jsx';
import Catalogo from './Pages/Client/Catalogo.jsx';
import Contacto from './Pages/Client/Contacto.jsx';
import Perfil from './Pages/Perfil.jsx';
import Cart from './Pages/Client/Cart.jsx';
import Users from './Pages/Admin/Users.jsx';
import Employees from './Pages/Admin/Employees.jsx';
import Orders from './Pages/Admin/Orders.jsx';
import Sales from './Pages/Admin/Sales.jsx';
import Products from './Pages/Admin/Products.jsx';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const { userType, isAuthenticated } = useAuth();

  const navigate = typeof window !== 'undefined' && window.location
    ? (path) => window.location.replace(path)
    : () => {};

  useEffect(() => {
    if (isAuthenticated && userType === 'admin') {
      setIsAdminView(true);
      if (
        window.location.pathname === '/Home' ||
        window.location.pathname === '/' ||
        window.location.pathname === '/Admin' ||
        window.location.pathname === '/Admin/'
      ) {
        navigate('/Admin/Pedidos');
      }
    } else if (!isAuthenticated) {
      setIsAdminView(false);
    }
  }, [isAuthenticated, userType]);

  return (
    <CartProvider>
      <Router>
        {isAdminView ? <NavAdmin /> : <Nav />}

        <Routes>
          {isAdminView ? (
            <>
              <Route path="/Admin/Pedidos" element={<Orders />} />
              <Route path="/Admin/Ventas" element={<Sales />} />
              <Route path="/Admin/Productos" element={<Products />} />
              <Route path="/Admin/Clientes" element={<Users />} />
              <Route path="/Admin/Employees" element={<Employees />} />
              <Route path="/Admin/*" element={<Navigate to="/Admin/Pedidos" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/Home" />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Catalogo" element={<Catalogo />} />
              <Route path="/Contacto" element={<Contacto />} />
              <Route path="/Perfil" element={<Perfil />} />
              <Route path="/Cart" element={<Cart />} />
            </>
          )}
        </Routes>

        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
