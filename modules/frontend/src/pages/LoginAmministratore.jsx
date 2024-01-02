import React from 'react';
import LoginAmForm from '../components/LoginAmForm';
import '../styles/Navbar.css';
import '../styles/LoginAmForm.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const LoginAmministratore = () => (
  <div className="header">
    <Navbar />
    <div className="main">
      <div className="">
        <LoginAmForm />
      </div>
    </div>
    <Footer />
  </div>
);

export default LoginAmministratore;
