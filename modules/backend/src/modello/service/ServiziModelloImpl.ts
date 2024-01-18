import serviziModello from './ServiziModello';
import ModelloDAO from '../../DAO/ModelloDAO';

class ServiziModelloImpl implements serviziModello {
  // metodo che uso per la login
  static async salvaModelloImpl(
    idUtente: number,
    gruppoPrivilegiato: string,
    recall: number,
    precision: number,
    accuracy: number,
    sustainability: number,
    disparateImpact: number,
    tipoModello: string,
  ) {
    // richiamo il metodo login del UtenteDAO
    await ModelloDAO.salvaModello(
      idUtente,
      gruppoPrivilegiato,
      recall,
      precision,
      accuracy,
      sustainability,
      disparateImpact,
      tipoModello,
    );
  }
}

export default ServiziModelloImpl;
