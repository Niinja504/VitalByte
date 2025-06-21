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

  return (
    <div className="cart-container">
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
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  Tu carrito está vacío.
                </td>
              </tr>
            ) : (
              cart.map(p => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>
                    <button onClick={() => updateQuantity(p._id, -1)} disabled={p.quantity <= 1}>-</button>
                    {p.quantity}
                    <button onClick={() => updateQuantity(p._id, 1)}>+</button>
                  </td>
                  <td>${p.price}</td>
                  <td>${(p.price * p.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeFromCart(p._id)}>Eliminar</button>
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
        <h2>Datos de Entrega</h2>
        <input
          type="text"
          placeholder="Dirección de entrega"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Punto de referencia (opcional)"
          value={referencePoint}
          onChange={e => setReferencePoint(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Teléfono de contacto"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
        </select>
        <button className="cart-purchase-btn" onClick={handlePurchase} disabled={cart.length === 0}>
          Realizar Pedido
        </button>
      </div>
    </div>
  );
}

export default Cart;