import { Request, Response } from 'express';
import serviziUtenteImpl from '../account/service/serviziUtenteImpl';

class UtenteController {
  static verificaLogin = async (req: Request, res: Response) => {
    console.log('Identificativo in verifica login : ', req.sessionID);
    console.log('sono in verifica login : ', req.session!.authenticated);
    if (req.session!.authenticated) {
      console.log('Sei gia autenticato');
      return res
        .status(200)
        .json({
          success: true,
          user: req.session!.authenticated,
          id: req.session!.id_user,
        });
    }
    return res.status(200).json({ success: false });
  };

  static loginIMP = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await serviziUtenteImpl.login(email, password);

      if (user) {
        req.session!.authenticated = user.get_email();
        req.session!.id_user = user.get_id_utente();
        console.log('Identificativo in login : ', req.sessionID);
        console.log('Salvo nella sessione : ', req.session!.authenticated);
        req.session!.save(() => {});
        return res
          .status(200)
          .json({ success: true, user: req.session!.authenticated });
      }
      return res
        .status(403)
        .json({ success: false, message: 'Utente non trovato' });
    } catch (error) {
      console.error('Errore durante il login:', error);
      return res
        .status(500)
        .json({ success: false, message: 'Errore durante il login' });
    }
  };

  static registrazioneIMP = async (req: Request, res: Response) => {
    try {
      const { nome, cognome, emailr, passwordr } = req.body;
      await serviziUtenteImpl.register(nome, cognome, emailr, passwordr);
      return res.status(200).json({
        success: true,
        message: 'Registrazione effettuata con successo',
      });
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      return res
        .status(500)
        .json({ success: false, message: 'Errore durante la registrazione' });
    }
  };

  static logout = (req: Request, res: Response) => {
    try {
      // Distruggi la sessione
      req.session!.destroy((err) => {
        if (err) {
          console.error('Errore durante il logout:', err);
          return res
            .status(500)
            .json({ success: false, message: 'Errore durante il logout' });
        }

        // Rispondi con successo
        return res
          .status(200)
          .json({ success: true, message: 'Logout effettuato con successo' });
      });
    } catch (error) {
      console.error('Errore durante il logout:', error);
      return res
        .status(500)
        .json({ success: false, message: 'Errore durante il logout' });
    }
  };
}

export default UtenteController;
