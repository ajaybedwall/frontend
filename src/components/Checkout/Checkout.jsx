import { useState } from "react";
import "./Checkout.css";

const Checkout = ({ totalPrice }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the final form submission and payment logic here
    alert("Payment Successful! Thank you for your purchase.");
  };

  return (
    <div className="checkout-container">
      {step === 1 && (
        <form onSubmit={handleNextStep}>
          <h2>Basic Details</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </label>
          <button className="checkout-btn" type="submit">
            Next
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleNextStep}>
          <h2>Shipping Address</h2>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Postal Code:
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Country:
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </label>
          <button
            className="checkout-btn"
            type="button"
            onClick={handlePreviousStep}
          >
            Previous
          </button>
          <button className="checkout-btn" type="submit">
            Next
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <h2>Payment</h2>
          <p>Total Amount: ${totalPrice.toFixed(2)}</p>
          {/* Implement payment gateway here */}
          <button type="button" onClick={handlePreviousStep}>
            Previous
          </button>
          <button className="checkout-btn" type="submit">
            Pay Now
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
