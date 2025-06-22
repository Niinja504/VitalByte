import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(p => p._id === product._id);
      if (exists) {
        return prev.map(p =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev =>
      prev.map(p =>
        p._id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p._id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
