import React from 'react';
import LoginSignupForm from '../components/LoginSignupForm';
import '../styles/Navbar.css';
import '../styles/Login.css';
import NavbarLogin from '../components/NavbarLogin';

const Login = () => (
  <div className="header">
    <NavbarLogin />
    <div className="main">
      <LoginSignupForm />
    </div>
  </div>
);

export default Login;
