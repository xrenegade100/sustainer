import { RowDataPacket } from 'mysql2';
import db from '../db/PoolDB';
import Piano from '../piano/domain/Piano';
import Acquisto from '../piano/domain/Acquisto';

class PianoDAO {
  // funzione asincrona che ritorna tutti i piani
  static async getAllPiani() {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query('SELECT * FROM piano'); // query che ritorna tutti i piani
    const piani = rows as RowDataPacket[]; // assegno a piani i risultati della query
    return piani.map(
      (piano) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        new Piano(
          piano.id_piano,
          piano.tipo,
          piano.prezzo,
          piano.limite_salvataggi_modelli,
          piano.limite_addestramenti_modelli,
        ),
      // ritorno un oggetto mappato con tutti i piani
    );
  }

  // funzione asincrona che ritorna un piano in base al suo id
  static async getTipiPiani() {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query('SELECT * FROM piano LIMIT 0,4'); // query che ritorna i primi 4 tipi di piani
    const piani = rows as RowDataPacket[]; // assegno a piani i risultati della query
    return piani.map(
      (piano) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        new Piano(
          piano.id_piano,
          piano.tipo,
          piano.prezzo,
          piano.limite_salvataggi_modelli,
          piano.limite_addestramenti_modelli,
        ),
      // ritorno un oggetto mappato con tutti i piani
    );
  }

  // funzione che inserisce un acquisto nel db con id_utente
  // e id_piano = free che viene usata solo per la registrazione
  static async AcquistoPianoFree(idUtente: number) {
    const conn = await db(); // connessione al db
    const idPiano = (await conn.query(
      'SELECT id_piano FROM susdb.piano WHERE tipo = "Free"', // query che ritorna l'id del piano free
    )) as RowDataPacket[]; // assegno a id_piano i risultati della query
    await conn.query(
      'INSERT INTO acquisto(id_utente, id_piano, data_acquisto, attivo) VALUES (?, ?, ?, ?)', // query che inserisce un acquisto nel db
      [idUtente, idPiano[0][0].id_piano, new Date(), true], // parametri della query
    );
  }

  // controllo nel db l'ultimo piano acquistato dall'utente
  static async getUltimoAcquistoUtente(idUtente: string) {
    const conn = await db();
    const [rows] = await conn.query(
      'SELECT * FROM acquisto WHERE id_utente = ? ORDER BY data_acquisto DESC LIMIT 1',
      idUtente,
    );
    const acquisto = rows as RowDataPacket[];
    return new Acquisto(
      acquisto[0].id_utente,
      acquisto[0].id_piano,
      acquisto[0].data_acquisto,
      acquisto[0].attivo,
    );
  }

  // funzione che ritorna il piano attivo dell'utente nella pagina profilo
  static async getPianoUtente(idPiano: number) {
    const conn = await db();

    const [rows] = await conn.query(
      'SELECT * FROM piano WHERE id_piano = ?',
      idPiano,
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

  // funzione che permette all'utente di acquistare un piano diverso dal free
  static async AcquistoPiano(idUtente: number, idPiano: number) {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query(
      'INSERT INTO acquisto(id_utente, id_piano, data_acquisto, attivo) VALUES (?, ?, ?, ?)', // query che inserisce un acquisto nel db
      [idUtente, idPiano, new Date(), true], // parametri della query
    );
    return rows;
  }

  static async annullaPiano(idUtente: number, idPiano: number) {
    const conn = await db();
    console.log(idUtente, idPiano);
    const [rows] = await conn.query(
      'UPDATE susdb.acquisto SET attivo = 0 WHERE id_utente = ? AND id_piano = ?',
      [idUtente, idPiano],
    );
    if (rows) {
      return true;
    }
    return false;
  }

  static async InserimentoPianoEnterprise(
    limitiAddestramenti:number,
    limitiSalvataggi:number,
    prezzo:number,
  ) {
    const conn = await db();
    await conn.query(
      'INSERT INTO piano(tipo, prezzo, limite_salvataggi_modelli, limite_addestramenti_modelli) VALUES (?, ?, ?, ?)',
      ['Enterprise', prezzo, limitiSalvataggi, limitiAddestramenti],
    );
    const [rows] = await conn.query('SELECT * FROM piano WHERE id_piano = LAST_INSERT_ID()');
    const piano = (rows as RowDataPacket[])[0];
    return new Piano(
      piano.id_piano,
      piano.tipo,
      piano.prezzo,
      piano.limite_salvataggi_modelli,
      piano.limite_addestramenti_modelli,
    );
  }
}

export default PianoDAO;
