import React, { useState, useEffect } from 'react';
import { FileUploader } from 'baseui/file-uploader';
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
              options={[
                {
                  label: 'AliceBlue',
                  id: '#F0F8FF',
                },
                {
                  label: 'AntiqueWhite',
                  id: '#FAEBD7',
                },
                {
                  label: 'Aqua',
                  id: '#00FFFF',
                },
                {
                  label: 'Aquamarine',
                  id: '#7FFFD4',
                },
                {
                  label: 'Azure',
                  id: '#F0FFFF',
                },
                {
                  label: 'Beige',
                  id: '#F5F5DC',
                },
              ]}
              value={value}
              multi
              required
              placeholder="Gruppo privilegiato"
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
          <Button
            className="buttonAvanti"
            onClick={() => {
              navigate('');
            }}
          >
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
