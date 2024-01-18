import * as React from 'react';
import { Input } from 'baseui/input';
import { useState } from 'react';

const FormEnterprise = () => {
  const [naddestramenti, setLimiteAddestramenti] = useState('');
  const [nsalvataggi, setLimiteSalvataggi] = useState('');

  return (
    <div className="cardForm">
      <div className="cfetitle">
        <h2>Personalizza la tua soluzione</h2>
      </div>
      <div className="cferow1">
        <h3>Numero di addestramenti giornalieri desiderati</h3>
        <div className="nadgg">
          <Input
            className="nadgginput"
            value={naddestramenti}
            onChange={(e) => setLimiteAddestramenti(e.target.value)}
            placeholder="10"
            clearable
            type="number"
          />
        </div>
        <br />
        <br />
        <div className="cferow2">
          <h3>Numero di salvataggi in memoria desiderati</h3>
          <div className="nsvgg">
            <Input
              className="nsvgginput"
              value={nsalvataggi}
              onChange={(e) => setLimiteSalvataggi(e.target.value)}
              placeholder="10"
              clearable
              type="number"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEnterprise;
