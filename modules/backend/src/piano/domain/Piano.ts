// creo la struttura del piano che userò nei DAO

class Piano {
  // creo il costruttore
  constructor(
    idPiano: number,
    tipo: number,
    prezzo: number,
    limiteSalvataggiModelli: number,
    limiteAddestramentiModelli: number,
  ) {
    this.idPiano = idPiano;
    this.tipo = tipo;
    this.prezzo = prezzo;
    this.limiteSalvataggiModelli = limiteSalvataggiModelli;
    this.limiteAddestramentiModelli = limiteAddestramentiModelli;
  }

  // creo gli attributi
  private idPiano: number;

  private tipo: number;

  private prezzo: number;

  private limiteSalvataggiModelli: number;

  private limiteAddestramentiModelli: number;

  // creo i metodi get
  public getIdPiano(): number {
    return this.idPiano;
  }

  public getTipo(): number {
    return this.tipo;
  }

  public getPrezzo(): number {
    return this.prezzo;
  }

  public getLimiteSalvataggiModelli(): number {
    return this.limiteSalvataggiModelli;
  }

  public getLimiteAddestramentiModelli(): number {
    return this.limiteAddestramentiModelli;
  }

  // creo i metodi set
  public setIdPiano(idPiano: number): void {
    this.idPiano = idPiano;
  }

  public setTipo(tipo: number): void {
    this.tipo = tipo;
  }

  public setPrezzo(prezzo: number): void {
    this.prezzo = prezzo;
  }

  public setLimiteSalvataggiModelli(limiteSalvataggiModelli: number): void {
    this.limiteSalvataggiModelli = limiteSalvataggiModelli;
  }

  public setLimiteAddestramentiModelli(
    limiteAddestramentiModelli: number,
  ): void {
    this.limiteAddestramentiModelli = limiteAddestramentiModelli;
  }
}

export default Piano;
