import { Request, Response } from 'express';
import serviziPianoImpl from '../piano/service/serviziPianoImpl';

class PianoController {
  static getTipiPianoIMP = async (req: Request, res: Response) => {
    const piani = await serviziPianoImpl.getTipiPiani();
    if (piani) {
      console.log('ok');
      return res.status(200).json(piani);
    }
    return res.status(403).json({ message: 'tipi piani non trovati' });
  };

  static visulizzaPianoIMP = async (req: Request, res: Response) => {
    if (req.session!.autehnticated) {
      console.log('Sei autenticato per visualizzare il piano');
      const acquisto = await serviziPianoImpl.gelUltimoAcquistoUtente(
        req.session!.id_user,
      );
      const piano = await serviziPianoImpl.getPianoUtente(
        acquisto!.get_id_piano(),
      );
      if (piano) {
        return res.status(200).json(piano).json(acquisto);
      }
    }
    return res.status(403).json({ message: 'piano non trovato' });
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
