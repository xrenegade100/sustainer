/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';

const Form = () => {
  const [email, setEmail] = useState('');

  const checkEmail = async () => {
    const response = await fetch('http://localhost:5000/trovaUtente', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    
    if (data.exists) {
      alert('Email exists in the database');
    } else {
      alert('Email does not exist in the database');
    }

    alert(response);
  };



  return (
    <div>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <Button onClick={checkEmail}>Trova Utente</Button>
    </div>
  );
};

export default Form;