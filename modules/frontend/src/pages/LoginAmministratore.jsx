import React from 'react';
import LoginAmForm from '../components/LoginAmForm';
import NavbarLogin from '../components/NavbarLogin';
import '../styles/Navbar.css';
import '../styles/LoginAmForm.css';

const LoginAmministratore = () => (
  <div className="header">
    <NavbarLogin />
    <div className="main">
      <div className="">
        <LoginAmForm />
      </div>
    </div>
  </div>
);

export default LoginAmministratore;
