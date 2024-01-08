import { Request, Response } from 'express';
import serviziAmministratoreImpl from '../account/service/ServiziAmministratoreImpl';

class AmministratoreController {
  static verificaLoginAm = async (req: Request, res: Response) => {
    if (req.session!.authenticated) {
      return res.status(200).json({
        success: true,
        user: req.session!.authenticated,
        adminId: req.session!.idAdmin,
      });
    }
    return res.status(403).json({ success: false });
  };

  // login
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const admin = await serviziAmministratoreImpl.loginIMP(email, password);
    if (admin) {
      req.session!.authenticated = admin.getEmail();
      req.session!.idAdmin = admin.getIdAmministratore();
      return res.status(200).json({
        success: true,
        user: req.session!.authenticated,
        adminId: req.session!.idAdmin,
      });
    }
    return res.status(403).json({ message: 'amministratore non trovato' });
  };

  // visualizza utenti
  /* static visualizzaUtenti = async (req: Request, res: Response) => {
    const utenti = await serviziAmministratoreImpl.visualizzaUtentiIMP();
    if (utenti) {
      return res.status(200).json({ utenti });
    }
    return res.status(403).json({ message: 'utenti non trovati' });
  }; */

  // modifica informazioni utente
  static modificaInformazioniUtente = async (req: Request, res: Response) => {
    const { email, nuovoNome, nuovoCognome } = req.body;
    // eslint-disable-next-line max-len, operator-linebreak
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
      return res
        .status(500)
        .json({ success: false, message: 'Errore durante il logout' });
    }
    return null;
  };
}

export default AmministratoreController;
