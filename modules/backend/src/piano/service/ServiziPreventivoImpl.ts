import PreventivoDAO from '../../DAO/PreventivoDAO';

class ServiziPreventivoImpl {
  /**
 * Metodo statico che restituisce tutti i preventivi.
 * @returns Un array di preventivi o `null` se non sono disponibili.
 */
  static async TuttiPreventivi() {
    // richiamo il metodo TuttiPreventivi del PreventivoDAO
    const preventivi = await PreventivoDAO.getPreventivi();
    if (preventivi) {
      return preventivi;
    }
    return null;
  }

 /**
 * Metodo statico che crea un nuovo preventivo.
 * @param idUtente - L'identificativo dell'utente associato al preventivo.
 * @param limitiAddestramenti - I limiti di addestramenti associati al preventivo.
 * @param limitiSalvataggi - I limiti di salvataggi associati al preventivo.
 * @returns Il preventivo creato o `null` in caso di errore.
 */
  static async creaPreventivo(
    idUtente: number,
    limitiAddestramenti: number,
    limitiSalvataggi: number,
  ) {
    // richiamo il metodo creaPreventivo del PreventivoDAO
    const preventivo = await PreventivoDAO.creaPreventivo(
      idUtente,
      limitiAddestramenti,
      limitiSalvataggi,
    );
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  /**
 * Metodo statico che elimina un preventivo.
 * @param idUtente - L'identificativo dell'utente associato al preventivo.
 * @returns Il preventivo eliminato o `null` in caso di errore.
 */
  static async eliminaPreventivo(idUtente: number) {
    // richiamo il metodo eliminaPreventivo del PreventivoDAO
    const preventivoElim = await PreventivoDAO.eliminaPreventivo(idUtente);
    if (preventivoElim !== null && preventivoElim !== undefined) {
      return preventivoElim;
    }
    return null;
  }

  /**
 * Metodo statico che restituisce un preventivo.
 * @param idUtente - L'identificativo dell'utente associato al preventivo.
 * @returns Il preventivo richiesto o `null` se non disponibile.
 */
  static async getPreventivo(idUtente: number) {
    // richiamo il metodo getPreventivo del PreventivoDAO
    const preventivo = await PreventivoDAO.getPreventivo(idUtente);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  /**
 * Metodo statico che restituisce l'identificativo di un preventivo.
 * @param idUtente - L'identificativo dell'utente associato al preventivo.
 * @returns L'identificativo del preventivo o `null` se non disponibile.
 */
  static async getIdPreventivo(idUtente: number) {
    // richiamo il metodo getIdPreventivo del PreventivoDAO
    const preventivo = await PreventivoDAO.getIdPreventivo(idUtente);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  /**
 * Metodo statico che restituisce i limiti di addestramento di un preventivo.
 * @param idUtente - L'identificativo dell'utente associato al preventivo.
 * @returns I limiti di addestramento richiesti o `null` se non disponibili.
 */
  static async getLimitiAddestramenti(idUtente: number) {
    // richiamo il metodo getLimitiAddestramento del PreventivoDAO
    const preventivo = await PreventivoDAO.getLimitiAddestramenti(idUtente);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  /**
 * Metodo statico che restituisce i limiti di salvataggio di un preventivo.
 * @param idUtente - L'identificativo dell'utente associato al preventivo.
 * @returns I limiti di salvataggio richiesti o `null` se non disponibili.
 */
  static async getLimitiSalvataggi(idUtente: number) {
    // richiamo il metodo getLimitiSalvataggi del PreventivoDAO
    const preventivo = await PreventivoDAO.getLimitiSalvataggi(idUtente);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  /**
 * Metodo statico che restituisce il prezzo di un preventivo.
 * @param idUtente - L'identificativo dell'utente associato al preventivo.
 * @returns Il prezzo richiesto o `null` se non disponibile.
 */
  static async getPrezzo(idUtente: number) {
    // richiamo il metodo getPrezzo del PreventivoDAO
    const preventivo = await PreventivoDAO.getPrezzo(idUtente);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  /**
 * Metodo statico che restituisce lo stato di un preventivo.
 * @param idUtente - L'identificativo dell'utente associato al preventivo.
 * @returns Lo stato del preventivo o `null` se non disponibile.
 */
  static async getStato(idUtente: number) {
    // richiamo il metodo getStato del PreventivoDAO
    const preventivo = await PreventivoDAO.getStato(idUtente);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  /**
 * Metodo statico che aggiorna lo stato di un preventivo.
 * @param idPreventivo - L'identificativo del preventivo da aggiornare.
 * @param stato - Il nuovo stato da assegnare al preventivo.
 * @returns Il preventivo aggiornato o `null` in caso di errore.
 */
  static async aggiornaStato(idPreventivo: number, stato: string) {
    // richiamo il metodo setStato del PreventivoDAO
    const preventivo = await PreventivoDAO.setStato(idPreventivo, stato);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  /**
 * Metodo statico che aggiorna il prezzo di un preventivo.
 * @param idPreventivo - L'identificativo del preventivo da aggiornare.
 * @param prezzo - Il nuovo prezzo da assegnare al preventivo.
 * @returns Il preventivo aggiornato o `null` in caso di errore.
 */
  static async aggiornaPrezzo(idPreventivo: number, prezzo: number) {
    // richiamo il metodo setPrezzo del PreventivoDAO
    const preventivo = await PreventivoDAO.setPrezzo(idPreventivo, prezzo);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }
  /**
 * Metodo statico che elimina un preventivo per identificativo.
 * @param idPreventivo - L'identificativo del preventivo da eliminare.
 */
  static async eliminaPreventivoById(idPreventivo: number) {
    // richiamo il metodo elminiaPreventivo del PreventivoDAO
    await PreventivoDAO.eliminaPreventivoById(idPreventivo);
  }

 /**
 * Metodo statico che modifica un preventivo.
 * @param stato - Il nuovo stato da assegnare al preventivo.
 * @param prezzo - Il nuovo prezzo da assegnare al preventivo.
 * @param idPreventivo - L'identificativo del preventivo da modificare.
 * @returns Il preventivo modificato o `null` in caso di errore.
 */
  static async ModificaPreventivo(
    stato: string,
    prezzo: number,
    idPreventivo: number,
  ) {
    // richiamo il metodo ModificaPreventivo del PreventivoDAO
    const preventivo = await PreventivoDAO.ModificaPreventivo(
      stato,
      prezzo,
      idPreventivo,
    );
    if (preventivo) {
      return preventivo;
    }
    return null;
  }
}
export default ServiziPreventivoImpl;
