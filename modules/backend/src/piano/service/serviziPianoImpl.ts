import serviziPiano from './serviziPiano';
import PianoDAO from '../../DAO/PianoDAO';
import Piano from '../domain/Piano';

class serviziPianoImpl implements serviziPiano {
  static async getTipiPiani() {
    const tipiPiani = await PianoDAO.getTipiPiani();
    console.log(tipiPiani);
    if (tipiPiani) {
      return tipiPiani;
    }
    return null;
  }
}

export default serviziPianoImpl;
