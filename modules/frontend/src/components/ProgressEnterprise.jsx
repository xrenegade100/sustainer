import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, SIZE } from 'baseui/button';
import { ProgressBar, Step } from 'react-step-progress-bar';
import FormEnterprise from './FormEnterprise';
import '../styles/ProgressEnterprise.css';
import CardLoadingPrev from './CardLoadingPrev';

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

const ProgressEnterprise = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNextClick = async () => {
    if (currentStep === 1) {
      try {
        // Esegui la fetch con il tuo modello
        const response = await fetch('http://localhost:5000//creaPreventivo', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(formData), // Assicurati che formData abbia la struttura corretta
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

    // Aumenta il valore di currentStep
    setCurrentStep(currentStep + 1);
  };

  const handlePrevClick = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = (formDataFromChild) => {
    // La funzione di callback passata al FormEnterprise per gestire i dati del form
    setFormData(formDataFromChild);
  };

  return (
    <>
      <ProgressBar percent={currentStep * 50}>
        {[1, 2, 3].map((pageNumber, index) => (
          <Step key={pageNumber}>
            {({ accomplished }) => (
              <PageNumber
                accomplished={accomplished}
                index={index}
                pageNumber={pageNumber}
                onPageNumberClick={(pageNum) => setCurrentStep(pageNum)}
              />
            )}
          </Step>
        ))}
      </ProgressBar>

      {currentStep === 1 ? (
        <div className="formlimiti">
          <FormEnterprise onSubmit={handleFormSubmit} />
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
      ) : (
        <div className="cardLoading">
          <CardLoadingPrev />
        </div>
      )}
    </>
  );
};

export default ProgressEnterprise;
