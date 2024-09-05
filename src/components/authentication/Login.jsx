import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'; 
import { Link } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/'); // Go back to the previous page
  };

  return (
    <div className="login-container" id='/login'>
      <form className="login-form">
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
        <button type="submit" className='but'>Log In</button>
        <span>Don't have a Account <Link to="/signup">SignUp?</Link></span>
      </form>
    </div>
  );
}

export default LoginPage;
