import React, { useEffect, useState } from 'react';
import '../styles/LoginSignupForm.css';
import { useStyletron } from 'baseui';
import { Input } from 'baseui/input';
import { Button, SIZE } from 'baseui/button';
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
      const result = await response.json();
      setSnackbarMessage(result.message);
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
