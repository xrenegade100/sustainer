import React from 'react';
import '../styles/Piani.css';
import Navbar from '../components/Navbar';
import CardPiano from '../components/CardPiano';
import circleCheck from '../assets/circle_check.svg';
import circleCheckWhite from '../assets/circle_check_white.svg';

const Piani = () => {
  const tipoPiano = ['free', 'standard', 'premium', 'business', 'enterprise'];
  return (
    <>
      <div className="header">
        <Navbar />
      </div>
      <div className="app">
        <div className="row">
          <h1 className="title">Scegli il tuo Piano</h1>
        </div>
        <div className="row">
          <div className="piani-section">
            {renderCardBasedOnType(tipoPiano[4])}
            <div className="slider-piani">
              <div className="slider">
                <div className="slide">
                  {renderCardBasedOnType(tipoPiano[0])}
                </div>
                <div className="slide">
                  {renderCardBasedOnType(tipoPiano[1])}
                </div>
                <div className="slide">
                  {renderCardBasedOnType(tipoPiano[2])}
                </div>
                <div className="slide">
                  {renderCardBasedOnType(tipoPiano[3])}
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

const renderCardBasedOnType = (tipoPiano) => {
  switch (tipoPiano) {
    case 'free':
      return (
        <CardPiano
          title="Free"
          subtitle="Piano Free"
          price="€0"
          phrases={[
            'SI pubblicità',
            '1 Addestramento al giorno',
            'Nessun salvataggio in memoria',
            'Salvataggio parametri e metrche degli addestramenti',
          ]}
          circleIcon={circleCheckWhite}
        />
      );
    case 'standard':
      return (
        <CardPiano
          title="Standard"
          subtitle="Piano Standard"
          price="€5"
          phrases={[
            'NO Pubblicità',
            '2 Addestramenti al giorno',
            '1 Salvataggio in memoria',
            'Salvataggio parametri e metrche degli addestramenti',
          ]}
          circleIcon={circleCheckWhite}
        />
      );
    case 'premium':
      return (
        <CardPiano
          title="Premium"
          subtitle="Piano Premium"
          price="€29"
          phrases={[
            'NO Pubblicità',
            '3 Addestramenti al giorno',
            '5 Salavataggi in memoria',
            'Salvataggio parametri e metrche degli addestramenti',
          ]}
          circleIcon={circleCheckWhite}
        />
      );
    case 'business':
      return (
        <CardPiano
          title="Business"
          subtitle="Piano Business"
          price="€59"
          phrases={[
            'No Pubblicità',
            '4 Adeestramenti al giorno',
            '10 Salvattaggi in memoria ',
            'Salvataggio parametri e metrche degli addestramenti',
          ]}
          circleIcon={circleCheckWhite}
        />
      );
    case 'enterprise':
      return (
        <CardPiano
          bgColor="#2467D1"
          title="Enterprise"
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

export default Piani;
