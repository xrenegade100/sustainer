import express, { Request, Response } from 'express';
import { getUtenteByMail } from '../../dao/UtenteDAO';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  console.log(req.body);
  const { email } = req.body;

  const user = await getUtenteByMail(email);

  if (user) {
    return res.status(200).json({ user });
  }
  return res.status(403).json({ message: 'utente non trovato' });
});

export default router;
