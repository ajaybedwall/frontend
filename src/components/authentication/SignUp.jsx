import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'; 
import { Link } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token to local storage
        localStorage.setItem('token', data.token);

        // Redirect to the home page or login page after successful signup
        navigate('/');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('Server error. Please try again later.');
    }
  };

  const handleClose = () => {
    navigate('/'); // Go back to the previous page
  };

  return (
    <div className="signup-main">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSignup}>
          <button type="button" className="close-button" onClick={handleClose}>×</button>
          <h2>Sign Up</h2>
          {error && <p className="error-message">{error}</p>}
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
          <button type="submit" className="but">Sign Up</button>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
