import { Request, Response } from 'express';
import serviziPianoImpl from '../piano/service/serviziPianoImpl';

class PianoController {
  // metodo che ritorna tutti i piani
  static getTipiPianoIMP = async (req: Request, res: Response) => {
    const piani = await serviziPianoImpl.getTipiPiani(); // richiamo il metodo getTipiPiani del serviziPianoImpl
    if (piani) {
      console.log('ok'); // stampo ok se la query è andata a buon fine
      return res.status(200).json(piani); // ritorno i piani
    }
    return res.status(403).json({ message: 'tipi piani non trovati' }); // altrimenti ritorno un messaggio di errore
  };

  // metodo che mi consentirà di acquistare il piano free
  static AcquistoPianoFreeIMP = async (id_utente: number) => {
    await serviziPianoImpl.AcquistoPianoFree(id_utente); // richiamo il metodo AcquistoPianoFree del serviziPianoImpl
  };

  static visulizzaPianoIMP = async (req: Request, res: Response) => {
    console.log('VISUALIZZA PIANO: ', req.sessionID);
    if (req.session!.authenticated) {
      console.log('Sei autenticato per visualizzare il piano');
      const acquisto = await serviziPianoImpl.gelUltimoAcquistoUtente(
        req.session!.id_user,
      );
      const piano = await serviziPianoImpl.getPianoUtente(
        acquisto!.get_id_piano(),
      );
      if (piano) {
        const arr = [piano, acquisto];
        return res.status(200).json(arr);
      }
    }
    return res.status(403).json({ message: 'piano non trovato..' });
  };

  /*
  static modificaPianoIMP = async (req: Request, res: Response) => {
    const piano = await serviziPianoImpl.(req.body);
    if (piano) {
      console.log('ok');
      return res.status(200).json(piano);
    }
    return res.status(403).json({ message: 'piano non modificato' });
  };
  */
}

export default PianoController;
