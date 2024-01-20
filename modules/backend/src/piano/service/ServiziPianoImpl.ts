import PianoDAO from '../../DAO/PianoDAO';

class ServiziPianoImpl {
  // metodo che ritorna tutti i piani
  static async getAllPiani() {
    const piani = await PianoDAO.getAllPiani(); // richiamo il metodo getPiani del PianoDAO
    if (piani) {
      return piani;
    }
    return null;
  }

  // metodo che ritorna tutti i piani non enterprise
  static async getTipiPiani() {
    const tipiPiani = await PianoDAO.getTipiPiani(); // richiamo il metodo getTipiPiani del PianoDAO
    if (tipiPiani) {
      return tipiPiani;
    }
    return null;
  }

  // metodo che mi consente di acquistare il piano free
  static async AcquistoPianoFree(idUtente: number) {
    await PianoDAO.AcquistoPianoFree(idUtente); // richiamo il metodo AcquistoPianoFree del PianoDAO
  }

  // funzione che mi ritorna l'ultimo piano acquistato dall'utente
  static async gelUltimoAcquistoUtente(idUtente: string) {
    // richiamo il metodo getUltimoAcquistoUtente del PianoDAO
    const acquisto = await PianoDAO.getUltimoAcquistoUtente(idUtente);
    if (acquisto) {
      return acquisto;
    }
    return null;
  }

  static async getPianoUtente(idPiano: number) {
    const piano = await PianoDAO.getPianoUtente(idPiano);
    if (piano) {
      return piano;
    }
    return null;
  }

  // funzione che effettua l'acquisto di un piano
  static async AcquistoPiano(idUtente: number, idPiano: number) {
    // richiamo il metodo AcquistoPiano del PianoDAO
    const piano = await PianoDAO.AcquistoPiano(idUtente, idPiano);
    if (piano) {
      return piano;
    }
    return null;
  }

  static async annullaPiano(idUtente: number, idPiano: number) {
    const piano = await PianoDAO.annullaPiano(idUtente, idPiano);
    if (piano) {
      return piano;
    }
    return null;
  }

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
