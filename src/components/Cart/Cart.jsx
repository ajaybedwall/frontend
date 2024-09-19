import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = ({
  cartItems,
  onAddToCart,
  onRemoveFromCart,
  onClose,
  isOpen,
  setIsCheckout, // Receive setIsCheckout as prop
}) => {
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleProceedToCheckout = () => {
    if (cartItems.length > 0) {
      setIsCheckout(true); // Set checkout mode
      navigate("/checkout"); // Navigate to checkout
    } else {
      alert("Your cart is empty!");
    }
  };

  return (
    <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
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
                <p className="cart-item-description">{item.description}</p>
                <p className="cart-item-price">
                  Price: <span>${item.price.toFixed(2)}</span>
                </p>
                <p className="cart-item-total-price">
                  Total Price:{" "}
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </p>
                <div className="quantity-controls">
                  <button onClick={() => onRemoveFromCart(item.id)}>-</button>
                  <p className="cart-item-quantity">
                    <span>{item.quantity}</span>
                  </p>
                  <button onClick={() => onAddToCart(item)}>+</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            <h3>
              Total: <span>${totalPrice.toFixed(2)}</span>
            </h3>
          </div>
          <div className="cart-actions">
            <button
              className="proceed-payment-button"
              onClick={handleProceedToCheckout}
            >
              Proceed to Buy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
