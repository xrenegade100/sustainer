import React, { useEffect, useState } from 'react';
import '../styles/LoginSignupForm.css';
import { useStyletron } from 'baseui';
import { Input } from 'baseui/input';
import { Button, SIZE } from 'baseui/button';
import SHA256 from 'crypto-js/sha256';
import { SnackbarElement } from 'baseui/snackbar';

const RegisterForm = () => {
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [emailr, setEmailr] = useState('');
  const [passwordr, setPasswordr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [css] = useStyletron();

  // metodo per la snackbar
  useEffect(() => {
    let timer;
    if (showSnackbar) {
      timer = setTimeout(() => {
        setShowSnackbar(false);
      }, 3500); // 3500ms = 3.5s
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showSnackbar]);

  const handleSubmitR = async () => {
    setIsLoading(true);
    const nomeRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s']{1,100}$/;
    if (!nomeRegex.test(nome)) {
      setSnackbarMessage(
        'Il nome deve contenere solo lettere, non deve essere vuoto e non deve superare i 100 caratteri',
      );
      setShowSnackbar(true);
      setIsLoading(false);
      return;
    }
    const cognomeRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s']{1,100}$/;
    if (!cognomeRegex.test(cognome)) {
      setSnackbarMessage(
        'Il cognome deve contenere solo lettere, non deve essere vuoto e non deve superare i 100 caratteri',
      );
      setShowSnackbar(true);
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,319}$/;
    if (!emailRegex.test(emailr)) {
      setSnackbarMessage(
        'Email non rispetta il formato corretto (es. mario@rossi.it)',
      );
      setShowSnackbar(true);
      setIsLoading(false);
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])[A-Za-z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-]{8,64}$/;
    if (!passwordRegex.test(passwordr)) {
      setSnackbarMessage(
        'La password deve contenere almeno 8 caratteri tra cui: 1 lettera maisucola 1 carattere speciale',
      );
      setShowSnackbar(true);
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
      setSnackbarMessage('Utente già esistente, procedere con login!');
      setShowSnackbar(true);
      setIsLoading(false);
      return;
    }

    const data = await response.json();
    if (data) {
      setSnackbarMessage(
        'Registrazione avvenuta con successo, torna alla login per accedere!',
      );
      setShowSnackbar(true);
      setIsLoading(false);
      setNome('');
      setCognome('');
      setEmailr('');
      setPasswordr('');
    }
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
      {showSnackbar && (
        <div className={css({ position: 'relative' })}>
          <SnackbarElement
            message={(
              <div
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                })}
              >
                {snackbarMessage}
              </div>
            )}
            focus={false}
            overrides={{
              Root: {
                style: {
                  position: 'absolute',
                  top: '20px', // Sposta la Snackbar di 50px verso il basso
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};
RegisterForm.propTypes = {};

export default RegisterForm;
