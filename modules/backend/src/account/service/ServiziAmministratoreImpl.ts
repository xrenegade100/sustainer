import AmministratoreDAO from '../../DAO/AmministratoreDAO';

class ServiziAmministratoreImpl {
  /**
   * Effettua il login dell'amministratore.
   * @param email - L'email dell'amministratore.
   * @param password - La password dell'amministratore.
   * @returns Una promessa che restituisce l'amministratore loggato o null se il login fallisce.
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
   * @param email - L'email dell'utente da modificare.
   * @param nuovoNome - Il nuovo nome da assegnare all'utente.
   * @param nuovoCognome - Il nuovo cognome da assegnare all'utente.
   * @returns Una promessa che restituisce l'utente modificato o null se la modifica fallisce.
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
   * @param email - L'email dell'utente da cancellare.
   * @returns Una promessa che restituisce l'utente cancellato o null se la cancellazione fallisce.
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
