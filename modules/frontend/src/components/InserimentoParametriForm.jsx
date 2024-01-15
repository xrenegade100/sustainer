import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Tab, FILL } from 'baseui/tabs-motion';

const InserimentoParametriForm = () => {
  const [csv, setCsv] = useState([]);
  const [tipoModello, setTipoModello] = React.useState('decisiontree');
  const [
    decisionTreeCriterioDiSuddivisione,
    setDecisionTreeCriterioDiSuddivisione,
  ] = React.useState('');
  // eslint-disable-next-line operator-linebreak
  const [decisionTreeProfondita, setDecisionTreeProfondita] =
    React.useState('');
  // eslint-disable-next-line operator-linebreak
  const [decisionTreeCampioniFoglia, setDecisionTreeCampioniFoglia] =
    React.useState('');
  // eslint-disable-next-line operator-linebreak
  const [naiveBayesDistribuzione, setNaiveBayesDistribuzione] =
    React.useState('');
  const [naiveBayesSmoothing, setNaiveBayesSmoothing] = React.useState('');
  const [target, setTarget] = React.useState('');
  const [activeKey, setActiveKey] = useState('0');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleChange1 = (event) => {
    const inputValue = event.target.value;
    const isBackspace = event.nativeEvent.inputType === 'deleteContentBackward';
    // Verifica se l'input è un numero compreso tra 1 e 999
    if (
      // eslint-disable-next-line operator-linebreak
      (/^\d+$/.test(inputValue) && inputValue >= 1 && inputValue <= 999) ||
      isBackspace
    ) {
      setDecisionTreeCampioniFoglia(inputValue);
    }
  };

  const handleChange2 = (event) => {
    const inputValue = event.target.value;
    const isBackspace = event.nativeEvent.inputType === 'deleteContentBackward';
    // Verifica se l'input è un numero compreso tra 1 e 999
    if (
      // eslint-disable-next-line operator-linebreak
      (/^\d+$/.test(inputValue) && inputValue >= 0 && inputValue <= 99) ||
      isBackspace
    ) {
      setDecisionTreeProfondita(inputValue);
    }
  };

  const handleChange5 = (event) => {
    const inputValue = event.target.value;
    const isBackspace = event.nativeEvent.inputType === 'deleteContentBackward';

    // Verifica se l'input è un numero compreso tra 0 e 1 o se è un Backspace
    if (
      // eslint-disable-next-line operator-linebreak
      (/^\d*\.?\d*$/.test(inputValue) &&
        // eslint-disable-next-line operator-linebreak
        parseFloat(inputValue) >= 0 &&
        // eslint-disable-next-line operator-linebreak
        parseFloat(inputValue) <= 1) ||
      isBackspace
    ) {
      setNaiveBayesSmoothing(inputValue);
    }
  };

  // metodo per la snackbar
  useEffect(() => {
    async function funzioneVerifica() {
      const verifica = await fetch('http://localhost:5000/verificaLogin', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
      });
      const response = await verifica.json();
      if (!response.user) {
        navigate('/homepage');
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/leggiCSV', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
          credentials: 'include',
        });
        const result = await response.json();
        setCsv(result.data);
      } catch (error) {
        console.error('Errore durante la fetch:', error);
      }
    };

    fetchData();
  }, []);

  const generaFileJSON = async () => {
    let datiDaSalvare;

    if (tipoModello === 'decisiontree') {
      datiDaSalvare = {
        tipoModello,
        decisionTreeCriterioDiSuddivisione,
        decisionTreeProfondita,
        decisionTreeCampioniFoglia,
        target,
      };
    } else {
      datiDaSalvare = {
        tipoModello,
        naiveBayesDistribuzione,
        naiveBayesSmoothing,
        target,
      };
    }
    const jsonString = JSON.stringify(datiDaSalvare);
    console.log(jsonString);
    const response = await fetch('http://localhost:5000/salvaJson', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contenuto: jsonString }), // Utilizza il risultato di JSON.stringify
    });

    if (response.ok) {
      console.log('Dati salvati con successo');
    } else {
      console.error('Errore nel salvataggio dei dati');
    }
  };

  return (
    <div className="formTutto">
      <div className="formsen">
        <div className="cardFormes">
          <div className="form-bodey">
            <Tabs
              activeKey={activeKey}
              fill={FILL.fixed}
              overrides={{
                TabBorder: {
                  style: () => ({
                    backgroundColor: 'white',
                  }),
                },
                TabHighlight: {
                  style: () => ({
                    backgroundColor: '#2467d1',
                  }),
                },
              }}
              onChange={(val) => {
                setActiveKey(val.activeKey);
              }}
            >
              <Tab
                title="Decision Tree"
                className="fomtClass"
                valie={tipoModello}
                onClick={() => setTipoModello('decisiontree')}
              >
                <div className="divone">
                  <h3 className="h3">Criterio di Suddivisione</h3>
                  <select
                    value={decisionTreeCriterioDiSuddivisione}
                    onChange={
                      (event) =>
                        // eslint-disable-next-line implicit-arrow-linebreak
                        setDecisionTreeCriterioDiSuddivisione(
                          event.target.value,
                        )
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                    className="custom-select"
                  >
                    <option disabled value="" hidden>
                      Campo obbligatorio
                    </option>
                    <option value="gini">Indice di Gini</option>
                    <option value="entropia">Entropia</option>
                  </select>
                </div>
                <div className="divone">
                  <h3 className="h3">Profondità massima del albero</h3>
                  <input
                    className="inputTxt"
                    type="text"
                    value={decisionTreeProfondita}
                    onChange={handleChange2}
                    placeholder="Inserisci un numero (0-99)"
                  />
                </div>
                <div className="divone">
                  <h3 className="h3">Minimo campioni per foglia</h3>
                  <input
                    className="inputTxt"
                    type="text"
                    value={decisionTreeCampioniFoglia}
                    onChange={handleChange1}
                    placeholder="Inserisci un numero (1-999)"
                  />
                </div>
                <div className="divone">
                  <h3 className="h3">Target</h3>
                  <select
                    value={target}
                    onChange={(event) => setTarget(event.target.value)}
                    className="custom-select"
                  >
                    <option disabled value="" hidden>
                      Campo obbligatorio
                    </option>
                    {
                      // eslint-disable-next-line operator-linebreak
                      Array.isArray(csv) &&
                        csv.map((valore) => (
                          <option key={`option-${valore}`} value={valore}>
                            {valore}
                          </option>
                        ))
                    }
                  </select>
                </div>
              </Tab>
              <Tab
                title="Navie Bayes"
                className="fomtClass"
                valie={tipoModello}
                onClick={() => setTipoModello('naviebayes')}
              >
                <div className="divone">
                  <h3 className="h3">Distribuzione</h3>
                  <select
                    value={naiveBayesDistribuzione}
                    onChange={
                      (event) =>
                        // eslint-disable-next-line implicit-arrow-linebreak
                        setNaiveBayesDistribuzione(event.target.value)
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                    className="custom-select"
                  >
                    <option disabled value="" hidden>
                      Campo obbligatorio
                    </option>
                    <option value="gaussian">Gaussian</option>
                    <option value="multinomial">Multinomial</option>
                  </select>
                </div>
                <div className="divone">
                  <h3 className="h3">Smooting</h3>
                  <input
                    className="inputTxt"
                    type="text"
                    value={naiveBayesSmoothing}
                    onChange={handleChange5}
                    placeholder="Inserisci un numero (0-1)"
                  />
                </div>
                <div className="divone">
                  <h3 className="h3">Target</h3>
                  <select
                    value={target}
                    onChange={(event) => setTarget(event.target.value)}
                    className="custom-select"
                  >
                    <option disabled value="" hidden>
                      Campo obbligatorio
                    </option>
                    {
                      // eslint-disable-next-line operator-linebreak
                      Array.isArray(csv) &&
                        csv.map((valore) => (
                          <option key={`option-${valore}`} value={valore}>
                            {valore}
                          </option>
                        ))
                    }
                  </select>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className="bottoni">
          <button
            type="button"
            className="buttonI"
            onClick={() => navigate('/addestra')}
          >
            Torna Indietro
          </button>
          <button
            type="button"
            className="buttonA"
            onClick={() => {
              generaFileJSON();
              navigate('/fairness');
            }}
          >
            Vai Avanti
          </button>
        </div>
      </div>
    </div>
  );
};

export default InserimentoParametriForm;
