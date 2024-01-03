import serviziPiano from './serviziPiano';
import PianoDAO from '../../DAO/PianoDAO';

class serviziPianoImpl implements serviziPiano {
  // metodo che ritorna tutti i piani
  static async getTipiPiani() {
    const tipiPiani = await PianoDAO.getTipiPiani(); // richiamo il metodo getTipiPiani del PianoDAO
    if (tipiPiani) {
      return tipiPiani;
    }
    return null;
  }

  // metodo che mi consente di acquistare il piano free
  static async AcquistoPianoFree(id_utente: number) {
    await PianoDAO.AcquistoPianoFree(id_utente); // richiamo il metodo AcquistoPianoFree del PianoDAO
  }

  //funzione che mi ritorna l'ultimo piano acquistato dall'utente
  static async gelUltimoAcquistoUtente(id_utente: string) {
    const acquisto = await PianoDAO.getUltimoAcquistoUtente(id_utente); // richiamo il metodo getUltimoAcquistoUtente del PianoDAO
    if (acquisto) {
      return acquisto;
    }
    return null;
  }

  static async getPianoUtente(id_piano: number) {
    const piano = await PianoDAO.getPianoUtente(id_piano);
    if (piano) {
      return piano;
    }
    return null;
  }

  //funzione che effettua l'acquisto di un piano
  static async AcquistoPiano(id_utente: number, id_piano: number) {
    await PianoDAO.AcquistoPiano(id_utente, id_piano); // richiamo il metodo AcquistoPiano del PianoDAO
  }
}

export default serviziPianoImpl;
