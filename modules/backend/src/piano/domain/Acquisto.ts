// creo la struttura del piano che userò nei DAO

class Acquisto {
  // creo il costruttore
  constructor(id_utente: number, id_piano: number, data_acquisto: Date) {
    this.id_utente = id_utente;
    this.id_piano = id_piano;
    this.data_acquisto = data_acquisto;
  }

  // creo gli attributi
  private id_utente: number;

  private id_piano: number;

  private data_acquisto: Date;

  // creo i metodi get
  public get_id_utente(): number {
    return this.id_utente;
  }

  public get_id_piano(): number {
    return this.id_piano;
  }

  public get_data_acquisto(): Date {
    return this.data_acquisto;
  }

  // creo i metodi set
  public set_id_utente(id_utente: number): void {
    this.id_utente = id_utente;
  }

  public set_id_piano(id_piano: number): void {
    this.id_piano = id_piano;
  }

  public set_data_acquisto(data_acquisto: Date): void {
    this.data_acquisto = data_acquisto;
  }
}

export default Acquisto;
