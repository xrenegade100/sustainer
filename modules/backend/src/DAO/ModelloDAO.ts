import db from '../db/PoolDB';

class ModelloDAO {
  static async salvaModello(
    idUtente: number,
    gruppoPrivilegiato: string,
    recall: number,
    precision: number,
    accuracy: number,
    sustainability: number,
    disparateImpact: number,
    tipoModello: string,
  ) {
    const conn = await db(); // connessione al db
    await conn.query(
      'INSERT INTO modello (`id_utente`, `gruppo_privilegiato`, `riduci_emissioni`, `memorizzato`, `recall`, `precision`, `accuracy`, `sustainability`, `disperate_impact`, `tipo_modello`) VALUES (?, ?, 0, 0, ?, ?, ?, ?, ?, ?);',
      [
        idUtente,
        gruppoPrivilegiato,
        recall,
        precision,
        accuracy,
        sustainability,
        disparateImpact,
        tipoModello,
      ],
    );
  }
}

export default ModelloDAO;
