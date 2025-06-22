import React from 'react';
import './../style/Client/Cart.css';
import { useCartPage } from '../../hooks/pages/useCartPage';

function Cart() {
  const {
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
  } = useCartPage();

  // Función para formatear teléfono: 12345678 → 1234-5678
  function formatPhoneNumber(value) {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 4) return digits;
    return `${digits.slice(0, 4)}-${digits.slice(4, 8)}`;
  }

  return (
    <div className="cart-container page-cart">
      <div className="cart-products">
        <h1>Carrito de Compras</h1>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-cart">Tu carrito está vacío.</td>
              </tr>
            ) : (
              cart.map(p => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>
                    <button className="qty-btn" onClick={() => updateQuantity(p._id, -1)} disabled={p.quantity <= 1}>-</button>
                    <span className="qty-value">{p.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(p._id, 1)}>+</button>
                  </td>
                  <td>${p.price.toFixed(2)}</td>
                  <td>${(p.price * p.quantity).toFixed(2)}</td>
                  <td>
                    <button className="delete-btn" onClick={() => removeFromCart(p._id)}>✕</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="cart-total">
          <strong>Total: ${total.toFixed(2)}</strong>
        </div>
      </div>

      <div className="cart-form">
        <h2>Pedido</h2>

        <label>Método de pago:</label>
        <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
        </select>

        <label>Dirección de envío:</label>
        <input
          type="text"
          placeholder="Dirección"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />

        <label>Teléfono de contacto:</label>
        <input
          type="tel"
          placeholder="0000–0000"
          value={phone}
          onChange={e => setPhone(formatPhoneNumber(e.target.value))}
        />

        <button
          className="cart-purchase-btn"
          onClick={handlePurchase}
          disabled={cart.length === 0}
        >
          Comprar
        </button>
      </div>
    </div>
  );
}

export default Cart;
