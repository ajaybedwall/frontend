import React from "react";
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
import HomeDes from "./components/Navbar/Homedes";
import Cards from "./components/Cards/Card";
import ProductDetail from "./components/ProductDetails/ProductDetail";
import CategoryCards from "./components/Cards/Categorycards";
import Cart from "./components/Cards/Cart"; // Import Cart component

const App = () => {
  const GoogleAuthWrappers = () => (
    <GoogleOAuthProvider clientId="773703183001-d44jdgn8e2pk5eo8s464rmj9hecvj6hm.apps.googleusercontent.com">
      <LoginPage />
    </GoogleOAuthProvider>
  );

  return (
    <Router>
      <div>
        <Navbar />
        <HomeDes />
        <ConditionalContent />
        <Footer />
      </div>
    </Router>
  );
};

// Component to handle conditional rendering
const ConditionalContent = () => {
  const location = useLocation();
  const isProductDetail = location.pathname.startsWith("/Product/");

  return (
    <div>
      {!isProductDetail && (
        <>
          <Category />
          <Cards />
        </>
      )}
      <Routes>
        <Route path="/login" element={<GoogleAuthWrapper/>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Product/:id" element={<ProductDetail />} />
        <Route path="/Product/category/:category" element={<CategoryCards />} />
      </Routes>
      {/* <Cart />  */}
    </div>
  );
};

// Wrapper for login page with Google OAuth
const GoogleAuthWrapper = () => (
  <GoogleOAuthProvider clientId="773703183001-d44jdgn8e2pk5eo8s464rmj9hecvj6hm.apps.googleusercontent.com">
    <LoginPage />
  </GoogleOAuthProvider>
);

export default App;