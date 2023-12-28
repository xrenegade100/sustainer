import express, { Request, Response } from 'express';
import { getUtenteByMail } from '../../dao/UtenteDAO';
import { setUtentiRegistrazione } from '../../dao/UtenteDAO';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { reg } = req.body;
  console.log(req.body);
  if (!reg) {
    const { email } = req.body;

    const user = await getUtenteByMail(email);

    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(403).json({ message: 'utente non trovato' });
  }
});

router.post('/register', async (req: Request, res: Response) => {
  const { nome, cognome, emailr, passwordr } = req.body;
  const user = await setUtentiRegistrazione(nome, cognome, emailr, passwordr);
  if (user) {
    return res.status(200).json({ user });
  }
  return res.status(403).json({ message: 'utente non creato' });
});

export default router;
