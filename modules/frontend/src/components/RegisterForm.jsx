import React, { useState } from 'react';
import '../styles/LoginSignupForm.css';
import { Input } from 'baseui/input';
import { Button, SIZE } from 'baseui/button';

const RegisterForm = ({ onSubmit }) => {
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [emailr, setEmailr] = useState('');
  const [passwordr, setPasswordr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitR = async () => {
    setIsLoading(true);
    const response = await fetch('http://localhost:5000/register', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        nome,
        cognome,
        emailr,
        passwordr,
      }),
    });

    setIsLoading(false);
    if (!response.ok) {
      alert('Parametri errati');
      return;
    }

    const data = await response.json();
    alert(JSON.stringify(data));
  };

  return (
    <div className="login">
      <div className="nome">
        <Input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          clearable
          type="text"
        />
      </div>
      <div className="cognome">
        <Input
          value={cognome}
          onChange={(e) => setCognome(e.target.value)}
          placeholder="Cognome"
          clearable
          type="text"
        />
      </div>
      <div className="emailr">
        <Input
          value={emailr}
          onChange={(e) => setEmailr(e.target.value)}
          placeholder="mario@rossi.it"
          clearable
          type="email"
        />
      </div>
      <div className="passwordr">
        <Input
          value={passwordr}
          onChange={(e) => setPasswordr(e.target.value)}
          placeholder="password"
          clearable
          type="password"
        />
      </div>
      <div className="buttonsgupin">
        <Button isLoading={isLoading} onClick={handleSubmitR} size={SIZE.large}>
          Registrati
        </Button>
      </div>
    </div>
  );
};
RegisterForm.propTypes = {
  onSubmit: () => {},
};

export default RegisterForm;
