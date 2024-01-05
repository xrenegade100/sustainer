/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import '../styles/CardPiano.css';
import { Button, SIZE } from 'baseui/button';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

const fetchCheckout = async (titolo, prezzo, idPiano) => {
  try {
    const stripe = await loadStripe(
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
        idPiano: idPiano,
      }),
    });
    const session = await response.json();
    window.location.replace(session.checkoutUrl);
  } catch (error) {
    console.error('Errore durante la fetch:', error);
  }
};

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
}) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const redirect = async () => {
    navigate('/login');
  };

  return (
    <div
      className="card"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <h2 className="title-card">{title}</h2>
      <h4 className="subtitle-card">{subtitle}</h4>
      <div className="price">
        <p className="text-price">{price}</p>
        <p className="text-period">/Mese</p>
      </div>
      <Button
        style={{ backgroundColor: bgColorButton, color: textColorButton }}
        size={SIZE.large}
        onClick={
          loggato ? () => [fetchCheckout(title, price, idPlan)] : redirect
        }
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
};

export default Card;
