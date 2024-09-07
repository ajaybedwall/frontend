import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";
import { Link } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      const { jwtToken, message, success } = response.data;

      if (success) {
        localStorage.setItem("token", jwtToken);
        navigate("/dashboard");
      } else {
        setError(message);
      }
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <button type="button" className="close-button" onClick={handleClose}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="but">
          Log In
        </button>
        <span>
          Don't have an Account? <Link to="/signup">Sign Up</Link>
        </span>
      </form>
    </div>
  );
}

export default LoginPage;
