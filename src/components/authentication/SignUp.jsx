import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AuthPage.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleSuccess, handleError } from "./utils";

function SignupPage() {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError("Username, email, and password are required");
    }

    try {
      const url = "http://localhost:3000/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        handleError(error?.details?.[0]?.message || message || "Signup failed");
      }
    } catch (err) {
      handleError("Signup failed");
    }
  };

  return (
    <div className="signup-main">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <button
            type="button"
            className="close-button"
            onClick={() => navigate("/")}
          >
            ×
          </button>
          <h2>Sign Up</h2>
          {error && <p className="error-message">{error}</p>}

          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              autoFocus
              placeholder="Enter your name..."
              value={signupInfo.name}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={signupInfo.email}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={signupInfo.password}
              required
            />
          </div>

          <button type="submit" className="but">
            Sign Up
          </button>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default SignupPage;
