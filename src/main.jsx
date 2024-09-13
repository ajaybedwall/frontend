import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import CartProvider from "./components/context/CartContext.jsx"; // CartProvider import karo

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      {" "}
      {/* CartProvider ke andar App ko wrap karo */}
      <App />
    </CartProvider>
  </StrictMode>
);
