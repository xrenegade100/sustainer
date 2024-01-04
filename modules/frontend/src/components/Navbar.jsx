import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); // Per reindirizzare l'utente

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
        if (response.admin_id) {
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
    <nav className="navbar">
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
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
