import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../styles/ModificaPiano.css';
import Navbar from '../components/Navbar';
import CardPiano from '../components/CardPiano';
import circleCheck from '../assets/circle_check.svg';
import circleCheckWhite from '../assets/circle_check_white.svg';

const ModificaPiano = () => {
  const [utente, setUtente] = useState([]);
  const [data, setData] = useState([]);
  const [pianoUtente, setPianoUtente] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
        navigate('/piani');
      }
    };
    fetchData();
    console.log(data);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/piani', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
          credentials: 'include',
        });
        const result = await response.json();

        setData(result);
      } catch (error) {
        console.error('Errore durante la fetch:', error);
      }
    };
    fetchData();
    console.log(data);
  }, []);

  useEffect(() => {
    const fetchPianoUtente = async () => {
      try {
        const response = await fetch('http://localhost:5000/modificaPiano', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
        });
        const result = await response.json();

        setPianoUtente(result);
      } catch (error) {
        console.error('Errore durante la fetch:', error);
      }
    };
    fetchPianoUtente();
    console.log(pianoUtente);
  }, []);

  const tipi = data.map((piano) => piano.tipo);
  const prezzi = data.map((piano) => piano.prezzo);
  tipi.push('Enterprise');
  console.log(prezzi);

  return (
    <>
      <div className="header">
        <Navbar />
      </div>
      <div className="app2">
        <div className="background-piani">
          <div className="spacer"></div>
          <div className="row2">
            <h1 className="title2">Il Mio Piano Attivo</h1>
          </div>
          <div className="spacer"></div>
          <div className="row2">
            <div className="piani-section2">
              {renderCardBasedOnType(tipi[4])}
              <div className="slider-piani2">
                <div className="slider2">
                  <div className="slide2">
                    {renderCardBasedOnType(tipi[0], prezzi[0])}
                  </div>
                  <div className="slide2">
                    {renderCardBasedOnType(tipi[1], prezzi[1])}
                  </div>
                  <div className="slide2">
                    {renderCardBasedOnType(tipi[2], prezzi[2])}
                  </div>
                  <div className="slide2">
                    {renderCardBasedOnType(tipi[3], prezzi[3])}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="spacer"></div>
        </div>
      </div>
    </>
  );
};

const renderCardBasedOnType = (tipi, prezzi) => {
  const euroValue = `€${prezzi}`;
  console.log(euroValue);
  console.log(prezzi);
  switch (tipi) {
    case 'Free':
      return (
        <CardPiano
          bgColor="#FFFFFF"
          title={tipi}
          subtitle="Piano Free"
          price={euroValue}
          phrases={[
            'SI pubblicità',
            '1 Addestramento al giorno',
            'Nessun salvataggio in memoria',
            'Salvataggio parametri e metrche degli addestramenti',
          ]}
          circleIcon={circleCheckWhite}
          buttonText="Acquista"
        />
      );
    case 'Standard':
      return (
        <CardPiano
          bgColor="#FFFFFF"
          title={tipi}
          subtitle="Piano Standard"
          price={euroValue}
          phrases={[
            'NO Pubblicità',
            '2 Addestramenti al giorno',
            '1 Salvataggio in memoria',
            'Salvataggio parametri e metrche degli addestramenti',
          ]}
          circleIcon={circleCheckWhite}
        />
      );
    case 'Premium':
      return (
        <CardPiano
          bgColor="#FFFFFF"
          title={tipi}
          subtitle="Piano Premium"
          price={euroValue}
          phrases={[
            'NO Pubblicità',
            '3 Addestramenti al giorno',
            '5 Salavataggi in memoria',
            'Salvataggio parametri e metrche degli addestramenti',
          ]}
          circleIcon={circleCheckWhite}
        />
      );
    case 'Business':
      return (
        <CardPiano
          bgColor="#FFFFFF"
          title={tipi}
          subtitle="Piano Business"
          price={euroValue}
          phrases={[
            'No Pubblicità',
            '4 Adeestramenti al giorno',
            '10 Salvattaggi in memoria ',
            'Salvataggio parametri e metrche degli addestramenti',
          ]}
          circleIcon={circleCheckWhite}
        />
      );
    case 'Enterprise':
      return (
        <CardPiano
          bgColor="#2467D1"
          title={tipi}
          subtitle="Piano Enterprise"
          price="€*"
          phrases={[
            'NO Pubblicità',
            'Scegli il numero di addestramenti',
            'Scegli il numero di salvataggi',
            'Salvataggio parametri e metrche degli addestramenti',
          ]}
          circleIcon={circleCheck}
          textColor="#FFFFFF"
          bgColorButton="#FFFFFF"
          textColorButton="#222222"
        />
      );
    // Aggiungi altri casi per altri tipi di piano
    default:
      return (
        <CardPiano
          title="Piano Sconosciuto"
          subtitle="Sottotitolo Sconosciuto"
          price="Testo per il Piano Sconosciuto"
          phrases={[
            'Funzionalità 1',
            'Funzionalità 2',
            'Funzionalità 3',
            'Funzionalità 4',
          ]}
          circleIcon={circleCheckWhite}
        />
      );
  }
};

export default ModificaPiano;
