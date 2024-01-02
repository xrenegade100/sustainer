import serviziUtente from './serviziUtente';
import UtenteDAO from '../../DAO/UtenteDAO';
import Utente from '../domain/Utente';

class serviziUtenteImpl implements serviziUtente {
  // metodo che uso per la login
  static async login(email: string, password: string) {
    const utentelogin = await UtenteDAO.login(email, password); // richiamo il metodo login del UtenteDAO
    console.log(utentelogin);
    if (utentelogin) {
      // se l'utente esiste
      return utentelogin; // ritorno l'utente
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
    await UtenteDAO.registrazione(nome, cognome, email, password); // richiamo il metodo registrazione del UtenteDAO
  }

  // metodo che uso per il ritorna id dell'utente in base all'email
  static async getIdUtente(email: string) {
    const id_utente = await UtenteDAO.getIdUtente(email); // richiamo il metodo getIdUtente del UtenteDAO
    // se l'id_utente esiste
    if (id_utente) {
      return id_utente; // ritorno l'id_utente
    }
    return 0;
  }
}

export default serviziUtenteImpl;
