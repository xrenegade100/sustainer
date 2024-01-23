// creo la struttura del piano che userò nei DAO

class Acquisto {
  // creo il costruttore
  constructor(
    idUtente: number,
    idPiano: number,
    dataAcquisto: Date,
    attivo: boolean,
  ) {
    this.idUtente = idUtente;
    this.idPiano = idPiano;
    this.dataAcquisto = dataAcquisto;
    this.attivo = attivo;
  }

  // creo gli attributi
  private idUtente: number;

  private idPiano: number;

  private dataAcquisto: Date;

  private attivo: boolean;

  /**
   * Ottiene l'ID dell'utente associato all'acquisto.
   * @returns L'ID dell'utente.
   */
  public getIdUtente(): number {
    return this.idUtente;
  }

  /**
   * Ottiene l'ID del piano associato all'acquisto.
   * @returns L'ID del piano.
   */
  public getIdPiano(): number {
    return this.idPiano;
  }

  /**
   * Ottiene la data dell'acquisto.
   * @returns La data dell'acquisto.
   */
  public getDataAcquisto(): Date {
    return this.dataAcquisto;
  }

  /**
   * Ottiene lo stato di attivazione dell'acquisto.
   * @returns True se l'acquisto è attivo, altrimenti false.
   */
  public getAttivo(): boolean {
    return this.attivo;
  }

  // Metodi di modifica (set)

  /**
   * Imposta l'ID dell'utente associato all'acquisto.
   * @param idUtente - Il nuovo ID dell'utente.
   */
  public setIdUtente(idUtente: number): void {
    this.idUtente = idUtente;
  }

  /**
   * Imposta l'ID del piano associato all'acquisto.
   * @param idPiano - Il nuovo ID del piano.
   */
  public setIdPiano(idPiano: number): void {
    this.idPiano = idPiano;
  }

  /**
   * Imposta la data dell'acquisto.
   * @param dataAcquisto - La nuova data dell'acquisto.
   */
  public setdataAcquisto(dataAcquisto: Date): void {
    this.dataAcquisto = dataAcquisto;
  }

  /**
   * Imposta lo stato di attivazione dell'acquisto.
   * @param attivo - True se l'acquisto è attivo, altrimenti false.
   */
  public setAttivo(attivo: boolean): void {
    this.attivo = attivo;
  }
}

export default Acquisto;
