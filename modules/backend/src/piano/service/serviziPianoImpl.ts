import serviziPiano from './serviziPiano';
import PianoDAO from '../../DAO/PianoDAO';
import Piano from '../domain/Piano';

class serviziPianoImpl implements serviziPiano {
  // metodo che ritorna tutti i piani
  static async getTipiPiani() {
    const tipiPiani = await PianoDAO.getTipiPiani(); // richiamo il metodo getTipiPiani del PianoDAO
    console.log(tipiPiani);
    if (tipiPiani) {
      return tipiPiani;
    }
    return null;
  }

  // metodo che mi consente di acquistare il piano free
  static async AcquistoPianoFree(id_utente: number) {
    await PianoDAO.AcquistoPianoFree(id_utente); // richiamo il metodo AcquistoPianoFree del PianoDAO
  }
}

export default serviziPianoImpl;
