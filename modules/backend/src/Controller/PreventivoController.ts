/**
 * @fileOverview
 * @module PreventivoController
 * @description Fornisce metodi di controllo Express per gestire operazioni relative a 'preventivo'.
 * @requires Request
 * @requires Response
 * @requires ../piano/service/ServiziPreventivoImpl
 */

import { Request, Response } from 'express';
import ServiziPreventivoImpl from '../piano/service/ServiziPreventivoImpl';

/**
 * @class
 * @classdesc Rappresenta un controller per operazioni su 'preventivo'.
 */
class PreventivoController {
  /**
   * Recupera tutti i preventivi.
   * @static
   * @async
   * @param {Request} req - L'oggetto di richiesta Express.
   * @param {Response} res - L'oggetto di risposta Express.
   * @returns {Promise<Response>} Una Promise che si risolve con i preventivi recuperati o un messaggio di errore.
   */
  static TuttiPreventiviIMP = async (req: Request, res: Response): Promise<Response> => {
    const preventivi = await ServiziPreventivoImpl.TuttiPreventivi();
    if (preventivi) {
      return res.status(200).json(preventivi);
    }
    return res.status(403).json({ message: 'Preventivi non trovati' });
  };

  /**
   * Crea un nuovo preventivo.
   * @static
   * @async
   * @param {Request} req - L'oggetto di richiesta Express.
   * @param {Response} res - L'oggetto di risposta Express.
   * @returns {Promise<Response>} Una Promise che si risolve con il preventivo creato o un messaggio di errore.
   */
  static creaPreventivoIMP = async (req: Request, res: Response): Promise<Response> => {
    if (req.body.limitiAddestramenti && req.body.limitiSalvataggi) {
      const { limitiAddestramenti, limitiSalvataggi } = req.body;
      const preventivo = await ServiziPreventivoImpl.creaPreventivo(
        req.session!.idUser,
        limitiAddestramenti,
        limitiSalvataggi,
      );
      if (preventivo) {
        return res.status(200).json(preventivo);
      }
    }
    return res.status(403).json({ message: 'Preventivo non creato' });
  };

  // Altri metodi seguono lo stesso modello con documentazione dei metodi
  // ...

}

export default PreventivoController;
