import serviziPiano from './serviziPiano';
import PianoDAO from '../../DAO/PianoDAO';

class serviziPianoImpl implements serviziPiano {
  static async getTipiPiani() {
    const tipiPiani = await PianoDAO.getTipiPiani();
    console.log(tipiPiani);
    if (tipiPiani) {
      return tipiPiani;
    }
    return null;
  }

  static async gelUltimoAcquistoUtente(id_utente: string) {
    const acquisto = await PianoDAO.getUltimoAcquistoUtente(id_utente);
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
}

export default serviziPianoImpl;
