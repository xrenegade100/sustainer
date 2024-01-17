/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SnackbarElement } from 'baseui/snackbar';
import { useStyletron } from 'baseui';
import PropTypes from 'prop-types';
import { Button, SIZE } from 'baseui/button';
import { ProgressBar, Step } from 'react-step-progress-bar';
import { Input } from 'baseui/input';
import '../styles/ProgressEnterprise.css';
import CardLoadingPrev from './CardLoadingPrev';
import CardPreventivo from './CardPreventivo';
import circleCheck from '../assets/circle_check.svg';

const PageNumber = ({
  accomplished,
  index,
  pageNumber,
  onPageNumberClick,
}) => (
  <button
    type="button"
    className={`indexedStep ${accomplished ? 'accomplished' : null}`}
    onClick={() => onPageNumberClick(pageNumber)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onPageNumberClick(pageNumber);
      }
    }}
  >
    {index + 1}
  </button>
);

PageNumber.propTypes = {
  accomplished: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  onPageNumberClick: PropTypes.func.isRequired,
};

const ProgressEnterprise = ({ onPageNumberClick }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [prezzo, setPrezzo] = useState(null);
  const [limitiAddestramenti, setLimitiAddestramenti] = useState('');
  const [limitiSalvataggi, setLimitiSalvataggi] = useState('');
  const [css] = useStyletron();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    funzioneVerificaPrev();
    funzioneVerificaStato();
    let timer;
    if (showSnackbar) {
      timer = setTimeout(() => {
        setShowSnackbar(false);
      }, 3500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [currentStep], [showSnackbar]);

  const fetchData = async function funzioneVerifica() {
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
  };

  fetchData();

  const funzioneVerificaPrev = async () => {
    if (currentStep === 1) {
      // Esegui la fetch solo quando il form è compilato
      // (puoi aggiungere ulteriori controlli se necessario)
      try {
        const response = await fetch('http://localhost:5000/verificaPreventivo', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
        });

        if (response.ok) {
          setCurrentStep(2);
        } else {
          setCurrentStep(1);
        }
      } catch (error) {
        console.error('Errore nella fetch:', error);
      }
    }
  };

  funzioneVerificaPrev();

  // funzione per verificare se l'utente ha già un piano e se è diverso da enterprise tolta

  const handleNextClick = async () => {
    if (currentStep === 1) {
      if (limitiAddestramenti && limitiSalvataggi) {
        if ((limitiAddestramenti > 2 && limitiAddestramenti <= 10)
        || (limitiSalvataggi > 1 && limitiSalvataggi <= 50)) {
          try {
            const response = await fetch('http://localhost:5000/creaPreventivo', {
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
              credentials: 'include',
              body: JSON.stringify({
                limitiAddestramenti,
                limitiSalvataggi,
              }),
            });
            if (response.ok) {
              const data = await response.json();
              console.log('Risposta dal backend:', data);
              window.location.reload('/richiesta-Enterprise');
            } else {
              console.error('Errore nella richiesta al backend:', response.statusText);
            }
          } catch (error) {
            console.error('Errore nella fetch:', error);
          }
        } else {
          setIsOpen(true);
          setShowSnackbar(true);
          setSnackbarMessage('Inserire valori validi');
        }
      }
    }
  };

  const handlePrevClick = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 1) {
      navigate('/modifica-piano');
    }
  };

  const funzioneVerificaStato = async () => {
    if (currentStep === 2) {
      try {
        const response = await fetch('http://localhost:5000/statoPreventivo', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Risposta ricevuta:', data);
          if (data === 'Accettato') {
            setCurrentStep(3);
          }
        } else {
          console.error('Errore nella richiesta al backend:', response.statusText);
        }
      } catch (error) {
        console.error('Errore nella fetch:', error);
      }
    }
  };

  funzioneVerificaStato();

  const getStepPercentage = () => {
    switch (currentStep) {
      case 1:
        return 0;
      case 2:
        return 50;
      case 3:
        return 100;
      default:
        return 0;
    }
  };

  return (
    <>
      <ProgressBar percent={getStepPercentage()}>
        {[1, 2, 3].map((pageNumber, index) => (
          <Step key={pageNumber}>
            {({ accomplished }) => (
              <PageNumber
                accomplished={accomplished}
                index={index}
                pageNumber={pageNumber}
                onPageNumberClick={onPageNumberClick}
              />
            )}
          </Step>
        ))}
      </ProgressBar>

      {/* Condizionalmente renderizza FormEnterprise solo quando currentStep è 1 */}
      {currentStep === 1 ? (
        <div className="formlimiti">
          <div className="cardForm">
            <div className="cfetitle">
              <h2>Personalizza la tua soluzione</h2>
            </div>
            <div className="cferow1">
              <h3>Numero di addestramenti giornalieri desiderati</h3>
              <div className="nadgg">
                <Input
                  className="nadgginput"
                  value={limitiAddestramenti}
                  onChange={(e) => setLimitiAddestramenti(e.target.value)}
                  placeholder="10"
                  clearable
                  type="number"
                />
              </div>
              <br />
              <br />
              <div className="cferow2">
                <h3>Numero di salvataggi in memoria desiderati</h3>
                <div className="nsvgg">
                  <Input
                    className="nsvgginput"
                    value={limitiSalvataggi}
                    onChange={(e) => setLimitiSalvataggi(e.target.value)}
                    placeholder="10"
                    clearable
                    type="number"
                  />
                </div>
              </div>
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
                      position: 'relative',
                      top: '20px',
                    },
                  },
                }}
              />
            </div>
            )}
          </div>
          <div className="buttonPE">
            <Button
              className="btnback"
              onClick={() => handlePrevClick()}
              size={SIZE.large}
            >
              Indietro
            </Button>
            <Button
              className="btnnext"
              onClick={() => handleNextClick()}
              size={SIZE.large}
            >
              Avanti
            </Button>
          </div>
        </div>
      // eslint-disable-next-line no-nested-ternary
      ) : currentStep === 2 ? (
        <div className="cardLoading">
          <CardLoadingPrev />
        </div>
      ) : currentStep === 3 ? (
        <CardPreventivo
          titolo="Enterprise"
          prezzo={prezzo}
          limitiS={limitiSalvataggi}
          limitiA={limitiAddestramenti}
          bgColor="#2467d1"
          textColor="#FFFFFF"
          circleIcon={circleCheck}
        />
      ) : (null)}
    </>
  );
};

ProgressEnterprise.propTypes = {
  onPageNumberClick: PropTypes.func.isRequired,
};

export default ProgressEnterprise;
