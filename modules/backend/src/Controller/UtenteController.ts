/**
 * @fileOverview
 * @module UtenteController
 * @description Fornisce metodi del controller Express per gestire operazioni relative a 'utente'.
 * @requires Request
 * @requires Response
 * @requires ../account/service/ServiziUtenteImpl
 * @requires ./PianoController
 */

import { Request, Response } from 'express';
import serviziUtenteImpl from '../account/service/ServiziUtenteImpl';
import PianoController from './PianoController';

/**
 * @class
 * @classdesc Rappresenta un controller per operazioni su 'utente'.
 */
class UtenteController {
  /**
   * Verifica se l'utente è autenticato.
   * @static
   * @async
   * @param {Request} req - Oggetto richiesta Express.
   * @param {Response} res - Oggetto risposta Express.
   * @returns {Promise<Response>} Una Promise che si risolve con un JSON indicante il successo e l'utente autenticato o un messaggio di errore.
   */
  static verificaLogin = async (req: Request, res: Response): Promise<Response> => {
    // Se l'utente è autenticato
    if (req.session!.authenticated) {
      // Restituisci un JSON con success = true e l'utente autenticato
      return res
        .status(200)
        .json({ success: true, user: req.session!.authenticated });
    }
    // Altrimenti, restituisci un JSON con success = false
    return res.status(403).json({ success: false });
  };

  /**
   * Gestisce il login dell'utente.
   * @static
   * @async
   * @param {Request} req - Oggetto richiesta Express.
   * @param {Response} res - Oggetto risposta Express.
   * @returns {Promise<Response>} Una Promise che si risolve con un JSON indicante il successo e l'utente autenticato o un messaggio di errore.
   */
  static loginIMP = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body; // Ottieni email e password dalla richiesta
      const user = await serviziUtenteImpl.login(email, password);
      if (user) {
        // Se l'utente esiste
        req.session!.authenticated = user.getEmail(); // Imposta la sessione con l'email dell'utente
        req.session!.idUser = user.getIdUtente();
        return res // Restituisci un JSON con success = true e l'utente autenticato
          .status(200)
          .json({ success: true, user: req.session!.authenticated });
      }
      return res // Altrimenti, restituisci un JSON con success = false e un messaggio di errore
        .status(403)
        .json({ success: false, message: 'Utente non trovato' });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Errore durante il login' });
    }
  };

  // Altri metodi seguono lo stesso modello con documentazione dei metodi
  // ...

}

export default UtenteController;
