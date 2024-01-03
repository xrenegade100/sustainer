import express, { Request, Response } from 'express';
import serviziAmministratoreImpl from '../account/service/serviziAmministratoreImpl';

class AmministratoreController {
  static verificaLoginAm = async (req: Request, res: Response) => {
    console.log(
      'Identificativo in verifica login AMMINISTRATORE : ',
      req.sessionID,
    );
    console.log(
      'sono in verifica login AMMINISTRATORE: ',
      req.session!.authenticated,
    );
    if (req.session!.authenticated) {
      console.log('Sei gia autenticato come admin');
      console.log(
        'id admin:',
        req.session!.id_admin,
        'aut: ',
        req.session!.authenticated,
      );
      return res.status(200).json({
        success: true,
        user: req.session!.authenticated,
        admin_id: req.session!.id_admin,
      });
    }
    return res.status(403).json({ success: false });
  };

  // login
  static login = async (req: Request, res: Response) => {
    console.log('Ciao, sei nel login amministratore');
    const { email, password } = req.body;
    const admin = await serviziAmministratoreImpl.loginIMP(email, password);
    if (admin) {
      req.session!.authenticated = admin.get_email();
      req.session!.id_admin = admin.get_id_amministratore();
      console.log(
        'Ho messo gli attributi nella sessione:',
        req.session!.authenticated,
        req.session!.id_admin,
      );
      return res.status(200).json({
        success: true,
        user: req.session!.authenticated,
        admin_id: req.session!.id_admin,
      });
    }
    return res.status(403).json({ message: 'amministratore non trovato' });
  };

  // invio comunicazione
  /*static inviaComunicazione = async (req: Request, res: Response) => {
    const { idAmministratore, emails, messaggio, data_comunicazione } =
      req.body;
    const comunicazione = await serviziAmministratoreImpl.invioComunicazioneIMP(
      idAmministratore,
      emails,
      messaggio,
      data_comunicazione,
    );
    if (comunicazione) {
      return res.status(200).json({ comunicazione });
    }
    return res.status(403).json({ message: 'comunicazione non inviata' });
  };*/

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
    const utenteModificato =
      await serviziAmministratoreImpl.modificaInformazioniUtenteIMP(
        email,
        nuovoNome,
        nuovoCognome,
      );
    if (utenteModificato) {
      return res.status(200).json({ utenteModificato });
    }
    return res.status(403).json({ message: 'utente non modificato' });
  };

  // cancella utente
  static cancellaUtente = async (req: Request, res: Response) => {
    const { email } = req.body;
    const utenteCancellato = await serviziAmministratoreImpl.cancellaUtenteIMP(
      email,
    );
    if (utenteCancellato) {
      return res.status(200).json({ utenteCancellato });
    }
    return res.status(403).json({ message: 'utente non cancellato' });
  };

  // logout
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

export default AmministratoreController;
