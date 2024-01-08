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

  // creo i metodi get
  public getIdUtente(): number {
    return this.idUtente;
  }

  public getNome(): string {
    return this.nome;
  }

  public getCognome(): string {
    return this.cognome;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  // creo i metodi set
  public setIdUtente(idUtente: number): void {
    this.idUtente = idUtente;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public setCognome(cognome: string): void {
    this.cognome = cognome;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setPassword(password: string): void {
    this.password = password;
  }
}

export default Utente;
