import React, { useEffect, useState } from 'react';
import { Menu } from 'baseui/icon';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setIsNavbarVisible((prevState) => !prevState);
  };

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
    navigate('/homepage'); // Reindirizzo l'utente alla homepage
  };

  const handleLogoutAm = async () => {
    console.error('Entro in navbar logout');
    try {
      const response = await fetch('http://localhost:5000/logoutAm', {
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
    navigate('/homepage'); // Reindirizzo l'admin alla homepage
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
          setIsAdmin(response.user.isAdmin);
        } else {
          setIsUserAuthenticated(false);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Errore durante la verifica del login:', error);
      }
    }

    async function funzioneVerificaA() {
      try {
        const verifica = await fetch('http://localhost:5000/verificaLoginAm', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
        });
        const response = await verifica.json();
        if (response.adminId) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Errore durante la verifica del login:', error);
      }
    }

    funzioneVerifica();
    funzioneVerificaA();
  }, []);

  return (
    <nav className={`navbar ${isNavbarVisible ? 'visible' : ''}`}>
      <ul>
        <img className="logo" src="/Logo.png" alt="" />
        {isAdmin ? (
          <>
            <li>
              <Link to="/admin/dashboard" className="text-white">
                Gestione Utenti
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="text-white">
                Comunicazioni
              </Link>
              {/* Altri link o elementi specifici per l'amministratore */}
            </li>
            <li>
              <Link to="/admin/dashboard" className="text-white">
                Gestione Piani
              </Link>
            </li>
            <li>
              <Link onClick={handleLogoutAm}>
                <span className="text-white">Esci</span>
              </Link>
            </li>
          </>
        ) : (
          <>
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
                    <Link to="/login" className="text-black">
                      Accedi
                    </Link>
                  )}
                </div>
              )}
            </li>
            <li className="elements">
              <Link to="/community" className="text-white">
                Community
              </Link>
            </li>
            <li className="elements">
              <Link to="/cloud" className="text-white">
                Cloud
              </Link>
            </li>
            <li className="elements">
              <Link to="/storico" className="text-white">
                Storico
              </Link>
            </li>
            <li className="elements">
              <Link to="/addestra" className="text-white">
                Addestra
              </Link>
            </li>
            <li className="elements">
              <Link to="/piani" className="text-white">
                Piani
              </Link>
            </li>
            <li className="elements">
              <Link to="/" className="text-white">
                Home
              </Link>
            </li>
          </>
        )}
        <div
          className="toggle_Menu"
          role="button"
          tabIndex="0"
          onClick={handleMenuClick}
          onKeyDown={handleDropdownKeyDown}
        >
          <Menu size="35px" color="white" />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
