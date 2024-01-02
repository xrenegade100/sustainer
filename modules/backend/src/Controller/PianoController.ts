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
}

export default PianoController;
