import { RowDataPacket } from 'mysql2';
import { promises } from 'dns';
import db from '../db/poolDB';
import Piano from '../piano/domain/Piano';

class PianoDAO {
  static async getAllPiani() {
    const conn = await db();

    const piani = (await conn.query('SELECT * FROM piano')) as RowDataPacket;

    console.log(piani);
  }

  static async getTipiPiani() {
    const conn = await db();

    const [rows] = await conn.query('SELECT * FROM piano');
    const piani = rows as RowDataPacket[];

    console.log(piani);
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

  static async getPrezzoPiani() {
    const conn = await db();

    const piani = (await conn.query('SELECT * FROM piano')) as RowDataPacket;

    console.log(piani);
  }
}

export default PianoDAO;
