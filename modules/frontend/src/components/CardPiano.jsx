/* eslint-disable react/function-component-definition */
import React from 'react';
import '../styles/CardPiano.css';
import { Button, SIZE } from 'baseui/button';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

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

function options(title, price, idPlan, loggato, annullato) {
  if (loggato) {
    fetchCheckout(title, price, idPlan);
  } else if (annullato) {
    alert('piano annullato');
    fetchAnnullaPiano();
  } else {
    window.location.replace('/login');
  }
}

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
}) => (
  <div className="card" style={{ backgroundColor: bgColor, color: textColor }}>
    <h2 className="title-card">{title}</h2>
    <h4 className="subtitle-card">{subtitle}</h4>
    <div className="price">
      <p className="text-price">€{price}</p>
      <p className="text-period">/Mese</p>
    </div>
    {giorniRestanti > 0 ? (
      // eslint-disable-next-line react/jsx-one-expression-per-line
      <p className="GiorniRestanti">({giorniRestanti} giorni rimanenti )</p>
    ) : null}
    {attivo ? (
      // eslint-disable-next-line react/jsx-one-expression-per-line
      <p className="attivo">{attivo} al rinnovo automatico </p>
    ) : null}
    <Button
      style={{ backgroundColor: bgColorButton, color: textColorButton }}
      size={SIZE.large}
      onClick={() => [options(title, price, idPlan, loggato, annullato)]}
    >
      {buttonText}
    </Button>

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

export default Card;
