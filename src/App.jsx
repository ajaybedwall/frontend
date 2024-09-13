import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SignupPage from "./components/authentication/SignUp";
import LoginPage from "./components/authentication/Login";
import Home from "./components/Home/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Category from "./components/category/Category";
import HomeDes from "./components/Navbar/HomeDes";
import Cards from "./components/Cards/Card";
import ProductDetail from "./components/ProductDetails/ProductDetail";
import CategoryCards from "./components/Cards/CategoryCards";
import Cart from "./components/Cart/Cart"; // Import Cart component

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  return (
    <Router>
      <div>
        <Navbar cartItems={cartItems} />
        <HomeDes />
        <ConditionalContent onAddToCart={handleAddToCart} />
        <Footer />
        {/* <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} /> */}
      </div>
    </Router>
  );
};

// Wrapper for login page with Google OAuth
const GoogleAuthWrapper = () => (
  <GoogleOAuthProvider clientId="your-client-id">
    <LoginPage />
  </GoogleOAuthProvider>
);

// Component to handle conditional rendering
const ConditionalContent = ({ onAddToCart }) => {
  const location = useLocation();
  const isProductDetail = location.pathname.startsWith("/Product/");

  return (
    <div>
      {!isProductDetail && (
        <>
          <Category />
          <Cards onAddToCart={onAddToCart} />
        </>
      )}
      <Routes>
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Product/:id" element={<ProductDetail />} />
        <Route path="/Product/category/:category" element={<CategoryCards />} />
      </Routes>
      {/* <Cart />  */}
    </div>
  );
};

export default App;
