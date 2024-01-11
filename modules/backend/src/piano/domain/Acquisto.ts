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

  // creo i metodi get
  public getIdUtente(): number {
    return this.idUtente;
  }

  public getIdPiano(): number {
    return this.idPiano;
  }

  public getDataAcquisto(): Date {
    return this.dataAcquisto;
  }

  public getAttivo(): boolean {
    return this.attivo;
  }

  // creo i metodi set
  public setIdUtente(idUtente: number): void {
    this.idUtente = idUtente;
  }

  public setIdPiano(idPiano: number): void {
    this.idPiano = idPiano;
  }

  public setdataAcquisto(dataAcquisto: Date): void {
    this.dataAcquisto = dataAcquisto;
  }

  public setAttivo(attivo: boolean): void {
    this.attivo = attivo;
  }
}

export default Acquisto;
