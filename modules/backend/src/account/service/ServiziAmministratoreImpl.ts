import AmministratoreDAO from '../../DAO/AmministratoreDAO';
import serviziAmministratore from './ServiziAmministratore';

class ServiziAmministratoreImpl implements serviziAmministratore {
  // login
  static async loginIMP(email: string, password: string) {
    const amministratoreLogin = await AmministratoreDAO.login(email, password);
    if (amministratoreLogin) {
      return amministratoreLogin;
    }
    return null;
  }

  // modifica informazioni utente
  // eslint-disable-next-line max-len
  static async modificaInformazioniUtenteIMP(
    email: string,
    nuovoNome: string,
    nuovoCognome: string,
  ) {
    // eslint-disable-next-line max-len
    const utenteModificato = await AmministratoreDAO.modificaInformazioniUtente(
      email,
      nuovoNome,
      nuovoCognome,
    );
    if (utenteModificato !== null && utenteModificato !== undefined) {
      return utenteModificato;
    }
    return null;
  }

  // cancella utente
  static async cancellaUtenteIMP(email: string) {
    const utenteCancellato = await AmministratoreDAO.cancellaUtente(email);
    if (utenteCancellato !== null && utenteCancellato !== undefined) {
      return utenteCancellato;
    }
    return null;
  }
}

export default ServiziAmministratoreImpl;
