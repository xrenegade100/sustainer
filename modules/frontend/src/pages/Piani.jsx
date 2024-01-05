import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Piani.css';
import Navbar from '../components/Navbar';
import CardPiano from '../components/CardPiano';
import circleCheck from '../assets/circle_check.svg';
import circleCheckWhite from '../assets/circle_check_white.svg';

const Piani = () => {
  const tipoPiano = ['free', 'standard', 'premium', 'business', 'enterprise'];

  const [data, setData] = useState([]);
  const [loggato, setLoggato] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/piani');
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
    const fetchLogin = async () => {
      try {
        const response = await fetch('http://localhost:5000/verificaLogin', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
        });
        const result = await response.json();
        if (!result.user) {
          setLoggato(false);
        } else {
          setLoggato(true);
          navigate('/modifica-piano');
        }
      } catch (error) {
        console.error('Errore durante la fetch:', error);
      }
    };
    fetchLogin();
  }, []);

  console.log(data);

  const tipi = data.map((piano) => piano.tipo);
  const prezzi = data.map((piano) => piano.prezzo);
  tipi.push('Enterprise');
  console.log(prezzi);

  return (
    <>
      <div className="header">
        <Navbar />
      </div>
      <div className="pianiView">
        <div className="row">
          <h1 className="title">Scegli il tuo Piano</h1>
        </div>
        <div className="row">
          <div className="piani-section">
            {renderCardBasedOnType(tipi[4])}
            <div className="slider-piani">
              <div className="slider">
                <div className="slide">
                  {renderCardBasedOnType(tipi[0], prezzi[0], loggato)}
                </div>
                <div className="slide">
                  {renderCardBasedOnType(tipi[1], prezzi[1], loggato)}
                </div>
                <div className="slide">
                  {renderCardBasedOnType(tipi[2], prezzi[2], loggato)}
                </div>
                <div className="slide">
                  {renderCardBasedOnType(tipi[3], prezzi[3], loggato)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row"></div>
      </div>
    </>
  );
};

const renderCardBasedOnType = (tipi, prezzi, loggato) => {
  switch (tipi) {
    case 'Free':
      return (
        <CardPiano
          bgColor="#FFFFFF"
          title={tipi}
          subtitle="Piano Free"
          price={prezzi}
          phrases={[
            'SI pubblicità',
            '1 Addestramento al giorno',
            'Nessun salvataggio in memoria',
            'Salvataggio parametri e metrche degli addestramenti',
          ]}
          circleIcon={circleCheckWhite}
          loggato={loggato}
          buttonText="Registrati"
        />
      );
    case 'Standard':
      return (
        <CardPiano
          bgColor="#FFFFFF"
          title={tipi}
          subtitle="Piano Standard"
          price={prezzi}
          phrases={[
            'NO Pubblicità',
            '2 Addestramenti al giorno',
            '1 Salvataggio in memoria',
            'Salvataggio parametri e metrche degli addestramenti',
          ]}
          circleIcon={circleCheckWhite}
          loggato={loggato}
          buttonText="Acquista"
        />
      );
    case 'Premium':
      return (
        <CardPiano
          bgColor="#FFFFFF"
          title={tipi}
          subtitle="Piano Premium"
          price={prezzi}
          phrases={[
            'NO Pubblicità',
            '3 Addestramenti al giorno',
            '5 Salavataggi in memoria',
            'Salvataggio parametri e metrche degli addestramenti',
          ]}
          circleIcon={circleCheckWhite}
          loggato={loggato}
          buttonText="Acquista"
        />
      );
    case 'Business':
      return (
        <CardPiano
          bgColor="#FFFFFF"
          title={tipi}
          subtitle="Piano Business"
          price={prezzi}
          phrases={[
            'No Pubblicità',
            '4 Adeestramenti al giorno',
            '10 Salvattaggi in memoria ',
            'Salvataggio parametri e metrche degli addestramenti',
          ]}
          circleIcon={circleCheckWhite}
          loggato={loggato}
          buttonText="Acquista"
        />
      );
    case 'Enterprise':
      return (
        <CardPiano
          bgColor="#2467D1"
          title={tipi}
          subtitle="Piano Enterprise"
          price="*"
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
          buttonText="Richiedi preventivo"
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

export default Piani;
