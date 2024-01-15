import React, { useState, useEffect } from 'react';
import { ProgressBar, Step } from 'react-step-progress-bar';
import { Button } from 'baseui/button';
import { useNavigate } from 'react-router-dom';
import '../styles/MultiStepProgressBar.css';
import { SnackbarElement } from 'baseui/snackbar';
import { Select } from 'baseui/select';
import Navbar from '../components/Navbar';
import '../styles/LoginSignupForm.css';
import '../styles/Fairness.css';

const Fairness = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [value, setValue] = React.useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [option, setOption] = React.useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    async function funzioneVerifica() {
      try {
        const verifica = await fetch('http://localhost:5000/verificaLogin', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
        });
        const response = await verifica.json();

        if (!response.user) {
          navigate('/login');
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Errore durante la verifica del login:', error);
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
  }, [showSnackbar, navigate]);

  useEffect(() => {
    async function recuperoAttributiDataset() {
      try {
        const res = await fetch('http://localhost:5000/gruppoPrivilegiato', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
        });
        const response = await res.json();

        if (res.ok) {
          // Trasforma l'array di stringhe in un array di oggetti con le chiavi label e value
          setOption(response.data.map((item) => ({ id: item, label: item })));
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Errore durante la verifica del login:', error);
      }
    }
    recuperoAttributiDataset();
  }, []);

  const avvioAddestramento = async () => {
    try {
      const res = await fetch('http://localhost:5000/avvioAddestramento', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          gruppoPrivilegiato: value,
        }),
      });
      const response = await res.json();
      alert(response.addestramento);

      if (res.ok) {
        navigate('/fine-addestramento');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Errore durante avvio addestramento:', error);
    }
  };

  return (
    <>
      <div className="header">
        <Navbar />
      </div>
      <div className="progress">
        <ProgressBar percent={66.6667}>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? 'accomplished' : null
                }`}
              >
                <div className="stepContent">
                  <div className="stepNumber1">{index + 1}</div>
                  <div className="progressText">Caricamento del dataset</div>
                </div>
              </div>
            )}
          </Step>

          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? 'accomplished' : null
                }`}
              >
                <div className="stepContent">
                  <div className="stepNumber2">{index + 1}</div>
                  <div className="progressText">Selezione parametri</div>
                </div>
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? 'accomplished' : null
                }`}
              >
                <div className="stepContent">
                  <div className="stepNumber3">{index + 1}</div>
                  <div className="progressText">Fairness & Sostenibilità</div>
                </div>
              </div>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? 'accomplished' : null
                }`}
              >
                <div className="stepContent">
                  <div className="stepNumber4">{index + 1}</div>
                  <div className="progressText">Addestramento modello</div>
                </div>
              </div>
            )}
          </Step>
        </ProgressBar>
      </div>
      <div className="containerForm">
        <div className="fairnessForm">
          <div className="title">Parametri Fairness</div>
          <div className="fairnessForm">
            <h1>Gruppo Privilegiato</h1>
            <Select
              options={option}
              value={value}
              multi
              placeholder="Seleziona un attributo"
              onChange={(params) => setValue(params.value)}
            />
          </div>
        </div>
        <div className="buttons">
          <Button
            className="buttonIndetro"
            onClick={() => {
              navigate('');
            }}
          >
            Indietro
          </Button>
          <Button className="buttonAvanti" onClick={avvioAddestramento}>
            Avanti
          </Button>
        </div>
        {showSnackbar && (
          <div className="snackBar">
            <SnackbarElement
              message={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <div className="snackBarMessage">{snackbarMessage}</div>
              }
              focus={false}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Fairness;
