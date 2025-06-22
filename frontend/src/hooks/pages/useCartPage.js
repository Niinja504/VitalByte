import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export function useCartPage() {
  const [products, setProducts] = useState([]);
  const { cart, updateQuantity, removeFromCart, setCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('Efectivo');
  const [address, setAddress] = useState('');
  const [referencePoint, setReferencePoint] = useState('');
  const [phone, setPhone] = useState('');

  const { userType, user } = useAuth(); 

  useEffect(() => {
    axios.get('http://localhost:4000/api/products')
      .then(res => {
        const loaded = res.data.map(p => ({ ...p, quantity: 1 }));
        setProducts(loaded);
      })
      .catch(err => {
        console.error(err);
        Swal.fire('Error', 'No se pudieron cargar los productos.', 'error');
      });
  }, []);

  const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

  const handlePurchase = async () => {
    if (cart.length === 0) {
      Swal.fire('Carrito vacío', 'Agrega productos antes de comprar.', 'warning');
      return;
    }

    if (!address.trim()) {
      Swal.fire('Dirección requerida', 'Por favor, ingresa tu dirección.', 'error');
      return;
    }

    if (!phone.trim()) {
      Swal.fire('Teléfono requerido', 'Por favor, ingresa un número de contacto.', 'error');
      return;
    }

    if (!/^\d{4}-?\d{4}$/.test(phone)) {
      Swal.fire('Teléfono inválido', 'Formato correcto: 0000-0000', 'warning');
      return;
    }

    if (!user || userType !== 'client') {
      Swal.fire('No autenticado', 'Debes iniciar sesión como cliente para comprar.', 'error');
      return;
    }

    const confirm = await Swal.fire({
      title: '¿Confirmar pedido?',
      text: '¿Deseas realizar este pedido?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, comprar',
      cancelButtonText: 'Cancelar'
    });

    if (!confirm.isConfirmed) return;

    const client_id = user._id; 
    const items = cart.map(p => ({
      product_id: p._id,
      quantity: p.quantity,
      price: p.price
    }));

    const order = {
      client_id,
      items,
      total_price: total,
      state: 'Pendiente',
      payment_method: paymentMethod,
      delivery_address: address + (referencePoint ? `, Ref: ${referencePoint}` : '')
    };

    try {
      await axios.post('http://localhost:4000/api/orders', order);
      await Swal.fire('¡Pedido realizado!', 'Tu compra ha sido registrada.', 'success');
      setCart([]);
      setAddress('');
      setReferencePoint('');
      setPhone('');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'No se pudo procesar tu pedido. Intenta más tarde.', 'error');
    }
  };

  return {
    cart,
    updateQuantity,
    removeFromCart,
    paymentMethod,
    setPaymentMethod,
    address,
    setAddress,
    referencePoint,
    setReferencePoint,
    phone,
    setPhone,
    total,
    handlePurchase
  };
}
