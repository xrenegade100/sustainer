// creo la struttura dell'utente che userò nei DAO

class Modello {
  // creo il costruttore
  constructor(
    idModello: number,
    idUtente: number,
    gruppoPrivilegiato: [string],
    memorizzato: boolean,
    recall: number,
    precision: number,
    accuracy: number,
    sustainability: number,
    disparateImpact: number,
    tipoModello: string,
  ) {
    this.idModello = idModello;
    this.idUtente = idUtente;
    this.gruppoPrivilegiato = gruppoPrivilegiato;
    this.memorizzato = memorizzato;
    this.recall = recall;
    this.precision = precision;
    this.accuracy = accuracy;
    this.sustainability = sustainability;
    this.disparateImpact = disparateImpact;
    this.tipoModello = tipoModello;
  }

  // creo gli attributi
  private idModello: number;

  private idUtente: number;

  private gruppoPrivilegiato: [string];

  private memorizzato: boolean;

  private recall: number;

  private precision: number;

  private accuracy: number;

  private sustainability: number;

  private disparateImpact: number;

  private tipoModello: string;

  /**
   * Ottiene l'ID del modello.
   * @returns L'ID del modello.
   */
  public getIdModello(): number {
    return this.idModello;
  }

  /**
   * Ottiene l'ID dell'utente associato al modello.
   * @returns L'ID dell'utente associato al modello.
   */
  public getIdUtente(): number {
    return this.idUtente;
  }

  /**
   * Ottiene il gruppo privilegiato associato al modello.
   * @returns Il gruppo privilegiato associato al modello.
   */
  public getGruppoPrivilegiato(): [string] {
    return this.gruppoPrivilegiato;
  }

  /**
   * Ottiene lo stato di memorizzazione del modello.
   * @returns True se il modello è memorizzato, altrimenti false.
   */
  public getMemorizzato(): boolean {
    return this.memorizzato;
  }

  /**
   * Ottiene il valore di recall del modello.
   * @returns Il valore di recall del modello.
   */
  public getRecall(): number {
    return this.recall;
  }

  /**
   * Ottiene il valore di precision del modello.
   * @returns Il valore di precision del modello.
   */
  public getPrecision(): number {
    return this.precision;
  }

  /**
   * Ottiene il valore di accuracy del modello.
   * @returns Il valore di accuracy del modello.
   */
  public getAccuracy(): number {
    return this.accuracy;
  }

  /**
   * Ottiene il valore di sustainability del modello.
   * @returns Il valore di sustainability del modello.
   */
  public getSustainability(): number {
    return this.sustainability;
  }

  /**
   * Ottiene il valore di disparate impact del modello.
   * @returns Il valore di disparate impact del modello.
   */
  public getDisparateImpact(): number {
    return this.disparateImpact;
  }

  /**
   * Ottiene il tipo di modello.
   * @returns Il tipo di modello.
   */
  public getTipoModello(): string {
    return this.tipoModello;
  }

  // Metodi di modifica (set)

  /**
   * Imposta l'ID del modello.
   * @param idModello - Il nuovo ID del modello.
   */
  public setIdModello(idModello: number) {
    this.idModello = idModello;
  }

  /**
   * Imposta l'ID dell'utente associato al modello.
   * @param idUtente - Il nuovo ID dell'utente associato al modello.
   */
  public setIdUtente(idUtente: number) {
    this.idUtente = idUtente;
  }

  /**
   * Imposta il gruppo privilegiato associato al modello.
   * @param gruppoPrivilegiato - Il nuovo gruppo privilegiato associato al modello.
   */
  public setGruppoPrivilegiato(gruppoPrivilegiato: [string]) {
    this.gruppoPrivilegiato = gruppoPrivilegiato;
  }

  /**
   * Imposta lo stato di memorizzazione del modello.
   * @param memorizzato - True se il modello è memorizzato, altrimenti false.
   */
  public setMemorizzato(memorizzato: boolean) {
    this.memorizzato = memorizzato;
  }

  /**
   * Imposta il valore di recall del modello.
   * @param recall - Il nuovo valore di recall del modello.
   */
  public setRecall(recall: number) {
    this.recall = recall;
  }

  /**
   * Imposta il valore di precision del modello.
   * @param precision - Il nuovo valore di precision del modello.
   */
  public setPrecision(precision: number) {
    this.precision = precision;
  }

  /**
   * Imposta il valore di accuracy del modello.
   * @param accuracy - Il nuovo valore di accuracy del modello.
   */
  public setAccuracy(accuracy: number) {
    this.accuracy = accuracy;
  }

  /**
   * Imposta il valore di sustainability del modello.
   * @param sustainability - Il nuovo valore di sustainability del modello.
   */
  public setSustainability(sustainability: number) {
    this.sustainability = sustainability;
  }

  /**
   * Imposta il valore di disparate impact del modello.
   * @param disparateImpact - Il nuovo valore di disparate impact del modello.
   */
  public setDisparateImpact(disparateImpact: number) {
    this.disparateImpact = disparateImpact;
  }

  /**
   * Imposta il tipo di modello.
   * @param tipoModello - Il nuovo tipo di modello.
   */
  public setTipoModello(tipoModello: string) {
    this.tipoModello = tipoModello;
  }
}

export default Modello;
