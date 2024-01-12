import { Request, Response } from 'express';
import ServiziPreventivoImpl from '../preventivo/service/ServiziPreventivoImpl';

class PreventivoController {
  static creaPreventivoIMP = async (req: Request, res: Response) => {
    if (req.body.limitiAddestramenti && req.body.limitiSalvataggi) {
      const {
        limitiAddestramenti, limitiSalvataggi,
      } = req.body;
      const preventivo = await ServiziPreventivoImpl.creaPreventivo(
      req.session!.idUser,
      limitiAddestramenti,
      limitiSalvataggi,
      );
      if (preventivo) {
        return res.status(200).json(preventivo);
      }
      return res.status(403).json({ message: 'preventivo non creato' });
    }

    const preventivo = await ServiziPreventivoImpl.getPreventivo(req.session!.idUser);
    if (preventivo) {
      return res.status(200).json(preventivo);
    }
    return res.status(403).json({ message: 'preventivo non trovato' });
  };

  static controllaPreventivoIMP = async (req: Request, res: Response) => {
    const preventivo = await ServiziPreventivoImpl.getPreventivo(req.session!.idUser);
    if (preventivo) {
      return res.status(200).json(preventivo);
    }
    return res.status(403).json({ message: 'preventivo non trovato' });
  };

  static eliminaPreventivoIMP = async (req: Request, res: Response) => {
    const { idPreventivo } = req.body;
    const preventivo = await ServiziPreventivoImpl.eliminaPreventivo(idPreventivo);
    if (preventivo) {
      return res.status(200).json(preventivo);
    }
    return res.status(403).json({ message: 'preventivo non eliminato' });
  };

  static getPreventivoIMP = async (req: Request, res: Response) => {
    const { idPreventivo } = req.body;
    const preventivo = await ServiziPreventivoImpl.getPreventivo(idPreventivo);
    if (preventivo) {
      return res.status(200).json(preventivo);
    }
    return res.status(403).json({ message: 'preventivo non recuperato' });
  };

  /*
  static getIdPreventivoIMP = async (req: Request, res: Response) => {
    const { idUtente } = req.body;
    const preventivo = await ServiziPreventivoImpl.getIdPreventivo(idUtente);
    if (preventivo) {
      return res.status(200).json(preventivo);
    }
    return res.status(403).json({ message: 'preventivo non recuperato' });
  };
  */

  static getLimitiAddestramentiIMP = async (req: Request, res: Response) => {
    const { idPreventivo } = req.body;
    const preventivo = await ServiziPreventivoImpl.getLimitiAddestramenti(idPreventivo);
    if (preventivo) {
      return res.status(200).json(preventivo);
    }
    return res.status(403).json({ message: 'preventivo non recuperato' });
  };

  static getLimitiSalvataggiIMP = async (req: Request, res: Response) => {
    const { idPreventivo } = req.body;
    const preventivo = await ServiziPreventivoImpl.getLimitiSalvataggi(idPreventivo);
    if (preventivo) {
      return res.status(200).json(preventivo);
    }
    return res.status(403).json({ message: 'preventivo non recuperato' });
  };

  static getPrezzoIMP = async (req: Request, res: Response) => {
    const { idPreventivo } = req.body;
    const preventivo = await ServiziPreventivoImpl.getPrezzo(idPreventivo);
    if (preventivo) {
      return res.status(200).json(preventivo);
    }
    return res.status(403).json({ message: 'preventivo non recuperato' });
  };

  static getStatoIMP = async (req: Request, res: Response) => {
    const { idPreventivo } = req.body;
    const preventivo = await ServiziPreventivoImpl.getStato(idPreventivo);
    if (preventivo) {
      return res.status(200).json(preventivo);
    }
    return res.status(403).json({ message: 'preventivo non recuperato' });
  };

  static aggiornaStatoIMP = async (req: Request, res: Response) => {
    const { idPreventivo, stato } = req.body;
    const preventivo = await ServiziPreventivoImpl.aggiornaStato(idPreventivo, stato);
    if (preventivo) {
      return res.status(200).json(preventivo);
    }
    return res.status(403).json({ message: 'preventivo non aggiornato' });
  };

  static aggiornaPrezzoIMP = async (req: Request, res: Response) => {
    const { idPreventivo, prezzo } = req.body;
    const preventivo = await ServiziPreventivoImpl.aggiornaPrezzo(idPreventivo, prezzo);
    if (preventivo) {
      return res.status(200).json(preventivo);
    }
    return res.status(403).json({ message: 'preventivo non aggiornato' });
  };
}

export default PreventivoController;
