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
   * Restituisce l'identificativo del modello.
   * @returns L'identificativo del modello.
   */
  public getIdModello(): number {
    return this.idModello;
  }
  /**
   * Restituisce l'identificativo dell'utente associato al modello.
   * @returns L'identificativo dell'utente.
   */
  public getIdUtente(): number {
    return this.idUtente;
  }
  /**
   * Restituisce il gruppo privilegiato associato al modello.
   * @returns Il gruppo privilegiato.
   */
  public getGruppoPrivilegiato(): [string] {
    return this.gruppoPrivilegiato;
  }
  /**
   * Restituisce lo stato di memorizzazione del modello.
   * @returns `true` se il modello è memorizzato, `false` altrimenti.
   */
  public getMemorizzato(): boolean {
    return this.memorizzato;
  }
  /**
   * Restituisce il valore di recall associato al modello.
   * @returns Il valore di recall.
   */
  public getRecall(): number {
    return this.recall;
  }
  /**
   * Restituisce il valore di precision associato al modello.
   * @returns Il valore di precision.
   */
  public getPrecision(): number {
    return this.precision;
  }
  /**
   * Restituisce il valore di accuracy associato al modello.
   * @returns Il valore di accuracy.
   */
  public getAccuracy(): number {
    return this.accuracy;
  }
   /**
   * Restituisce il valore di sostenibilità associato al modello.
   * @returns Il valore di sostenibilità.
   */
  public getSustainability(): number {
    return this.sustainability;
  }
  /**
   * Restituisce il valore di Disparate Impact associato al modello.
   * @returns Il valore di Disparate Impact.
   */
  public getDisparateImpact(): number {
    return this.disparateImpact;
  }
  /**
   * Restituisce il tipo di modello addestrato.
   * @returns Il tipo di modello.
   */
  public getTipoModello(): string {
    return this.tipoModello;
  }

  /**
   * Imposta l'identificativo del modello.
   * @param idModello - L'identificativo del modello.
   */
  public setIdModello(idModello: number) {
    this.idModello = idModello;
  }
  /**
   * Imposta l'identificativo dell'utente associato al modello.
   * @param idUtente - L'identificativo dell'utente.
   */
  public setIdUtente(idUtente: number) {
    this.idUtente = idUtente;
  }
/**
   * Imposta il gruppo privilegiato associato al modello.
   * @param gruppoPrivilegiato - Il gruppo privilegiato.
   */
  public setGruppoPrivilegiato(gruppoPrivilegiato: [string]) {
    this.gruppoPrivilegiato = gruppoPrivilegiato;
  }
/**
   * Imposta lo stato di memorizzazione del modello.
   * @param memorizzato - `true` se il modello è memorizzato, `false` altrimenti.
   */
  public setMemorizzato(memorizzato: boolean) {
    this.memorizzato = memorizzato;
  }
/**
   * Imposta il valore di recall associato al modello.
   * @param recall - Il valore di recall.
   */
  public setRecall(recall: number) {
    this.recall = recall;
  }
/**
   * Imposta il valore di precision associato al modello.
   * @param precision - Il valore di precision.
   */
  public setPrecision(precision: number) {
    this.precision = precision;
  }
  /**
   * Imposta il valore di accuracy associato al modello.
   * @param accuracy - Il valore di accuracy.
   */
  public setAccuracy(accuracy: number) {
    this.accuracy = accuracy;
  }
/**
   * Imposta il valore di sostenibilità associato al modello.
   * @param sustainability - Il valore di sostenibilità.
   */
  public setSustainability(sustainability: number) {
    this.sustainability = sustainability;
  }
/**
   * Imposta il valore di Disparate Impact associato al modello.
   * @param disparateImpact - Il valore di Disparate Impact.
   */
  public setDisparateImpact(disparateImpact: number) {
    this.disparateImpact = disparateImpact;
  }
/**
   * Imposta il tipo di modello addestrato.
   * @param tipoModello - Il tipo di modello.
   */
  public setTipoModello(tipoModello: string) {
    this.tipoModello = tipoModello;
  }
}

export default Modello;
