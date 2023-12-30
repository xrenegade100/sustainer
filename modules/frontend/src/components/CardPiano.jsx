/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import '../styles/CardPiano.css';
import { Button, SIZE } from 'baseui/button';

const Card = ({ title, subtitle, text, phrases, bgColor, circleIcon }) => {
  const [email, setEmail] = useState('');

  /* const checkEmail = async () => {
    const response = await fetch('http://localhost:5000/trov aUtente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const content = await response.json();
    const { user } = content;

    alert('User: ' + user.email);
    //const data = await response.json();

    if (data.exists) {
      alert('Email exists in the database');
    } else {
      alert('Email does not exist in the database');
    }
  }; */

  return (
    <div className="card" style={{ backgroundColor: bgColor }}>
      <h2 className="title-card">{title}</h2>
      <h4 className="subtitle">{subtitle}</h4>
      <p className="text">{text}</p>
      <Button size={SIZE.large}>Acquista</Button>
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
