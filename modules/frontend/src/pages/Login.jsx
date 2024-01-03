import React from 'react';
import LoginSignupForm from '../components/LoginSignupForm';
import '../styles/Navbar.css';
import '../styles/Login.css';
import Footer from '../components/Footer';

const Login = () => (
  <div className="header">
    <div className="main">
      <div className="">
        <LoginSignupForm />
      </div>
    </div>
    <Footer />
  </div>
);

export default Login;
