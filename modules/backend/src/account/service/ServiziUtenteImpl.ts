import UtenteDAO from '../../DAO/UtenteDAO';

class ServiziUtenteImpl {
  /**
   * Esegue l'accesso per un utente.
   *
   * @static
   * @async
   * @method login
   * @param {string} email - L'indirizzo email dell'utente.
   * @param {string} password - La password dell'utente.
   * @returns {Promise<Utente | null>} - L'utente loggato o null se il login fallisce.
   */
  static async login(email: string, password: string) {
    // Invoca il metodo di login di UtenteDAO
    const utenteLogin = await UtenteDAO.login(email, password);

    if (utenteLogin) {
      // Se l'utente esiste
      return utenteLogin; // Restituisci l'utente
    }
    return null; // Altrimenti, restituisci null
  }

  /**
   * Registra un nuovo utente.
   *
   * @static
   * @async
   * @method register
   * @param {string} nome - Il nome dell'utente.
   * @param {string} cognome - Il cognome dell'utente.
   * @param {string} email - L'indirizzo email dell'utente.
   * @param {string} password - La password dell'utente.
   * @returns {Promise<void>} - Promise risolta dopo la registrazione dell'utente.
   */
  static async register(
    nome: string,
    cognome: string,
    email: string,
    password: string,
  ): Promise<void> {
    // Invoca il metodo di registrazione di UtenteDAO
    await UtenteDAO.registrazione(nome, cognome, email, password);
  }

  /**
   * Recupera l'ID di un utente in base all'indirizzo email.
   *
   * @static
   * @async
   * @method getIdUtente
   * @param {string} email - L'indirizzo email dell'utente.
   * @returns {Promise<number>} - L'ID dell'utente o 0 se non trovato.
   */
  static async getIdUtente(email: string) {
    // Invoca il metodo getIdUtente di UtenteDAO
    const idUtente = await UtenteDAO.getIdUtente(email);

    // Se l'id_utente esiste
    if (idUtente) {
      return idUtente; // Restituisci l'id_utente
    }
    return 0; // Altrimenti, restituisci 0
  }

  /**
   * Recupera un utente in base all'ID utente.
   *
   * @static
   * @async
   * @method getUtenteById
   * @param {number} idUtente - L'ID dell'utente.
   * @returns {Promise<Utente | null>} - L'utente o null se non trovato.
   */
  static async getUtenteById(idUtente: number) {
    // Invoca il metodo getUtente di UtenteDAO
    const utente = await UtenteDAO.getUtenteById(idUtente);

    // Se l'utente esiste
    if (utente) {
      return utente; // Restituisci l'utente
    }
    return null; // Altrimenti, restituisci null
  }
}

export default ServiziUtenteImpl;
