// context/CartContext.js
import React, { createContext, useState } from "react";

// CartContext banayenge jisse saare components access kar sake
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // Cart items ka state

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]); // Naya product cart mein add karna
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children} {/* Saare children ko CartContext ka access */}
    </CartContext.Provider>
  );
};

export default CartProvider;
