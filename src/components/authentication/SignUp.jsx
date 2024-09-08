import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";
import { Link } from "react-router-dom";
import { handleError, handleSuccess } from "./Utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupPage() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prevSignupInfo) => ({
      ...prevSignupInfo,
      [name]: value,
    }));
  };

  const handleSignUP = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      handleError("All fields are required!");
      return;
    }

    try {
      const url = "http://localhost:3000/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();

      console.log(result);

      if (result.success) {
        handleSuccess(result.message);
        setTimeout(() => {
          navigate("/home");
        }, 500);
      } else if (result.error) {
        const details = result.error.details[0]?.message || "An error occurred";
        handleError(details);
      } else {
        handleError("User already exists, you can login.");
      }
    } catch (err) {
      handleError(err.message || "An unexpected error occurred!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="signup-container">
        <form onSubmit={handleSignUP} className="signup-form">
          <button type="button" className="close-button" onClick={handleClose}>
            ×
          </button>
          <h2>Sign Up</h2>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              value={signupInfo.email}
              autoFocus
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Username</label>
            <input
              onChange={handleChange}
              type="text"
              id="name"
              name="name"
              value={signupInfo.name}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              value={signupInfo.password}
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
    </>
  );
}

export default SignupPage;
