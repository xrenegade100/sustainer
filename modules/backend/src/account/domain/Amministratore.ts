class Amministratore {
  // Creo il costruttore
  constructor(nome: string, cognome: string, email: string, password: string) {
    this.idAmministratore = 0;
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.password = password;
  }
  // Creo gli attributi

  private idAmministratore: number;

  private nome: string;

  private cognome: string;

  private email: string;

  private password: string;

  /**
   * Ottiene l'ID dell'amministratore.
   *
   * @method getIdAmministratore
   * @returns {number} - L'ID dell'amministratore.
   */
  public getIdAmministratore(): number {
    return this.idAmministratore;
  }

  /**
   * Ottiene il nome dell'amministratore.
   *
   * @method getNome
   * @returns {string} - Il nome dell'amministratore.
   */
  public getNome(): string {
    return this.nome;
  }

  /**
   * Ottiene il cognome dell'amministratore.
   *
   * @method getCognome
   * @returns {string} - Il cognome dell'amministratore.
   */
  public getCognome(): string {
    return this.cognome;
  }

  /**
   * Ottiene l'indirizzo email dell'amministratore.
   *
   * @method getEmail
   * @returns {string} - L'indirizzo email dell'amministratore.
   */
  public getEmail(): string {
    return this.email;
  }

  /**
   * Ottiene la password dell'amministratore.
   *
   * @method getPassword
   * @returns {string} - La password dell'amministratore.
   */
  public getPassword(): string {
    return this.password;
  }

  /**
   * Imposta l'ID dell'amministratore.
   *
   * @method setIdAmministratore
   * @param {number} idAmministratore - Il nuovo ID dell'amministratore.
   * @returns {void}
   */
  public setIdAmministratore(idAmministratore: number): void {
    this.idAmministratore = idAmministratore;
  }

  /**
   * Imposta il nome dell'amministratore.
   *
   * @method setNome
   * @param {string} nome - Il nuovo nome dell'amministratore.
   * @returns {void}
   */
  public setNome(nome: string): void {
    this.nome = nome;
  }

  /**
   * Imposta il cognome dell'amministratore.
   *
   * @method setCognome
   * @param {string} cognome - Il nuovo cognome dell'amministratore.
   * @returns {void}
   */
  public setCognome(cognome: string): void {
    this.cognome = cognome;
  }

  /**
   * Imposta l'indirizzo email dell'amministratore.
   *
   * @method setEmail
   * @param {string} email - Il nuovo indirizzo email dell'amministratore.
   * @returns {void}
   */
  public setEmail(email: string): void {
    this.email = email;
  }

  /**
   * Imposta la password dell'amministratore.
   *
   * @method setPassword
   * @param {string} password - La nuova password dell'amministratore.
   * @returns {void}
   */
  public setPassword(password: string): void {
    this.password = password;
  }
}

export default Amministratore;
