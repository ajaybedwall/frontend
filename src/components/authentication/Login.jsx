import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './AuthPage.css'; 
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google'
import { handleError, handleSuccess } from "./Utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/"); 
  };
  const googleResponse = async(authResponse)=>{
try{
  console.log(authResponse);

}catch(error){
  console.error('Error while response in google auth code :', error);
}
  }

  const GoogleLogin = useGoogleLogin({
    onError: googleResponse,
    onSuccess: googleResponse,
    flow: "auth-code",
  });

   const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevLoginInfo) => ({
      ...prevLoginInfo,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const {email, password } = loginInfo;
    if (!email || !password) {
      handleError("All fields are required!");
      return;
    }

    try {
      const url = "http://localhost:3000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { jwtToken, name, error } = result;
      console.log(result); 

     
      if (result.success) {
        handleSuccess(result.message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('LoggedInUser', name);
        setTimeout(() => {
          navigate("/home");
        }, 500);
      } else if (result.error) {
        const details = result.error.details[0]?.message || "An error occurred";
        handleError(details);
      } else {
        handleError("Authentication failed: email or password is incorrect.");
      }
    } catch (err) {
      handleError(err.message || "An unexpected error occurred!");
    }
  };


  return (
    <div className="login-container" id="/login">
      <ToastContainer />

      <form onSubmit={handleLogin} className="login-form">
        <button type="button" className="close-button" onClick={handleClose}>
          ×
        </button>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            value={loginInfo.email}
            autoFocus
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            value={loginInfo.password}
          />
        </div>
        <button type="submit" className="but">
          Log In
        </button>
        <p className="or">OR</p>
        <button className="but" onClick={GoogleLogin}>
          Login with Google
        </button>
        <span>
          Don't have an Account <Link to="/signup">SignUp?</Link>
        </span>
      </form>
    </div>
  );
}

export default LoginPage;



