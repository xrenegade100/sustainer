import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, SIZE } from 'baseui/button';
import { ProgressBar, Step } from 'react-step-progress-bar';
import FormEnterprise from './FormEnterprise'; // Importa la componente FormEnterprise
import '../styles/ProgressEnterprise.css';

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

  const handleNextClick = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

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
      {currentStep === 1 && (
        <div className="formlimiti">
          <FormEnterprise />
        </div>
      )}

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
    </>
  );
};

ProgressEnterprise.propTypes = {
  onPageNumberClick: PropTypes.func.isRequired,
};

export default ProgressEnterprise;
