import React, { useState, useRef } from "react";
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
import { GoogleOAuthProvider } from "@react-oauth/google";
import Category from "./components/category/Category";
import HomeDes from "./components/Navbar/HomeDes";
import Cards from "./components/Cards/Card";
import ProductDetail from "./components/ProductDetails/ProductDetail";
import CategoryCards from "./components/Cards/CategoryCards";
import Whats from "./components/Footer/Whats";
import Deals from "./components/Footer/Deals";  // Assuming you have a Deals component

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const whatsNewRef = useRef(null);  // Ref for "What's New" section
  const categoryRef = useRef(null);  // Ref for "Categories" section
  const dealsRef = useRef(null);     // Ref for "Deals" section

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Scroll function to scroll to "What's New" section
  const scrollToWhatsNew = () => {
    if (whatsNewRef.current) {
      whatsNewRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll function to scroll to "Categories" section
  const scrollToCategory = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll function to scroll to "Deals" section
  const scrollToDeals = () => {
    if (dealsRef.current) {
      dealsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Router>
      <div>
        {/* Pass scroll functions to Navbar */}
        <Navbar
          cartItems={cartItems}
          onWhatsNewClick={scrollToWhatsNew}
          onCategoryClick={scrollToCategory}
          onDealsClick={scrollToDeals}
        />
        <HomeDes />
        
        {/* Add ref to the "Categories" section */}
        <div ref={categoryRef}>
          <Category />
        </div>

        

        <ConditionalContent onAddToCart={handleAddToCart} />
        
        {/* Add ref to the "What's New" section */}
        <div ref={whatsNewRef}>
          <Whats />
        </div>
        {/* Add ref to the "Deals" section */}
        <div ref={dealsRef}>
          <Deals />  {/* Assuming you have a Deals component */}
        </div>
        
        <Footer />
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
          <Cards onAddToCart={onAddToCart} />
        </>
      )}
      <Routes>
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/Product/:id" element={<ProductDetail />} />
        <Route path="/Product/category/:category" element={<CategoryCards />} />
      </Routes>
    </div>
  );
};

export default App;
