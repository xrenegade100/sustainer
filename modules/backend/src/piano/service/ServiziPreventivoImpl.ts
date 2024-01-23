import PreventivoDAO from '../../DAO/PreventivoDAO';

class ServiziPreventivoImpl {
  static async TuttiPreventivi() {
    // richiamo il metodo TuttiPreventivi del PreventivoDAO
    const preventivi = await PreventivoDAO.getPreventivi();
    if (preventivi) {
      return preventivi;
    }
    return null;
  }

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
  static async eliminaPreventivo(idUtente: number) {
    // richiamo il metodo eliminaPreventivo del PreventivoDAO
    const preventivoElim = await PreventivoDAO.eliminaPreventivo(idUtente);
    if (preventivoElim !== null && preventivoElim !== undefined) {
      return preventivoElim;
    }
    return null;
  }

  // metodo che mi consente di recuperare un preventivo
  static async getPreventivo(idUtente: number) {
    // richiamo il metodo getPreventivo del PreventivoDAO
    const preventivo = await PreventivoDAO.getPreventivo(idUtente);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  // metodo che mi consente di recuperare l'id di un preventivo
  static async getIdPreventivo(idUtente: number) {
    // richiamo il metodo getIdPreventivo del PreventivoDAO
    const preventivo = await PreventivoDAO.getIdPreventivo(idUtente);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  // metodo che mi consente di recuperare i limiti di addestramento di un preventivo
  static async getLimitiAddestramenti(idUtente: number) {
    // richiamo il metodo getLimitiAddestramento del PreventivoDAO
    const preventivo = await PreventivoDAO.getLimitiAddestramenti(idUtente);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  // metodo che mi consente di recuperare i limiti di salvataggio di un preventivo
  static async getLimitiSalvataggi(idUtente: number) {
    // richiamo il metodo getLimitiSalvataggi del PreventivoDAO
    const preventivo = await PreventivoDAO.getLimitiSalvataggi(idUtente);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  // metodo che mi consente di recuperare il prezzo di un preventivo
  static async getPrezzo(idUtente: number) {
    // richiamo il metodo getPrezzo del PreventivoDAO
    const preventivo = await PreventivoDAO.getPrezzo(idUtente);
    if (preventivo) {
      return preventivo;
    }
    return null;
  }

  // metodo che mi consente di recuperare lo stato di un preventivo
  static async getStato(idUtente: number) {
    // richiamo il metodo getStato del PreventivoDAO
    const preventivo = await PreventivoDAO.getStato(idUtente);
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

  static async eliminaPreventivoById(idPreventivo: number) {
    // richiamo il metodo elminiaPreventivo del PreventivoDAO
    await PreventivoDAO.eliminaPreventivoById(idPreventivo);
  }

  // metodo che mi consente di modificare un preventivo
  static async ModificaPreventivo(
    stato: string,
    prezzo: number,
    idPreventivo: number,
  ) {
    // richiamo il metodo ModificaPreventivo del PreventivoDAO
    const preventivo = await PreventivoDAO.ModificaPreventivo(
      stato,
      prezzo,
      idPreventivo,
    );
    if (preventivo) {
      return preventivo;
    }
    return null;
  }
}
export default ServiziPreventivoImpl;
