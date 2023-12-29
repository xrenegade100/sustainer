import express, { Request, Response } from 'express';
import serviziAmministratoreImpl from '../service/serviziAmministratoreImpl';

class AmministratoreController {
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post('/', serviziAmministratoreImpl.loginIMP);
    this.router.post('/comunicazione', serviziAmministratoreImpl.invioComunicazioneIMP);
    this.router.get('/utenti', serviziAmministratoreImpl.visualizzaUtenti);
    this.router.put('/ModUtente', serviziAmministratoreImpl.modificaInformazioniUtente);
  }

  // login
  static login = async (req:Request, res:Response) => {
    const { email, password } = req.body;
    const admin = await serviziAmministratoreImpl.loginIMP(email, password);
    if (admin) {
      return res.status(200).json({ admin });
    }
    return res.status(403).json({ message: 'amministratore non trovato' });
  };

  // invio comunicazione
  static inviaComunicazione = async (req: Request, res: Response) => {
    const { idAmministratore, emails, messaggio } = req.body;
    // eslint-disable-next-line max-len
    const comunicazione = await serviziAmministratoreImpl.inviaComunicazioneIMP(idAmministratore, emails, messaggio);
    if (comunicazione) {
      return res.status(200).json({ comunicazione });
    }
    return res.status(403).json({ message: 'comunicazione non inviata' });
  };

  // visualizza utenti
  static visualizzaUtenti = async (req: Request, res: Response) => {
    const utenti = await serviziAmministratoreImpl.visualizzaUtentiIMP();
    if (utenti) {
      return res.status(200).json({ utenti });
    }
    return res.status(403).json({ message: 'utenti non trovati' });
  };

  // modifica informazioni utente
  static modificaInformazioniUtente = async (req: Request, res: Response) => {
    const { email, nuovoNome, nuovoCognome } = req.body;
    // eslint-disable-next-line max-len
    const utenteModificato = await serviziAmministratoreImpl.modificaInformazioniUtenteIMP(email, nuovoNome, nuovoCognome);
    if (utenteModificato) {
      return res.status(200).json({ utenteModificato });
    }
    return res.status(403).json({ message: 'utente non modificato' });
  };

  // cancella utente
  static cancellaUtente = async (req: Request, res: Response) => {
    const { email } = req.body;
    const utenteCancellato = await serviziAmministratoreImpl.cancellaUtenteIMP(email);
    if (utenteCancellato) {
      return res.status(200).json({ utenteCancellato });
    }
    return res.status(403).json({ message: 'utente non cancellato' });
  };
}

export default new AmministratoreController().router;
