import db from '../db/PoolDB';

/**
 * @class ModelloDAO
 * @classdesc Classe che gestisce le operazioni di accesso e manipolazione dei dati relativi ai modelli nel database.
 */
class ModelloDAO {
  /**
   * Salva un nuovo modello nel database.
   * @param {number} idUtente - L'ID dell'utente proprietario del modello.
   * @param {string} gruppoPrivilegiato - Il gruppo privilegiato associato al modello.
   * @param {number} recall - Il valore di recall del modello.
   * @param {number} precision - Il valore di precision del modello.
   * @param {number} accuracy - Il valore di accuratezza del modello.
   * @param {number} sustainability - Il valore di sostenibilità del modello.
   * @param {number} disparateImpact - Il valore di disparate impact del modello.
   * @param {string} tipoModello - Il tipo di modello.
   * @returns {Promise<void>} Una Promise che si risolve quando il modello è stato salvato nel database.
   */
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
    const conn = await db(); // Connessione al database.
    
    await conn.query(
      'INSERT INTO modello (`id_utente`, `gruppo_privilegiato`, `riduci_emissioni`, `memorizzato`, `recall`, `precision`, `accuracy`, `sustainability`, `disparate_impact`, `tipo_modello`) VALUES (?, ?, 0, 0, ?, ?, ?, ?, ?, ?);',
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
