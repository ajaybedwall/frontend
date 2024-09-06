import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'; 
import { Link } from 'react-router-dom';
import {useGoogleLogin} from '@react-oauth/google'

function LoginPage() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/'); 
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
        <p className='or'>OR</p>
        <button className='but' onClick={GoogleLogin}>Login with Google</button>
        <span>Don't have a Account <Link to="/signup">SignUp?</Link></span>
      </form>
    </div>
  );
}

export default LoginPage;
