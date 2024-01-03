import { RowDataPacket } from 'mysql2';
import db from '../db/poolDB';
import Piano from '../piano/domain/Piano';
import Acquisto from '../piano/domain/Acquisto';

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

  //controllo nel db l'ultimo piano acquistato dall'utente
  static async getUltimoAcquistoUtente(id_utente: string) {
    const conn = await db();

    const [rows] = await conn.query(
      'SELECT * FROM acquisto WHERE id_utente = ? ORDER BY data_acquisto ASC LIMIT 1',
      id_utente,
    );
    const acquisto = rows as RowDataPacket[];

    return new Acquisto(
      acquisto[0].id_utente,
      acquisto[0].id_piano,
      acquisto[0].data_acquisto,
    );
  }

  //funzione che ritorna il piano attivo dell'utente nella pagina profilo
  static async getPianoUtente(id_piano: number) {
    const conn = await db();

    const [rows] = await conn.query(
      'SELECT * FROM piano WHERE id_piano = ?',
      id_piano,
    );
    const piano = rows as RowDataPacket[];

    return new Piano(
      piano[0].id_piano,
      piano[0].tipo,
      piano[0].prezzo,
      piano[0].limite_salvataggi_modelli,
      piano[0].limite_addestramenti_modelli,
    );
  }

  //funzione che permette all'utente di acquistare un piano diverso dal free
  static async AcquistoPiano(id_utente: number, id_piano: number) {
    const conn = await db(); // connessione al db
    await conn.query(
      'INSERT INTO acquisto(id_utente, id_piano, data_acquisto) VALUES (?, ?, ?)', // query che inserisce un acquisto nel db
      [id_utente, id_piano, new Date()], // parametri della query
    );
  }
}

export default PianoDAO;
