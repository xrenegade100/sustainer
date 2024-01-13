/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, SIZE } from 'baseui/button';
import { ProgressBar, Step } from 'react-step-progress-bar';
import { Input } from 'baseui/input';
import '../styles/ProgressEnterprise.css';
import CardLoadingPrev from './CardLoadingPrev';
import CardPreventivo from './CardPreventivo';

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
  const [limitiAddestramenti, setLimiteAddestramenti] = useState('');
  const [limitiSalvataggi, setLimiteSalvataggi] = useState('');
  const navigate = useNavigate();

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
          const data = await response.json();
          console.log('Risposta dal backend:', data);
        } else {
          console.error('Errore nella richiesta al backend:', response.statusText);
        }
      } catch (error) {
        console.error('Errore nella fetch:', error);
      }
    }
  };

  funzioneVerificaPrev();

  const handleNextClick = async () => {
    if (currentStep === 1) {
      if (limitiAddestramenti && limitiSalvataggi) {
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
          } else {
            console.error('Errore nella richiesta al backend:', response.statusText);
          }
        } catch (error) {
          console.error('Errore nella fetch:', error);
        }
      }
    }
  };

  const handlePrevClick = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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

  const handleBuyClick = async (prezzo) => {
    try {
      await loadStripe(
        'pk_test_51OURU6DecXgXrLSFmXl0Zo7y1yCQzOVyQUZ5ew1trbRBrh9oHv93n73XitLXt6zt47wZL4yKWSjJ7m8wnKdEPg9B00Q0FdvOLx',
      );
      const response = await fetch('http://localhost:5000/checkoutEnterprise', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          titoloPiano: 'Enterprise',
          prezzoPiano: prezzo,
        }),
      });
      const session = await response.json();
      window.location.replace(session.checkoutUrl);
    } catch (error) {
      console.error('Errore durante la fetch:', error);
    }
  };

  const handleNotBuyClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/eliminaPreventivo', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
      });
      const result = await response.json();
      if (result.status === 'success') {
        window.location.replace('/modifica-piani');
      }
    } catch (error) {
      console.error('Errore durante la fetch:', error);
    }
  };

  const getStepPercentage = () => {
    switch (currentStep) {
      case 1:
        return 0;
      case 2:
        return 35;
      case 3:
        return 70;
      case 4:
        return 100;
      default:
        return 0;
    }
  };

  return (
    <>
      <ProgressBar percent={getStepPercentage()}>
        {[1, 2, 3, 4].map((pageNumber, index) => (
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
                  onChange={(e) => setLimiteAddestramenti(e.target.value)}
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
                    onChange={(e) => setLimiteSalvataggi(e.target.value)}
                    placeholder="10"
                    clearable
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="buttonPE">
            <Button
              className="btnback"
              onClick={handlePrevClick}
              size={SIZE.large}
            >
              Indietro
            </Button>
            <Button
              className="btnnext"
              onClick={handleNextClick}
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
        <div className="cardPreventivo">
          <CardPreventivo />
          <div className="buttonPE">
            <Button
              className="btnnext"
              // eslint-disable-next-line max-len
              onClick={handleBuyClick} // creare metodo che rendirizza a stripe e aumentare currentstep che va a 4
              size={SIZE.large}
            >
              Acquista
            </Button>
            <Button
              className="btnnext"
              // eslint-disable-next-line max-len
              onClick={handleNotBuyClick} // creare metodo che rendirizza a stripe e aumentare currentstep che va a 4
              size={SIZE.large}
            >
              Rifiuta
            </Button>
          </div>
        </div>
      ) : (
        <div className="cardPianoE">
          <CardPianoEnterprise />
          <div className="buttonPE">
            <Button
              className="btnnext"
              onClick={handleAddClick} // creare metodo che rendirizza a pagina addestramento
              size={SIZE.large}
            >
              Addestra
            </Button>
          </div>
        </div>
      )}

      {/* <div className="buttonPE">
        <Button
          className="btnback"
          onClick={handlePrevClick}
          size={SIZE.large}
        >
          Indietro
        </Button>
        <Button
          className="btnnext"
          onClick={handleNextClick}
          size={SIZE.large}
        >
          Avanti
        </Button>
      </div> */}
    </>
  );
};

ProgressEnterprise.propTypes = {
  onPageNumberClick: PropTypes.func.isRequired,
};

export default ProgressEnterprise;
