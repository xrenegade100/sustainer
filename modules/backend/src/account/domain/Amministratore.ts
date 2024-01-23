class Amministratore {
  // creo il costruttore
  constructor(nome: string, cognome: string, email: string, password: string) {
    this.idAmministratore = 0;
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.password = password;
  }
  // creo gli attributi

  private idAmministratore: number;

  private nome: string;

  private cognome: string;

  private email: string;

  private password: string;

  /**
   * Ottiene l'identificatore dell'amministratore.
   * @returns L'identificatore dell'amministratore.
   */
  public getIdAmministratore(): number {
    return this.idAmministratore;
  }

  /**
   * Ottiene il nome dell'amministratore.
   * @returns Il nome dell'amministratore.
   */
  public getNome(): string {
    return this.nome;
  }

  /**
   * Ottiene il cognome dell'amministratore.
   * @returns Il cognome dell'amministratore.
   */
  public getCognome(): string {
    return this.cognome;
  }

  /**
   * Ottiene l'email dell'amministratore.
   * @returns L'email dell'amministratore.
   */
  public getEmail(): string {
    return this.email;
  }

  /**
   * Ottiene la password dell'amministratore.
   * @returns La password dell'amministratore.
   */
  public getPassword(): string {
    return this.password;
  }

  /**
   * Imposta l'identificatore dell'amministratore.
   * @param idAmministratore - Il nuovo identificatore dell'amministratore.
   */
  public setIdAmministratore(idAmministratore: number): void {
    this.idAmministratore = idAmministratore;
  }

  /**
   * Imposta il nome dell'amministratore.
   * @param nome - Il nuovo nome dell'amministratore.
   */
  public setNome(nome: string): void {
    this.nome = nome;
  }

  /**
   * Imposta il cognome dell'amministratore.
   * @param cognome - Il nuovo cognome dell'amministratore.
   */
  public setCognome(cognome: string): void {
    this.cognome = cognome;
  }

  /**
   * Imposta l'email dell'amministratore.
   * @param email - La nuova email dell'amministratore.
   */
  public setEmail(email: string): void {
    this.email = email;
  }

  /**
   * Imposta la password dell'amministratore.
   * @param password - La nuova password dell'amministratore.
   */
  public setPassword(password: string): void {
    this.password = password;
  }
}
export default Amministratore;
