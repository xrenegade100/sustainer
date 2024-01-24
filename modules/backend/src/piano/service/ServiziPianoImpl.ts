import PianoDAO from '../../DAO/PianoDAO';

class ServiziPianoImpl {
  /**
   * Metodo statico che restituisce tutti i piani disponibili.
   * @returns Un array contenente tutti i piani o `null` in caso di errore.
   */
  static async getAllPiani() {
    const piani = await PianoDAO.getAllPiani(); // richiamo il metodo getPiani del PianoDAO
    if (piani) {
      return piani;
    }
    return null;
  }

  /**
   * Metodo statico che restituisce tutti i tipi di piani non enterprise disponibili.
   * @returns Un array contenente tutti i tipi di piani non enterprise o `null` in caso di errore.
   */
  static async getTipiPiani() {
    const tipiPiani = await PianoDAO.getTipiPiani(); // richiamo il metodo getTipiPiani del PianoDAO
    if (tipiPiani) {
      return tipiPiani;
    }
    return null;
  }

  /**
   * Metodo statico che consente di acquistare il piano gratuito per un utente.
   * @param idUtente - L'identificativo dell'utente che acquista il piano free.
   */
  static async AcquistoPianoFree(idUtente: number) {
    await PianoDAO.AcquistoPianoFree(idUtente); // richiamo il metodo AcquistoPianoFree del PianoDAO
  }

  /**
   * Metodo statico che restituisce l'ultimo piano acquistato da un utente.
   * @param idUtente - L'identificativo dell'utente.
   * @returns Il piano acquistato più recentemente o `null` se non disponibile.
   */
  static async gelUltimoAcquistoUtente(idUtente: string) {
    // richiamo il metodo getUltimoAcquistoUtente del PianoDAO
    const acquisto = await PianoDAO.getUltimoAcquistoUtente(idUtente);
    if (acquisto) {
      return acquisto;
    }
    return null;
  }

  /**
   * Metodo statico che restituisce un piano associato a un determinato utente.
   * @param idPiano - L'identificativo del piano.
   * @returns Il piano richiesto o `null` se non disponibile.
   */
  static async getPianoUtente(idPiano: number) {
    const piano = await PianoDAO.getPianoUtente(idPiano);
    if (piano) {
      return piano;
    }
    return null;
  }

  /**
   * Metodo statico che consente di acquistare un piano.
   * @param idUtente - L'identificativo dell'utente che acquista il piano.
   * @param idPiano - L'identificativo del piano da acquistare.
   * @returns Il piano appena acquistato o `null` in caso di errore.
   */
  static async AcquistoPiano(idUtente: number, idPiano: number) {
    // richiamo il metodo AcquistoPiano del PianoDAO
    const piano = await PianoDAO.AcquistoPiano(idUtente, idPiano);
    if (piano) {
      return piano;
    }
    return null;
  }

  /**
   * Metodo statico che annulla l'acquisto di un piano.
   * @param idUtente - L'identificativo dell'utente.
   * @param idPiano - L'identificativo del piano da annullare.
   * @returns Il piano annullato o `null` in caso di errore.
   */
  static async annullaPiano(idUtente: number, idPiano: number) {
    const piano = await PianoDAO.annullaPiano(idUtente, idPiano);
    if (piano) {
      return piano;
    }
    return null;
  }

  /**
   * Metodo statico che inserisce un nuovo piano enterprise nel sistema.
   * @param limitiAddestramenti - I limiti di addestramenti associati al piano.
   * @param limitiSalvataggi - I limiti di salvataggi associati al piano.
   * @param prezzo - Il prezzo del piano enterprise.
   * @returns Il nuovo piano enterprise inserito o `null` in caso di errore.
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
