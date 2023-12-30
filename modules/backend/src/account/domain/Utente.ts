// creo la struttura dell'utente che userò nei DAO

class Utente {
  // creo il costruttore
  constructor(nome: string, cognome: string, email: string, password: string) {
    this.id_utente = 0;
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.password = password;
  }

  // creo gli attributi
  private id_utente: number;

  private nome: string;

  private cognome: string;

  private email: string;

  private password: string;

  // creo i metodi get
  public get_id_utente(): number {
    return this.id_utente;
  }

  public get_nome(): string {
    return this.nome;
  }

  public get_cognome(): string {
    return this.cognome;
  }

  public get_email(): string {
    return this.email;
  }

  public get_password(): string {
    return this.password;
  }

  // creo i metodi set
  public set_id_utente(id_utente: number): void {
    this.id_utente = id_utente;
  }

  public set_nome(nome: string): void {
    this.nome = nome;
  }

  public set_cognome(cognome: string): void {
    this.cognome = cognome;
  }

  public set_email(email: string): void {
    this.email = email;
  }

  public set_password(password: string): void {
    this.password = password;
  }
}

export default Utente;
