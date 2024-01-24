// creo la struttura dell'utente che userò nei DAO

class Utente {
  // creo il costruttore
  constructor(nome: string, cognome: string, email: string, password: string) {
    this.idUtente = 0;
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.password = password;
  }

  // creo gli attributi
  private idUtente: number;

  private nome: string;

  private cognome: string;

  private email: string;

  private password: string;

  /**
   * Ottiene l'identificatore dell'utente.
   * @returns L'identificatore dell'utente.
   */
  public getIdUtente(): number {
    return this.idUtente;
  }

  /**
   * Ottiene il nome dell'utente.
   * @returns Il nome dell'utente.
   */
  public getNome(): string {
    return this.nome;
  }

  /**
   * Ottiene il cognome dell'utente.
   * @returns Il cognome dell'utente.
   */
  public getCognome(): string {
    return this.cognome;
  }

  /**
   * Ottiene l'email dell'utente.
   * @returns L'email dell'utente.
   */
  public getEmail(): string {
    return this.email;
  }

  /**
   * Ottiene la password dell'utente.
   * @returns La password dell'utente.
   */
  public getPassword(): string {
    return this.password;
  }

  /**
   * Imposta l'identificatore dell'utente.
   * @param idUtente - Il nuovo identificatore dell'utente.
   */
  public setIdUtente(idUtente: number): void {
    this.idUtente = idUtente;
  }

  /**
   * Imposta il nome dell'utente.
   * @param nome - Il nuovo nome dell'utente.
   */
  public setNome(nome: string): void {
    this.nome = nome;
  }

  /**
   * Imposta il cognome dell'utente.
   * @param cognome - Il nuovo cognome dell'utente.
   */
  public setCognome(cognome: string): void {
    this.cognome = cognome;
  }

  /**
   * Imposta l'email dell'utente.
   * @param email - La nuova email dell'utente.
   */
  public setEmail(email: string): void {
    this.email = email;
  }

  /**
   * Imposta la password dell'utente.
   * @param password - La nuova password dell'utente.
   */
  public setPassword(password: string): void {
    this.password = password;
  }
}

export default Utente;
