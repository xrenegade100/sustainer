const { connessioneDB } = require('../db/poolDB.ts');

connessioneDB.query(
  'SELECT * FROM modello',
  (err, results, fields) => {
    if (err) {
      // Gestisci gli errori qui
      console.error(err);
      return;
    }

    // Accesso ai valori nei risultati
    results.forEach((row) => {
      console.log('Identificativo modello:', row.id_modello);
      console.log('Identificativo utente:', row.id_utente);
      console.log('Gruppo privilegiato:', row.gruppo_privilegiato);
      console.log('Riduci emissioni:', row.riduci_emissioni);
      console.log("Memorizzato:", row.memorizzato);
      console.log('Recall:', row.recall);
      console.log('Precision:', row.precision);
      console.log('Accuracy:', row.accuracy);
      console.log('Sustainability:', row.sustainability);
      console.log('Disperate Impact:', row.disperate_impact);
      console.log('Tipo modello:', row.tipo_modello);
    });
  },
);
