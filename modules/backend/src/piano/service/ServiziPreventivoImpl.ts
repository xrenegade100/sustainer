import PreventivoDAO from '../../DAO/PreventivoDAO';

class ServiziPreventivoImpl {
 /**
   * Recupera tutti i preventivi.
   * @returns Un array contenente tutti i preventivi.
   */
 static async TuttiPreventivi() {
  // Richiamo il metodo TuttiPreventivi del PreventivoDAO
  const preventivi = await PreventivoDAO.getPreventivi();
  if (preventivi) {
    return preventivi;
  }
  return null;
}

/**
 * Crea un nuovo preventivo.
 * @param idUtente - L'ID dell'utente associato al preventivo.
 * @param limitiAddestramenti - Il limite di addestramenti associato al preventivo.
 * @param limitiSalvataggi - Il limite di salvataggi associato al preventivo.
 * @returns Il preventivo creato.
 */
static async creaPreventivo(
  idUtente: number,
  limitiAddestramenti: number,
  limitiSalvataggi: number,
) {
  // Richiamo il metodo creaPreventivo del PreventivoDAO
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
 * Elimina un preventivo associato a un utente.
 * @param idUtente - L'ID dell'utente associato al preventivo da eliminare.
 * @returns Il preventivo eliminato.
 */
static async eliminaPreventivo(idUtente: number) {
  // Richiamo il metodo eliminaPreventivo del PreventivoDAO
  const preventivoElim = await PreventivoDAO.eliminaPreventivo(idUtente);
  if (preventivoElim !== null && preventivoElim !== undefined) {
    return preventivoElim;
  }
  return null;
}

/**
 * Recupera un preventivo associato a un utente.
 * @param idUtente - L'ID dell'utente associato al preventivo da recuperare.
 * @returns Il preventivo recuperato.
 */
static async getPreventivo(idUtente: number) {
  // Richiamo il metodo getPreventivo del PreventivoDAO
  const preventivo = await PreventivoDAO.getPreventivo(idUtente);
  if (preventivo) {
    return preventivo;
  }
  return null;
}

/**
 * Recupera l'ID di un preventivo associato a un utente.
 * @param idUtente - L'ID dell'utente associato al preventivo.
 * @returns L'ID del preventivo.
 */
static async getIdPreventivo(idUtente: number) {
  // Richiamo il metodo getIdPreventivo del PreventivoDAO
  const preventivo = await PreventivoDAO.getIdPreventivo(idUtente);
  if (preventivo) {
    return preventivo;
  }
  return null;
}

/**
 * Recupera i limiti di addestramento di un preventivo associato a un utente.
 * @param idUtente - L'ID dell'utente associato al preventivo.
 * @returns I limiti di addestramento del preventivo.
 */
static async getLimitiAddestramenti(idUtente: number) {
  // Richiamo il metodo getLimitiAddestramento del PreventivoDAO
  const preventivo = await PreventivoDAO.getLimitiAddestramenti(idUtente);
  if (preventivo) {
    return preventivo;
  }
  return null;
}

/**
 * Recupera i limiti di salvataggio di un preventivo associato a un utente.
 * @param idUtente - L'ID dell'utente associato al preventivo.
 * @returns I limiti di salvataggio del preventivo.
 */
static async getLimitiSalvataggi(idUtente: number) {
  // Richiamo il metodo getLimitiSalvataggi del PreventivoDAO
  const preventivo = await PreventivoDAO.getLimitiSalvataggi(idUtente);
  if (preventivo) {
    return preventivo;
  }
  return null;
}

/**
 * Recupera il prezzo di un preventivo per l'utente specificato.
 * @param idUtente - L'ID dell'utente per cui recuperare il prezzo del preventivo.
 * @returns Il prezzo del preventivo se trovato, altrimenti null.
 */
static async getPrezzo(idUtente: number) {
  // Richiamo il metodo getPrezzo del PreventivoDAO
  const preventivo = await PreventivoDAO.getPrezzo(idUtente);
  if (preventivo) {
    return preventivo;
  }
  return null;
}

/**
 * Recupera lo stato di un preventivo per l'utente specificato.
 * @param idUtente - L'ID dell'utente per cui recuperare lo stato del preventivo.
 * @returns Lo stato del preventivo se trovato, altrimenti null.
 */
static async getStato(idUtente: number) {
  // Richiamo il metodo getStato del PreventivoDAO
  const preventivo = await PreventivoDAO.getStato(idUtente);
  if (preventivo) {
    return preventivo;
  }
  return null;
}

/**
 * Aggiorna lo stato di un preventivo con l'ID specificato.
 * @param idPreventivo - L'ID del preventivo da aggiornare.
 * @param stato - Il nuovo stato da assegnare al preventivo.
 * @returns Il preventivo aggiornato se l'operazione è riuscita, altrimenti null.
 */
static async aggiornaStato(idPreventivo: number, stato: string) {
  // Richiamo il metodo setStato del PreventivoDAO
  const preventivo = await PreventivoDAO.setStato(idPreventivo, stato);
  if (preventivo) {
    return preventivo;
  }
  return null;
}

/**
 * Aggiorna il prezzo di un preventivo con l'ID specificato.
 * @param idPreventivo - L'ID del preventivo da aggiornare.
 * @param prezzo - Il nuovo prezzo da assegnare al preventivo.
 * @returns Il preventivo aggiornato se l'operazione è riuscita, altrimenti null.
 */
static async aggiornaPrezzo(idPreventivo: number, prezzo: number) {
  // Richiamo il metodo setPrezzo del PreventivoDAO
  const preventivo = await PreventivoDAO.setPrezzo(idPreventivo, prezzo);
  if (preventivo) {
    return preventivo;
  }
  return null;
}

/**
 * Elimina un preventivo in base all'ID specificato.
 * @param idPreventivo - L'ID del preventivo da eliminare.
 */
static async eliminaPreventivoById(idPreventivo: number) {
  // Richiamo il metodo eliminaPreventivoById del PreventivoDAO
  await PreventivoDAO.eliminaPreventivoById(idPreventivo);
}

/**
 * Modifica uno stato e un prezzo di un preventivo con l'ID specificato.
 * @param stato - Il nuovo stato da assegnare al preventivo.
 * @param prezzo - Il nuovo prezzo da assegnare al preventivo.
 * @param idPreventivo - L'ID del preventivo da modificare.
 * @returns Il preventivo modificato se l'operazione è riuscita, altrimenti null.
 */
static async ModificaPreventivo(
  stato: string,
  prezzo: number,
  idPreventivo: number,
) {
  // Richiamo il metodo ModificaPreventivo del PreventivoDAO
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
