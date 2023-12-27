import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Importa il file di stile CSS per la navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/piani">Piani</Link>
        </li>
        <li>
          <Link to="/addestra">Addestra</Link>
        </li>
        <li>
          <Link to="/storico">Storico</Link>
        </li>
        <li>
          <Link to="/cloud">Cloud</Link>
        </li>
        <li>
          <Link to="/community">Community</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
