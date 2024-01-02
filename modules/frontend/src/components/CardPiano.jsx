/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import '../styles/CardPiano.css';
import { Button, SIZE } from 'baseui/button';

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
}) => {
  const [email, setEmail] = useState('');
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
      >
        Acquista
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
