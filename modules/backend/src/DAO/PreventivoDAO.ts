import { RowDataPacket } from 'mysql2';
import db from '../db/PoolDB';
import Preventivo from '../preventivo/domain/Preventivo';

class PreventivoDAO {
  // funzione asincrona che ritorna un preventivo in base al suo id
  static async getPreventivo(idPreventivo: number) {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query('SELECT * FROM preventivo WHERE id_preventivo = ?', idPreventivo); // query che ritorna il preventivo con id = idPreventivo
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

  // funzione asincrona che crea un preventivo
  static async creaPreventivo(
    idUtente: number,
    limitiAddestramenti: number,
    limitiSalvataggi: number,
    prezzo: number,
    stato: string,
  ) {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query('INSERT INTO preventivo(id_utente, limiti_addestramenti, limiti_salvataggi, prezzo, stato) VALUES(?, ?, ?, 0, ?)', [idUtente, limitiAddestramenti, limitiSalvataggi, prezzo, stato]); // query che crea un preventivo
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

  // funzione asincrona che elimina un preventivo
  static async eliminaPreventivo(idPreventivo: number) {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query('DELETE FROM preventivo WHERE id_preventivo = ?', idPreventivo); // query che elimina un preventivo
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
    const [rows] = await conn.query('SELECT id_preventivo FROM preventivo WHERE id_utente = ?', idUtente); // query che ritorna l'id del preventivo
    const preventivo = rows as RowDataPacket[]; // assegno a preventivo i risultati della query
    return preventivo[0].id_preventivo; // ritorno l'id del preventivo
  }

  // funzione asincrona che ritorna i limiti di addestramenti di un preventivo
  // dove l'id preventivo è uguale a idPreventivo
  static async getLimitiAddestramenti(idPreventivo: number) {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query('SELECT limiti_addestramenti FROM preventivo WHERE id_preventivo = ?', idPreventivo); // query che ritorna i limiti di addestramenti di un preventivo
    const preventivo = rows as RowDataPacket[]; // assegno a preventivo i risultati della query
    return preventivo[0].limiti_addestramenti; // ritorno i limiti di addestramenti
  }

  // funzione asincrona che ritorna i limiti di salvataggi di un preventivo
  static async getLimitiSalvataggi(idPreventivo: number) {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query('SELECT limiti_salvataggi FROM preventivo WHERE id_preventivo = ?', idPreventivo); // query che ritorna i limiti di salvataggi di un preventivo
    const preventivo = rows as RowDataPacket[]; // assegno a preventivo i risultati della query
    return preventivo[0].limiti_salvataggi; // ritorno i limiti di salvataggi
  }

  // funzione asincrona che ritorna il prezzo di un preventivo

  static async getPrezzo(idPreventivo: number) {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query('SELECT prezzo FROM preventivo WHERE id_preventivo = ?', idPreventivo); // query che ritorna il prezzo di un preventivo
    const preventivo = rows as RowDataPacket[]; // assegno a preventivo i risultati della query
    return preventivo[0].prezzo; // ritorno il prezzo
  }

  // funzione asincrona che ritorna lo stato di un preventivo
  // dove l'id del preventivo è uguale a idPreventivo
  static async getStato(idPreventivo: number) {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query('SELECT stato FROM preventivo WHERE id_preventivo = ?', idPreventivo); // query che ritorna lo stato di un preventivo
    const preventivo = rows as RowDataPacket[]; // assegno a preventivo i risultati della query
    return preventivo[0].stato; // ritorno lo stato
  }

  // funzione asincrona che permette di inserire il prezzo di un preventivo
  // dove l'id dell'utente è uguale a idUtente
  static async setPrezzo(idPreventivo: number, prezzo: number) {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query('UPDATE preventivo SET prezzo = ? WHERE id_utente = ?', [prezzo, idPreventivo]); // query che permette di inserire il prezzo di un preventivo
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
    const [rows] = await conn.query('UPDATE preventivo SET stato = ? WHERE id_utente = ?', [stato, idPreventivo]); // query che permette di inserire lo stato di un preventivo
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
}
export default PreventivoDAO;
