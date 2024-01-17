/* eslint-disable react/prop-types */
import * as React from 'react';
import { useEffect, useState } from 'react';

const CardPianoEnterprise = ({
  bgColor,
  circleIcon,
  textColor,
}) => {
  const [prezzo, setPrezzoP] = useState(null);
  const [limitiSalvataggi, setLimitiSalvataggi] = useState(null);
  const [limitiAddestramenti, setLimitiAddestramenti] = useState(null);
  const [giorniRestanti, setGiorniRestanti] = useState(null);

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
        setPrezzoP(jsonData.prezzo);
        setLimitiSalvataggi(jsonData.limitiSalvataggi);
        setLimitiAddestramenti(jsonData.limitiAddestramenti);
        setGiorniRestanti(jsonData.giorniRestanti);
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

  return (
    <div
      className="card"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="card-header">
        <h2>Il tuo </h2>
        <h2 className="tpblu">Piano</h2>
      </div>
      <div className="price">
        {prezzo !== null && (
          <p className="text-price">
            €
            {prezzo}
          </p>
        )}
        <p className="text-period">/Mese</p>
      </div>
      <p className="GiorniRestanti">
        (
        {giorniRestanti}
        {' '}
        giorni rimanenti )
      </p>
      <ul className="phrase-list">
        <li className="phrase-item">
          <img src={circleIcon} alt="circleCheck" />
          <span className="phrase-text">NO Pubblicità</span>
        </li>
        <li className="phrase-item">
          <img src={circleIcon} alt="circleCheck" />
          <span className="phrase-text">
            {limitiAddestramenti}
            {' '}
            addestramenti giornalieri
          </span>
        </li>
        <li className="phrase-item">
          <img src={circleIcon} alt="circleCheck" />
          <span className="phrase-text">
            {limitiSalvataggi}
            {' '}
            salvataggi in memoria
          </span>
        </li>
        <li className="phrase-item">
          <img src={circleIcon} alt="circleCheck" />
          <span className="phrase-text">
            Salvataggio parametri e metriche degli addestramenti
          </span>
        </li>
      </ul>
    </div>
  );
};

export default CardPianoEnterprise;
