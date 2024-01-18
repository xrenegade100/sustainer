import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const NavbarLogin = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <ul className="ul-nav">
        <img className="logoLg" src="/Logo.png" alt="" />
        {location.pathname === '/login' || location.pathname === '/loginAm' ? (
          <li className="pulsante-home">
            <Link to="/" className="text-white">
              Home
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default NavbarLogin;
