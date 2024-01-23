import db from '../db/PoolDB';

class CondivisioneDAO {
  static async getAllCondivisioni() {
    const conn = await db(); // connessione al db
    const [rows] = await conn.query(
      'SELECT * FROM condivisione', // query che seleziona tutte le comunicazioni dal db
    );
    return rows;
  }
}
export default CondivisioneDAO;
