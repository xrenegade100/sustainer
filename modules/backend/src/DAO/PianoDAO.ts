import { RowDataPacket } from 'mysql2';
import db from '../db/poolDB';
import Piano from '../piano/domain/Piano';

class PianoDAO {
  // funzione asincrona che ritorna tutti i piani
  static async getAllPiani() {
    const conn = await db(); // connessione al db
    const piani = (await conn.query('SELECT * FROM piano')) as RowDataPacket; // query che ritorna tutti i piani
    console.log(piani); // stampo i piani
  }

  // funzione asincrona che ritorna un piano in base al suo id
  static async getTipiPiani() {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query('SELECT * FROM piano LIMIT 0,4'); // query che ritorna i primi 4 tipi di piani
    const piani = rows as RowDataPacket[]; // assegno a piani i risultati della query
    console.log(piani); // stampo i piani
    return piani.map(
      (piano) =>
        new Piano(
          piano.id_piano,
          piano.tipo,
          piano.prezzo,
          piano.limite_salvataggi_modelli,
          piano.limite_addestramenti_modelli,
        ), // ritorno un oggetto mappato con tutti i piani
    );
  }

  // funzione che inserisce un acquisto nel db con id_utente
  // e id_piano = free che viene usata solo per la registrazione
  static async AcquistoPianoFree(id_utente: number) {
    const conn = await db(); // connessione al db
    const id_piano = (await conn.query(
      'SELECT id_piano FROM susdb.piano WHERE tipo = "Free"', // query che ritorna l'id del piano free
    )) as RowDataPacket[]; // assegno a id_piano i risultati della query
    await conn.query(
      'INSERT INTO acquisto(id_utente, id_piano, data_acquisto) VALUES (?, ?, ?)', // query che inserisce un acquisto nel db
      [id_utente, id_piano[0][0].id_piano, new Date()], // parametri della query
    );
  }
}

export default PianoDAO;
