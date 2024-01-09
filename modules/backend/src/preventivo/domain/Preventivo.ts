class Preventivo {
// creo il costruttore
  constructor(
    idPreventivo: number,
    idUtente: number,
    limitiAddestramenti: number,
    limitiSalvataggi:number,
    prezzo: number,
    stato: number,
  ) {
    this.idPreventivo = idPreventivo;
    this.idUtente = idUtente;
    this.limitiAddestramenti = limitiAddestramenti;
    this.limitiSalvataggi = limitiSalvataggi;
    this.prezzo = prezzo;
    this.stato = stato;
  }

  // creo gli attributi
  private idPreventivo: number;

  private idUtente: number;

  private limitiAddestramenti: number;

  private limitiSalvataggi: number;

  private prezzo: number;

  private stato: number;

  // creo i metodi get
  public getIdPreventivo(): number {
    return this.idPreventivo;
  }

  public getIdUtente(): number {
    return this.idUtente;
  }

  public getLimitiAddestramenti(): number {
    return this.limitiAddestramenti;
  }

  public getLimitiSalvataggi(): number {
    return this.limitiSalvataggi;
  }

  public getPrezzo(): number {
    return this.prezzo;
  }

  public getStato(): number {
    return this.stato;
  }

  // creo i metodi set
  public setIdUtente(idUtente: number): void {
    this.idUtente = idUtente;
  }

  public setLimitiAddestramenti(limitiAddestramenti: number): void {
    this.limitiAddestramenti = limitiAddestramenti;
  }

  public setLimitiSalvataggi(limitiSalvataggi: number): void {
    this.limitiSalvataggi = limitiSalvataggi;
  }

  public setPrezzo(prezzo: number): void {
    this.prezzo = prezzo;
  }

  public setStato(stato: number): void {
    this.stato = stato;
  }
}

export default Preventivo;
