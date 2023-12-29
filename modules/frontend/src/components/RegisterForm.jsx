import React, { useState } from 'react';
import '../styles/LoginSignupForm.css';
import { Input } from 'baseui/input';
import { Button, SIZE } from 'baseui/button';
import SHA256 from 'crypto-js/sha256';

const RegisterForm = ({ onSubmit }) => {
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [emailr, setEmailr] = useState('');
  const [passwordr, setPasswordr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitR = async () => {
    setIsLoading(true);
    const nomeRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s']{1,100}$/;
    if (!nomeRegex.test(nome)) {
      alert(
        'Il nome deve contenere solo lettere, non deve essere vuoto e non deve superare i 100 caratteri',
      );
      setIsLoading(false);
      return;
    }
    const cognomeRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s']{1,100}$/;
    if (!cognomeRegex.test(cognome)) {
      alert(
        'Il cognome deve contenere solo lettere, non deve essere vuoto e non deve superare i 100 caratteri',
      );
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,319}$/;
    if (!emailRegex.test(emailr)) {
      alert('Email non rispetta il formato corretto (es. mario@rossi.it)');
      setIsLoading(false);
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,64}$/;
    if (!passwordRegex.test(passwordr)) {
      alert(
        'La password deve contenere almeno 8 caratteri tra cui: \n1 lettera maisucola \n1 carattere speciale',
      );
      setIsLoading(false);
      return;
    }

    const hashValue = SHA256(passwordr).toString();

    const response = await fetch('http://localhost:5000/register', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        nome,
        cognome,
        emailr,
        passwordr: hashValue,
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
