import { RowDataPacket } from 'mysql2';
import db from '../db/PoolDB';
import Preventivo from '../preventivo/domain/Preventivo';

class PreventivoDAO {
  // funzione asincrona che ritorna tutti i preventivi
  static async getPreventivi() {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query('SELECT * FROM preventivo'); // query che ritorna tutti i preventivi
    const preventivi = rows as RowDataPacket[]; // assegno a preventivi i risultati della query
    return preventivi.map(
      (preventivo) =>
        new Preventivo(
          preventivo.id_preventivo,
          preventivo.id_utente,
          preventivo.limiti_addestramenti,
          preventivo.limiti_salvataggi,
          preventivo.prezzo,
          preventivo.stato,
        ),
    ); // ritorno un array di oggetti di tipo Preventivo
  }

  // funzione asincrona che ritorna un preventivo in base al suo id
  static async getPreventivo(idUtente: number) {
    const conn = await db(); // connessione al db
    try {
      const [rows] = await conn.query(
        'SELECT * FROM preventivo WHERE id_utente = ?',
        idUtente,
      ); // query che ritorna il preventivo con id = idPreventivo
      const preventivo = rows as RowDataPacket[]; // assegno a preventivo i risultati della query
      return new Preventivo(
        preventivo[0].id_preventivo,
        preventivo[0].id_utente,
        preventivo[0].limiti_addestramenti,
        preventivo[0].limiti_salvataggi,
        preventivo[0].prezzo,
        preventivo[0].stato,
      );
    } catch (error) {
      return null;
    }
  }

  // funzione asincrona che crea un preventivo
  static async creaPreventivo(
    idUtente: number,
    limitiAddestramenti: number,
    limitiSalvataggi: number,
  ) {
    const conn = await db(); // connessione al db
    // eslint-disable-next-line max-len
    await conn.query(
      'INSERT INTO preventivo(id_utente, limiti_addestramenti, limiti_salvataggi, prezzo, stato) VALUES(?, ?, ?, ?, ?)',
      [idUtente, limitiAddestramenti, limitiSalvataggi, 0, 'In lavorazione'],
    ); // query che crea un preventivo // ritorno un oggetto di tipo Preventivo
    return null;
  }

  // funzione asincrona che elimina un preventivo
  static async eliminaPreventivo(idUtente: number) {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query(
      'DELETE FROM preventivo WHERE id_utente = ?',
      idUtente,
    ); // query che elimina un preventivo
    const preventivo = rows as RowDataPacket[]; // assegno a preventivo i risultati della query
    return new Preventivo(
      preventivo[0].id_preventivo,
      preventivo[0].id_utente,
      preventivo[0].limiti_addestramenti,
      preventivo[0].limiti_salvataggi,
      preventivo[0].prezzo,
      preventivo[0].stato,
    ); // ritorno un oggetto di tipo Preventivo
  }

  // funzione asincrona che ritorna l'id del preventivo
  static async getIdPreventivo(idUtente: number) {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query(
      'SELECT id_preventivo FROM preventivo WHERE id_utente = ?',
      idUtente,
    ); // query che ritorna l'id del preventivo
    const preventivo = rows as RowDataPacket[]; // assegno a preventivo i risultati della query
    return preventivo[0].id_preventivo; // ritorno l'id del preventivo
  }

  // funzione asincrona che ritorna i limiti di addestramenti di un preventivo
  // dove l'id preventivo è uguale a idPreventivo
  static async getLimitiAddestramenti(idUtente: number) {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query(
      'SELECT limiti_addestramenti FROM preventivo WHERE id_utente = ?',
      idUtente,
    ); // query che ritorna i limiti di addestramenti di un preventivo
    const preventivo = rows as RowDataPacket[]; // assegno a preventivo i risultati della query
    return preventivo[0].limiti_addestramenti; // ritorno i limiti di addestramenti
  }

  // funzione asincrona che ritorna i limiti di salvataggi di un preventivo
  static async getLimitiSalvataggi(idUtente: number) {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query(
      'SELECT limiti_salvataggi FROM preventivo WHERE id_utente = ?',
      idUtente,
    ); // query che ritorna i limiti di salvataggi di un preventivo
    const preventivo = rows as RowDataPacket[]; // assegno a preventivo i risultati della query
    return preventivo[0].limiti_salvataggi; // ritorno i limiti di salvataggi
  }

  // funzione asincrona che ritorna il prezzo di un preventivo

  static async getPrezzo(idUtente: number) {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query(
      'SELECT prezzo FROM preventivo WHERE id_utente = ?',
      idUtente,
    ); // query che ritorna il prezzo di un preventivo
    const preventivo = rows as RowDataPacket[]; // assegno a preventivo i risultati della query
    return preventivo[0].prezzo; // ritorno il prezzo
  }

  // funzione asincrona che ritorna lo stato di un preventivo
  static async getStato(idUtente: number): Promise<string> {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query<RowDataPacket[]>(
      'SELECT stato FROM preventivo WHERE id_utente = ?',
      [idUtente],
    );

    // Verifica se la query ha restituito risultati
    if (rows && rows.length > 0) {
      const preventivo = rows[0];
      return preventivo.stato; // ritorno lo stato
    }
    // Gestisci il caso in cui la query non restituisce risultati
    console.error('Nessun risultato trovato per idUtente:', idUtente);
    return 'Stato non disponibile';
  }

  // funzione asincrona che permette di inserire il prezzo di un preventivo
  // dove l'id dell'utente è uguale a idUtente
  static async setPrezzo(idPreventivo: number, prezzo: number) {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query(
      'UPDATE preventivo SET prezzo = ? WHERE id_utente = ?',
      [prezzo, idPreventivo],
    ); // query che permette di inserire il prezzo di un preventivo
    const preventivo = rows as RowDataPacket[]; // assegno a preventivo i risultati della query
    return new Preventivo(
      preventivo[0].id_preventivo,
      preventivo[0].id_utente,
      preventivo[0].limiti_addestramenti,
      preventivo[0].limiti_salvataggi,
      preventivo[0].prezzo,
      preventivo[0].stato,
    ); // ritorno un oggetto di tipo Preventivo
  }

  // funzione asincrona che permette di inserire lo stato di un preventivo
  // dove l'id dell'utente è uguale a idUtente
  static async setStato(idPreventivo: number, stato: string) {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query(
      'UPDATE preventivo SET stato = ? WHERE id_utente = ?',
      [stato, idPreventivo],
    ); // query che permette di inserire lo stato di un preventivo
    const preventivo = rows as RowDataPacket[]; // assegno a preventivo i risultati della query
    return new Preventivo(
      preventivo[0].id_preventivo,
      preventivo[0].id_utente,
      preventivo[0].limiti_addestramenti,
      preventivo[0].limiti_salvataggi,
      preventivo[0].prezzo,
      preventivo[0].stato,
    ); // ritorno un oggetto di tipo Preventivo
  }

  // funzione asincrona che modifica un preventivo
  static async ModificaPreventivo(
    stato: string,
    prezzo: number,
    idPreventivo: number,
  ) {
    if (!prezzo || prezzo < 0) {
      prezzo = 0;
    }
    if (!stato) {
      stato = 'In lavorazione';
    }
    const conn = await db(); // connessione al db
    await conn.query(
      'UPDATE preventivo SET stato = ?, prezzo = ? WHERE id_preventivo = ?',
      [stato, prezzo, idPreventivo],
    ); // query che modifica un preventivo
    return null;
  }
}
export default PreventivoDAO;
