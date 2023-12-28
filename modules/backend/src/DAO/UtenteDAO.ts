import { RowDataPacket } from 'mysql2/promise';
import db from '../db/poolDB';
import Utente from '../account/domain/Utente';

class UtenteDAO {
  // creo il metodo per la registrazione
  static async registrazione(
    nome: string,
    cognome: string,
    email: string,
    password: string,
  ) {
    const conn = await db();

    const utente = await conn.query(
      'INSERT INTO utente(nome, cognome, email, password) VALUES (?, ?, ?, ?)',
      [nome, cognome, email, password],
    );

    const id_piano = (await conn.query(
      'SELECT id_piano FROM susdb.piano WHERE tipo = "Free"',
    )) as RowDataPacket[];

    const id_utente = (await conn.query(
      'SELECT id_utente FROM susdb.utente WHERE email = ?',
      [email],
    )) as RowDataPacket[];

    const acquisto = await conn.query(
      'INSERT INTO acquisto(id_utente, id_piano, data_acquisto) VALUES (?, ?, ?)',
      [id_utente[0][0].id_utente, id_piano[0][0].id_piano, new Date()],
    );
  }

  // creo il metodo per il login
  static async login(email: string, password: string): Promise<Utente | null> {
    const conn = await db();

    const [rows] = await conn.query(
      'SELECT * FROM utente WHERE email = ? and password = ?',
      [email, password],
    );
    const utente = rows as RowDataPacket;
    if (utente.length > 0) {
      const utenteLoggato = new Utente(
        utente[0].nome,
        utente[0].cognome,
        utente[0].email,
        utente[0].password,
      );
      utenteLoggato.set_id_utente(utente[0].id_utente);
      return utenteLoggato;
    }
    return null;
  }

  // creo il metodo per il ritorno di tutti gli utenti
  static async getAllUtenti(): Promise<Utente[]> {
    const conn = await db();

    const [rows] = await conn.query('SELECT * FROM utente');
    const utenti = rows as RowDataPacket[];
    return utenti.map(
      (utente) =>
        new Utente(utente.nome, utente.cognome, utente.email, utente.password),
    );
  }
}

export default UtenteDAO;
