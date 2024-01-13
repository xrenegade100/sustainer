import React, { useState, useEffect } from 'react';
import { FileUploader } from 'baseui/file-uploader';
import { ProgressBar, Step } from 'react-step-progress-bar';
import { Button } from 'baseui/button';
import { useNavigate } from 'react-router-dom';
import '../styles/MultiStepProgressBar.css';
import { SnackbarElement } from 'baseui/snackbar';
import fileIconImage from '../assets/csvIcon.png';
import Navbar from '../components/Navbar';
import '../styles/LoginSignupForm.css';
import '../styles/CaricaDataset.css';

const CaricaDataset = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
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

  const useInterval = async (callback, delay) => {
    const savedCallback = React.useRef(() => {});

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
      return () => {};
    }, [delay]);
  };
  const handleDeleteFile = () => {
    setFileUploaded(false);
    setUploadedFile(null);
  };

  const useFakeProgress = () => {
    const [fakeProgress, setFakeProgress] = React.useState(0);
    const [isActive, setIsActive] = React.useState(false);

    const stopFakeProgress = () => {
      setIsActive(false);
      setFakeProgress(0);
    };

    const startFakeProgress = () => {
      setIsActive(true);
    };

    useInterval(
      () => {
        if (fakeProgress >= 100) {
          stopFakeProgress();
          setFileUploaded(true);
        } else {
          setFakeProgress(fakeProgress + 10);
        }
      },
      isActive ? 500 : null,
    );

    return [fakeProgress, startFakeProgress, stopFakeProgress];
  };
  // eslint-disable-next-line operator-linebreak
  const [progressAmount, startFakeProgress, stopFakeProgress] =
    useFakeProgress();
  const handleUploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      // Gestisci la risposta dal server come necessario
      if (response.ok) {
        setSnackbarMessage('File caricato con successo');
        setShowSnackbar(true);
        navigate('/inserimentoparametri');
      } else if (response.status === 400) {
        setSnackbarMessage('Errore: il contenuto del file non è valido');
        setShowSnackbar(true);
      } else {
        setSnackbarMessage('Errore: puoi caricare solo file .csv');
        setShowSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage(
        'Errore durante la richiesta di caricamento del file',
        error,
      );
      setShowSnackbar(true);
    }
  };
  return (
    <>
      <div className="header">
        <Navbar />
      </div>
      <div className="progress">
        <ProgressBar percent={0}>
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
      <div className="allForm">
        <div className="uploadForm">
          <div className="title">Carica il tuo Dataset</div>
          <div className="uploader">
            {fileUploaded && (
              <div className="file-info">
                <div className="file-icon">
                  <img
                    src={fileIconImage}
                    alt="File Icon"
                    className="file-icon-image"
                  />
                  <span>{uploadedFile.name}</span>
                </div>
                <button
                  type="button"
                  className="eliminaButton"
                  onClick={handleDeleteFile}
                  kind="secondary"
                >
                  Elimina File
                </button>
              </div>
            )}
            {!fileUploaded && (
              <FileUploader
                onCancel={() => {
                  stopFakeProgress();
                  setFileUploaded(false);
                  setUploadedFile(null); // Cancella le informazioni sul file caricato
                }}
                onDrop={(acceptedFiles, rejectedFiles) => {
                  // gestisci il caricamento del file...
                  console.log(acceptedFiles, rejectedFiles);
                  startFakeProgress();
                  setUploadedFile(acceptedFiles[0]); // Salva le informazioni sul file caricato
                }}
                progressAmount={progressAmount}
                progressMessage={
                  progressAmount
                    ? `Caricamento... ${progressAmount}% di 100%`
                    : ''
                }
                overrides={{
                  FileDragAndDrop: {
                    content:
                      'Trascina e rilascia il file o clicca qui per selezionare un file',
                  },
                }}
              />
            )}
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
        <Button
          className="avantiButton"
          disabled={!fileUploaded}
          onClick={() => {
            handleUploadFile();
            navigate('');
          }}
        >
          Avanti
        </Button>
      </div>
    </>
  );
};

export default CaricaDataset;
