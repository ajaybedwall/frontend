


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { handleError, handleSuccess } from "./utils";
import "react-toastify/dist/ReactToastify.css";
import "./AuthPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const url = "http://localhost:3000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => navigate("/"), 1000);
      } else {
        handleError(error?.details?.[0]?.message || message || "Login failed");
      }
    } catch (err) {
      handleError("Login failed. Please check your credentials and try again.");
    }
  };

  const googleResponse = async (authResponse) => {
    try {
      // Handle Google login response and send it to the server
    } catch (error) {
      console.error("Error during Google authentication:", error);
    }
  };

  const GoogleLogin = useGoogleLogin({
    onError: googleResponse,
    onSuccess: googleResponse,
    flow: "auth-code",
  });

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <button
          type="button"
          className="close-button"
          onClick={() => navigate("/")}
        >
          ×
        </button>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
            placeholder="Enter your email..."
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
            placeholder="Enter your password..."
            required
          />
        </div>

        <button type="submit" className="but">
          Log In
        </button>

        <p className="or">OR</p>

        <button className="but" onClick={GoogleLogin}>
          Login with Google
        </button>

        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
}

export default LoginPage;
