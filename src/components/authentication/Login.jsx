import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'; 
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

function LoginPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('your-backend-url/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const googleResponse = async (authResponse) => {
    // Google auth logic
  };

  const GoogleLogin = useGoogleLogin({
    onError: googleResponse,
    onSuccess: googleResponse,
    flow: 'auth-code',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="login-container" id="/login">
      <form className="login-form" onSubmit={handleLogin}>
        <button type="button" className="close-button" onClick={handleClose}>×</button>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="but">Log In</button>
        <p className="or">OR</p>
        <button className="but" onClick={GoogleLogin}>Login with Google</button>
        <span>Don't have an account? <Link to="/signup">SignUp</Link></span>
      </form>
    </div>
  );
}

export default LoginPage;
