const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin',
  database: 'susdb',
  port: 3006,
  insecureAuth: true,
});

connection.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err);
    throw err;
  }
  console.log('Connesso al database MySQL!');
});

// Resto del codice per il tuo DAO...

module.exports = connection;

connection.query(
  'SELECT * FROM utente',
  (err, results, fields) => {
    if (err) {
      // Gestisci gli errori qui
      console.error(err);
      return;
    }

    // Accesso ai valori nei risultati
    results.forEach((row) => {
      console.log('Utente_id:', row.id_utente);
      console.log('Nome:', row.nome);
      console.log('Cognome:', row.cognome);
    });
  },
);
