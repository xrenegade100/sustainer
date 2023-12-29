import { RowDataPacket } from 'mysql2/promise';
import db from '../db/poolDB';
import Amministratore from '../account/domain/Amministratore';
import Utente from '../account/domain/Utente';

class AmministratoreDAO {
  // creo il metodo per il login
  static async login(email: string, password: string): Promise<Amministratore | null> {
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
      amministratoreLoggato.set_id_amministratore(amministratore[0].id_amministratore);
      return amministratoreLoggato;
    }
    return null;
  }

  // creo il metodo per la visualizzazione di tutti gli utenti registrati
  static async visualizzaUtenti(): Promise<Utente[]> {
    const conn = await db();

    const [rows] = await conn.query(
      'SELECT * FROM utente',
    );
    const utenti = rows as RowDataPacket;
    const utentiRegistrati: Utente[] = [];
    utenti.forEach((utente: RowDataPacket) => {
      const utenteRegistrato = new Utente(
        utente.nome,
        utente.cognome,
        utente.email,
        utente.password,
      );
      utenteRegistrato.set_id_utente(utente.id_utente);
      utentiRegistrati.push(utenteRegistrato);
    });
    return utentiRegistrati;
  }

  // creo il metodo per la modifica delle informazioni degli utenti registrati
  // eslint-disable-next-line max-len
  static async modificaInformazioniUtente(email: string, nuovoNome: string, nuovoCognome: string): Promise<void> {
    const conn = await db();

    await conn.query(
      'UPDATE utente SET nome = ?, cognome = ? WHERE email = ?',
      [nuovoNome, nuovoCognome, email],
    );
  }

  // creo il metodo per la cancellazione di un utente registrato
  static async cancellaUtente(email: string) : Promise<void> {
    const conn = await db();

    await conn.query(
      'DELETE FROM utente WHERE email = ?',
      [email],
    );
  }

  // creo il metodo per inviare una comunicazione
  // eslint-disable-next-line max-len
  static async inviaComunicazione(idAmministratore: number, emails: string[], messaggio: string): Promise<void> {
    const conn = await db();

    emails.forEach(async (emailItem) => {
      await conn.query(
        'INSERT INTO comunicazione (id_amministratore, email, messaggio, data_comunicazione) VALUES (?, ?, ?, ?)',
        [idAmministratore, emailItem, messaggio, new Date()],
      );
    });
  }
}
export default AmministratoreDAO;
