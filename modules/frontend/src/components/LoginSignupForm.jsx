import { SnackbarElement } from 'baseui/snackbar';
import React, { useEffect, useState } from 'react';
import { useStyletron } from 'baseui';
import '../styles/LoginSignupForm.css';
import { useNavigate } from 'react-router-dom';
import { Tabs, Tab, FILL } from 'baseui/tabs-motion';
import { Checkbox, STYLE_TYPE, LABEL_PLACEMENT } from 'baseui/checkbox';
import { Input } from 'baseui/input';
import { Button, SIZE } from 'baseui/button';
import SHA256 from 'crypto-js/sha256';
import RegisterForm from './RegisterForm';

const LoginTab = ({ setHeaderTitle }) => {
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [css] = useStyletron();

  //metodo per la snackbar
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

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLoading(true);

    const hashValue = SHA256(password).toString();

    const response = await fetch('http://localhost:5000/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        password: hashValue,
      }),
    });

    setIsLoading(false);
    if (!response.ok) {
      setSnackbarMessage('credenziali errate');
      setShowSnackbar(true);
      setIsLoading(false);
      return;
    }

    const data = await response.json();
    // alert(JSON.stringify(data));
    alert(data.authenticated);
    navigate('/homepage');
  };

  setHeaderTitle('Accedi a Sustainer');

  return (
    <div className="login">
      <Checkbox
        checked={checked}
        checkmarkType={STYLE_TYPE.toggle_round}
        onChange={(e) => setChecked(e.target.checked)}
        labelPlacement={LABEL_PLACEMENT.right}
        overrides={{
          Toggle: {
            style: () => ({
              backgroundColor: checked ? '#2467d1' : '#fff',
            }),
          },
        }}
      >
        Amministratore
      </Checkbox>
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
      <Checkbox
        checked={remember}
        checkmarkType={STYLE_TYPE.toggle_round}
        onChange={(e) => setRemember(e.target.checked)}
        labelPlacement={LABEL_PLACEMENT.right}
        overrides={{
          Toggle: {
            style: () => ({
              backgroundColor: remember ? '#2467d1' : '#fff',
            }),
          },
        }}
      >
        Ricordami
      </Checkbox>
      <div className="buttonsgupin">
        <Button isLoading={isLoading} onClick={handleSubmit} size={SIZE.large}>
          ACCEDI
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

const RegisterTab = ({ setHeaderTitle }) => {
  setHeaderTitle('Registrati a Sustainer');

  return (
    <div className="reg">
      <RegisterForm />
    </div>
  );
};

const LoginSignupForm = () => {
  const [activeKey, setActiveKey] = useState('0');
  const [headerTitle, setHeaderTitle] = useState('Accedi a Sustainer');

  return (
    <div className="form">
      <div className="card">
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
            }}
          >
            <Tab title="Accedi">
              <LoginTab setHeaderTitle={setHeaderTitle} />
            </Tab>
            <Tab title="Registrati">
              <RegisterTab setHeaderTitle={setHeaderTitle} />
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
