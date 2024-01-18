import React from 'react';
import '../styles/InserimentoParametri.css';
import { ProgressBar, Step } from 'react-step-progress-bar';
import Navbar from '../components/Navbar';
import InserimentoParametriForm from '../components/InserimentoParametriForm';

const InserimentoParametri = () => (
  <div className="bodypar">
    <div>
      <Navbar />
    </div>
    <div className="progress">
      <ProgressBar percent={35}>
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
            >
              <div className="stepContent">
                <div className="stepNumber1">{index + 1}</div>
                <div className="progressText">Caricamento del dataset</div>
              </div>
            </div>
          )}
        </Step>

        {/* Rimuovi il primo Step e aggiungi il secondo Step come primo elemento */}
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
            >
              <div className="stepContent">
                <div className="stepNumber2">{index + 1}</div>
                <div className="progressText">Selezione parametri</div>
              </div>
            </div>
          )}
        </Step>

        {/* Mantieni gli altri Step come erano */}
        <Step>
          {({ accomplished, index }) => (
            <div
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
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
              className={`indexedStep ${accomplished ? 'accomplished' : null}`}
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
    <div>
      <InserimentoParametriForm className="formoo" />
    </div>
  </div>
);
export default InserimentoParametri;
