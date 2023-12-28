import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Importa il file di stile CSS per la navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <img className="img-file" src="/Logo.png" alt="" />
        <li>
          <img className="img-avatar" src="/Avatar.png" alt="" />
        </li>
        <li>
          <Link to="/community">Community</Link>
        </li>
        <li>
          <Link to="/cloud">Cloud</Link>
        </li>
        <li>
          <Link to="/storico">Storico</Link>
        </li>
        <li>
          <Link to="/addestra">Addestra</Link>
        </li>
        <li>
          <Link to="/piani">Piani</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
