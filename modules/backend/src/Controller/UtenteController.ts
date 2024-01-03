import { Request, Response } from 'express';
import serviziUtenteImpl from '../account/service/serviziUtenteImpl';
import PianoController from './PianoController';

class UtenteController {
  // metodo che mi servirà per verificare se l'utente è loggato
  static verificaLogin = async (req: Request, res: Response) => {
    console.log('Identificativo in verifica login : ', req.sessionID);
    console.log(
      'Identificativo mail utente in verifica login : ',
      req.session!.authenticated,
    );
    // se l'utente è loggato
    if (req.session!.authenticated) {
      console.log('Sei gia autenticato');
      return res // ritorno un json con success = true e l'utente loggato
        .status(200)
        .json({ success: true, user: req.session!.authenticated });
    }
    return res.status(200).json({ success: false }); // altrimenti ritorno un json con success = false
  };

  // metodo che mi servirà per il login
  static loginIMP = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body; // prendo email e password dalla richiesta
      const user = await serviziUtenteImpl.login(email, password); // richiamo il metodo login del serviziUtenteImpl

      if (user) {
        // se l'utente esiste
        req.session!.authenticated = user.get_email(); // setto la sessione con l'email dell'utente
        req.session!.id_user = user.get_id_utente();
        console.log('Identificativo in login : ', req.sessionID);
        console.log('Salvo nella sessione : ', req.session!.authenticated);
        req.session!.save(() => {}); // salvo la sessione
        return res // ritorno un json con success = true e l'utente loggato
          .status(200)
          .json({ success: true, user: req.session!.authenticated });
      }
      return res // altrimenti ritorno un json con success = false e un messaggio di errore
        .status(403)
        .json({ success: false, message: 'Utente non trovato' });
    } catch (error) {
      console.error('Errore durante il login:', error);
      return res
        .status(500)
        .json({ success: false, message: 'Errore durante il login' });
    }
  };

  // metodo che mi servirà per la registrazione
  static registrazioneIMP = async (req: Request, res: Response) => {
    try {
      const { nome, cognome, emailr, passwordr } = req.body; // prendo nome, cognome, email e password dalla richiesta
      await serviziUtenteImpl.register(nome, cognome, emailr, passwordr); // richiamo il metodo register del serviziUtenteImpl
      const id_utente = await serviziUtenteImpl.getIdUtente(emailr); // richiamo il metodo getIdUtente del serviziUtenteImpl per prendermi id dell'utente appena registrato

      //devo usare pianoController per fare l'acquisto del piano free
      await PianoController.AcquistoPianoFreeIMP(id_utente); // richiamo il metodo AcquistoPianoFreeIMP del PianoController
      console.log('Registrazione effettuata con successo');

      return res.status(200).json({
        // ritorno un json con success = true e un messaggio di successo
        success: true,
        message: 'Registrazione effettuata con successo',
      });
    } catch (error) {
      // altrimenti ritorno un json con success = false e un messaggio di errore
      console.error('Errore durante la registrazione:', error);
      return res
        .status(500)
        .json({ success: false, message: 'Errore durante la registrazione' });
    }
  };

  // metodo che mi servirà per il logout e la distruzione della sessione
  static logout = (req: Request, res: Response) => {
    try {
      // Distruggi la sessione
      req.session!.destroy((err) => {
        // distruggo la sessione
        if (err) {
          // se c'è un errore
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
