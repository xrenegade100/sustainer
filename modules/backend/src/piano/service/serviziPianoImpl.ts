import serviziPiano from './serviziPiano';
import PianoDAO from '../../dao/PianoDAO';

class ServiziPianoImpl implements serviziPiano {
  // metodo che ritorna tutti i piani
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
}

export default ServiziPianoImpl;
