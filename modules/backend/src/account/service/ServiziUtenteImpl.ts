import UtenteDAO from '../../DAO/UtenteDAO';

class ServiziUtenteImpl {
  /**
   * Effettua il login dell'utente.
   * @param email - L'email dell'utente.
   * @param password - La password dell'utente.
   * @returns Una promessa che restituisce l'utente loggato o null se il login fallisce.
   */
  static async login(email: string, password: string) {
    // richiamo il metodo login del UtenteDAO
    const utenteLogin = await UtenteDAO.login(email, password);

    if (utenteLogin) {
      // se l'utente esiste
      return utenteLogin; // ritorno l'utente
    }
    return null; // altrimenti ritorno null
  }

  /**
   * Effettua la registrazione di un nuovo utente.
   * @param nome - Il nome del nuovo utente.
   * @param cognome - Il cognome del nuovo utente.
   * @param email - L'email del nuovo utente.
   * @param password - La password del nuovo utente.
   */
  static async register(nome: string, cognome: string, email: string, password: string) {
    // richiamo il metodo registrazione del UtenteDAO
    await UtenteDAO.registrazione(nome, cognome, email, password);
  }

  /**
   * Ottiene l'ID dell'utente in base all'email.
   * @param email - L'email dell'utente.
   * @returns Una promessa che restituisce l'ID dell'utente o 0 se l'utente non esiste.
   */
  static async getIdUtente(email: string) {
    // richiamo il metodo getIdUtente del UtenteDAO
    const idUtente = await UtenteDAO.getIdUtente(email);
    // se l'id_utente esiste
    if (idUtente) {
      return idUtente; // ritorno l'id_utente
    }
    return 0;
  }

  /**
   * Ottiene l'utente in base all'ID utente.
   * @param idUtente - L'ID dell'utente.
   * @returns Una promessa che restituisce l'utente o null se l'utente non esiste.
   */
  static async getUtenteById(idUtente: number) {
    // richiamo il metodo getUtente del UtenteDAO
    const utente = await UtenteDAO.getUtenteById(idUtente);
    // se l'utente esiste
    if (utente) {
      return utente; // ritorno l'utente
    }
    return null;
  }
}

export default ServiziUtenteImpl;
