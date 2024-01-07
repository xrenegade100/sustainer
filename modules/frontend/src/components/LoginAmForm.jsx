import '../styles/LoginAmForm.css';
import { SnackbarElement } from 'baseui/snackbar';
import React, { useEffect, useState } from 'react';
import { useStyletron } from 'baseui';
import { useNavigate } from 'react-router-dom';
import { Input } from 'baseui/input';
import { Button, SIZE } from 'baseui/button';

const LoginAmForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [css] = useStyletron();
  const navigate = useNavigate();

  useEffect(() => {
    async function funzioneVerifica() {
      const verifica = await fetch('http://localhost:5000/verificaLoginAm', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
      });
      const response = await verifica.json();

      if (response.admin_id) {
        navigate('/homepage');
      }
    }
    funzioneVerifica();
    let timer;
    if (showSnackbar) {
      timer = setTimeout(() => {
        setShowSnackbar(false);
      }, 3500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [navigate, showSnackbar]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await fetch('http://localhost:5000/loginAm', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    setIsLoading(false);
    if (!response.ok) {
      setSnackbarMessage('Credenziali errate');
      setShowSnackbar(true);
      setIsLoading(false);
      return;
    }
    navigate('/homepage');
  };

  return (
    <div className="formAM">
      <div className="cardLoginAM">
        <div className="form-headerAM">
          <span className="form-header-titleAM">Accedi Amministratore</span>
        </div>
        <div className="form-bodyAM">
          <div className="emailAM">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mario@rossi.it"
              clearable
              type="email"
            />
          </div>
          <div className="passwordAM">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              clearable
              type="password"
            />
          </div>
          <div className="buttonloginAM">
            <Button
              isLoading={isLoading}
              onClick={handleSubmit}
              size={SIZE.large}
            >
              Accedi
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
                      top: '20px',
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="img">
        <img className="img-file" src="/login_bg.png" alt="" />
      </div>
    </div>
  );
};

export default LoginAmForm;
