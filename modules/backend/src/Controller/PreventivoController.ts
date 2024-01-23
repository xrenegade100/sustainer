import { Request, Response } from 'express';
import ServiziPreventivoImpl from '../piano/service/ServiziPreventivoImpl';

class PreventivoController {
  static TuttiPreventiviIMP = async (req: Request, res: Response) => {
    const preventivi = await ServiziPreventivoImpl.TuttiPreventivi();
    if (preventivi) {
      return res.status(200).json(preventivi);
    }
    return res.status(403).json({ message: 'preventivi non trovati' });
  };

  static creaPreventivoIMP = async (req: Request, res: Response) => {
    if (req.body.limitiAddestramenti && req.body.limitiSalvataggi) {
      if (req.body.limitiAddestramenti && req.body.limitiSalvataggi) {
        const { limitiAddestramenti, limitiSalvataggi } = req.body;
        if ((limitiAddestramenti > 4 && limitiAddestramenti <= 20)
        && (limitiSalvataggi > 10 && limitiSalvataggi <= 50)) {
          const preventivo = await ServiziPreventivoImpl.creaPreventivo(
            req.session!.idUser,
            limitiAddestramenti,
            limitiSalvataggi,
          );
          if (preventivo) {
            return res.status(200).json(preventivo);
          }
        }
      }
    }
    return res.status(403).json({ message: 'preventivo non creato' });
  };

  static controllaPreventivoIMP = async (req: Request, res: Response) => {
    const preventivo = await ServiziPreventivoImpl.getPreventivo(
      req.session!.idUser,
    );
    if (preventivo) {
      return res.status(200).json(preventivo);
    }
    return res.status(403).json({ message: 'preventivo non trovato' });
  };

  static eliminaPreventivoIMP = async (req: Request, res: Response) => {
    const prev = await ServiziPreventivoImpl.getPreventivo(req.session!.idUser);
    if (prev) {
      const elimina = await ServiziPreventivoImpl.eliminaPreventivo(
        req.session!.idUser,
      );
      if (elimina) {
        return res.status(200).json({ message: 'preventivo eliminato' });
      }
    }
    return res.status(403).json({ message: 'nessun preventivo da eliminare' });
  };

  static getPreventivoIMP = async (req: Request, res: Response) => {
    const preventivo = await ServiziPreventivoImpl.getPreventivo(
      req.session!.idUser,
    );
    if (preventivo) {
      return res.status(200).json(preventivo);
    }
    return res.status(403).json({ message: 'preventivo non recuperato' });
  };

  static getIdPreventivoIMP = async (req: Request, res: Response) => {
    const preventivo = await ServiziPreventivoImpl.getIdPreventivo(
      req.session!.idUser,
    );
    if (preventivo) {
      return res.status(200).json(preventivo);
    }
    return res.status(403).json({ message: 'preventivo non recuperato' });
  };

  static getLimitiAddestramentiIMP = async (req: Request, res: Response) => {
    const preventivo = await ServiziPreventivoImpl.getLimitiAddestramenti(
      req.session!.idUser,
    );
    if (preventivo) {
      return res.status(200).json(preventivo);
    }
    return res.status(403).json({ message: 'preventivo non recuperato' });
  };

  static getLimitiSalvataggiIMP = async (req: Request, res: Response) => {
    const preventivo = await ServiziPreventivoImpl.getLimitiSalvataggi(
      req.session!.idUser,
    );
    if (preventivo) {
      return res.status(200).json(preventivo);
    }
    return res.status(403).json({ message: 'preventivo non recuperato' });
  };

  static getPrezzoIMP = async (req: Request, res: Response) => {
    const preventivo = await ServiziPreventivoImpl.getPrezzo(
      req.session!.idUser,
    );
    if (preventivo) {
      return res.status(200).json(preventivo);
    }
    return res.status(403).json({ message: 'preventivo non recuperato' });
  };

  static getStatoIMP = async (req: Request, res: Response) => {
    // Verifica che req.session e req.session!.idUser siano definiti
    if (req.session && req.session!.idUser) {
      const preventivo = await ServiziPreventivoImpl.getStato(
        req.session!.idUser,
      );
      if (preventivo) {
        return res.status(200).json(preventivo);
      }
      return res.status(403).json({ message: 'preventivo non recuperato' });
    }
    // Se req.session o req.session!.idUser sono undefined, restituisci un errore 403
    return res.status(403).json({ message: 'Utente non autenticato' });
  };

  static aggiornaStatoIMP = async (req: Request, res: Response) => {
    const { idPreventivo, stato } = req.body;
    const preventivo = await ServiziPreventivoImpl.aggiornaStato(
      idPreventivo,
      stato,
    );
    if (preventivo) {
      return res.status(200).json(preventivo);
    }
    return res.status(403).json({ message: 'preventivo non aggiornato' });
  };

  static aggiornaPrezzoIMP = async (req: Request, res: Response) => {
    const { idPreventivo, prezzo } = req.body;
    const preventivo = await ServiziPreventivoImpl.aggiornaPrezzo(
      idPreventivo,
      prezzo,
    );
    if (preventivo) {
      return res.status(200).json(preventivo);
    }
    return res.status(403).json({ message: 'preventivo non aggiornato' });
  };

  static eliminaPreventivoByIdIMP = async (req: Request) => {
    const { currentPreventivo } = req.body;
    await ServiziPreventivoImpl.eliminaPreventivoById(
      currentPreventivo.idPreventivo,
    );
  };

  static ModificaPreventivoIMP = async (req: Request, res: Response) => {
    const { stato, prezzo, currentPreventivo } = req.body;
    let defaultStato = stato;
    let updatedPrezzo = prezzo;
    if (!updatedPrezzo || updatedPrezzo < 0) {
      updatedPrezzo = 0;
    }
    if (!defaultStato) {
      defaultStato = 'In lavorazione';
    }
    if (defaultStato === 'In lavorazione') {
      updatedPrezzo = 0;
    }
    if (defaultStato === 'Rifiutato') {
      this.eliminaPreventivoByIdIMP(req);
      // mock?? no Anto non lo faccio senza che fai perche non lo testo il rifiutato
    }

    const preventivo = await ServiziPreventivoImpl.ModificaPreventivo(
      defaultStato,
      updatedPrezzo,
      currentPreventivo.idPreventivo,
    );

    if (preventivo) {
      return res.status(200).json(preventivo);
    }

    return res
      .status(403)
      .json({ message: 'preventivo non trovato per la modifica' });
  };
}

export default PreventivoController;
