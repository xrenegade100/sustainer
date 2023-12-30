import serviziUtente from './serviziUtente';
import UtenteDAO from '../../DAO/UtenteDAO';
import Utente from '../domain/Utente';

class serviziUtenteImpl implements serviziUtente {
  static async login(email: string, password: string) {
    const utentelogin = await UtenteDAO.login(email, password);
    console.log(utentelogin);
    if (utentelogin) {
      return utentelogin;
    }
    return null;
  }

  static async register(
    nome: string,
    cognome: string,
    email: string,
    password: string,
  ) {
    await UtenteDAO.registrazione(nome, cognome, email, password);
  }
}

export default serviziUtenteImpl;
