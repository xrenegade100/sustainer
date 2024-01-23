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

 // Metodi di accesso (get)

  /**
   * Ottiene l'ID del piano.
   * @returns L'ID del piano.
   */
  public getIdPiano(): number {
    return this.idPiano;
  }

  /**
   * Ottiene il tipo del piano.
   * @returns Il tipo del piano.
   */
  public getTipo(): number {
    return this.tipo;
  }

  /**
   * Ottiene il prezzo del piano.
   * @returns Il prezzo del piano.
   */
  public getPrezzo(): number {
    return this.prezzo;
  }

  /**
   * Ottiene il limite di salvataggi per i modelli associati al piano.
   * @returns Il limite di salvataggi per i modelli.
   */
  public getLimiteSalvataggiModelli(): number {
    return this.limiteSalvataggiModelli;
  }

  /**
   * Ottiene il limite di addestramenti per i modelli associati al piano.
   * @returns Il limite di addestramenti per i modelli.
   */
  public getLimiteAddestramentiModelli(): number {
    return this.limiteAddestramentiModelli;
  }

  // Metodi di modifica (set)

  /**
   * Imposta l'ID del piano.
   * @param idPiano - Il nuovo ID del piano.
   */
  public setIdPiano(idPiano: number): void {
    this.idPiano = idPiano;
  }

  /**
   * Imposta il tipo del piano.
   * @param tipo - Il nuovo tipo del piano.
   */
  public setTipo(tipo: number): void {
    this.tipo = tipo;
  }

  /**
   * Imposta il prezzo del piano.
   * @param prezzo - Il nuovo prezzo del piano.
   */
  public setPrezzo(prezzo: number): void {
    this.prezzo = prezzo;
  }

  /**
   * Imposta il limite di salvataggi per i modelli associati al piano.
   * @param limiteSalvataggiModelli - Il nuovo limite di salvataggi per i modelli.
   */
  public setLimiteSalvataggiModelli(limiteSalvataggiModelli: number): void {
    this.limiteSalvataggiModelli = limiteSalvataggiModelli;
  }

  /**
   * Imposta il limite di addestramenti per i modelli associati al piano.
   * @param limiteAddestramentiModelli - Il nuovo limite di addestramenti per i modelli.
   */
  public setLimiteAddestramentiModelli(
    limiteAddestramentiModelli: number,
  ): void {
    this.limiteAddestramentiModelli = limiteAddestramentiModelli;
  }
}

export default Piano;