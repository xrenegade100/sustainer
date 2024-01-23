import db from '../db/PoolDB';

class ComunicazioneDAO {
  // creo il metodo che mi ritorna tutte le comunicazioni
  static async getAllComunicazioni() {
    const conn = await db();
    const [rows] = await conn.query('SELECT * FROM comunicazione'); // query che ritorna tutti i piani
    return rows;
  }
}
export default ComunicazioneDAO;
