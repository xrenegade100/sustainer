import * as React from 'react';
import { useEffect, useState } from 'react';

const CardPreventivo = ({
  // eslint-disable-next-line react/prop-types
  bgColor,
  circleIcon,
  textColor,
}) => {
  const [prezzo, setPrezzo] = useState(null);
  const [limitiSalvataggi, setLimitiSalvataggi] = useState(null);
  const [limitiAddestramenti, setLimitiAddestramenti] = useState(null);

  useEffect(() => {
    const fetchDataPreventivo = async () => {
      try {
        const response = await fetch('http://localhost:5000/preventivoUtente', {
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
        setPrezzo(jsonData.prezzo);
        setLimitiSalvataggi(jsonData.limitiSalvataggi);
        setLimitiAddestramenti(jsonData.limitiAddestramenti);
      } catch (error) {
        console.error('Errore durante il recupero dei dati:', error.message);
      }
    };
    fetchDataPreventivo();
  }, []);

  return (
    <div
      className="card"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="card-header">
        <h2>Il tuo Preventivo</h2>
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
      <ul className="phrase-list">
        <li className="phrase-item">
          <img src={circleIcon} alt="circleCheck" />
          <span className="phrase-text">NO Pubblicità</span>
        </li>
        <li className="phrase-item">
          <img src={circleIcon} alt="circleCheck" />
          <span className="phrase-text">
            {limitiAddestramenti} addestramenti giornalieri
          </span>
        </li>
        <li className="phrase-item">
          <img src={circleIcon} alt="circleCheck" />
          <span className="phrase-text">
            {limitiSalvataggi} salvataggi in memoria
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

export default CardPreventivo;
