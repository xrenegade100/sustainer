import serviziPreventivo from './ServiziPreventivo';
import PreventivoDAO from '../../DAO/PreventivoDAO';

class ServiziPreventivoImpl implements serviziPreventivo {
  // metodo che mi consente di creare un preventivo
  static async creaPreventivo(
    idUtente: number,
    limitiAddestramenti: number,
    limitiSalvataggi: number,
  ) {
    // richiamo il metodo creaPreventivo del PreventivoDAO
    const preventivo = await PreventivoDAO.creaPreventivo(
      idUtente,
      limitiAddestramenti,
      limitiSalvataggi,
    );
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  // metodo che mi consente di eliminare un preventivo
  static async eliminaPreventivo(idPreventivo: number) {
    // richiamo il metodo eliminaPreventivo del PreventivoDAO
    const preventivo = await PreventivoDAO.eliminaPreventivo(idPreventivo);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  // metodo che mi consente di recuperare un preventivo
  static async getPreventivo(idPreventivo: number) {
    // richiamo il metodo getPreventivo del PreventivoDAO
    const preventivo = await PreventivoDAO.getPreventivo(idPreventivo);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  // metodo che mi consente di recuperare l'id di un preventivo
  /* static async getIdPreventivo(idUtente: number) {
    // richiamo il metodo getIdPreventivo del PreventivoDAO
    const preventivo = await PreventivoDAO.getIdPreventivo(idUtente);
    if (preventivo) {
      return preventivo;
    }
    return null;
  } */

  // metodo che mi consente di recuperare i limiti di addestramento di un preventivo
  static async getLimitiAddestramenti(idPreventivo: number) {
    // richiamo il metodo getLimitiAddestramento del PreventivoDAO
    const preventivo = await PreventivoDAO.getLimitiAddestramenti(idPreventivo);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  // metodo che mi consente di recuperare i limiti di salvataggio di un preventivo
  static async getLimitiSalvataggi(idPreventivo: number) {
    // richiamo il metodo getLimitiSalvataggi del PreventivoDAO
    const preventivo = await PreventivoDAO.getLimitiSalvataggi(idPreventivo);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  // metodo che mi consente di recuperare il prezzo di un preventivo
  static async getPrezzo(idPreventivo: number) {
    // richiamo il metodo getPrezzo del PreventivoDAO
    const preventivo = await PreventivoDAO.getPrezzo(idPreventivo);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  // metodo che mi consente di recuperare lo stato di un preventivo
  static async getStato(idPreventivo: number) {
    // richiamo il metodo getStato del PreventivoDAO
    const preventivo = await PreventivoDAO.getStato(idPreventivo);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  // metodo che mi consente di aggiornare lo stato di un preventivo
  static async aggiornaStato(idPreventivo: number, stato: string) {
    // richiamo il metodo setStato del PreventivoDAO
    const preventivo = await PreventivoDAO.setStato(idPreventivo, stato);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  // metodo che mi consente di aggiornare il prezzo di un preventivo
  static async aggiornaPrezzo(idPreventivo: number, prezzo: number) {
    // richiamo il metodo setPrezzo del PreventivoDAO
    const preventivo = await PreventivoDAO.setPrezzo(idPreventivo, prezzo);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }
}
export default ServiziPreventivoImpl;
