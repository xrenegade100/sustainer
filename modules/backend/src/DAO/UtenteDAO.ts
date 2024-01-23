/**
 * @fileOverview
 * @module UtenteDAO
 * @description Fornisce metodi di accesso ai dati per interagire con la tabella 'utente' nel database.
 * @requires RowDataPacket
 * @requires mysql2/promise
 * @requires ../db/PoolDB
 * @requires ../account/domain/Utente
 */

/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

import { RowDataPacket } from 'mysql2/promise';
import db from '../db/PoolDB';
import Utente from '../account/domain/Utente';

/**
 * @class
 * @classdesc Rappresenta un Oggetto di Accesso ai Dati (DAO) per gestire operazioni relative alla tabella 'utente'.
 */
class UtenteDAO {
  /**
   * Registra un nuovo utente nel database.
   * @static
   * @async
   * @param {string} nome - Il nome dell'utente.
   * @param {string} cognome - Il cognome dell'utente.
   * @param {string} email - L'indirizzo email dell'utente.
   * @param {string} password - La password dell'utente.
   * @returns {Promise<void>} Una Promise che si risolve una volta completata la registrazione.
   */
  static async registrazione(
    nome: string,
    cognome: string,
    email: string,
    password: string,
  ) {
    const conn = await db(); // Stabilisce una connessione al database
    await conn.query(
      'INSERT INTO utente(nome, cognome, email, password) VALUES (?, ?, ?, ?)',
      [nome, cognome, email, password],
    );
  }

  /**
   * Effettua il login di un utente verificando l'email e la password fornite.
   * @static
   * @async
   * @param {string} email - L'indirizzo email dell'utente.
   * @param {string} password - La password dell'utente.
   * @returns {Promise<Utente | null>} Una Promise che si risolve con l'utente loggato o null se il login fallisce.
   */
  static async login(email: string, password: string) {
    const conn = await db(); // Stabilisce una connessione al database
    const [rows] = await conn.query(
      'SELECT * FROM utente WHERE email = ? and password = ?',
      [email, password],
    );
    const utente = rows as RowDataPacket[];

    if (utente.length > 0) {
      const utenteLoggato = new Utente(
        utente[0].nome,
        utente[0].cognome,
        utente[0].email,
        utente[0].password,
      );
      utenteLoggato.setIdUtente(utente[0].id_utente);
      return utenteLoggato;
    }

    return null;
  }

  /**
   * Recupera tutti gli utenti dalla tabella 'utente'.
   * @static
   * @async
   * @returns {Promise<Utente[]>} Una Promise che si risolve con un array di oggetti Utente.
   */
  static async getAllUtenti() {
    const conn = await db(); // Stabilisce una connessione al database
    const [rows] = await conn.query('SELECT * FROM utente');
    const utenti = rows as RowDataPacket[];

    return utenti.map(
      (utente) =>
        new Utente(utente.nome, utente.cognome, utente.email, utente.password),
    );
  }

  /**
   * Recupera l'ID utente basato sull'email fornita.
   * @static
   * @async
   * @param {string} email - L'indirizzo email dell'utente.
   * @returns {Promise<number>} Una Promise che si risolve con l'ID utente.
   */
  static async getIdUtente(email: string) {
    const conn = await db(); // Stabilisce una connessione al database
    const [rows] = await conn.query(
      'SELECT id_utente FROM utente WHERE email = ?',
      [email],
    );
    const utente = rows as RowDataPacket[];

    return utente[0].id_utente;
  }

  /**
   * Recupera un utente basato sull'ID utente fornito.
   * @static
   * @async
   * @param {number} idUtente - L'ID dell'utente.
   * @returns {Promise<Utente>} Una Promise che si risolve con l'oggetto Utente.
   */
  static async getUtenteById(idUtente: number) {
    const conn = await db(); // Stabilisce una connessione al database
    const [rows] = await conn.query(
      'SELECT * FROM utente WHERE id_utente = ?',
      [idUtente],
    );
    const utente = rows as RowDataPacket[];

    return new Utente(
      utente[0].nome,
      utente[0].cognome,
      utente[0].email,
      utente[0].password,
    );
  }
}

export default UtenteDAO;
