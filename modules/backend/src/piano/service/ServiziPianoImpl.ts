import PianoDAO from '../../DAO/PianoDAO';

class ServiziPianoImpl {
  /**
 * Recupera tutti i piani disponibili.
 * @returns Un array contenente tutti i piani, null se non trovati.
 */
static async getAllPiani() {
  const piani = await PianoDAO.getAllPiani(); // Richiamo il metodo getPiani del PianoDAO
  if (piani) {
    return piani;
  }
  return null;
}

/**
 * Recupera tutti i piani non enterprise disponibili.
 * @returns Un array contenente tutti i piani non enterprise, null se non trovati.
 */
static async getTipiPiani() {
  const tipiPiani = await PianoDAO.getTipiPiani(); // Richiamo il metodo getTipiPiani del PianoDAO
  if (tipiPiani) {
    return tipiPiani;
  }
  return null;
}

/**
 * Effettua l'acquisto del piano gratuito.
 * @param idUtente - L'ID dell'utente che sta acquistando il piano gratuito.
 */
static async AcquistoPianoFree(idUtente: number) {
  await PianoDAO.AcquistoPianoFree(idUtente); // Richiamo il metodo AcquistoPianoFree del PianoDAO
}

/**
 * Restituisce l'ultimo acquisto di piano effettuato dall'utente.
 * @param idUtente - L'ID dell'utente per cui recuperare l'ultimo acquisto di piano.
 * @returns L'ultimo acquisto di piano se presente, null altrimenti.
 */
static async gelUltimoAcquistoUtente(idUtente: string) {
  // Richiamo il metodo getUltimoAcquistoUtente del PianoDAO
  const acquisto = await PianoDAO.getUltimoAcquistoUtente(idUtente);
  if (acquisto) {
    return acquisto;
  }
  return null;
}

/**
 * Recupera le informazioni di un piano utente specificato.
 * @param idPiano - L'ID del piano da recuperare.
 * @returns Le informazioni del piano se trovate, null altrimenti.
 */
static async getPianoUtente(idPiano: number) {
  const piano = await PianoDAO.getPianoUtente(idPiano);
  if (piano) {
    return piano;
  }
  return null;
}

/**
 * Effettua l'acquisto di un piano da parte di un utente.
 * @param idUtente - L'ID dell'utente che sta effettuando l'acquisto.
 * @param idPiano - L'ID del piano da acquistare.
 * @returns Il piano acquistato se l'operazione è riuscita, null altrimenti.
 */
static async AcquistoPiano(idUtente: number, idPiano: number) {
  // Richiamo il metodo AcquistoPiano del PianoDAO
  const piano = await PianoDAO.AcquistoPiano(idUtente, idPiano);
  if (piano) {
    return piano;
  }
  return null;
}

/**
 * Annulla l'acquisto di un piano da parte di un utente.
 * @param idUtente - L'ID dell'utente che sta annullando l'acquisto.
 * @param idPiano - L'ID del piano da annullare.
 * @returns Il piano annullato se l'operazione è riuscita, null altrimenti.
 */
static async annullaPiano(idUtente: number, idPiano: number) {
  const piano = await PianoDAO.annullaPiano(idUtente, idPiano);
  if (piano) {
    return piano;
  }
  return null;
}

/**
 * Inserisce un nuovo piano di tipo enterprise con i parametri specificati.
 * @param limitiAddestramenti - Il numero di addestramenti consentiti per il piano.
 * @param limitiSalvataggi - Il numero di salvataggi consentiti per il piano.
 * @param prezzo - Il prezzo del piano.
 * @returns Il piano enterprise inserito se l'operazione è riuscita, null altrimenti.
 */
static async InserimentoPianoEnterprise(
  limitiAddestramenti: number,
  limitiSalvataggi: number,
  prezzo: number,
) {
  const piano = await PianoDAO.InserimentoPianoEnterprise(
    prezzo,
    limitiSalvataggi,
    limitiAddestramenti,
  );
  if (piano) {
    return piano;
  }
  return null;
}
}

export default ServiziPianoImpl;
