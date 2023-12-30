// creo la struttura del piano che userò nei DAO

class Piano {
    // creo il costruttore
    constructor(tipo: number, prezzo: number, limite_salvataggi_modelli: number, limite_addestramenti_modelli: number) {
        this.id_piano = 0;
        this.tipo: tipo;
        this.prezzo: prezzo;
        this.limite_salvataggi_modelli: limite_salvataggi_modelli;
        this.limite_addestramenti_modelli = limite_addestramenti_modelli;
    }

    // creo gli attributi
    private id_piano: number;
  
    private tipo: number;
  
    private prezzo: number;
  
    private limite_salvataggi_modelli: number;
  
    private limite_addestramenti_modelli: number;
  
    // creo i metodi get
    public get_id_piano(): number {
      return this.id_piano;
    }
  
    public get_tipo(): number {
      return this.tipo;
    }
  
    public get_prezzo(): number {
      return this.prezzo;
    }
  
    public get_limite_salvataggi_modelli(): number {
      return this.limite_salvataggi_modelli;
    }
  
    public get_limite_addestramenti_modelli(): number {
      return this.limite_addestramenti_modelli;
    }
  
    // creo i metodi set
    public set_id_piano(id_piano: number): void {
      this.id_piano = id_piano;
    }
  
    public set_tipo(tipo: number): void {
      this.tipo = tipo;
    }
  
    public set_prezzo(prezzo: number): void {
      this.prezzo = prezzo;
    }
  
    public set_limite_salvataggi_modelli(limite_salvataggi_modelli: number): void {
      this.limite_salvataggi_modelli = this.limite_salvataggi_modelli;
    }
  
    public set_limite_addestramenti_modelli(limite_addestramenti_modelli: number): void {
      this.limite_addestramenti_modelli = limite_addestramenti_modelli;
    }
  }
  
  export default Piano;