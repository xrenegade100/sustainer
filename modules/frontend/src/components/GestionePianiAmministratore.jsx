/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
// eslint-disable-next-line
// eslint-disable-next-line implicit-arrow-linebreak
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../styles/GestionePianiAmministratore.css'; // Import the CSS file

const GestioneAmministratorePiani = () => {
  const [preventivi, setPreventivi] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPreventivo, setCurrentPreventivo] = useState(null);
  const [stato, setStato] = useState('');
  const [prezzo, setPrezzo] = useState('');
  const [isShown, setIsShown] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [piani, setPiani] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function funzioneVerifica() {
      const verifica = await fetch('http://localhost:5000/verificaLoginAm', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
      });
      const response = await verifica.json();
      if (!response.user) {
        navigate('/loginAm');
      }
    }
    funzioneVerifica();
  }, [navigate]);

  useEffect(() => {
    async function fetchPreventivi() {
      const response = await fetch('http://localhost:5000/preventivi', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setPreventivi(data);
    }
    fetchPreventivi();
  }, []);

  const openModal = (preventivo) => {
    setCurrentPreventivo(preventivo);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleStateChange = (e, preventivo) => {
    setStato(e.target.value);
    setCurrentPreventivo({
      ...preventivo,
      stato: e.target.value,
    });
  };

  const handlePriceChange = (e, preventivo) => {
    setPrezzo(e.target.value);
    setCurrentPreventivo({
      ...preventivo,
      prezzo: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/preventivoModificato', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stato,
        prezzo,
        currentPreventivo,
      }),
    });
    await response.json();
    setModalIsOpen(false);
    window.location.reload();
  };

  const fetchUserInfo = async (idUtente) => {
    const response = await fetch(
      `http://localhost:5000/InfoUtente/${idUtente}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    setUserInfo(data);
  };

  const showUserInfo = (idUtente) => {
    fetchUserInfo(idUtente);
    setIsShown(true);
  };

  const hideUserInfo = () => {
    setIsShown(false);
  };

  useEffect(() => {
    const fetchPiani = async () => {
      const response = await fetch('http://localhost:5000/Allpiani', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setPiani(data);
    };
    fetchPiani();
  }, []);

  if (!preventivi) {
    return <div>Nessun preventivo presente</div>;
  }

  return (
    <div className="divGenerale">
      <div className="headergestione">
        <div className="maingestione">
          <h1>Gestione Preventivi</h1>
          <table className="gestionetable">
            <thead className="gestionethead">
              <tr className="gestionetr">
                <th className="gestioneth">Preventivo ID</th>
                <th className="gestioneth">Utente ID</th>
                <th className="gestioneth">Limite Addestramento</th>
                <th className="gestioneth">Limite Salvataggi</th>
                <th className="gestioneth">Prezzo</th>
                <th className="gestioneth">Stato</th>
              </tr>
            </thead>
            <tbody className="gestionetbody">
              {preventivi.map((preventivo) => (
                <tr key={preventivo.idPreventivo} className="gestionetr">
                  <td className="gestionetd">{preventivo.idPreventivo}</td>
                  <td className="gestionetd">
                    <p
                      onMouseOver={() => {
                        showUserInfo(preventivo.idUtente);
                        setCurrentUserId(preventivo.idUtente);
                      }}
                      onMouseOut={() => {
                        hideUserInfo();
                        setCurrentUserId(null);
                      }}
                    >
                      {preventivo.idUtente}
                    </p>
                    {isShown && currentUserId === preventivo.idUtente && (
                      <div className="tooltip">
                        {userInfo ? (
                          <div>
                            <p>Nome: {userInfo.nome}</p>
                            <p>Cognome: {userInfo.cognome}</p>
                            <p>Email: {userInfo.email}</p>
                          </div>
                        ) : (
                          <div>Caricamento...</div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="gestionetd">
                    {preventivo.limitiAddestramenti}
                  </td>
                  <td className="gestionetd">{preventivo.limitiSalvataggi}</td>
                  <td className="gestionetd">{preventivo.prezzo}</td>
                  <td className="gestionetd">{preventivo.stato}</td>
                  <td className="gestionetd">
                    <button
                      className="bottonePreventivi"
                      onClick={() => openModal(preventivo)}
                    >
                      Modifica
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="modal-content"
          >
            {currentPreventivo && (
              <div>
                <div className="modal-header">
                  <span className="close" onClick={closeModal}>
                    &times;
                  </span>
                  <h2 className="titoloModal">Modifica Preventivo</h2>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <h3 className="TextIdPreventivo">
                        Id preventivo:
                        {currentPreventivo.idPreventivo}
                      </h3>
                    </div>
                    <div className="DivStato">
                      <h1 className="statoLabel">Stato del preventivo</h1>
                      <select
                        className="selectStato"
                        id="stato"
                        name="stato"
                        value={currentPreventivo.stato}
                        onChange={
                          (e) =>
                            // eslint-disable-next-line implicit-arrow-linebreak
                            handleStateChange(e, currentPreventivo)
                          // eslint-disable-next-line react/jsx-curly-newline
                        }
                      >
                        <option value="In Lavorazione">In Lavorazione</option>
                        <option value="Accettato">Accettato</option>
                        <option value="Rifiutato">Rifiutato</option>
                      </select>
                    </div>
                    <div className="DivPrezzo">
                      <h1 className="prezzoLabel">Prezzo del preventivo</h1>
                      <input
                        className="inputPrezzo"
                        value={prezzo}
                        placeholder="Inserisci il prezzo"
                        type="number"
                        onChange={
                          (e) =>
                            // eslint-disable-next-line implicit-arrow-linebreak
                            handlePriceChange(e, currentPreventivo)
                          // eslint-disable-next-line react/jsx-curly-newline
                        }
                      />
                    </div>
                    <button type="submit" className="bottonePreventiviForm">
                      Modifica
                    </button>
                  </form>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
      <div className="headergestionePiani">
        <div className="maingestionePiani">
          <h1>Visualizzazione Piani</h1>
          <table className="pianitable">
            <thead className="pianithead">
              <tr className="pianitr">
                <th className="pianith">ID Piano</th>
                <th className="pianith">Tipo</th>
                <th className="pianith">Prezzo</th>
                <th className="pianith">limite Salvataggi Modelli</th>
                <th className="pianith">limite Addestramenti Modelli</th>
              </tr>
            </thead>
            <tbody className="pianitbody">
              {piani.map((piano) => (
                <tr key={piano.idPiano} className="pianitr">
                  <td className="pianitd">{piano.idPiano}</td>
                  <td className="pianitd">{piano.tipo}</td>
                  <td className="pianitd">{piano.prezzo}</td>
                  <td className="pianitd">{piano.limiteSalvataggiModelli}</td>
                  <td className="pianitd">
                    {piano.limiteAddestramentiModelli}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GestioneAmministratorePiani;
