import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SignupPage from "./components/authentication/SignUp";
import LoginPage from "./components/authentication/Login";
import Home from "./components/Home/Home";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import {GoogleOAuthProvider} from '@react-oauth/google'
const App = () => {

  const GoogleAuthWrapper =()=>{
    return (
      <GoogleOAuthProvider clientId="773703183001-d44jdgn8e2pk5eo8s464rmj9hecvj6hm.apps.googleusercontent.com">
        <LoginPage></LoginPage>
      </GoogleOAuthProvider>
    );
  }
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <h1>
                <Home />{" "}
              </h1>
            }
          />
          <Route path="/login" element={<GoogleAuthWrapper />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
