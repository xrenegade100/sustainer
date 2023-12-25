const { connessioneDB } = require('../db/poolDB.ts');

connessioneDB.query(
  'SELECT * FROM condivisione',
  (err, results, fields) => {
    if (err) {
      // Gestisci gli errori qui
      console.error(err);
      return;
    }

    // Accesso ai valori nei risultati
    results.forEach((row) => {
      console.log('Identificativo condivisione:', row.id_condivisione);
      console.log('Identificativo utente:', row.id_utente);
      console.log('Identificativo modello:', row.id_modello);
      console.log('Titolo:', row.titolo);
      console.log('Descrizione:', row.descrizione);
      console.log('Data Condivisione:', row.data_condivisione);
      console.log('Permesso download:', row.permesso_download);
      console.log('Hashtag: #', row.hashtag);      

    });
  },
);
