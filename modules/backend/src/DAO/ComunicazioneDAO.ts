const { connessioneDB } = require('../db/poolDB.ts');

connessioneDB.query(
  'SELECT * FROM comunicazione',
  (err, results, fields) => {
    if (err) {
      // Gestisci gli errori qui
      console.error(err);
      return;
    }

    // Accesso ai valori nei risultati
    results.forEach((row) => {
      console.log('Identificativo modello:', row.id_comunicazione);
    });
  },
);
