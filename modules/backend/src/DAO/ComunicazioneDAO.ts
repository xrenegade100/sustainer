/**
 * @fileOverview
 * @module ComunicazioneDAO
 * @description Fornisce metodi di accesso ai dati per interagire con la tabella 'comunicazione' nel database.
 * @requires ../db/PoolDB
 */

import db from '../db/PoolDB';

/**
 * @class
 * @classdesc Rappresenta un Oggetto di Accesso ai Dati (DAO) per gestire operazioni relative alla tabella 'comunicazione'.
 */
class ComunicazioneDAO {
  /**
   * Recupera tutte le comunicazioni dalla tabella 'comunicazione'.
   * @static
   * @async
   * @returns {Promise<any[]>} Una Promise che si risolve con un array contenente tutte le comunicazioni.
   */
  static async getAllComunicazioni() {
    const conn = await db(); // Stabilisce una connessione al database
    const [rows] = await conn.query('SELECT * FROM comunicazione'); // Query che ritorna tutte le comunicazioni
    return rows;
  }
}

export default ComunicazioneDAO;
