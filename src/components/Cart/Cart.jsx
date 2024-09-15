import React from "react";
import "./Cart.css";

const Cart = ({ cartItems, onClose, onRemoveFromCart }) => {
  
  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="close-cart" onClick={onClose}>
          X
        </button>
      </div>
      <div className="cart-content">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.thumbnail}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>${item.price.toFixed(2)}</p>
                <button onClick={() => onRemoveFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-footer">
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
