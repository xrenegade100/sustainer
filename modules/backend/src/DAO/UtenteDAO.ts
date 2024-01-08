/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { RowDataPacket } from 'mysql2/promise';
import db from '../db/poolDB';
import Utente from '../account/domain/utente';

class UtenteDAO {
  // creo il metodo per la registrazione di un utente
  static async registrazione(
    nome: string,
    cognome: string,
    email: string,
    password: string,
  ) {
    const conn = await db(); // connessione al db
    await conn.query(
      'INSERT INTO utente(nome, cognome, email, password) VALUES (?, ?, ?, ?)', // query che inserisce un utente nel db
      [nome, cognome, email, password], // parametri della query
    );
  }

  // creo il metodo per il login
  static async login(email: string, password: string): Promise<Utente | null> {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query(
      'SELECT * FROM utente WHERE email = ? and password = ?', // query che ritorna un utente in base all'email e alla password
      [email, password], // parametri della query
    );
    const utente = rows as RowDataPacket; // assegno a utente i risultati della query
    if (utente.length > 0) {
      const utenteLoggato = new Utente(
        utente[0].nome,
        utente[0].cognome,
        utente[0].email,
        utente[0].password,
      );
      utenteLoggato.setIdUtente(utente[0].id_utente);
      // setto l'id richiamando la funzione set_id_utente
      return utenteLoggato; // ritorno l'utente
    }
    return null;
  }

  // creo il metodo per il ritorno di tutti gli utenti
  static async getAllUtenti(): Promise<Utente[]> {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query('SELECT * FROM utente'); // query che ritorna tutti gli utenti
    const utenti = rows as RowDataPacket[]; // assegno a utenti i risultati della query
    // ritorno un oggetto mappato con tutti gli utenti
    return utenti.map(
      (utente) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        new Utente(utente.nome, utente.cognome, utente.email, utente.password),
    );
  }

  // creo il metodo per il ritorno di un id_utente in base all'email
  static async getIdUtente(email: string): Promise<number> {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query(
      'SELECT id_utente FROM utente WHERE email = ?', // query che ritorna l'id_utente in base all'email
      [email], // ricordiamo che l'email è univoca
    );
    const utente = rows as RowDataPacket[]; // assegno a utente i risultati della query
    return utente[0].id_utente; // ritorno l'id_utente
  }
}

export default UtenteDAO;
