class Amministratore {
  id: any;

  // creo il costruttore
  constructor(nome: string, cognome: string, email: string, password: string) {
    this.id_amministratore = 0;
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.password = password;
  }
  // creo gli attributi

  private id_amministratore: number;

  private nome: string;

  private cognome: string;

  private email: string;

  private password: string;

  // creo i metodi get
  public get_id_amministratore(): number {
    return this.id_amministratore;
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
  // eslint-disable-next-line camelcase
  public set_id_amministratore(id_amministratore: number) : void {
    // eslint-disable-next-line camelcase
    this.id_amministratore = id_amministratore;
  }

  public set_nome(nome: string) : void {
    this.nome = nome;
  }

  public set_cognome(cognome: string) : void {
    this.cognome = cognome;
  }

  public set_email(email: string) : void {
    this.email = email;
  }

  public set_password(password: string) : void {
    this.password = password;
  }
}

export default Amministratore;
