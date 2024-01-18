/* eslint-disable react/prop-types */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, SIZE } from 'baseui/button';
import { loadStripe } from '@stripe/stripe-js';

const CardPreventivo = ({
  titolo,
  bgColor,
  circleIcon,
  textColor,
}) => {
  const [prezzoP, setPrezzoP] = useState(null);
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
        setPrezzoP(jsonData.prezzo);
        setLimitiSalvataggi(jsonData.limitiSalvataggi);
        setLimitiAddestramenti(jsonData.limitiAddestramenti);
      } catch (error) {
        console.error('Errore durante il recupero dei dati:', error.message);
      }
    };
    fetchDataPreventivo();
  }, []);

  const handleBuyClick = async (title) => {
    try {
      await loadStripe(
        'pk_test_51OURU6DecXgXrLSFmXl0Zo7y1yCQzOVyQUZ5ew1trbRBrh9oHv93n73XitLXt6zt47wZL4yKWSjJ7m8wnKdEPg9B00Q0FdvOLx',
      );
      const response = await fetch('http://localhost:5000/checkoutEnterprise', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          titoloPiano: title,
          prezzoPiano: prezzoP,
          limSPiano: limitiSalvataggi,
          limAPiano: limitiAddestramenti,
        }),
      });
      const session = await response.json();
      if (session) {
        window.location.replace(session.checkoutUrl);
      }
    } catch (error) {
      console.error('Errore durante la fetch:', error);
    }
  };

  const handleNotBuyClick = async () => {
    try {
      await fetch('http://localhost:5000/eliminaPreventivo', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Errore durante la fetch:', error);
    }
  };

  return (
    <>
      <div className="cardPreventivo">
        <div
          className="card"
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          <div className="card-header">
            <h2>Il tuo Preventivo</h2>
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
      </div>
      <div className="buttonPE">
        <Button
          className="btnback"
          // eslint-disable-next-line max-len
          onClick={() => [handleNotBuyClick(), window.location.replace('/modifica-piano')]}
        >
          Rifiuta
        </Button>
        <Button
          className="btnnext"
          // eslint-disable-next-line max-len
          onClick={() => handleBuyClick(titolo)}
          size={SIZE.large}
        >
          Acquista
        </Button>
      </div>

    </>
  );
};

export default CardPreventivo;
