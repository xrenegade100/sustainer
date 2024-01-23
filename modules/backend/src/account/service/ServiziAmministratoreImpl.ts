import AmministratoreDAO from '../../DAO/AmministratoreDAO';

class ServiziAmministratoreImpl {
  /**
   * Esegue l'accesso per un amministratore.
   *
   * @static
   * @async
   * @method loginIMP
   * @param {string} email - L'indirizzo email dell'amministratore.
   * @param {string} password - La password dell'amministratore.
   * @returns {Promise<Amministratore | null>} - L'amministratore loggato o null se il login fallisce.
   */
  static async loginIMP(email: string, password: string) {
    const amministratoreLogin = await AmministratoreDAO.login(email, password);
    if (amministratoreLogin) {
      return amministratoreLogin;
    }
    return null;
  }

  /**
   * Modifica le informazioni di un utente.
   *
   * @static
   * @async
   * @method modificaInformazioniUtenteIMP
   * @param {string} email - L'indirizzo email dell'utente da modificare.
   * @param {string} nuovoNome - Il nuovo nome dell'utente.
   * @param {string} nuovoCognome - Il nuovo cognome dell'utente.
   * @returns {Promise<Utente | null>} - L'utente modificato o null se la modifica fallisce.
   */
  static async modificaInformazioniUtenteIMP(
    email: string,
    nuovoNome: string,
    nuovoCognome: string,
  ) {
    const utenteModificato = await AmministratoreDAO.modificaInformazioniUtente(
      email,
      nuovoNome,
      nuovoCognome,
    );
    if (utenteModificato !== null && utenteModificato !== undefined) {
      return utenteModificato;
    }
    return null;
  }

  /**
   * Cancella un utente.
   *
   * @static
   * @async
   * @method cancellaUtenteIMP
   * @param {string} email - L'indirizzo email dell'utente da cancellare.
   * @returns {Promise<Utente | null>} - L'utente cancellato o null se la cancellazione fallisce.
   */
  static async cancellaUtenteIMP(email: string) {
    const utenteCancellato = await AmministratoreDAO.cancellaUtente(email);
    if (utenteCancellato !== null && utenteCancellato !== undefined) {
      return utenteCancellato;
    }
    return null;
  }
}

export default ServiziAmministratoreImpl;
