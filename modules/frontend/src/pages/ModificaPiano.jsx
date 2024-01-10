import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../styles/ModificaPiano.css';
import Navbar from '../components/Navbar';
import CardPiano from '../components/CardPiano';
import circleCheck from '../assets/circle_check.svg';
import circleCheckWhite from '../assets/circle_check_white.svg';

const ModificaPiano = () => {
  const [data, setData] = useState([]);
  const [pianoUtente, setPianoUtente] = useState('Vuoto');
  const [differenzaGiorni, setDifferenzaGiorni] = useState(0);

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

    const fetchDifferenza = async () => {
      try {
        const response = await fetch('http://localhost:5000/differenzaGiorni', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'include',
        });
        const result = await response.json();

        setDifferenzaGiorni(result);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Errore durante la fetch:', error);
      }
    };

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

        await setPianoUtente(result);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Errore durante la fetch:', error);
      }
    };

    fetchPianoUtente();
    fetchDifferenza();
    fetchData();
  }, [navigate]);

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
        // eslint-disable-next-line no-console
        console.error('Errore durante la fetch:', error);
      }
    };
    fetchData();
  }, []);

  const tipi = data.map((piano) => piano.tipo);
  const idPiani = data.map((piano) => piano.idPiano);
  const prezzi = data.map((piano) => piano.prezzo);

  tipi.push('Enterprise');

  const renderCardBasedOnType = (tipiF, idPianoF, prezziF, loggatoF) => {
    if (pianoUtente.piano) {
      switch (tipiF) {
        case 'Standard':
          return (
            <CardPiano
              bgColor="#FFFFFF"
              title={tipiF}
              subtitle="Piano Standard"
              price={prezziF}
              phrases={[
                'NO Pubblicità',
                '2 Addestramenti al giorno',
                '1 Salvataggio in memoria',
                'Salvataggio parametri e metrche degli addestramenti',
              ]}
              circleIcon={circleCheckWhite}
              buttonText={
                pianoUtente.piano.idPiano <= idPianoF ? 'Upgrade' : 'Downgrade'
              }
              idPlan={idPianoF}
              loggato={loggatoF}
            />
          );
        case 'Premium':
          return (
            <CardPiano
              bgColor="#FFFFFF"
              title={tipiF}
              subtitle="Piano Premium"
              price={prezziF}
              phrases={[
                'NO Pubblicità',
                '3 Addestramenti al giorno',
                '5 Salavataggi in memoria',
                'Salvataggio parametri e metrche degli addestramenti',
              ]}
              circleIcon={circleCheckWhite}
              buttonText={
                pianoUtente.piano.idPiano <= idPianoF ? 'Upgrade' : 'Downgrade'
              }
              idPlan={idPianoF}
              loggato={loggatoF}
            />
          );
        case 'Business':
          return (
            <CardPiano
              bgColor="#FFFFFF"
              title={tipiF}
              subtitle="Piano Business"
              price={prezziF}
              phrases={[
                'No Pubblicità',
                '4 Adeestramenti al giorno',
                '10 Salvattaggi in memoria ',
                'Salvataggio parametri e metrche degli addestramenti',
              ]}
              circleIcon={circleCheckWhite}
              buttonText={
                pianoUtente.piano.idPiano <= idPianoF ? 'Upgrade' : 'Downgrade'
              }
              idPlan={idPianoF}
              loggato={loggatoF}
            />
          );
        case 'Enterprise':
          return (
            <CardPiano
              bgColor="#2467D1"
              title={
                pianoUtente.piano ? pianoUtente.piano.tipo : 'Caricamento...'
              }
              subtitle="Piano personale"
              price={
                pianoUtente.piano ? pianoUtente.piano.prezzo : 'Caricamento...'
              }
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
              buttonText="Annulla piano"
              giorniRestanti={Math.round(differenzaGiorni)}
              attivo={pianoUtente.acquisto.attivo ? 'attivo' : 'non attivo'}
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
    }
  };

  return (
    <>
      <div className="header">
        <Navbar />
      </div>
      <div className="app2">
        <div className="background-piani">
          <div className="spacer" />
          <div className="row2">
            <h1 className="title2">Il Mio Piano Attivo</h1>
          </div>
          <div className="spacer" />
          <div className="row2">
            <div className="piani-section2">
              {renderCardBasedOnType(tipi[4], 0, idPiani, pianoUtente)}
              <div className="slider-piani2">
                <div className="slider2">
                  <div className="slide2">
                    {renderCardBasedOnType(
                      tipi[1],
                      idPiani[1],
                      prezzi[1],
                      pianoUtente,
                      true,
                    )}
                  </div>
                  <div className="slide2">
                    {renderCardBasedOnType(
                      tipi[2],
                      idPiani[2],
                      prezzi[2],
                      pianoUtente,
                      true,
                    )}
                  </div>
                  <div className="slide2">
                    {renderCardBasedOnType(
                      tipi[3],
                      idPiani[3],
                      prezzi[3],
                      pianoUtente,
                      true,
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="spacer" />
        </div>
      </div>
    </>
  );
};

export default ModificaPiano;
