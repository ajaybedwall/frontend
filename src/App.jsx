
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useState, useRef ,useEffect} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import Whats from "./components/Footer/Whats";
import Deals from "./components/Footer/Deals";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SignupPage from "./components/authentication/SignUp";
import LoginPage from "./components/authentication/Login";
import Category from "./components/category/Category";
import HomeDes from "./components/Navbar/HomeDes";
import Cards from "./components/Cards/Card";
import ProductDetail from "./components/ProductDetails/ProductDetail";
import CategoryCards from "./components/Cards/CategoryCards";

import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  // const location = useLocation();
  const whatsNewRef = useRef(null);  // Ref for "What's New" section
  const categoryRef = useRef(null);  // Ref for "Categories" section
  const dealsRef = useRef(null);     // Ref for "Deals" section

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

    useEffect(() => {
      if (location.state?.openCart) {
        setIsCartOpen(true);
      }
    }, [location]);


  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    toast.success(`${product.title} added to cart!`, {});
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === productId);

      if (itemToRemove && itemToRemove.quantity > 1) {
        toast.info(`Decreased quantity of ${itemToRemove.title}`, {});
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else if (itemToRemove) {
        toast.error(`${itemToRemove.title} removed from cart!`, {});
        return prevItems.filter((item) => item.id !== productId);
      }
      return prevItems;
    });
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
    <>
      <Router>
        <div>
          {/* Pass scroll functions to Navbar */}
          <Navbar
            cartItems={cartItems}
            toggleCart={toggleCart}
            onWhatsNewClick={scrollToWhatsNew}
            onCategoryClick={scrollToCategory}
            onDealsClick={scrollToDeals}
          />
          {!isCheckout && <HomeDes />}
          <ConditionalContent
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            setIsCheckout={setIsCheckout}
          />
          {!isCheckout && (
            <Cart
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onClose={toggleCart}
              isOpen={isCartOpen}
              setIsCheckout={setIsCheckout}
            />
          )}

          {/* Add ref to the "Categories" section */}
          <div ref={categoryRef}>
            <Category />
          </div>

          {/* Add ref to the "What's New" section */}
          <div ref={whatsNewRef}>
            <Whats />
          </div>
          {/* Add ref to the "Deals" section */}
          <div ref={dealsRef}>
            <Deals /> {/* Assuming you have a Deals component */}
          </div>

          <Footer />
          <ToastContainer />
        </div>
      </Router>
    </>
  );
};

const ConditionalContent = ({ cartItems, onAddToCart, setIsCheckout }) => {
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
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/Product/:id" element={<ProductDetail />} />
        <Route path="/Product/category/:category" element={<CategoryCards />} />
        <Route
          path="/checkout"
          element={
            <Checkout
              totalPrice={cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}
              setIsCheckout={setIsCheckout}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
