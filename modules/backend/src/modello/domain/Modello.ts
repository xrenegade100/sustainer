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

  // creo i metodi get
  public getIdModello(): number {
    return this.idModello;
  }

  public getIdUtente(): number {
    return this.idUtente;
  }

  public getGruppoPrivilegiato(): [string] {
    return this.gruppoPrivilegiato;
  }

  public getMemorizzato(): boolean {
    return this.memorizzato;
  }

  public getRecall(): number {
    return this.recall;
  }

  public getPrecision(): number {
    return this.precision;
  }

  public getAccuracy(): number {
    return this.accuracy;
  }

  public getSustainability(): number {
    return this.sustainability;
  }

  public getDisparateImpact(): number {
    return this.disparateImpact;
  }

  public getTipoModello(): string {
    return this.tipoModello;
  }

  // creo i metodi set
  public setIdModello(idModello: number) {
    this.idModello = idModello;
  }

  public setIdUtente(idUtente: number) {
    this.idUtente = idUtente;
  }

  public setGruppoPrivilegiato(gruppoPrivilegiato: [string]) {
    this.gruppoPrivilegiato = gruppoPrivilegiato;
  }

  public setMemorizzato(memorizzato: boolean) {
    this.memorizzato = memorizzato;
  }

  public setRecall(recall: number) {
    this.recall = recall;
  }

  public setPrecision(precision: number) {
    this.precision = precision;
  }

  public setAccuracy(accuracy: number) {
    this.accuracy = accuracy;
  }

  public setSustainability(sustainability: number) {
    this.sustainability = sustainability;
  }

  public setDisparateImpact(disparateImpact: number) {
    this.disparateImpact = disparateImpact;
  }

  public setTipoModello(tipoModello: string) {
    this.tipoModello = tipoModello;
  }
}

export default Modello;
