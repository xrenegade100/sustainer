import React, { useState, useEffect } from 'react';
import { ProgressBar, Step } from 'react-step-progress-bar';
import { Button } from 'baseui/button';
import { useNavigate } from 'react-router-dom';
import '../styles/MultiStepProgressBar.css';
import { SnackbarElement } from 'baseui/snackbar';
import { ProgressBar as ProgressBarLoad } from 'baseui/progress-bar';
import Navbar from '../components/Navbar';
import '../styles/FineAddestramento.css';

const FineAddestramento = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isNotReady, setIsNotReady] = useState(true);

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

  return (
    <>
      <div className="header">
        <Navbar />
      </div>
      <div className="progress">
        <ProgressBar percent={100}>
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
                  <div className="progressText">Fairness & Sostenibilità </div>
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
      <div className="allForm">
        <div className="uploadForm">
          <div className="title">
            <span className="titoloAlto">Addestramento modello</span>
            <div className="loadingSection">
              <ProgressBarLoad
                infinite={isNotReady}
                value={isNotReady ? 0 : 100}
                // eslint-disable-next-line react/jsx-props-no-multi-spaces, no-confusing-arrow
                getProgressLabel={
                  // eslint-disable-next-line no-confusing-arrow
                  () =>
                    // eslint-disable-next-line implicit-arrow-linebreak
                    isNotReady
                      ? 'Addestramento in corso'
                      : 'Addestramento completato'
                  // eslint-disable-next-line react/jsx-curly-newline
                }
                showLabel
              />
            </div>
            <div className="bottoniModello">
              <div className="bottoneColorato">
                <Button
                  className="modelButton"
                  disabled={isNotReady}
                  onClick={() => {
                    navigate('');
                  }}
                >
                  Scarica modello
                </Button>
              </div>
              <div className="bottoneColorato">
                <Button
                  className="modelButton"
                  disabled
                  onClick={() => {
                    navigate('');
                  }}
                >
                  Salva modello
                </Button>
              </div>
            </div>
          </div>
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

export default FineAddestramento;
