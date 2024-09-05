import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'; 
import { Link } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/'); // Go back to the previous page
  };

  return (
    <div className="signup-main">
      <div className="signup-container">
        <form className="signup-form">
          <button type="button" className="close-button" onClick={handleClose}>×</button>
          <h2>Sign Up</h2>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className='but'>Sign Up</button>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
