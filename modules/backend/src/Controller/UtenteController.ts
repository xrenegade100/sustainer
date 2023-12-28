import UtenteDAO from '../DAO/UtenteDAO';

class UtenteController {
  static async login(email: string, password: string) {
    const utentelogin = await UtenteDAO.login(email, password);
    console.log(utentelogin);
    if (utentelogin) {
      return utentelogin;
    }
    return null;
  }

  static async getAllUtenti() {
    const utenti = await UtenteDAO.getAllUtenti();
    if (utenti.length > 0) {
      return utenti;
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

export default UtenteController;
