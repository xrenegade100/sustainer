// Creo la struttura dell'utente che userò nei DAO

class Utente {
  // Creo il costruttore
  constructor(nome: string, cognome: string, email: string, password: string) {
    this.idUtente = 0;
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.password = password;
  }

  // Creo gli attributi
  private idUtente: number;

  private nome: string;

  private cognome: string;

  private email: string;

  private password: string;

  /**
   * Ottiene l'ID dell'utente.
   *
   * @method getIdUtente
   * @returns {number} - L'ID dell'utente.
   */
  public getIdUtente(): number {
    return this.idUtente;
  }

  /**
   * Ottiene il nome dell'utente.
   *
   * @method getNome
   * @returns {string} - Il nome dell'utente.
   */
  public getNome(): string {
    return this.nome;
  }

  /**
   * Ottiene il cognome dell'utente.
   *
   * @method getCognome
   * @returns {string} - Il cognome dell'utente.
   */
  public getCognome(): string {
    return this.cognome;
  }

  /**
   * Ottiene l'indirizzo email dell'utente.
   *
   * @method getEmail
   * @returns {string} - L'indirizzo email dell'utente.
   */
  public getEmail(): string {
    return this.email;
  }

  /**
   * Ottiene la password dell'utente.
   *
   * @method getPassword
   * @returns {string} - La password dell'utente.
   */
  public getPassword(): string {
    return this.password;
  }

  /**
   * Imposta l'ID dell'utente.
   *
   * @method setIdUtente
   * @param {number} idUtente - Il nuovo ID dell'utente.
   * @returns {void}
   */
  public setIdUtente(idUtente: number): void {
    this.idUtente = idUtente;
  }

  /**
   * Imposta il nome dell'utente.
   *
   * @method setNome
   * @param {string} nome - Il nuovo nome dell'utente.
   * @returns {void}
   */
  public setNome(nome: string): void {
    this.nome = nome;
  }

  /**
   * Imposta il cognome dell'utente.
   *
   * @method setCognome
   * @param {string} cognome - Il nuovo cognome dell'utente.
   * @returns {void}
   */
  public setCognome(cognome: string): void {
    this.cognome = cognome;
  }

  /**
   * Imposta l'indirizzo email dell'utente.
   *
   * @method setEmail
   * @param {string} email - Il nuovo indirizzo email dell'utente.
   * @returns {void}
   */
  public setEmail(email: string): void {
    this.email = email;
  }

  /**
   * Imposta la password dell'utente.
   *
   * @method setPassword
   * @param {string} password - La nuova password dell'utente.
   * @returns {void}
   */
  public setPassword(password: string): void {
    this.password = password;
  }
}

export default Utente;
