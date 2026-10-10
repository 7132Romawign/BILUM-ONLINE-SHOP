import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on first render
    try {
      const saved = localStorage.getItem('bilum_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('bilum_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.productid === product.productid);
      if (existing) {
        return items.map((item) =>
          item.productid === product.productid
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...items,
        {
          productid: product.productid,
          productname: product.productname,
          price: parseFloat(product.price),
          imageurl: product.imageurl,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (productid) => {
    setCartItems((items) => items.filter((item) => item.productid !== productid));
  };

  const updateQuantity = (productid, quantity) => {
    if (quantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.productid === productid ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider');
  }
  return context;
}