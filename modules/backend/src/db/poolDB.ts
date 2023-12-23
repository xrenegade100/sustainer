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

module.exports.connessioneDB = connection;
