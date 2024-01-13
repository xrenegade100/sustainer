import * as React from 'react';
import { useEffect, useState } from 'react';

const CardPreventivo = ({
  // eslint-disable-next-line react/prop-types
  circleIcon,
}) => {
  const [prezzo, setPrezzo] = useState(null);
  const [limiteSalvataggi, setLimiteSalvataggi] = useState(null);
  const [limiteAddestramenti, setLimiteAddestramenti] = useState(null);

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
        setLimiteSalvataggi(jsonData.limiteSalvataggi);
        console.log('risposta save', jsonData.limiteSalvataggi);
        setLimiteAddestramenti(jsonData.limiteAddestramenti);
        console.log(jsonData.limiteAddestramenti);
      } catch (error) {
        console.error('Errore durante il recupero dei dati:', error.message);
      }
    };
    fetchDataPreventivo();
  }, []);

  return (
    <div className="card">
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
            Limite salvataggi mensili:
            {limiteSalvataggi}
          </span>
        </li>
        <li className="phrase-item">
          <img src={circleIcon} alt="circleCheck" />
          <span className="phrase-text">
            Limite addestramenti giornalieri:
            {limiteAddestramenti}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default CardPreventivo;
