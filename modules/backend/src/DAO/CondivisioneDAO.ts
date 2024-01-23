/**
 * @fileOverview
 * @module CondivisioneDAO
 * @description Fornisce metodi di accesso ai dati per interagire con la tabella 'condivisione' nel database.
 * @requires ../db/PoolDB
 */

import db from '../db/PoolDB';

/**
 * @class
 * @classdesc Rappresenta un Oggetto di Accesso ai Dati (DAO) per gestire operazioni relative alla tabella 'condivisione'.
 */
class CondivisioneDAO {
  /**
   * Recupera tutte le condivisioni dalla tabella 'condivisione'.
   * @static
   * @async
   * @returns {Promise<any[]>} Una Promise che si risolve con un array contenente tutte le condivisioni.
   */
  static async getAllCondivisioni() {
    const conn = await db(); // Connessione al database
    const [rows] = await conn.query(
      'SELECT * FROM condivisione', // Query che seleziona tutte le condivisioni dal database
    );
    return rows;
  }
}

export default CondivisioneDAO;
