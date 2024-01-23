class Preventivo {
// creo il costruttore
  constructor(
    idPreventivo: number,
    idUtente: number,
    limitiAddestramenti: number,
    limitiSalvataggi:number,
    prezzo: number,
    stato: string,
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

  private stato: string;

// Metodi di accesso (get)

  /**
   * Ottiene l'ID del preventivo.
   * @returns L'ID del preventivo.
   */
  public getIdPreventivo(): number {
    return this.idPreventivo;
  }

  /**
   * Ottiene l'ID dell'utente associato al preventivo.
   * @returns L'ID dell'utente associato al preventivo.
   */
  public getIdUtente(): number {
    return this.idUtente;
  }

  /**
   * Ottiene il limite di addestramenti associato al preventivo.
   * @returns Il limite di addestramenti associato al preventivo.
   */
  public getLimitiAddestramenti(): number {
    return this.limitiAddestramenti;
  }

  /**
   * Ottiene il limite di salvataggi associato al preventivo.
   * @returns Il limite di salvataggi associato al preventivo.
   */
  public getLimitiSalvataggi(): number {
    return this.limitiSalvataggi;
  }

  /**
   * Ottiene il prezzo del preventivo.
   * @returns Il prezzo del preventivo.
   */
  public getPrezzo(): number {
    return this.prezzo;
  }

  /**
   * Ottiene lo stato del preventivo.
   * @returns Lo stato del preventivo.
   */
  public getStato(): string {
    return this.stato;
  }

  // Metodi di modifica (set)

  /**
   * Imposta l'ID dell'utente associato al preventivo.
   * @param idUtente - Il nuovo ID dell'utente.
   */
  public setIdUtente(idUtente: number): void {
    this.idUtente = idUtente;
  }

  /**
   * Imposta il limite di addestramenti associato al preventivo.
   * @param limitiAddestramenti - Il nuovo limite di addestramenti.
   */
  public setLimitiAddestramenti(limitiAddestramenti: number): void {
    this.limitiAddestramenti = limitiAddestramenti;
  }

  /**
   * Imposta il limite di salvataggi associato al preventivo.
   * @param limitiSalvataggi - Il nuovo limite di salvataggi.
   */
  public setLimitiSalvataggi(limitiSalvataggi: number): void {
    this.limitiSalvataggi = limitiSalvataggi;
  }

  /**
   * Imposta il prezzo del preventivo.
   * @param prezzo - Il nuovo prezzo del preventivo.
   */
  public setPrezzo(prezzo: number): void {
    this.prezzo = prezzo;
  }

  /**
   * Imposta lo stato del preventivo.
   * @param stato - Il nuovo stato del preventivo.
   */
  public setStato(stato: string): void {
    this.stato = stato;
  }
}

export default Preventivo;
