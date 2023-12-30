import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Importa il file di stile CSS per la navbar

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleAvatarClick = () => {
    console.log('Avatar clicked');
    setIsDropdownVisible((prevState) => !prevState);
  };

  const handleDropdownKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Aggiungi la logica che desideri eseguire quando viene premuto Invio
      console.log('Enter key pressed');
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <img className="logo" src="/Logo.png" alt="" />
        <li
          className="dropdown-li"
          role="button"
          tabIndex="0"
          onClick={handleAvatarClick}
          onKeyDown={handleDropdownKeyDown}
        >
          <img className="img-avatar" src="/Avatar.png" alt="" />

          {isDropdownVisible && (
            <div className="dropdown-content">
              {/* Contenuto del menù a tendina */}
              <Link to="/login" className="text-black">
                Accedi
              </Link>
            </div>
          )}
        </li>
        <li>
          <Link to="/community" className="text-white">
            Community
          </Link>
        </li>
        <li>
          <Link to="/cloud" className="text-white">
            Cloud
          </Link>
        </li>
        <li>
          <Link to="/storico" className="text-white">
            Storico
          </Link>
        </li>
        <li>
          <Link to="/addestra" className="text-white">
            Addestra
          </Link>
        </li>
        <li>
          <Link to="/piani" className="text-white">
            Piani
          </Link>
        </li>
        <li>
          <Link to="/" className="text-white">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
