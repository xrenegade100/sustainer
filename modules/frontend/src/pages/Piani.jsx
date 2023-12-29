import React from 'react';
import '../styles/Piani.css';
import Navbar from '../components/Navbar';
import CardPiano from '../components/CardPiano';

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
          text="€0 /Mese"
          phrases={[
            'SI pubblicità',
            '1 Addestramento al giorno',
            'Nessun salvataggio in memoria',
            'Salvataggio parametri e metrche degli addestramenti',
          ]}
        />
      );
    case 'standard':
      return (
        <CardPiano
          title="Standard"
          subtitle="Piano Standard"
          text="€5 /Mese"
          phrases={[
            'NO Pubblicità',
            '2 Addestramenti al giorno',
            '1 Salvataggio in memoria',
            'Salvataggio parametri e metrche degli addestramenti',
          ]}
        />
      );
    case 'premium':
      return (
        <CardPiano
          title="Premium"
          subtitle="Piano Premium"
          text="€29 /Mese"
          phrases={[
            'NO Pubblicità',
            '3 Addestramenti al giorno',
            '5 Salavataggi in memoria',
            'Salvataggio parametri e metrche degli addestramenti',
          ]}
        />
      );
    case 'business':
      return (
        <CardPiano
          title="Business"
          subtitle="Piano Business"
          text="€59 /mese"
          phrases={[
            'No Pubblicità',
            '4 Adeestramenti al giorno',
            '10 Salvattaggi in memoria ',
            'Salvataggio parametri e metrche degli addestramenti',
          ]}
        />
      );
    case 'enterprise':
      return (
        <CardPiano
          title="Enterprise"
          subtitle="Piano Enterprise"
          text="€* /mese"
          phrases={[
            'NO Pubblicità',
            'Scegli il numero di addestramenti',
            'Scegli il numero di salvataggi',
            'Salvataggio parametri e metrche degli addestramenti',
          ]}
        />
      );
    // Aggiungi altri casi per altri tipi di piano
    default:
      return (
        <CardPiano
          title="Piano Sconosciuto"
          subtitle="Sottotitolo Sconosciuto"
          text="Testo per il Piano Sconosciuto"
          phrases={[
            'Funzionalità 1',
            'Funzionalità 2',
            'Funzionalità 3',
            'Funzionalità 4',
          ]}
        />
      );
  }
};

export default Piani;
