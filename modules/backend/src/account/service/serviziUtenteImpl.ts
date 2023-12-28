import express, { Request, Response } from 'express';
import UtenteController from '../../Controller/UtenteController';
import Utente from '../../account/domain/Utente';
import serviziUtente from './serviziUtente';

class serviziUtenteImpl implements serviziUtente {
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post('/', serviziUtenteImpl.loginIMP);
    this.router.post('/register', serviziUtenteImpl.registrazioneIMP);
  }

  static loginIMP = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await UtenteController.login(email, password);
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(403).json({ message: 'utente non trovato' });
  };

  static registrazioneIMP = async (req: Request, res: Response) => {
    const { nome, cognome, emailr, passwordr } = req.body;
    await UtenteController.register(nome, cognome, emailr, passwordr);

    /*
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(403).json({ message: 'utente non creato' });
    */
  };
}

export default serviziUtenteImpl;
