import { Request, Response } from 'express';
import SHA256 from 'crypto-js/sha256';
import serviziUtenteImpl from '../account/service/ServiziUtenteImpl';
import PianoController from './PianoController';

class UtenteController {
  // metodo che mi servirà per verificare se l'utente è loggato
  static verificaLogin = async (req: Request, res: Response) => {
    // se l'utente è loggato
    if (req.session!.authenticated) {
      // ritorno un json con success = true e l'utente loggato
      console.log('utente loggato id: ', req.session!.idUser);
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

      // Validazione del nome
      const nomeRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s']{1,100}$/;
      if (!nomeRegex.test(nome)) {
        return res.status(400).json({
          success: false,
          message:
            'Il nome deve contenere solo lettere, non deve essere vuoto e non deve superare i 100 caratteri',
        });
      }

      // Validazione del cognome
      const cognomeRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s']{1,100}$/;
      if (!cognomeRegex.test(cognome)) {
        return res.status(400).json({
          success: false,
          message:
            'Il cognome deve contenere solo lettere, non deve essere vuoto e non deve superare i 100 caratteri',
        });
      }

      // Validazione dell'email
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,319}$/;
      if (!emailRegex.test(emailr)) {
        return res.status(400).json({
          success: false,
          message:
            'Email non rispetta il formato corretto (es. mario@rossi.it)',
        });
      }

      // Validazione della password
      // eslint-disable-next-line operator-linebreak
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])[A-Za-z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-]{8,64}$/;
      if (!passwordRegex.test(passwordr)) {
        return res.status(400).json({
          success: false,
          message:
            'La password deve contenere almeno 8 caratteri tra cui: 1 lettera maiuscola e 1 carattere speciale',
        });
      }

      // Hash della password
      const hashValue = SHA256(passwordr).toString();

      // richiamo il metodo register del serviziUtenteImpl

      await serviziUtenteImpl.register(nome, cognome, emailr, hashValue);

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
