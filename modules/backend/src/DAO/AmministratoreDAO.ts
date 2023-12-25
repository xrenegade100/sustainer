const { connessioneDB } = require('../db/poolDB.ts');

connessioneDB.query(
  'SELECT * FROM amministratore',
  (err, results, fields) => {
    if (err) {
      // Gestisci gli errori qui
      console.error(err);
      return;
    }

    // Accesso ai valori nei risultati
    results.forEach((row) => {
      console.log('Identificativo amministratore:', row.id_amministratore);
      console.log('Nome:', row.nome);
      console.log('Cognome:', row.cognome);
      console.log('Email:', row.email);
    });
  },
);
