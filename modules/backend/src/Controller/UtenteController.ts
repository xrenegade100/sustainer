import { Request, Response } from 'express';
import serviziUtenteImpl from '../account/service/serviziUtenteImpl';

class UtenteController {
  static loginIMP = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await serviziUtenteImpl.login(email, password);
    if (user) {
      console.log(req.sessionID);
      req.session!.authenticated = user.get_email();
      console.log(req.session!.authenticated);
      return res.status(200).json(req.session);
    }
    return res.status(403).json({ message: 'utente non trovato' });
  };

  static registrazioneIMP = async (req: Request, res: Response) => {
    const { nome, cognome, emailr, passwordr } = req.body;
    await serviziUtenteImpl.register(nome, cognome, emailr, passwordr);
  };
}

export default UtenteController;
