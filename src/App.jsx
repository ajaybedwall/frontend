import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import SignupPage from './components/authentication/SignUp'
import LoginPage from './components/authentication/Login'
const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
          <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
          </Routes>
          <Footer/>
        </Router>
    </div>
  )
}

export default App