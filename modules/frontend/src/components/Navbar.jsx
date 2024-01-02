import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const handleAvatarClick = () => {
    console.log('Avatar clicked');
    setIsDropdownVisible((prevState) => !prevState);
  };

  const handleDropdownKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('Enter key pressed');
    }
  };

  const handleLogout = async () => {
    console.error('Entro in navbar logout');
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setIsUserAuthenticated(false);
        // Altri passaggi di pulizia, reindirizzamento, ecc., se necessario
      } else {
        console.error('Errore durante il logout:', response.statusText);
      }
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  useEffect(() => {
    async function funzioneVerifica() {
      try {
        const verifica = await fetch('http://localhost:5000/verificaLogin', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
        });
        const response = await verifica.json();

        if (response.user) {
          setIsUserAuthenticated(true);
        } else {
          setIsUserAuthenticated(false);
        }
      } catch (error) {
        console.error('Errore durante la verifica del login:', error);
      }
    }

    funzioneVerifica();
  }, []); // L'array delle dipendenze è vuoto in quanto non si basa su alcuno stato o proprietà

  return (
    <nav className="navbar">
      <ul>
        <img className="logo" src="/Logo.png" alt="" />
        {/* ... (Altri elementi della navbar) */}
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
              {isUserAuthenticated ? (
                // Contenuto del menù a tendina quando l'utente è autenticato
                <>
                  <Link to="/login" className="text-black">
                    Profilo
                  </Link>
                  <Link to="/modifica-piano" className="text-black">
                    Il mio piano
                  </Link>
                  <Link to="/" className="text-black">
                    Il mio storico
                  </Link>
                  <Link onClick={handleLogout}>
                    <span className="text-black">Esci</span>
                  </Link>
                </>
              ) : (
                // Contenuto del menù a tendina quando l'utente non è autenticato
                <Link to="/login" className="text-black">
                  Accedi
                </Link>
              )}
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
