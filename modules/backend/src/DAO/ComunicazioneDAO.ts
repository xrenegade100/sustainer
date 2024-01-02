class ComunicazioneDAO {

const { connessioneDB } = require('../db/poolDB.ts');

connessioneDB.query('SELECT * FROM comunicazione', (err, results, fields) => {
  if (err) {
    // Gestisci gli errori qui
    console.error(err);
    return;
  }

  // Accesso ai valori nei risultati
  results.forEach((row) => {
    console.log('Identificativo comunicazione:', row.id_comunicazione);
    console.log('Identificativo utente:', row.id_utente);
    console.log('Identificativo amministratore:', row.id_amministratore);
    console.log('Data e ora:', row.data_ora);
    console.log('Messaggio:', row.messaggio);
  });
});
}
export default ComunicazioneDAO;
