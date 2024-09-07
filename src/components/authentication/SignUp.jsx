import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";
import { Link } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {
        name: username,
        email,
        password,
      });

      const { success, message } = response.data;

      if (success) {
        navigate("/login");
      } else {
        setError(message);
      }
    } catch (error) {
      setError("failed");
    }
  };

  return (
    <div className="signup-main">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <button type="button" className="close-button" onClick={handleClose}>
            ×
          </button>
          <h2>Sign Up</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
            Sign Up
          </button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;


