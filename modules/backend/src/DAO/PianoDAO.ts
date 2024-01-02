import { RowDataPacket } from 'mysql2';
import db from '../db/poolDB';
import Piano from '../piano/domain/Piano';
import Acquisto from '../piano/domain/Acquisto';

class PianoDAO {
  static async getAllPiani() {
    const conn = await db();

    const piani = (await conn.query('SELECT * FROM piano')) as RowDataPacket;

    console.log(piani);
  }

  static async getTipiPiani() {
    const conn = await db();

    const [rows] = await conn.query('SELECT * FROM piano LIMIT 0,4');
    const piani = rows as RowDataPacket[];

    return piani.map(
      (piano) =>
        new Piano(
          piano.id_piano,
          piano.tipo,
          piano.prezzo,
          piano.limite_salvataggi_modelli,
          piano.limite_addestramenti_modelli,
        ),
    );
  }

  static async getUltimoAcquistoUtente(id_utente: string) {
    const conn = await db();

    const [rows] = await conn.query(
      'SELECT * FROM acquisto WHERE id_utente = ? ORDER BY data_acquisto DESC LIMIT 1',
      id_utente,
    );
    const acquisto = rows as RowDataPacket[];

    return new Acquisto(
      acquisto[0].id_utente,
      acquisto[0].id_piano,
      acquisto[0].data_acquisto,
    );
  }

  static async getPianoUtente(id_piano: number) {
    const conn = await db();

    const [rows] = await conn.query(
      'SELECT * FROM piano WHERE id_piano = ?',
      id_piano,
    );
    const piano = rows as RowDataPacket[];

    return new Piano(
      piano[0].id_piano,
      piano[0].tipo,
      piano[0].prezzo,
      piano[0].limite_salvataggi_modelli,
      piano[0].limite_addestramenti_modelli,
    );
  }
}

export default PianoDAO;
