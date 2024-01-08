import serviziUtente from './ServiziUtente';
import UtenteDAO from '../../DAO/UtenteDAO';

class ServiziUtenteImpl implements serviziUtente {
  // metodo che uso per la login
  static async login(email: string, password: string) {
    // richiamo il metodo login del UtenteDAO
    const utenteLogin = await UtenteDAO.login(email, password);

    if (utenteLogin) {
      // se l'utente esiste
      return utenteLogin; // ritorno l'utente
    }
    return null; // altrimenti ritorno null
  }

  // metodo che uso per la registrazione
  static async register(
    nome: string,
    cognome: string,
    email: string,
    password: string,
  ) {
    // richiamo il metodo registrazione del UtenteDAO
    await UtenteDAO.registrazione(nome, cognome, email, password);
  }

  // metodo che uso per il ritorna id dell'utente in base all'email
  static async getIdUtente(email: string) {
    // richiamo il metodo getIdUtente del UtenteDAO
    const idUtente = await UtenteDAO.getIdUtente(email);
    // se l'id_utente esiste
    if (idUtente) {
      return idUtente; // ritorno l'id_utente
    }
    return 0;
  }
}

export default ServiziUtenteImpl;
