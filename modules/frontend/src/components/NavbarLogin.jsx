import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const NavbarLogin = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <ul>
        <img className="logo" src="/Logo.png" alt="" />
        {location.pathname === '/login' || location.pathname === '/loginAm' ? (
          <li>
            <Link to="/" className="text-white">
              {' '}
              Home{' '}
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default NavbarLogin;
