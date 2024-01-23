/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SnackbarElement } from 'baseui/snackbar';
import { Tabs, Tab, FILL } from 'baseui/tabs-motion';

const InserimentoParametriForm = () => {
  const [csv, setCsv] = useState([]);
  const [tipoModello, setTipoModello] = useState('');
  const [
    decisionTreeCriterioDiSuddivisione,
    setDecisionTreeCriterioDiSuddivisione,
  ] = useState('');
  const [decisionTreeProfondita, setDecisionTreeProfondita] = useState(null);
  // eslint-disable-next-line operator-linebreak
  const [decisionTreeCampioniFoglia, setDecisionTreeCampioniFoglia] =
    useState(null);
  const [naiveBayesDistribuzione, setNaiveBayesDistribuzione] = useState('');
  const [naiveBayesSmoothing, setNaiveBayesSmoothing] = useState(null);
  const [target, setTarget] = useState('');
  const [activeKey, setActiveKey] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showSnackbarModello, setShowSnackbarModello] = useState(false);
  const [showSnackbarFomato, setShowSnackbarFormato] = useState(false);
  const navigate = useNavigate();

  const handleChange1 = (event) => {
    const inputValue = event.target.value;
    const isBackspace = event.nativeEvent.inputType === 'deleteContentBackward';
    // Verifica se l'input è un numero compreso tra 1 e 999
    if (
      // eslint-disable-next-line operator-linebreak
      /^\d+$/.test(inputValue) ||
      isBackspace
    ) {
      setDecisionTreeCampioniFoglia(inputValue);
    }
  };

  const handleChange2 = (event) => {
    const inputValue = event.target.value;
    const isBackspace = event.nativeEvent.inputType === 'deleteContentBackward';
    // Verifica se l'input è un numero compreso tra 1 e 999
    if (/^[-+]?\d+$/.test(inputValue) || isBackspace) {
      setDecisionTreeProfondita(inputValue);
    }
  };

  const handleChange5 = (event) => {
    const inputValue = event.target.value;
    const isBackspace = event.nativeEvent.inputType === 'deleteContentBackward';

    // Verifica se l'input è un numero compreso tra 0 e 1 o se è un Backspace
    if (/^\d*\.?\d*$/.test(inputValue) || isBackspace) {
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
  }, [navigate]);

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
        if (!result.data) navigate('/homepage');
        setCsv(result.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Errore durante la fetch:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const generaFileJSON = async () => {
    alert('Genero il file JSON');
    let datiDaSalvare;

    if (tipoModello === 'decisiontree') {
      alert(decisionTreeCriterioDiSuddivisione);
      alert(decisionTreeProfondita);
      alert(decisionTreeCampioniFoglia);
      alert(target);
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
    const response = await fetch('http://localhost:5000/salvaJson', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contenuto: jsonString }), // Utilizza il risultato di JSON.stringify
    });

    if (response.ok) {
      // eslint-disable-next-line no-console
      console.log('Dati salvati con successo');
    } else {
      // eslint-disable-next-line no-console
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
                onClick={() => {
                  setTipoModello('decisiontree');
                  setShowSnackbarModello(false);
                }}
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
                  <h3 className="h3">Profondità massima dell&apos;albero</h3>
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
                title="Naive Bayes"
                className="fomtClass"
                valie={tipoModello}
                onClick={() => {
                  setTipoModello('naivebayes');
                  setShowSnackbarModello(false);
                }}
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
          {showSnackbar && (
            <div className="compilaCampi">
              <SnackbarElement
                message={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <div className="testoSnack">
                    Compila tutti i campi obbligatori
                  </div>
                }
                focus={false}
              />
            </div>
          )}
          {showSnackbarModello && (
            <div className="compilaCampi">
              <SnackbarElement
                message={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <div className="testoSnack">
                    Seleziona tipo di addestramento
                  </div>
                }
                focus={false}
              />
            </div>
          )}
          {showSnackbarFomato && (
            <div className="compilaCampi">
              <SnackbarElement
                message={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <div className="testoSnack">
                    Formato dei dati non corretto
                  </div>
                }
                focus={false}
              />
            </div>
          )}
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
              setShowSnackbar(false);
              setShowSnackbarFormato(false);
              setShowSnackbarModello(false);

              if (
                // eslint-disable-next-line operator-linebreak
                tipoModello &&
                // eslint-disable-next-line operator-linebreak
                (decisionTreeCriterioDiSuddivisione === '' ||
                  // eslint-disable-next-line operator-linebreak
                  decisionTreeProfondita === null ||
                  // eslint-disable-next-line operator-linebreak
                  decisionTreeCampioniFoglia === null ||
                  // eslint-disable-next-line operator-linebreak
                  target === '') &&
                // eslint-disable-next-line operator-linebreak
                (naiveBayesDistribuzione === '' ||
                  // eslint-disable-next-line operator-linebreak
                  naiveBayesSmoothing === null ||
                  target === '')
              ) {
                // Se una delle variabili è null, mostra un alert
                setShowSnackbar(true);
              } else if (!tipoModello) {
                setShowSnackbarModello(true);
              } else {
                setShowSnackbar(false);
                // eslint-disable-next-line no-lonely-if

                if (tipoModello === 'decisiontree') {
                  if (
                    decisionTreeCampioniFoglia > 999 ||
                    decisionTreeCampioniFoglia < 1 ||
                    decisionTreeProfondita > 99 ||
                    decisionTreeProfondita < 0
                  ) {
                    setShowSnackbarFormato(true);
                  } else {
                    setShowSnackbar(false);
                    generaFileJSON();
                    navigate('/fairness');
                  }
                } else {
                  // eslint-disable-next-line no-lonely-if
                  if (naiveBayesSmoothing > 1 || naiveBayesSmoothing < 0) {
                    setShowSnackbarFormato(true);
                  } else {
                    setShowSnackbar(false);
                    generaFileJSON();
                    navigate('/fairness');
                  }
                }
                // eslint-disable-next-line no-lonely-if
              }
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
