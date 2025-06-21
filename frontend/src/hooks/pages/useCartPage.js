import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../context/CartContext';

export function useCartPage() {
  const [products, setProducts] = useState([]);
  const { cart, updateQuantity, removeFromCart, setCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('Efectivo');
  const [address, setAddress] = useState('');
  const [referencePoint, setReferencePoint] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/api/products')
      .then(res => {
        const loaded = res.data.map(p => ({ ...p, quantity: 1 }));
        setProducts(loaded);
      })
      .catch(err => console.error(err));
  }, []);

  const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

  const handlePurchase = () => {
    const client_id = 'CLIENT_ID_PLACEHOLDER';
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
      delivery_address: address + (referencePoint ? (', Ref: ' + referencePoint) : '')
    };
    axios.post('http://localhost:3000/api/orders', order)
      .then(() => {
        alert('¡Pedido realizado exitosamente!');
        setCart([]);
      })
      .catch(err => {
        alert('Error al realizar el pedido');
        console.error(err);
      });
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
