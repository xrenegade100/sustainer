import { RowDataPacket } from 'mysql2/promise';
import db from '../db/PoolDB';
import Amministratore from '../account/domain/Amministratore';

/**
 * @class AmministratoreDAO
 * @classdesc Classe che gestisce le operazioni di accesso e manipolazione dei dati degli amministratori nel database.
 */
class AmministratoreDAO {
  /**
   * Effettua il login di un amministratore.
   * @param {string} email - L'email dell'amministratore.
   * @param {string} password - La password dell'amministratore.
   * @returns {Promise<Amministratore | null>} Restituisce un oggetto Amministratore in caso di successo, altrimenti null.
   */
  static async login(
    email: string,
    password: string,
  ){
    const conn = await db();

    const [rows] = await conn.query(
      'SELECT * FROM amministratore WHERE email = ? and password = ?',
      [email, password],
    );
    const amministratore = rows as RowDataPacket;
    if (amministratore.length > 0) {
      const amministratoreLoggato = new Amministratore(
        amministratore[0].nome,
        amministratore[0].cognome,
        amministratore[0].email,
        amministratore[0].password,
      );
      amministratoreLoggato.setIdAmministratore(
        amministratore[0].id_amministratore,
      );
      return amministratoreLoggato;
    }
    return null;
  }

  /**
   * Modifica le informazioni di un utente registrato.
   * @param {string} email - L'email dell'utente da modificare.
   * @param {string} nuovoNome - Il nuovo nome da assegnare all'utente.
   * @param {string} nuovoCognome - Il nuovo cognome da assegnare all'utente.
   * @returns {Promise<void>} Una Promise che si risolve quando la modifica è completata.
   */
  static async modificaInformazioniUtente(
    email: string,
    nuovoNome: string,
    nuovoCognome: string,
  ) {
    const conn = await db();

    await conn.query(
      'UPDATE utente SET nome = ?, cognome = ? WHERE email = ?',
      [nuovoNome, nuovoCognome, email],
    );
  }

  /**
   * Cancella un utente registrato.
   * @param {string} email - L'email dell'utente da cancellare.
   * @returns {Promise<void>} Una Promise che si risolve quando l'utente è stato cancellato.
   */
  static async cancellaUtente(email: string) {
    const conn = await db();

    await conn.query('DELETE FROM utente WHERE email = ?', [email]);
  }

  /**
   * Invia una comunicazione a uno o più utenti.
   * @param {number} idAmministratore - L'ID dell'amministratore che invia la comunicazione.
   * @param {string[]} emails - Un array di indirizzi email dei destinatari.
   * @param {string} messaggio - Il messaggio da inviare.
   * @returns {Promise<void>} Una Promise che si risolve quando la comunicazione è stata inviata.
   */
  static async inviaComunicazione(
    idAmministratore: number,
    emails: string[],
    messaggio: string,
  ) {
    const conn = await db();

    await Promise.all(
      emails.map(async (emailItem) => {
        await conn.query(
          'INSERT INTO comunicazione (id_amministratore, email, messaggio, data_comunicazione) VALUES (?, ?, ?, ?)',
          [idAmministratore, emailItem, messaggio, new Date()],
        );
      }),
    );
  }
}

export default AmministratoreDAO;
