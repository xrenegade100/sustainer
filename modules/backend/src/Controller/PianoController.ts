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
}

export default PianoController;
