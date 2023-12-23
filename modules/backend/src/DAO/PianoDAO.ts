const { connessioneDB } = require('../db/poolDB.ts');

connessioneDB.query(
  'SELECT * FROM piano',
  (err, results, fields) => {
    if (err) {
      // Gestisci gli errori qui
      console.error(err);
      return;
    }

    // Accesso ai valori nei risultati
    results.forEach((row) => {
      console.log('Identificativo piano:', row.id_piano);
      console.log('Tipo:', row.tipo);
      console.log('Prezzo:', row.prezzo);
      console.log('Prezzo:', row.limite_salvataggi_modelli);
      console.log('Prezzo:', row.limite_addestramenti_modelli);
    });
  },
);
