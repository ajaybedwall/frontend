import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const location = useLocation();

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

  return (
    <div>
      <Navbar cartItems={cartItems} toggleCart={toggleCart} />
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
      <Footer />
      <ToastContainer />
    </div>
  );
};

const ConditionalContent = ({ cartItems, onAddToCart, setIsCheckout }) => {
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
        <Route path="/login" element={<LoginPage />} />
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
