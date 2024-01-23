import { RowDataPacket } from 'mysql2';
import db from '../db/PoolDB';
import Piano from '../piano/domain/Piano';
import Acquisto from '../piano/domain/Acquisto';

class PianoDAO {
  // Ottiene tutti i piani dal database
  static async getAllPiani() {
    const conn = await db();
    const [rows] = await conn.query('SELECT * FROM piano');
    const piani = rows as RowDataPacket[];
    return piani.map(
      (piano) =>
        new Piano(
          piano.id_piano,
          piano.tipo,
          piano.prezzo,
          piano.limite_salvataggi_modelli,
          piano.limite_addestramenti_modelli,
        )
    );
  }

  // Ottiene i primi 4 tipi di piani dal database
  static async getTipiPiani() {
    const conn = await db();
    const [rows] = await conn.query('SELECT * FROM piano LIMIT 0,4');
    const piani = rows as RowDataPacket[];
    return piani.map(
      (piano) =>
        new Piano(
          piano.id_piano,
          piano.tipo,
          piano.prezzo,
          piano.limite_salvataggi_modelli,
          piano.limite_addestramenti_modelli,
        )
    );
  }

  // Effettua l'acquisto del piano Free per un utente
  static async AcquistoPianoFree(idUtente: number) {
    const conn = await db();
    const idPiano = (await conn.query(
      'SELECT id_piano FROM susdb.piano WHERE tipo = "Free"'
    )) as RowDataPacket[];
    await conn.query(
      'INSERT INTO acquisto(id_utente, id_piano, data_acquisto, attivo) VALUES (?, ?, ?, ?)',
      [idUtente, idPiano[0][0].id_piano, new Date(), true]
    );
  }

  // Ottiene l'ultimo acquisto effettuato da un utente
  static async getUltimoAcquistoUtente(idUtente: string) {
    const conn = await db();
    const [rows] = await conn.query(
      'SELECT * FROM acquisto WHERE id_utente = ? ORDER BY data_acquisto DESC LIMIT 1',
      idUtente
    );
    const acquisto = rows as RowDataPacket[];
    return new Acquisto(
      acquisto[0].id_utente,
      acquisto[0].id_piano,
      acquisto[0].data_acquisto,
      acquisto[0].attivo
    );
  }

  // Ottiene le informazioni di un piano specifico
  static async getPianoUtente(idPiano: number) {
    const conn = await db();
    const [rows] = await conn.query(
      'SELECT * FROM piano WHERE id_piano = ?',
      idPiano
    );
    const piano = rows as RowDataPacket[];
    return new Piano(
      piano[0].id_piano,
      piano[0].tipo,
      piano[0].prezzo,
      piano[0].limite_salvataggi_modelli,
      piano[0].limite_addestramenti_modelli
    );
  }

  // Effettua l'acquisto di un piano diverso dal Free
  static async AcquistoPiano(idUtente: number, idPiano: number) {
    const conn = await db();
    const [rows] = await conn.query(
      'INSERT INTO acquisto(id_utente, id_piano, data_acquisto, attivo) VALUES (?, ?, ?, ?)',
      [idUtente, idPiano, new Date(), true]
    );
    return rows;
  }

  // Annulla l'acquisto di un piano
  static async annullaPiano(idUtente: number, idPiano: number) {
    const conn = await db();
    const [rows] = await conn.query(
      'UPDATE susdb.acquisto SET attivo = 0 WHERE id_utente = ? AND id_piano = ?',
      [idUtente, idPiano]
    );
    if (rows) {
      return true;
    }
    return false;
  }

  // Inserisce un nuovo piano di tipo Enterprise nel database
  static async InserimentoPianoEnterprise(
    limitiAddestramenti: number,
    limitiSalvataggi: number,
    prezzo: number
  ) {
    const conn = await db();
    await conn.query(
      'INSERT INTO piano(tipo, prezzo, limite_salvataggi_modelli, limite_addestramenti_modelli) VALUES (?, ?, ?, ?)',
      ['Enterprise', prezzo, limitiSalvataggi, limitiAddestramenti]
    );
    const [rows] = await conn.query(
      'SELECT * FROM piano WHERE id_piano = LAST_INSERT_ID()'
    );
    const piano = (rows as RowDataPacket[])[0];
    return new Piano(
      piano.id_piano,
      piano.tipo,
      piano.prezzo,
      piano.limite_salvataggi_modelli,
      piano.limite_addestramenti_modelli
    );
  }
}

export default PianoDAO;
