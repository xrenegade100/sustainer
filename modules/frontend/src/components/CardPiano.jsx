/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import '../styles/CardPiano.css';
import { Button, SIZE } from 'baseui/button';
import { loadStripe } from '@stripe/stripe-js';
import { SnackbarElement } from 'baseui/snackbar';
import { useStyletron } from 'baseui';

const Card = ({
  title,
  subtitle,
  price,
  phrases,
  bgColor,
  circleIcon,
  textColor,
  bgColorButton,
  textColorButton,
  buttonText,
  idPlan,
  loggato,
  giorniRestanti,
  attivo,
  annullato,
}) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [css] = useStyletron();

  const fetchCheckout = async (titolo, prezzo, idPianoF) => {
    try {
      await loadStripe(
        'pk_test_51OURU6DecXgXrLSFmXl0Zo7y1yCQzOVyQUZ5ew1trbRBrh9oHv93n73XitLXt6zt47wZL4yKWSjJ7m8wnKdEPg9B00Q0FdvOLx',
      );
      const response = await fetch('http://localhost:5000/checkout', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          titoloPiano: titolo,
          prezzoPiano: prezzo,
          idPiano: idPianoF,
        }),
      });
      const session = await response.json();
      window.location.replace(session.checkoutUrl);
    } catch (error) {
      console.error('Errore durante la fetch:', error);
    }
  };

  const fetchAnnullaPiano = async () => {
    try {
      const response = await fetch('http://localhost:5000/annullaPiano', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
      });
      const result = await response.json();
      if (result.status === 'success') {
        window.location.replace('/piani');
      }
    } catch (error) {
      console.error('Errore durante la fetch:', error);
    }
  };

  function options() {
    const handleAnnullaClick = async () => {
      setSnackbarMessage('Piano annullato con successo...');
      setShowSnackbar(true);
      setTimeout(() => {
        fetchAnnullaPiano();
        setShowSnackbar(false);
      }, 1500);
    };

    if (loggato) {
      fetchCheckout(title, price, idPlan);
    } else if (annullato) {
      handleAnnullaClick();
    } else {
      window.location.replace('/login');
    }
  }
  return (
    <div
      className="card"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <h2 className="title-card">{title}</h2>
      <h4 className="subtitle-card">{subtitle}</h4>
      <div className="price">
        <p className="text-price">€{price}</p>
        <p className="text-period">/Mese</p>
      </div>
      {giorniRestanti > 0 ? (
        <p className="GiorniRestanti">({giorniRestanti} giorni rimanenti )</p>
      ) : giorniRestanti === 0 ? (
        <p className="GiorniRestanti">scade oggi!</p>
      ) : null}
      {attivo ? (
        // eslint-disable-next-line react/jsx-one-expression-per-line
        <p className="attivo">{attivo} al rinnovo automatico </p>
      ) : null}
      {attivo === 'non attivo' ? null : idPlan === 1 ? null : (
        <Button
          style={{ backgroundColor: bgColorButton, color: textColorButton }}
          size={SIZE.large}
          onClick={() => [options()]}
        >
          {buttonText}
        </Button>
      )}
      {showSnackbar && (
        <div className={css({ position: 'relative' })}>
          <SnackbarElement
            message={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <div
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                })}
              >
                {snackbarMessage}
              </div>
            }
            focus={false}
            overrides={{
              Root: {
                style: {
                  position: 'absolute',
                },
              },
            }}
          />
        </div>
      )}
      <ul className="phrase-list">
        {phrases?.map((phrase, index) => (
          <li key={index} className="phrase-item">
            <img src={circleIcon} alt="circleCheck" />
            <span className="phrase-text">{phrase}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
