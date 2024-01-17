/* eslint-disable react/prop-types */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, SIZE } from 'baseui/button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import circleBlu from '../assets/circle_checkBlu.svg';

const CardPianoEnterprise = () => {
  const [prezzoP, setPrezzoP] = useState(null);
  const [limitiSalvataggi, setLimitiSalvataggi] = useState(null);
  const [limitiAddestramenti, setLimitiAddestramenti] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataPiano = async () => {
      try {
        const response = await fetch('http://localhost:5000/modificaPiano', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
        }); // Adatta l'URL all'endpoint effettivo del tuo backend
        if (!response.ok) {
          throw new Error('Errore durante il recupero dei dati');
        }

        const jsonData = await response.json();
        setPrezzoP(jsonData.piano.prezzo);
        setLimitiSalvataggi(jsonData.piano.limiteSalvataggiModelli);
        setLimitiAddestramenti(jsonData.piano.limiteAddestramentiModelli);
      } catch (error) {
        console.error('Errore durante il recupero dei dati:', error.message);
      }
    };

    const fetchEliminaPreventivo = async () => {
      try {
        const response = await fetch('http://localhost:5000/eliminaPreventivo', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
        });
        const result = await response.json();
        console.log(result);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Errore durante la fetch:', error);
      }
    };

    fetchEliminaPreventivo();
    fetchDataPiano();
  }, []);

  const handleTerminaClick = async () => {
    navigate('/modifica-piano');
  };

  return (
    <>
      <Navbar />
      <div className="cardPreventivo">
        <div
          className="card"
          style={{ backgroundColor: '#FFFFFF', color: '#222222' }}
        >
          <div
            style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}
          >
            <h1
              style={{ color: '#222222' }}
            >
              Il Tuo
            </h1>
            <h1
              style={{ color: '#2467d1', marginLeft: '5px' }}
            >
              Piano:
            </h1>
          </div>
          <div className="price">
            {prezzoP !== null && (
            <p className="text-price">
              €
              {prezzoP}
            </p>
            )}
            <p className="text-period">/Mese</p>
          </div>
          <ul className="phrase-list">
            <li className="phrase-item">
              <img src={circleBlu} alt="" />
              <span className="phrase-text">NO Pubblicità</span>
            </li>
            <li className="phrase-item">
              <img src={circleBlu} alt="" />
              <span className="phrase-text">
                {limitiAddestramenti}
                {' '}
                addestramenti giornalieri
              </span>
            </li>
            <li className="phrase-item">
              <img src={circleBlu} alt="" />
              <span className="phrase-text">
                {limitiSalvataggi}
                {' '}
                salvataggi in memoria
              </span>
            </li>
            <li className="phrase-item">
              <img src={circleBlu} alt="" />
              <span className="phrase-text">
                Salvataggio parametri e metriche degli addestramenti
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="buttonPE">
        <Button
          className="btnnext"
          size={SIZE.large}
          onClick={() => handleTerminaClick()}
        >
          Termina
        </Button>
      </div>
      <Footer />
    </>
  );
};

export default CardPianoEnterprise;
