import ModelloDAO from '../../DAO/ModelloDAO';

class ServiziModelloImpl {
  /**
   * Salva un modello nel sistema.
   * @param idUtente - L'ID dell'utente associato al modello.
   * @param gruppoPrivilegiato - Il gruppo privilegiato associato al modello.
   * @param recall - Il valore di recall del modello.
   * @param precision - Il valore di precision del modello.
   * @param accuracy - Il valore di accuracy del modello.
   * @param sustainability - Il valore di sustainability del modello.
   * @param disparateImpact - Il valore di disparate impact del modello.
   * @param tipoModello - Il tipo di modello.
   */
  static async salvaModelloImpl(
    idUtente: number,
    gruppoPrivilegiato: string,
    recall: number,
    precision: number,
    accuracy: number,
    sustainability: number,
    disparateImpact: number,
    tipoModello: string,
  ) {
    // Richiamo il metodo per salvare il modello nel ModelloDAO
    await ModelloDAO.salvaModello(
      idUtente,
      gruppoPrivilegiato,
      recall,
      precision,
      accuracy,
      sustainability,
      disparateImpact,
      tipoModello,
    );
  }
}

export default ServiziModelloImpl;
