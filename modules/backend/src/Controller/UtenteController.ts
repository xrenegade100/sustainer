import { Request, Response } from 'express';
import serviziUtenteImpl from '../account/service/ServiziUtenteImpl';
import PianoController from './PianoController';

class UtenteController {
  // metodo che mi servirà per verificare se l'utente è loggato
  static verificaLogin = async (req: Request, res: Response) => {
    // se l'utente è loggato
    if (req.session!.authenticated) {
      // ritorno un json con success = true e l'utente loggato
      return res
        .status(200)
        .json({ success: true, user: req.session!.authenticated });
    }
    return res.status(403).json({ success: false }); // altrimenti ritorno un json con success=false
  };

  // metodo che mi servirà per il login
  static loginIMP = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body; // prendo email e password dalla richiesta
      const user = await serviziUtenteImpl.login(email, password);

      if (user) {
        // se l'utente esiste
        req.session!.authenticated = user.getEmail(); // setto la sessione con l'email dell'utente
        req.session!.idUser = user.getIdUtente();
        req.session!.save(() => {}); // salvo la sessione
        return res // ritorno un json con success = true e l'utente loggato
          .status(200)
          .json({ success: true, user: req.session!.authenticated });
      }
      return res // altrimenti ritorno un json con success = false e un messaggio di errore
        .status(403)
        .json({ success: false, message: 'Utente non trovato' });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Errore durante il login' });
    }
  };

  // metodo che mi servirà per la registrazione
  static registrazioneIMP = async (req: Request, res: Response) => {
    try {
      // prendo nome, cognome, email e password dalla richiesta
      // eslint-disable-next-line object-curly-newline
      const { nome, cognome, emailr, passwordr } = req.body;

      // richiamo il metodo register del serviziUtenteImpl

      await serviziUtenteImpl.register(nome, cognome, emailr, passwordr);

      // richiamo il metodo getIdUtente per prendermi id dell'utente appena registrato
      const idUtente = await serviziUtenteImpl.getIdUtente(emailr);

      // devo usare pianoController per fare l'acquisto del piano free
      // richiamo il metodo AcquistoPianoFreeIMP del PianoController
      await PianoController.AcquistoPianoFreeIMP(idUtente);

      return res.status(200).json({
        // ritorno un json con success = true e un messaggio di successo
        success: true,
        message: 'Registrazione effettuata con successo',
      });
    } catch (error) {
      // altrimenti ritorno un json con success = false e un messaggio di errore
      return res
        .status(500)
        .json({ success: false, message: 'Errore durante la registrazione' });
    }
  };

  // metodo che mi servirà per il logout e la distruzione della sessione
  static logout = (req: Request, res: Response) => {
    try {
      // Distruggi la sessione
      req.session!.destroy(() => {});
      return res.status(200).redirect('/homepage');
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Errore durante il logout' });
    }
  };

  // metodo che mi servirà per il ritorno di un utente in base all'id_utente
  static getUtenteById = async (req: Request, res: Response) => {
    try {
      // prendo l'id_utente dalla richiesta
      const { idUtente } = req.params;
      // richiamo il metodo getUtente del serviziUtenteImpl
      const utente = await serviziUtenteImpl.getUtenteById(Number(idUtente));
      if (utente) {
        // se l'utente esiste
        return res // ritorno un json con success = true e l'utente
          .status(200)
          .json(utente);
      }
      return res // altrimenti ritorno un json con success = false e un messaggio di errore
        .status(403)
        .json({ success: false, message: 'Utente non trovato' });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Errore durante il login' });
    }
  };
}

export default UtenteController;
