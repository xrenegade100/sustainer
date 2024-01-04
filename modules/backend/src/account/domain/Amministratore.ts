class Amministratore {
  id: any;

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

  // creo i metodi get
  public getIdAmministratore(): number {
    return this.idAmministratore;
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
  // eslint-disable-next-line camelcase
  public setIdAmministratore(idAmministratore: number) : void {
    // eslint-disable-next-line camelcase
    this.idAmministratore = idAmministratore;
  }

  public setNome(nome: string) : void {
    this.nome = nome;
  }

  public setCognome(cognome: string) : void {
    this.cognome = cognome;
  }

  public setEmail(email: string) : void {
    this.email = email;
  }

  public setPassword(password: string) : void {
    this.password = password;
  }
}

export default Amministratore;
