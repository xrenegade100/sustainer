import { SnackbarElement } from 'baseui/snackbar';
import React, { useEffect, useState } from 'react';
import { useStyletron } from 'baseui';
import { useNavigate } from 'react-router-dom';
import { Tabs, Tab, FILL } from 'baseui/tabs-motion';
import { Input } from 'baseui/input';
import { Button, SIZE } from 'baseui/button';
import SHA256 from 'crypto-js/sha256';
import RegisterForm from './RegisterForm';

const LoginSignupForm = () => {
  const [activeKey, setActiveKey] = useState('0');
  const [headerTitle, setHeaderTitle] = useState('Accedi a Sustainer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [css] = useStyletron();
  const navigate = useNavigate();

  // metodo per la snackbar
  useEffect(() => {
    async function funzioneVerifica() {
      const verifica = await fetch('http://localhost:5000/verificaLogin', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
      });
      const response = await verifica.json();
      if (response.user) {
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
  }, [showSnackbar]);

  const handleSubmit = async () => {
    setIsLoading(true);
    const hashValue = SHA256(password).toString();

    const response = await fetch('http://localhost:5000/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email,
        password: hashValue,
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
    <div className="form">
      <div className="cardLogin">
        <div className="form-header">
          <span className="form-header-title">{headerTitle}</span>
        </div>
        <div className="form-body">
          <Tabs
            activeKey={activeKey}
            fill={FILL.fixed}
            overrides={{
              TabBorder: {
                style: () => ({
                  backgroundColor: 'white',
                }),
              },
              TabHighlight: {
                style: () => ({
                  backgroundColor: '#2467d1',
                }),
              },
            }}
            onChange={(val) => {
              setActiveKey(val.activeKey);
              setHeaderTitle(
                val.activeKey === '0'
                  ? 'Accedi a Sustainer'
                  : 'Registrati a Sustainer',
              );
            }}
          >
            <Tab title="Accedi">
              <div className="email">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mario@rossi.it"
                  clearable
                  type="email"
                />
              </div>
              <div className="password">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  clearable
                  type="password"
                />
              </div>
              <div className="buttonsgupin">
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
            </Tab>
            <Tab title="Registrati">
              <div className="reg">
                <RegisterForm />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <div className="img">
        <img className="img-file" src="/login_bg.png" alt="" />
      </div>
    </div>
  );
};

export default LoginSignupForm;
